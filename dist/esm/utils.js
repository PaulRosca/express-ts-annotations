export const kebabize = (str) => {
    return [...str].map((letter, idx) => {
        return letter.toUpperCase() === letter
            ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
            : letter;
    }).join('');
};
export const RouteConfigs = Symbol("RouteConfigs");
//# sourceMappingURL=utils.js.map