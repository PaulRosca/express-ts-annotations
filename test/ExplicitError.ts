import { NextFunction, Request, Response } from "express";
import { ControllerFunction, controller, errorHandler, route } from "../src";

@controller("errors")
export default class ErrorHandler {
    @route("get", "message")
    public errorThrower(req: Request, res: Response) {
        throw new Error("Bad credentials for access!")
    }

    @errorHandler
    public async handler(fn: ControllerFunction, req: Request, res: Response, next: NextFunction) {
        try {
            await fn(req, res, next);
        } catch(e) {
            if((e as Error).message.includes("Bad credentials")) {
                return res.status(401).json("Unauthorized!")
            }
            else {
                return res.status(500).json("Server error!")
            }
        }
    }
}
