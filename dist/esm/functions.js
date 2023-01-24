export const injectControllers = (app, controllers) => {
    controllers.forEach((c) => {
        app.use(c.path, c.router);
    });
};
//# sourceMappingURL=functions.js.map