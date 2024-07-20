import { Request, Response } from "express";

class IndexController {
	async indexPage(request: Request, response: Response) {
		response.status(200).send("My Express + TypeScript Server");
	}
}

export default new IndexController();