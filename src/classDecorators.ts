import { RouteConfig } from "./types.js";
import { RouteConfigs } from "./utils.js"

export function controller(path: string = "/") {
    return function <T extends new (...args: any[]) => any>(constructor: T) {
        return class extends constructor {

            constructor(...args: any[]) {
                super(...args);
                this.path = path;
                this.__configure();
            };

            __configure() {
                for (let rc of constructor.prototype[RouteConfigs].values()) {
                    let config = rc as RouteConfig;
                    if (config.middlewares) {
                        this.__router[config.method](config.path, ...config.middlewares, config.controller);
                    }
                    else {
                        this.__router[config.method](config.path, config.controller);
                    }
                }
            };
        };
    };
};
