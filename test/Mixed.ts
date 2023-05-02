import { Request, Response } from "express";
import { controller, route } from "../src";

@controller("mixed")
export default class MixedController {
    @route("get")
    public getter(_: Request, res: Response) {
        return res.status(200).json("Some response")
    }
}
