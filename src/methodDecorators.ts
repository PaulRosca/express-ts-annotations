import { RESTMethod, RouteConfig, Middleware } from "./types.js";
import { kebabize, RouteConfigs } from "./utils.js";

export function route(method?: RESTMethod, path?: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        target[RouteConfigs] = target[RouteConfigs] || new Map<string, RouteConfig>();
        const rgx = /^(get|put|patch|post|delete)(.*)/;
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
            target[RouteConfigs].set(propertyKey, { path: localPath, controller: descriptor.value, method: localMethod });
        }
        else {
            routeConfig.path = localPath;
            routeConfig.controller = descriptor.value;
            routeConfig.method = localMethod;
        }
    };
};

export function middlewares(middlewares: Middleware[]) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        target[RouteConfigs] = target[RouteConfigs] || new Map<string, RouteConfig>();
        const routeConfig = target[RouteConfigs].get(propertyKey);
        if (!routeConfig) {
            target[RouteConfigs].set(propertyKey, { path: "/", middlewares, controller: descriptor.value, method: "get" });
        }
        else {
            routeConfig.middlewares = middlewares;
        }
    };
};
