import Logger from './logger';
export default class Pdsend {
    readonly port: number;
    readonly host: string;
    private logger;
    private process;
    constructor(port: number, host: string, logger: Logger | null);
    private killProcess;
    hasProcess(): boolean;
    write(message: string): void;
    close(): void;
}
//# sourceMappingURL=pdsend.d.ts.map