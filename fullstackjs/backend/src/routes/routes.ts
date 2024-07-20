import express, { Router } from 'express';
import helloWorldRouter from '@/routes/helloWorld.route';
import authRouter from '@/routes/auth.route';

const router = Router();

router.use('/api/v1', helloWorldRouter)
router.use('/api/v2', authRouter)

export default router;