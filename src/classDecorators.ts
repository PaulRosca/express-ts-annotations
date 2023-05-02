import { NextFunction, Request, Response, Router } from "express";
import { Constructable, ControllerFunction, RouteConfig } from "./types";
import { ErrorHandler, RouteConfigs, kebabize } from "./utils";

export function controller<T extends Constructable>(path?: string) {
    return function decorator(originalClass: T, context: ClassDecoratorContext) {
        let localPath = path || kebabize(context.name);
        if (!localPath.startsWith("/")) {
            localPath = "/" + localPath;
        }
        if (context.kind === "class") {
            return class extends originalClass {
                private __router = Router();
                private __path = localPath;
                constructor(...args: any[]) {
                    super(args);
                    this.__configure();
                }
                get path() {
                    return this.__path;
                }
                get router() {
                    return this.__router;
                }
                private __configure() {
                    if(!(this as any)[RouteConfigs]) return;
                    for (const rc of (this as any)[RouteConfigs].values()) {
                        const config = rc as RouteConfig;
                        let controller = config.controller;
                        const errorHandler = (this as any)[ErrorHandler]?.bind(this) || this["errorHandler"]?.bind(this)
                        if(errorHandler) {
                            controller = async function(req: Request, res: Response, next: NextFunction) {
                                return await errorHandler(config.controller, req, res, next);
                            } as ControllerFunction
                        }
                        if (config.middlewares) {
                            this.__router[config.method](config.path, ...config.middlewares, controller);
                        }
                        else {
                            this.__router[config.method](config.path, controller);
                        }
                    }
                }
            }
        }
    }
}
