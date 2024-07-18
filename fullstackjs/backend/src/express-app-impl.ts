import { Request, Response } from "express";
import { Application, Route, Controller, WebSocket, WebSocketPeer } from "@/express-app";
import { setInterval } from "timers";
import { RegisterRoute } from "@/routes/register";
import { UserRoute } from "@/routes/users";
import { register } from "module";
export { Application };

class IndexController extends Controller {

	public async get(request: Request, response: Response) {
		response.status(200).send("My Express + TypeScript Server");
	}
}


class MyHelloWorldSocket extends WebSocket {
	id: NodeJS.Timeout | null = null;

	public async onconnect(ws: WebSocketPeer, req: Request) {
		console.log("WebSocket was connected");
		this.id = setInterval(() => {
			ws.send("Hello, World!");
		}, 1000);
	}

	public async onclose(ws: WebSocketPeer) {
		console.log("WebSocket was closed");
		clearInterval(this.id!);
	}
}

class MainRouter extends Route {
	constructor() {
		super("/api");
		this.addController(new IndexController(), ["/", "/hello"]);
		var new_router = new Route("/v1");
		new_router.addWebSocket(new MyHelloWorldSocket(), ["/ws"]);
		this.addRoute(new_router);
		var register_route = new RegisterRoute();
		var user_route = new UserRoute();
		this.addRoute(register_route);
		this.addRoute(user_route);
	}

}

export class ExpressApplication extends Application {
	constructor() {
		super();
		this.setStaticPath("public");
		this.setMainRouter(new MainRouter());
	}

}
