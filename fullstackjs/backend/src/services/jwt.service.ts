import { IUser } from '@/models/user';
import jwt, { JwtPayload } from 'jsonwebtoken';


// Require Access token key and refresh token key
export interface ITokenData {
	accessToken: string;
	refreshToken: string;
}

export interface ITokenPayload {
	email: string;
	username: string;
}

// Get the token keys from the environment variables
const ACCESS_TOKEN_KEY = `${process.env.ACCESS_TOKEN_KEY}`;
const REFRESH_TOKEN_KEY = `${process.env.REFRESH_TOKEN_KEY}`;

class JwtService {
	generate(user: IUser) {
		// Create token data
		var tokenData: ITokenPayload = {
			email: user.email,
			username: user.username
		}
		var accessToken = this.generateAccessToken(tokenData);
		var refreshToken = this.generateRefreshToken(tokenData);

		return { accessToken: accessToken, refreshToken: refreshToken };
	}

	generateAccessToken(tokenData: ITokenPayload) {
		// Create the access token
		const access = jwt.sign(tokenData, ACCESS_TOKEN_KEY, {
			expiresIn: '15m'
		});

		// Return the access token
		return access;
	}

	generateRefreshToken(tokenData: ITokenPayload) {

		// Create the refresh token
		const refresh = jwt.sign(tokenData, REFRESH_TOKEN_KEY, {
			expiresIn: '1d'
		});

		// Return the refresh token
		return refresh;
	}

	verifyAccessToken(token: string): JwtPayload {
		const jwtKey = ACCESS_TOKEN_KEY;

		try {
			return jwt.verify(token, jwtKey) as JwtPayload;
		} catch (error) {
			throw new Error('Invalid token');
		}
	}

	verifyRefreshToken(token: string): JwtPayload {
		const jwtKey = REFRESH_TOKEN_KEY;

		try {
			return jwt.verify(token, jwtKey) as JwtPayload;
		} catch (error) {
			throw new Error('Invalid token');
		}
	}

	decode(token: string) {
		return jwt.decode(token);
	}


}

export default new JwtService();