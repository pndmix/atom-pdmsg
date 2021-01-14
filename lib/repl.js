"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
const parser_1 = __importDefault(require("./parser"));
const pdsend_1 = __importDefault(require("./pdsend"));
const error_1 = require("./error");
const DEFAULT_MESSAGE = {
    port: 3001,
    host: 'localhost',
    expressions: [],
};
const ESCAPED_RULES = [
    { search: /\s/g, value: '' },
    { search: /\\,|,/g, value: '\\,' },
    { search: /\\;|;/g, value: ' \\;' },
];
class Repl {
    constructor() {
        this.logger = null;
        this.parser = null;
        this.pdsends = null;
        this.logger = new logger_1.default();
        this.parser = new parser_1.default();
        this.parser.setLanguage(require('tree-sitter-pdmsg'));
        this.pdsends = new Map();
    }
    getStatementNodes(message) {
        const tree = this.parser.parse(message);
        if (tree.rootNode.hasError()) {
            const errorNodes = parser_1.default.getNodesByName(tree.rootNode, ['ERROR']);
            const token = errorNodes.length === 0 ? '' : errorNodes[0].text;
            throw new error_1.ParseError(`syntax error near unexpected token "${token}"`);
        }
        const nodes = [];
        for (const namedChildNode of tree.rootNode.namedChildren) {
            if (namedChildNode.type !== 'comment')
                nodes.push(namedChildNode);
        }
        return nodes;
    }
    parseConnect(node) {
        const [port, host] = parser_1.default.getNodesByName(node, ['port', 'host']).map((v) => v.text);
        return [Number(port), host];
    }
    parseMessage(node) {
        return parser_1.default.getNodesByName(node, ['expression']).map((v) => v.text);
    }
    parseSyntax(node) {
        const pdMessage = Object.assign({}, DEFAULT_MESSAGE);
        pdMessage.expressions = [];
        for (const namedChildNode of node.namedChildren) {
            switch (namedChildNode.type) {
                case 'connect':
                    const [port, host] = this.parseConnect(namedChildNode);
                    pdMessage.port = port;
                    if (typeof host !== 'undefined')
                        pdMessage.host = host;
                    break;
                case 'message':
                    const expressions = this.parseMessage(namedChildNode);
                    pdMessage.expressions.push(expressions);
                    break;
                default:
                    break;
            }
        }
        return pdMessage;
    }
    getPdsend(port, host) {
        const name = `${host}:${port}`;
        let pdsend = this.pdsends.get(name);
        if (typeof pdsend !== 'undefined' && pdsend.hasProcess())
            return pdsend;
        pdsend = new pdsend_1.default(port, host, this.logger);
        if (this.pdsends.has(name))
            this.pdsends.delete(name);
        this.pdsends.set(name, pdsend);
        return pdsend;
    }
    convertExpressions(expressions) {
        const escapeExpression = (expr) => {
            ESCAPED_RULES.forEach((rule) => (expr = expr.replace(rule.search, rule.value)));
            return expr;
        };
        const messages = expressions.map((expression) => {
            return expression
                .map((elm) => {
                const found = elm.match(/^"(?<expr>.+)"$/) || elm.match(/^'(?<expr>.+)'$/);
                return found === null ? escapeExpression(elm) : found.groups['expr'];
            })
                .join(' ');
        });
        return messages.join(';') + ';';
    }
    eval(message) {
        var _a;
        try {
            const pdMessages = this.getStatementNodes(message).map((node) => this.parseSyntax(node));
            for (const pdMessage of pdMessages) {
                const { port, host, expressions } = pdMessage;
                const pdsend = this.getPdsend(port, host);
                const message = this.convertExpressions(expressions);
                pdsend.write(message);
            }
            this.pdsends.forEach((pdsend, name) => {
                if (!pdsend.hasProcess())
                    this.pdsends.delete(name);
            });
        }
        catch (e) {
            if (e instanceof error_1.ParseError) {
                console.error(e);
                (_a = this.logger) === null || _a === void 0 ? void 0 : _a.error(e.message);
            }
            else {
                throw e;
            }
        }
    }
    close() {
        var _a, _b, _c;
        (_a = this.logger) === null || _a === void 0 ? void 0 : _a.close();
        this.logger = null;
        this.parser = null;
        (_b = this.pdsends) === null || _b === void 0 ? void 0 : _b.forEach((pdsend) => pdsend.close());
        (_c = this.pdsends) === null || _c === void 0 ? void 0 : _c.clear();
        this.pdsends = null;
    }
}
exports.default = Repl;
//# sourceMappingURL=repl.js.map