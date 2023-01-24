"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const utils_js_1 = require("./utils.js");
function controller(path = "/") {
    let localPath = path;
    if (!localPath.startsWith("/")) {
        localPath = "/" + localPath;
    }
    return function (constructor) {
        return class extends constructor {
            constructor(...args) {
                super(...args);
                this.path = localPath;
                this.__configure();
            }
            ;
            __configure() {
                for (let rc of constructor.prototype[utils_js_1.RouteConfigs].values()) {
                    let config = rc;
                    if (config.middlewares) {
                        this.__router[config.method](config.path, ...config.middlewares, config.controller);
                    }
                    else {
                        this.__router[config.method](config.path, config.controller);
                    }
                }
            }
            ;
        };
    };
}
exports.controller = controller;
;
//# sourceMappingURL=classDecorators.js.map