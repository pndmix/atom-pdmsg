"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const DEFAULT_ADDRESS = {
    port: atom.config.get('atom-rampcode.port') || '8080',
};
class Pdsend {
    constructor(address = DEFAULT_ADDRESS, name) {
        this.process = null;
        this.address = Object.assign({}, address);
        this.name = name || address.port;
        this.launchProcess();
    }
    getSpawnOptions() {
        const port = this.address.port;
        const host = this.address.host || 'localhost';
        const protocol = this.address.protocol || 'tcp';
        return [port, host, protocol];
    }
    launchProcess() {
        const pdsend = atom.config.get('atom-rampcode.pdsendPath') || 'pdsend';
        this.process = child_process_1.spawn(pdsend, this.getSpawnOptions());
        this.process.stderr.on('data', (data) => {
            console.log(data);
        });
        this.process.on('close', (code) => {
            if (code !== null) {
                this.process = null;
            }
        });
    }
    hasProcess() {
        return this.process !== null;
    }
    static convertMessage(message) {
        const rules = [
            {
                search: /\/\/.*(\r?\n+)?|\/\*.*\*\//g,
                value: '',
            },
            {
                search: /\s/g,
                value: '',
            },
            {
                search: /\\,|,/g,
                value: '\\,',
            },
            {
                search: /@/g,
                value: ' ',
            },
        ];
        rules.forEach(({ search, value }) => {
            message = message.replace(search, value);
        });
        return message;
    }
    write(message) {
        if (this.process !== null) {
            const newMessage = Pdsend.convertMessage(message);
            console.log(newMessage);
            this.process.stdin.write(newMessage + '\n\n');
        }
    }
    kill() {
        var _a;
        (_a = this.process) === null || _a === void 0 ? void 0 : _a.kill();
        this.process = null;
    }
}
exports.default = Pdsend;
//# sourceMappingURL=pdsend.js.map