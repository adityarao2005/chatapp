import express from 'express';
import useraccessController from '@/controllers/useraccess.controller';
import sessionMiddleware from '@/middleware/session';

const router = express.Router();

router.get('/users', sessionMiddleware, useraccessController.users);
router.get('/user/:id', sessionMiddleware, useraccessController.user);
router.get('/me', sessionMiddleware, useraccessController.me);
router.get('/group-chats', sessionMiddleware, useraccessController.groupChats);
router.get('/group-chat/:id', sessionMiddleware, useraccessController.groupChat);
router.post('/group-chat', sessionMiddleware, useraccessController.createGroupChat);
//router.post('/group-chat/:id/message', sessionMiddleware, useraccessController.createMessage);
router.post('/group-chat/:id/add-member', sessionMiddleware, useraccessController.addGroupChatMember);
router.delete('/group-chat/:id/remove-member', sessionMiddleware, useraccessController.removeGroupChatMember);
router.delete('/group-chat/:id', sessionMiddleware, useraccessController.deleteGroupChat);

export default router;