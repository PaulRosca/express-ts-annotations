import { NextFunction, Request, Response } from "express";
import { controller, middlewares, route } from "../src"

function mid1(req: Request, res: Response, next: NextFunction) {
    console.log("Middleware 1 called");
    next();
}

function mid2(req: Request, res: Response, next: NextFunction) {
    console.log("Middleware 2 called");
    next();
}

@controller()
export default class Middlewares {
    @middlewares([mid1, mid2])
    public getBothMidds(req: Request, res: Response) {
        return res.status(200).json("Mid1-Mid2")
    }

    @route("get", "mid2")
    @middlewares([mid2])
    public someMethod(req: Request, res: Response) {
        return res.status(200).json("Mid2")
    }
}
