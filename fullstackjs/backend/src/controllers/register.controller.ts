import registerService, { IRegisterData } from '@/services/registerService'
import express, { Request, Response } from 'express'

class RegisterController {
	async register(request: Request, response: Response) {
		try {
			response.status(200).json(await registerService.register(request.body as IRegisterData))
		} catch (error: any) {
			response.status(400).send((error as Error).message)

		}
	}

	async verify(request: Request, response: Response) {
		const token = request.query.token as string;

		if (await registerService.verifyUser(token)) {
			response.status(200).json({ message: 'User verified successfully' });
		} else {
			response.status(400).json({ message: 'Invalid Request: Token is invalid' });
		}
	}
}

export default new RegisterController();