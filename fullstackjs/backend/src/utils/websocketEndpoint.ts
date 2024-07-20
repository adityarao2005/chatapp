import { Request } from 'express';
import { WebSocket, MessageEvent, ErrorEvent } from 'ws';

export class WebSocketEndpoint {

	public async onconnect(ws: WebSocket, req: Request) {
	}

	public async onmessage(ws: WebSocket, event: MessageEvent) {
	}

	public async onclose(ws: WebSocket) {
	}

	public async onerror(ws: WebSocket, error: ErrorEvent) {
		console.error(error.message);
	}

	public async connect(ws: WebSocket, req: Request) {
		await this.onconnect(ws, req);
		ws.onmessage = async (message: MessageEvent) => await this.onmessage(ws, message);
		ws.onclose = async () => await this.onclose(ws);
		ws.onerror = async (error: ErrorEvent) => await this.onerror(ws, error);
	}
}