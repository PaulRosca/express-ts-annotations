import { Request, Response } from "express"
import { controller, route } from "../src"
@controller()
export default class Greeting {
    private _greet = 'Hi!'

    @route()
    public getGreet(_: Request, res: Response) {
        return res.status(200).json(this._greet)
    }

    @route()
    public postGreet(req: Request, res: Response) {
        this._greet = req.body.msg
        return res.status(200).json(`Changed greet message to ${JSON.stringify(this._greet)}!`)
    }
}
