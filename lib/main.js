"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const atom_1 = require("atom");
const app_1 = __importDefault(require("./app"));
let app = null;
let subscriptions = null;
module.exports = {
    config: {
        pdsendPath: {
            title: 'Pdsend path',
            description: 'Leave empty to use pdsend from the PATH.',
            type: 'string',
            default: '',
            order: 1,
        },
    },
    activate() {
        require('atom-package-deps')
            .install('pdmsg')
            .then(() => {
            app = new app_1.default();
            subscriptions = new atom_1.CompositeDisposable();
            subscriptions.add(atom.commands.add('atom-workspace', {
                'pdmsg:toggle': () => app.toggle(),
                'pdmsg:evalLine': () => app.evalLine(),
                'pdmsg:evalBlock': () => app.evalBlock(),
            }));
        });
    },
    serialize() {
        return;
    },
    deactivate() {
        app === null || app === void 0 ? void 0 : app.stop();
        subscriptions === null || subscriptions === void 0 ? void 0 : subscriptions.dispose();
        app = null;
        subscriptions = null;
    },
};
//# sourceMappingURL=main.js.map