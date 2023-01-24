import { RESTMethod, Middleware } from "./types.js";
export declare function route(method?: RESTMethod, path?: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function middlewares(middlewares: Middleware[]): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
//# sourceMappingURL=methodDecorators.d.ts.map