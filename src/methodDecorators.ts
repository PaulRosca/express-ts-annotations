import { RESTMethod, RouteConfig, Middleware } from "./types.js";
import { kebabize, RouteConfigs } from "./utils.js";

const __decoratorSetup = (target: any, propertyKey: string, descriptor: PropertyDescriptor, method?: RESTMethod, path?: string, middlewares?: Middleware[]) => {
    target[RouteConfigs] = target[RouteConfigs] || new Map<string, RouteConfig>();
    const rgx = /^(get|put|patch|post|delete|all)(.*)/;
    const match = propertyKey.match(rgx);
    let localMethod = method;
    let localPath = path;
    if (match) {
        if (!localMethod) {
            localMethod = match[1] as RESTMethod;
        }
        if (!localPath) {
            localPath = kebabize(match[2]);
        }
    }
    else if (!localPath) {
        localPath = kebabize(propertyKey);
    }
    if (!localPath.startsWith("/")) {
        localPath = "/" + localPath;
    }
    const routeConfig = target[RouteConfigs].get(propertyKey);
    if (!routeConfig) {
        target[RouteConfigs].set(propertyKey, { path: localPath, controller: descriptor.value, method: localMethod, middlewares });
    }
    else {
        if (middlewares) {
            routeConfig.middlewares = middlewares;
        }
        else {
            routeConfig.path = localPath;
            routeConfig.controller = descriptor.value;
            routeConfig.method = localMethod;
        }
    }
};
export function route(method?: RESTMethod, path?: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        __decoratorSetup(target, propertyKey, descriptor, method, path);
    };
};

export function middlewares(middlewares: Middleware[]) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        __decoratorSetup(target, propertyKey, descriptor, undefined, undefined, middlewares);
    };
};
