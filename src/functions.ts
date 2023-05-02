import { Express } from "express";

export const injectControllers = (app: Express, controllers: any[]): void => {
    controllers.forEach((c)=>{
        app.use(c.path, c.router);
    })
};
