import { Request, Response } from "express";
import { controller, route } from "../src";

@controller("/myRoute")
export default class CustomController {
    @route("get", "/helloWorld")
    public helloMethod(_: Request, res: Response) {
        return res.status(200).json("Hello world!")
    }

    @route("post", "/ping")
    public ping(req: Request, res: Response) {
        return res.status(200).json(req.body)
    }
}
