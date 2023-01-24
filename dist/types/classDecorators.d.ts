export declare function controller(path?: string): <T extends new (...args: any[]) => any>(constructor: T) => {
    new (...args: any[]): {
        [x: string]: any;
        __configure(): void;
    };
} & T;
//# sourceMappingURL=classDecorators.d.ts.map