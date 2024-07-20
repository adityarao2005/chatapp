import express from 'express';
import registerController from '@/controllers/register.controller';

const router = express.Router();

router.post('/register', registerController.register);
router.get('/verify', registerController.verify);

export default router;