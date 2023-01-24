"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewares = exports.route = void 0;
const utils_js_1 = require("./utils.js");
const __decoratorSetup = (target, propertyKey, descriptor, method, path, middlewares) => {
    target[utils_js_1.RouteConfigs] = target[utils_js_1.RouteConfigs] || new Map();
    const rgx = /^(get|put|patch|post|delete|all)(.*)/;
    const match = propertyKey.match(rgx);
    let localMethod = method;
    let localPath = path;
    if (match) {
        if (!localMethod) {
            localMethod = match[1];
        }
        if (!localPath) {
            localPath = (0, utils_js_1.kebabize)(match[2]);
        }
    }
    else if (!localPath) {
        localPath = (0, utils_js_1.kebabize)(propertyKey);
    }
    if (!localPath.startsWith("/")) {
        localPath = "/" + localPath;
    }
    const routeConfig = target[utils_js_1.RouteConfigs].get(propertyKey);
    if (!routeConfig) {
        target[utils_js_1.RouteConfigs].set(propertyKey, { path: localPath, controller: descriptor.value, method: localMethod, middlewares });
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
function route(method, path) {
    return function (target, propertyKey, descriptor) {
        __decoratorSetup(target, propertyKey, descriptor, method, path);
    };
}
exports.route = route;
;
function middlewares(middlewares) {
    return function (target, propertyKey, descriptor) {
        __decoratorSetup(target, propertyKey, descriptor, undefined, undefined, middlewares);
    };
}
exports.middlewares = middlewares;
;
//# sourceMappingURL=methodDecorators.js.map