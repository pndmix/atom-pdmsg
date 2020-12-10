"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const atom_1 = require("atom");
const rampcode_1 = __importDefault(require("./rampcode"));
let rampcode = null;
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
        port: {
            title: 'Port number',
            description: '',
            type: 'integer',
            default: 8080,
            order: 2,
        },
    },
    activate() {
        rampcode = new rampcode_1.default();
        subscriptions = new atom_1.CompositeDisposable();
        subscriptions.add(atom.commands.add('atom-workspace', {
            'atom-rampcode:toggle': () => rampcode.toggle(),
            'atom-rampcode:evalLine': () => rampcode.evalLine(),
            'atom-rampcode:evalBlock': () => rampcode.evalBlock(),
        }));
    },
    serialize() {
        return;
    },
    deactivate() {
        rampcode === null || rampcode === void 0 ? void 0 : rampcode.stop();
        subscriptions === null || subscriptions === void 0 ? void 0 : subscriptions.dispose();
        rampcode = null;
        subscriptions = null;
    },
};
//# sourceMappingURL=main.js.map