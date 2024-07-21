import express from 'express';
import expressWs from 'express-ws';
import helloWorldSocket from '@/controllers/helloWorld.controller';
import indexController from '@/controllers/index.controller';
import { wsendpoint } from '@/utils/websocketEndpoint';

const router = express.Router();

router.get('/', indexController.indexPage);
router.get('/hello', indexController.indexPage);
router.ws('/ws', async (ws, req) => wsendpoint(helloWorldSocket, ws, req));


export default router;