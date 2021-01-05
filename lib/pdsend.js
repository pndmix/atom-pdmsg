"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
class Pdsend {
    constructor(port, host, logger) {
        this.logger = null;
        this.process = null;
        const cmd = atom.config.get('atom-rampcode.pdsendPath') || 'pdsend';
        this.port = port;
        this.host = host;
        this.logger = logger;
        this.process = child_process_1.spawn(cmd, [String(this.port), this.host]);
        this.process.stderr.on('data', (data) => {
            var _a;
            (_a = this.logger) === null || _a === void 0 ? void 0 : _a.error(`${data} @${this.host}:${this.port}`);
        });
        this.process.on('close', (code) => {
            if (code !== 0)
                this.killProcess();
        });
    }
    killProcess() {
        var _a;
        (_a = this.process) === null || _a === void 0 ? void 0 : _a.kill();
        this.process = null;
    }
    hasProcess() {
        return this.process !== null;
    }
    write(message) {
        var _a, _b;
        (_a = this.process) === null || _a === void 0 ? void 0 : _a.stdin.write(message + '\n\n');
        (_b = this.logger) === null || _b === void 0 ? void 0 : _b.log({ message });
    }
    close() {
        var _a;
        this.killProcess();
        (_a = this.logger) === null || _a === void 0 ? void 0 : _a.close();
        this.logger = null;
    }
}
exports.default = Pdsend;
//# sourceMappingURL=pdsend.js.map