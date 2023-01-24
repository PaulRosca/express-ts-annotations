import { kebabize, RouteConfigs } from "./utils.js";
const __decoratorSetup = (target, propertyKey, descriptor, method, path, middlewares) => {
    target[RouteConfigs] = target[RouteConfigs] || new Map();
    const rgx = /^(get|put|patch|post|delete|all)(.*)/;
    const match = propertyKey.match(rgx);
    let localMethod = method;
    let localPath = path;
    if (match) {
        if (!localMethod) {
            localMethod = match[1];
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
export function route(method, path) {
    return function (target, propertyKey, descriptor) {
        __decoratorSetup(target, propertyKey, descriptor, method, path);
    };
}
;
export function middlewares(middlewares) {
    return function (target, propertyKey, descriptor) {
        __decoratorSetup(target, propertyKey, descriptor, undefined, undefined, middlewares);
    };
}
;
//# sourceMappingURL=methodDecorators.js.map