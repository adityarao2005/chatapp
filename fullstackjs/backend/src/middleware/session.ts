import { RedisClient } from '@/config/redis'
import jwtService, { ITokenPayload } from '@/services/jwt.service'
import express, { Request } from 'express'

export interface Session {
	email: string,
	username: string,
	accessToken: string
	refreshToken: string
}

export interface SessionizedRequest extends Request {
	session?: Session
}

export default async function sessionMiddleware(request: SessionizedRequest, response: express.Response, next: express.NextFunction) {
	if (request.headers.authorization) {
		const [bearer, token] = request.headers.authorization.split(' ')
		const refreshToken = request.headers['x-refresh-token'] as string

		const accessTokenPayload = await jwtService.verifyAccessToken(token) as ITokenPayload;
		const blacklistedToken = await RedisClient.get(token)

		if (blacklistedToken === 'true') {
			response.status(401).send('Access Denied')
			return;
		}

		request.session = {
			accessToken: token,
			email: accessTokenPayload.email,
			username: accessTokenPayload.username,
			refreshToken: refreshToken
		}

		next()
	} else {
		response.status(401).send('Access Denied')
		return;
	}
}