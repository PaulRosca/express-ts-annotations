import { Request, Response, NextFunction } from "express";

export type RESTMethod = "all" | "get" | "post" | "put" | "patch" | "delete";
export type Middleware = (req: Request, res: Response, next: NextFunction) => void | Promise<void>;
export type ControllerFunction = (req: Request, res: Response, next?: NextFunction) => void | Promise<void>;
export type RouteConfig = {
    path: string,
    controller: ControllerFunction,
    middlewares?: Middleware[],
    method: RESTMethod
};

export interface Constructable {
    new(...args: any[]): any;
}
