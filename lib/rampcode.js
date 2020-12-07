"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const editor_1 = __importDefault(require("./editor"));
const logger_1 = __importDefault(require("./logger"));
class Rampcode {
    constructor() {
        this.state = { isActive: false };
        this.editor = null;
        this.logger = null;
    }
    start() {
        console.log('start pdmsg');
        this.editor = new editor_1.default();
        this.logger = new logger_1.default();
    }
    stop() {
        var _a;
        console.log('stop pdmsg');
        this.editor = null;
        (_a = this.logger) === null || _a === void 0 ? void 0 : _a.close();
        this.logger = null;
    }
    toggle() {
        this.state.isActive ? this.stop() : this.start();
        this.state.isActive = !this.state.isActive;
    }
    evalLine() {
        var _a, _b;
        const message = ((_a = this.editor) === null || _a === void 0 ? void 0 : _a.getLineOfText()) || '';
        console.log(message);
        (_b = this.logger) === null || _b === void 0 ? void 0 : _b.success(message);
    }
    evalBlock() {
        var _a, _b;
        const message = ((_a = this.editor) === null || _a === void 0 ? void 0 : _a.getBlockOfText()) || '';
        console.log(message);
        (_b = this.logger) === null || _b === void 0 ? void 0 : _b.success(message);
    }
}
exports.default = Rampcode;
//# sourceMappingURL=rampcode.js.map