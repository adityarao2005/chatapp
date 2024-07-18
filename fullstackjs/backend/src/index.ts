/*import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
    res.send("My Express + TypeScript Server");
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
*/

import '@/db/db'
import { ExpressApplication, Application } from "@/express-app-impl";


const port = process.env.PORT || 3000;

Application.run(ExpressApplication, port);
