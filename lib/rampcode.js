"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const editor_1 = __importDefault(require("./editor"));
const parser_1 = __importDefault(require("./parser"));
const logger_1 = __importDefault(require("./logger"));
const pdsend_1 = __importDefault(require("./pdsend"));
class Rampcode {
    constructor() {
        this.state = { isActive: false };
        this.logger = null;
        this.parser = null;
        this.pdsends = null;
    }
    start() {
        this.logger = new logger_1.default();
        this.parser = new parser_1.default();
        this.parser.setLanguage(require('tree-sitter-rampcode'));
        this.pdsends = new Map();
    }
    stop() {
        var _a, _b, _c;
        (_a = this.logger) === null || _a === void 0 ? void 0 : _a.close();
        this.logger = null;
        this.parser = null;
        (_b = this.pdsends) === null || _b === void 0 ? void 0 : _b.forEach((pdsend) => pdsend.kill());
        (_c = this.pdsends) === null || _c === void 0 ? void 0 : _c.clear();
        this.pdsends = null;
    }
    toggle() {
        this.state.isActive ? this.stop() : this.start();
        this.state.isActive = !this.state.isActive;
    }
    getPdsendConnection(name) {
        const pdsend = this.pdsends.get(name);
        if (pdsend === null || pdsend === void 0 ? void 0 : pdsend.hasProcess())
            return pdsend;
        this.pdsends.delete(name);
        return;
    }
    eval(message) {
        if (!this.state.isActive)
            return;
        let pdsend = this.getPdsendConnection('8080');
        if (!pdsend) {
            pdsend = new pdsend_1.default();
            this.pdsends.set(pdsend.name, pdsend);
        }
        pdsend.write(message);
    }
    evalLine() {
        return this.eval(editor_1.default.getLineOfText());
    }
    evalBlock() {
        return this.eval(editor_1.default.getBlockOfText());
    }
}
exports.default = Rampcode;
//# sourceMappingURL=rampcode.js.map