import express from 'express';
import registerController from '@/controllers/register.controller';
import loginController from '@/controllers/login.controller';

const router = express.Router();

router.post('/register', registerController.register);
router.get('/verify', registerController.verify);
router.post('/login', loginController.login);
router.post('/logout', loginController.logout);
router.post('/refresh', loginController.refresh);

export default router;