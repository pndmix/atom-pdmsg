"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atom_message_panel_1 = require("atom-message-panel");
class Logger {
    constructor(title) {
        this.panel = new atom_message_panel_1.MessagePanelView({ title });
        this.panel.attach();
        this.panel.toggle();
    }
    log(options) {
        var _a, _b;
        (_a = this.panel) === null || _a === void 0 ? void 0 : _a.clear();
        (_b = this.panel) === null || _b === void 0 ? void 0 : _b.add(new atom_message_panel_1.PlainMessageView(options));
    }
    success(message) {
        const className = 'message-success-pdmsg';
        this.log({ message, className });
    }
    info(message) {
        const className = 'message-info-pdmsg';
        this.log({ message, className });
    }
    error(message) {
        const className = 'message-error-pdmsg';
        this.log({ message, className });
    }
    warning(message) {
        const className = 'message-warning-pdmsg';
        this.log({ message, className });
    }
    close() {
        var _a;
        (_a = this.panel) === null || _a === void 0 ? void 0 : _a.close();
        this.panel = null;
    }
}
exports.default = Logger;
//# sourceMappingURL=logger.js.map