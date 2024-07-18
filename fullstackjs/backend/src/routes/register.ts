import { Request, Response } from "express";
import { Route, Controller, WebSocket, WebSocketPeer } from "@/express-app";
import { allExists } from "@/util/nullables";
import { User, Profile, Auth } from "@/db/db";
import { createSecureRandom, createHash } from "@/util/security";
import { executeAfterDelay } from "@/util/timers";

// Register data model
interface IRegisterData {
	name: string | undefined;
	email: string | undefined;
	username: string | undefined;
	password: string | undefined;
	bio: string | undefined;
	profile_picture: string | undefined;
}

// Verification token map
var verificationMap = new Map<string, string>();

// Expire token function
async function expireToken(token: string) {
	if (verificationMap.has(token)) {
		// Delete user data
		var value = await User.findByIdAndDelete(verificationMap.get(token));
		// Delete auth and profile data
		value?.auth_id && await Auth.findByIdAndDelete(value.auth_id);
		value?.profile_id && await Profile.findByIdAndDelete(value.profile_id);

		console.log("Deleted user: token expired");
		// Delete the token
		verificationMap.delete(token);
	}
}

// Verify user function
async function verifyUser(token: string) {
	if (verificationMap.has(token)) {
		// Get the user
		await User.findByIdAndUpdate(verificationMap.get(token), { verified: true });
		// Set the user to verified
		// Delete the token
		verificationMap.delete(token);

		return true;
	}
	return false;
}

// TODO: send verification email to user
// TODO: use this link https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/
async function sendEmail(email: string, token: string) {
	return {
		message: 'User created successfully. Verification link sent to email.',
		// TODO: Return the token for testing purposes
		token: `${token}`
	};
}

// TODO: Check password strength & email format
function validPasswordStrength(password: string) {
	// Password must be at least 8 characters long
	if (password.length < 8) {
		return false;
	}

	// Password must contain at least one uppercase letter
	if (password === password.toLowerCase()) {
		return false;
	}

	// Password must contain at least one lowercase letter
	if (password === password.toUpperCase()) {
		return false
	}

	// Password must contain at least one number
	if (password.search(/[0-9]/) < 0) {
		return false;
	}

	// Password must contain at least one special character
	if (password.search(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/) < 0) {
		return false;
	}
	return true;
}

class RegisterController extends Controller {

	// Sends a post request
	async post(req: Request, res: Response) {
		// Get the data and convert it to data model
		const data = req.body as IRegisterData;

		// Check if all required fields exist
		if (!allExists(data.name, data.email, data.username, data.password)) {
			res.status(400).json({ message: 'Invalid Request: Not all fields were valid and sent' });
			return;
		}

		// Check if the user already exists
		if (await User.exists({ email: data.email }) || await User.exists({ username: data.username })) {
			res.status(400).json({ message: 'Invalid Request: User already exists' });
			return;
		}

		// Validate password strength and email format
		if (!validPasswordStrength(data.password!)) {
			res.status(400).json({ message: 'Invalid Request: Password is not strong enough' });
		}

		// Create the user, profile, and auth records in db
		// Create profile record
		const profile_id = await Profile.create({
			name: data.name,
			bio: data.bio,
			profile_picture: data.profile_picture
		}).then((profile) => profile._id);

		// Create auth record
		const salt = createSecureRandom();
		const hash = createHash(data.password!, salt);

		const auth_id = await Auth.create({
			salt: salt,
			hash: hash
		}).then((auth) => auth._id);

		// Create user record
		const user = await User.create({
			email: data.email,
			username: data.username,
			password: data.password,
			verified: false,
			profile: profile_id,
			auth: auth_id
		});

		// Send "email" to email verification service
		const secureToken = createSecureRandom(45);
		var message = await sendEmail(data.email!, secureToken);

		// Create a token
		verificationMap.set(secureToken, user._id.toString());
		// Set the token to expire in 1 minute
		executeAfterDelay(() => {
			expireToken(secureToken);
		}, 60000);

		console.warn("User created successfully. Verification token sent to client. Remove this message once fixed and using proper email api");

		// Send success response
		res.status(200).json(message);
	}
}

class VerifyUserController extends Controller {
	async get(req: Request, res: Response) {
		const token = req.query.token as string;

		if (await verifyUser(token)) {
			res.status(200).json({ message: 'User verified successfully' });
		} else {
			res.status(400).json({ message: 'Invalid Request: Token is invalid' });
		}
	}
}

export class RegisterRoute extends Route {
	constructor() {
		super('/register');
		this.addController(new RegisterController(), ["/"]);
		this.addController(new VerifyUserController(), ["/verify"]);
	}
}
