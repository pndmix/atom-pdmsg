"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const editor_1 = __importDefault(require("./editor"));
const repl_1 = __importDefault(require("./repl"));
class Rampcode {
    constructor() {
        this.state = { isActive: false };
        this.editor = null;
        this.repl = null;
    }
    start() {
        this.editor = new editor_1.default();
        this.repl = new repl_1.default();
        atom.notifications.addSuccess('pdmsg has started.');
    }
    stop() {
        var _a;
        this.editor = null;
        (_a = this.repl) === null || _a === void 0 ? void 0 : _a.close();
        this.repl = null;
        atom.notifications.addSuccess('pdmsg has stopped.');
    }
    toggle() {
        this.state.isActive ? this.stop() : this.start();
        this.state.isActive = !this.state.isActive;
    }
    evalLine() {
        var _a, _b;
        const message = ((_a = this.editor) === null || _a === void 0 ? void 0 : _a.getLineOfText()) || '';
        (_b = this.repl) === null || _b === void 0 ? void 0 : _b.eval(message);
    }
    evalBlock() {
        var _a, _b;
        const message = ((_a = this.editor) === null || _a === void 0 ? void 0 : _a.getBlockOfText()) || '';
        (_b = this.repl) === null || _b === void 0 ? void 0 : _b.eval(message);
    }
}
exports.default = Rampcode;
//# sourceMappingURL=rampcode.js.map