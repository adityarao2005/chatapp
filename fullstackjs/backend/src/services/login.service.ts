import jwtService, { ITokenPayload, ITokenData } from "@/services/jwt.service";
import { RedisClient } from "@/config/redis";
import { Auth, User } from "@/models/models";
import { createHash } from "@/utils/security";

export interface ILoginData {
	userID: string;
	password: string;
}

class LoginService {
	checkIfEmail(email: string) {
		return email.includes('@');
	}

	async login(data: ILoginData) {
		var query = {};

		if (this.checkIfEmail(data.userID)) {
			query = { email: data.userID };
		} else {
			query = { username: data.userID };
		}

		const user = await User.findOne(query);

		if (user && user.verified) {
			const authID = user.auth_id;

			const auth = await Auth.findById(authID);

			if (auth && auth.hash === createHash(data.password, auth.salt)) {
				// Return the tokens
				return jwtService.generate(user);
			}
		} else {
			throw new Error("Invalid login credentials");
		}
	}

	async logout(tokenData: ITokenData) {
		const accessTokenPayload = jwtService.verifyAccessToken(tokenData.accessToken);
		const refreshTokenPayload = jwtService.verifyRefreshToken(tokenData.refreshToken);

		const currentTime = Math.floor(Date.now() / 1000);

		const accessTokenLife = accessTokenPayload.exp! - currentTime;
		const refreshTokenLife = refreshTokenPayload.exp! - currentTime;

		await RedisClient.setEx(tokenData.accessToken, accessTokenLife, 'true')
		await RedisClient.setEx(tokenData.refreshToken, refreshTokenLife, 'true')
	}

	async refresh(tokenData: ITokenData) {
		const refreshTokenPayload = jwtService.verifyRefreshToken(tokenData.refreshToken);
		const blacklistedToken = await RedisClient.get(tokenData.refreshToken);

		if (blacklistedToken === 'true') {
			throw new Error('Access Denied');
		}

		const newAccessToken = jwtService.generateAccessToken({
			email: refreshTokenPayload.email,
			username: refreshTokenPayload.username
		});


		// Get the current time as a Unix timestamp (seconds since the epoch)
		const currentTime = Math.floor(Date.now() / 1000)
		const refreshTokenExpiration = refreshTokenPayload.exp!

		let newRefreshToken: string = tokenData.refreshToken;
		// refresh token life left less than access token life
		if (refreshTokenExpiration - currentTime < 900) {
			newRefreshToken = jwtService.generateRefreshToken({
				email: refreshTokenPayload.email,
				username: refreshTokenPayload.username
			});
		}

		return { accessToken: newAccessToken, refreshToken: newRefreshToken };
	}

	async verify(token: string) {
		const accessTokenPayload = jwtService.verifyAccessToken(token);

		const blacklistedToken = await RedisClient.get(token);

		if (blacklistedToken == 'true') {
			throw new Error('Access Denied');
		}

		return accessTokenPayload as ITokenPayload;
	}
}

export default new LoginService();