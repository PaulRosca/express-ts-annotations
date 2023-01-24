"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const express_1 = require("express");
class BaseController {
    __router = (0, express_1.Router)();
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
exports.BaseController = BaseController;
;
//# sourceMappingURL=classes.js.map