import { Request, Response, NextFunction } from "express";

export type RESTMethod = "all" | "get" | "post" | "put" | "patch" | "delete";
export type Middleware = (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
export type RouteConfig = {
    path: string,
    controller: (...params: any) => any,
    middlewares?: Middleware[],
    method: RESTMethod
};
