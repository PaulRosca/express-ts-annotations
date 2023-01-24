import { RouteConfigs } from "./utils.js";
export function controller(path = "/") {
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
                for (let rc of constructor.prototype[RouteConfigs].values()) {
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
;
//# sourceMappingURL=classDecorators.js.map