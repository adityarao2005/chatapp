import express, { Request, Response, NextFunction } from "express";
import expressWebSocketPeer, { Router } from "express-ws";
import { WebSocket as WebSocketPeer, MessageEvent, ErrorEvent } from "ws";
export { WebSocketPeer, MessageEvent, ErrorEvent };

// Routable interface.
// This interface is used to define the structure of the classes that will be used to create the routes and APIs
export interface IRoutable {
	router: Router;
}

// Runnable interface.
// Mainly for starting the application in an easy way
export interface Runnable {
	new(): { run(port: number | string): void };
}

// Application class.
export class Application {
	// The express app
	private app: expressWebSocketPeer.Application;

	constructor() {
		// Create the express app with websocket functionality
		this.app = expressWebSocketPeer(express()).app;
		this.app.use(express.json());
	}

	// Set the main router with the route provided
	public setMainRouter(routable: Route) {
		this.app.use(routable.path, routable.router);
	}

	// Run the application on the provided port
	public run(port: number | string) {
		this.app.listen(port, () => {
			console.log(`[server]: Server is running at http://localhost:${port}`);
		});
	}

	// Set the static path for the application
	public setStaticPath(path: string) {
		this.app.use(express.static(path));
	}

	// Run the application with the provided port and application class
	static run<T extends Runnable>(runner: T, port: number | string) {
		const application = new runner();
		application.run(port);
	}
}

// Filter class.
// Filters any request made to the server and can be used to log the request or do any other operation
export class Filter implements IRoutable {
	router: Router;

	constructor() {
		this.router = express.Router();

		this.router.use("/", this.handle);
	}

	public async handle(request: Request, response: Response, next: NextFunction) {
		console.log(`Request made to ${request.url}`);
		next();
	}

}

// Controller class.
// This class is used to define the APIs and the routes for the application
export class Controller implements IRoutable {
	router: Router;

	constructor() {
		this.router = express.Router();

		this.router.get("/", this.get);
		this.router.post("/", this.post);
		this.router.put("/", this.put);
		this.router.delete("/", this.delete);
		this.router.patch("/", this.patch);
		this.router.options("/", this.options);
		this.router.head("/", this.head);
		this.router.connect("/", this.connect);
		this.router.trace("/", this.trace);
	}

	private async handle(request: Request, response: Response) {
		console.log(`Request made to ${request.url}`);
		response.status(404).send(`Cannot ${request.method} request to ${request.path}`);
	}

	public async get(request: Request, response: Response) {
		await this.handle(request, response);
	}

	public async post(request: Request, response: Response) {
		await this.handle(request, response);
	}

	public async put(request: Request, response: Response) {
		await this.handle(request, response);
	}

	public async delete(request: Request, response: Response) {
		await this.handle(request, response);
	}

	public async patch(request: Request, response: Response) {
		await this.handle(request, response);
	}

	public async options(request: Request, response: Response) {
		await this.handle(request, response);
	}

	public async head(request: Request, response: Response) {
		await this.handle(request, response);
	}

	public async connect(request: Request, response: Response) {
		await this.handle(request, response);
	}

	public async trace(request: Request, response: Response) {
		await this.handle(request, response);
	}

}

// WebSocket class.
// This class is used to define the websockets for the application
export class WebSocket implements IRoutable {
	router: Router;

	constructor() {
		this.router = express.Router() as Router;

		this.router.ws("/", async (ws: WebSocketPeer, req) => {
			await this.onconnect(ws, req);
			ws.onmessage = async (message) => this.onmessage(ws, message);
			ws.onclose = async () => this.onclose(ws);
			ws.onerror = async (error) => this.onerror(ws, error);
		});
	}

	public async onconnect(ws: WebSocketPeer, req: Request) {
	}

	public async onmessage(ws: WebSocketPeer, event: MessageEvent) {
	}

	public async onclose(ws: WebSocketPeer) {
	}

	public async onerror(ws: WebSocketPeer, error: ErrorEvent) {
		console.error(error.message);
	}

	public async send(ws: WebSocketPeer, message: string | Buffer) {
		ws.send(message);
	}
}

// Route class.
// This class is used to define the routes for the application and sub routes
export class Route implements IRoutable {
	router: Router;
	path: string;

	constructor(path: string = "/") {
		this.router = express.Router();
		this.path = path;
	}

	public addFilter(filter: Filter, paths: string[]) {
		for (const path of paths) {
			this.router.use(path, filter.router);
		}
	}

	public addController(controller: Controller, paths: string[]) {
		for (const path of paths) {
			this.router.use(path, controller.router);
		}
	}

	public addWebSocket(webSocket: WebSocket, paths: string[]) {
		for (const path of paths) {
			this.router.use(path, webSocket.router);
		}
	}

	public addRoute(route: Route) {
		this.router.use(route.path, route.router);
	}

}