import { SessionizedRequest } from '@/middleware/session';
import loginService from '@/services/login.service';
import express, { Request, Response } from 'express'

class LoginController {
    async login(request: Request, response: Response) {
        try {
            response.status(200).json(await loginService.login(request.body));
        } catch (err) {
            response.status(400).send((err as Error).message);
        }
    }

    async logout(request: Request, response: Response) {
        try {
            await loginService.logout(request.body);
            response.status(200).send('Logged out');
        } catch (err) {
            response.status(400).send((err as Error).message);
        }
    }

    async refresh(request: Request, response: Response) {
        try {
            const accessToken = request.headers.authorization?.split(' ')[1] as string;
            const refreshToken = request.headers['x-refresh-token'] as string;
            response.status(200).json(await loginService.refresh({ accessToken: accessToken, refreshToken: refreshToken }));
        } catch (err) {
            response.status(400).send((err as Error).message);
        }
    }

}

export default new LoginController();