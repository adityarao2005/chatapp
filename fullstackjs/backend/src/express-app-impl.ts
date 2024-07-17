import { Request, Response } from "express";
import { Application, Route, Controller, WebSocket, WebSocketPeer } from "@/express-app";
import { setInterval } from "timers";
export { Application };

class IndexController extends Controller {

	public get(request: Request, response: Response): void {
		response.status(200).send("My Express + TypeScript Server");
	}
}


class MyHelloWorldSocket extends WebSocket {
	id: NodeJS.Timeout | null = null;

	public onconnect(ws: WebSocketPeer, req: Request): void {
		console.log("WebSocket was connected");
		this.id = setInterval(() => {
			ws.send("Hello, World!");
		}, 1000);
	}

	public onclose(ws: WebSocketPeer): void {
		console.log("WebSocket was closed");
		clearInterval(this.id!);
	}
}

class MainRouter extends Route {
	constructor() {
		super("/api");
		this.addController(new IndexController(), ["/"]);
		var new_router = new Route("/v1");
		new_router.addWebSocket(new MyHelloWorldSocket(), ["/ws"]);
		this.addRoute(new_router);
	}

}

export class ExpressApplication extends Application {
	constructor() {
		super();
		this.setStaticPath("public");
		this.setMainRouter(new MainRouter());
	}

}
