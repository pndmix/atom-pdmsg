"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const editor_1 = __importDefault(require("./editor"));
class Rampcode {
    constructor() {
        this.state = { isActive: false };
        this.editor = null;
    }
    start() {
        console.log('start pdmsg');
        this.editor = new editor_1.default();
    }
    stop() {
        console.log('stop pdmsg');
        this.editor = null;
    }
    toggle() {
        this.state.isActive ? this.stop() : this.start();
        this.state.isActive = !this.state.isActive;
    }
    evalLine() {
        return console.log(this.editor.getLineOfText());
    }
    evalBlock() {
        return console.log(this.editor.getBlockOfText());
    }
}
exports.default = Rampcode;
//# sourceMappingURL=rampcode.js.map