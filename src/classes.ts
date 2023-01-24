import { Router } from "express";

export abstract class BaseController {
    private __router = Router();
    private __path: string = "/";

    set path(path: string) {
        this.__path = path;
    }
    get path(): string {
        return this.__path;
    }

    get router() {
        return this.__router;
    };

};
