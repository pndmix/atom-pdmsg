"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atom_message_panel_1 = require("atom-message-panel");
class Logger {
    constructor(title) {
        this.panel = new atom_message_panel_1.MessagePanelView({ title });
        this.panel.attach();
        this.panel.toggleAutoScroll();
    }
    log(options) {
        if (this.panel === null)
            return;
        this.panel.add(new atom_message_panel_1.PlainMessageView(options));
        this.panel.updateScroll();
    }
    success(message) {
        const className = 'message-success-rampcode';
        this.log({ message, className });
    }
    info(message) {
        const className = 'message-info-rampcode';
        this.log({ message, className });
    }
    error(message) {
        const className = 'message-error-rampcode';
        this.log({ message, className });
    }
    warning(message) {
        const className = 'message-warning-rampcode';
        this.log({ message, className });
    }
    close() {
        if (this.panel !== null) {
            this.panel.close();
            this.panel = null;
        }
    }
}
exports.default = Logger;
//# sourceMappingURL=logger.js.map