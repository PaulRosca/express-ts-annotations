import { Router } from "express";
export class BaseController {
    __router = Router();
    __path = "/";
    set path(path) {
        this.__path = path;
    }
    get path() {
        return this.__path;
    }
    get router() {
        return this.__router;
    }
    ;
}
;
//# sourceMappingURL=classes.js.map