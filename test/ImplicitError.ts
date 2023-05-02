import { NextFunction, Request, Response } from "express";
import { ControllerFunction, controller, route } from "../src"

@controller()
export default class ImplicitErrorHandler {
    private _errorMsg = "Error msg!"
    @route()
    public getErrorMessage(req: Request, res: Response) {
        throw new Error()
    }

    public async errorHandler(fn: ControllerFunction, req: Request, res: Response, next: NextFunction) {
        try {
            await fn(req, res, next);
        } catch(e) {
            return res.status(500).json(this._errorMsg)
        }
    }
}
