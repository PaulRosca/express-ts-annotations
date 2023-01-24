import { BaseController } from "./classes.js";
import { Express } from "express";

export const injectControllers = (app: Express, controllers: BaseController[]): void => {
    controllers.forEach((c)=>{
        app.use(c.path, c.router);
    })
};
