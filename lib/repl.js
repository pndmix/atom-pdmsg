"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
const parser_1 = __importDefault(require("./parser"));
const DEFAULT_MESSAGE = {
    port: 8080,
    host: 'localhost',
    expressions: [],
};
class Repl {
    constructor() {
        this.logger = null;
        this.parser = null;
        this.logger = new logger_1.default();
        this.parser = new parser_1.default();
        this.parser.setLanguage(require('tree-sitter-pdmsg'));
    }
    getStatementNodes(message) {
        const tree = this.parser.parse(message);
        const nodes = [];
        for (const namedChildNode of tree.rootNode.namedChildren) {
            if (namedChildNode.type !== 'comment')
                nodes.push(namedChildNode);
        }
        return nodes;
    }
    parseStatementNode(node) {
        const pdMessage = Object.assign({}, DEFAULT_MESSAGE);
        pdMessage.expressions = [];
        const parseConnect = (node) => {
            const [port, host] = parser_1.default.getNodesByName(node, ['port', 'host']).map((v) => v.text);
            return [Number(port), host];
        };
        const parseMessage = (node) => {
            return parser_1.default.getNodesByName(node, ['expression']).map((v) => v.text);
        };
        for (const namedChildNode of node.namedChildren) {
            switch (namedChildNode.type) {
                case 'connect':
                    const [port, host] = parseConnect(namedChildNode);
                    pdMessage.port = port;
                    if (typeof host !== 'undefined')
                        pdMessage.host = host;
                    break;
                case 'message':
                    const expressions = parseMessage(namedChildNode);
                    pdMessage.expressions.push(expressions);
                    break;
                default:
                    break;
            }
        }
        return pdMessage;
    }
    eval(message) {
        var _a;
        const statements = this.getStatementNodes(message);
        for (const statement of statements) {
            const pdMessage = this.parseStatementNode(statement);
            console.log(pdMessage);
        }
        (_a = this.logger) === null || _a === void 0 ? void 0 : _a.success(message);
    }
    close() {
        var _a;
        (_a = this.logger) === null || _a === void 0 ? void 0 : _a.close();
        this.logger = null;
        this.parser = null;
    }
}
exports.default = Repl;
//# sourceMappingURL=repl.js.map