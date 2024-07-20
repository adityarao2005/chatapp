import { Request } from 'express';
import { WebSocket, MessageEvent, ErrorEvent } from 'ws';
import { WebSocketEndpoint } from '@/utils/websocketEndpoint';
import { clearInterval, setInterval } from 'timers';

class HelloWorldSocket extends WebSocketEndpoint {
    ids: Map<WebSocket, NodeJS.Timeout> = new Map();

    async onconnect(ws: WebSocket, req: Request) {
        console.log("WebSocket was connected");
        this.ids.set(ws, setInterval(() => {
            ws.send("Hello, World!");
        }, 1000));
    }

    async onclose(ws: WebSocket) {
        console.log("WebSocket was closed");
        clearInterval(this.ids.get(ws)!);
        this.ids.delete(ws);
    }

    async onerror(ws: WebSocket, error: ErrorEvent) {
        console.error(error.message);
    }
}

export default new HelloWorldSocket();