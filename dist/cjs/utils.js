"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteConfigs = exports.kebabize = void 0;
const kebabize = (str) => {
    return [...str].map((letter, idx) => {
        return letter.toUpperCase() === letter
            ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
            : letter;
    }).join('');
};
exports.kebabize = kebabize;
exports.RouteConfigs = Symbol("RouteConfigs");
//# sourceMappingURL=utils.js.map