import { User, Profile, Auth } from "@/models/models";
import { allExists } from "@/util/nullables";
import { createSecureRandom, createHash } from "@/util/security";
import emailService from "@/services/emailService";

// Register data model
export interface IRegisterData {
    name: string | undefined;
    email: string | undefined;
    username: string | undefined;
    password: string | undefined;
    bio: string | undefined;
    profile_picture: string | undefined;
}

class RegisterService {
    // Verification token map
    verificationMap: Map<string, string> = new Map<string, string>();

    // Expire token function
    async expireToken(token: string) {
        if (this.verificationMap.has(token)) {
            // Delete user data
            var value = await User.findByIdAndDelete(this.verificationMap.get(token));
            // Delete auth and profile data
            value?.auth_id && await Auth.findByIdAndDelete(value.auth_id);
            value?.profile_id && await Profile.findByIdAndDelete(value.profile_id);

            console.log("Deleted user: token expired");
            // Delete the token
            this.verificationMap.delete(token);
        }
    }

    // Verify user function
    async verifyUser(token: string) {
        if (this.verificationMap.has(token)) {
            // Get the user
            await User.findByIdAndUpdate(this.verificationMap.get(token), { verified: true });
            // Set the user to verified
            // Delete the token
            this.verificationMap.delete(token);

            return true;
        }
        return false;
    }

    validPasswordStrength(password: string) {
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


    async register(data: IRegisterData) {
        // Create the user, profile, and auth records in db
        // Check if all required fields exist
        if (!allExists(data.name, data.email, data.username, data.password)) {
            throw new Error('Invalid Request: Not all fields were valid and sent');
            
        }

        // Check if the user already exists
        if (await User.exists({ email: data.email }) || await User.exists({ username: data.username })) {
            throw new Error('Invalid Request: User already exists');
        }

        // Validate password strength and email format
        if (!this.validPasswordStrength(data.password!)) {
            throw new Error('Invalid Request: Password is not strong enough');
        }
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
        const secureToken = createSecureRandom(64);

        const value = await emailService.sendEmail(data.email!, secureToken);

        // Create a token
        this.verificationMap.set(secureToken, user._id.toString());
        // Set the token to expire in 1 minute
        setTimeout(() => {
            this.expireToken(secureToken);
        }, 60000);

        return value;
    }
}

export default new RegisterService();