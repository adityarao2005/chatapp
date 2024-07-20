import express from 'express';
import expressWs from 'express-ws';
import helloWorldSocket from '@/controllers/helloWorld.controller';
import indexController from '@/controllers/index.controller';

const router = express.Router();

router.get('/', indexController.indexPage);
router.get('/hello', indexController.indexPage);
router.ws('/ws', helloWorldSocket.connect);


export default router;