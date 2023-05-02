import { RESTMethod, RouteConfig, Middleware } from "./types";
import { ErrorHandler, kebabize, RouteConfigs } from "./utils";

function __decoratorSetup(originalMethod: any, context: ClassMethodDecoratorContext, method?: RESTMethod, path?: string, middlewares?: Middleware[]) {
    if (context.kind === "method") {
        context.addInitializer(function () {
            (this as any)[RouteConfigs] = (this as any)[RouteConfigs] || new Map<string, RouteConfig>();
            const rgx = /^(get|put|patch|post|delete|all)(.*)/i;
            const match = (context.name as string).match(rgx);
            let localMethod = method;
            let localPath = path;
            if(!localMethod && match) {
                localMethod = match[1] as RESTMethod
            }
            if(!localPath) {
                if(!match || !match[2] || method) {
                    localPath = kebabize(context.name as string)
                }
                else {
                    localPath = kebabize(match[2])
                }
            }
            if (!localPath.startsWith("/")) {
                localPath = "/" + localPath;
            }
            const routeConfig = (this as any)[RouteConfigs].get(context.name);
            if (!routeConfig) {
                (this as any)[RouteConfigs].set(context.name, { path: localPath, controller: originalMethod.bind(this), method: localMethod, middlewares });
            }
            else {
                if (middlewares && middlewares.length) {
                    routeConfig.middlewares = middlewares;
                }
                else {
                    routeConfig.path = localPath;
                    routeConfig.controller = originalMethod.bind(this);
                    routeConfig.method = localMethod;
                }
            }
            originalMethod.bind(this);
        })
        return originalMethod;
    }
}

export function route(method?: RESTMethod, path?: string) {
    return function decorator(originalMethod: any, context: ClassMethodDecoratorContext) {
        return __decoratorSetup(originalMethod, context, method, path)
    }
}

export function middlewares(middlewares: Middleware[]) {
    return function decorator(originalMethod: any, context: ClassMethodDecoratorContext) {
        return __decoratorSetup(originalMethod, context, undefined, undefined, middlewares)
    }
}

export function errorHandler(originalMethod: any, context: ClassMethodDecoratorContext) {
    if(context.kind === "method") {
        context.addInitializer(function() {
            (this as any)[ErrorHandler] = (this as any)[ErrorHandler] || originalMethod.bind(this)
        })
    }
}
