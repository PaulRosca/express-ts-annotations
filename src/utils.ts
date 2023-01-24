export const kebabize = (str: string) => {
    return [...str].map((letter, idx) => {
        return letter.toUpperCase() === letter
            ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
            : letter;
    }).join('');
};

export const RouteConfigs = Symbol("RouteConfigs");
