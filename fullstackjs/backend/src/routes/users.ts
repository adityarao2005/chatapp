import { User, Profile, Auth } from "@/db/db";
import { Request, Response } from "express";
import { Route, Controller, WebSocket, WebSocketPeer } from "@/express-app";

class ViewUserController extends Controller {
    async get(req: Request, res: Response) {
        var user = await User.findById(req.params.id);
        if (user) {
            var profile = await Profile.findById(user.profile_id);
            if (profile) {
                res.json({
                    user: user,
                    profile: profile
                });
            }
        }

        res.status(404).send("User not found");
    }
}

class ViewAllUsersController extends Controller {
    async get(req: Request, res: Response) {
        var users = await User.find({});
        res.json(users);
    }
}

export class UserRoute extends Route {
    constructor() {
        super('/user');
        this.addController(new ViewUserController(), ['/:id']);
        this.addController(new ViewAllUsersController(), ['/']);
    }
}