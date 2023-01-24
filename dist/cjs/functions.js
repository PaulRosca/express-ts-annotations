"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectControllers = void 0;
const injectControllers = (app, controllers) => {
    controllers.forEach((c) => {
        app.use(c.path, c.router);
    });
};
exports.injectControllers = injectControllers;
//# sourceMappingURL=functions.js.map