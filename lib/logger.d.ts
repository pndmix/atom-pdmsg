import { PlainMessageOptions } from 'atom-message-panel';
export default class Logger {
    private panel;
    constructor(title?: string);
    log(options: PlainMessageOptions): void;
    success(message: string): void;
    info(message: string): void;
    error(message: string): void;
    warning(message: string): void;
    close(): void;
}
//# sourceMappingURL=logger.d.ts.map