"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tree_sitter_1 = __importDefault(require("tree-sitter"));
class Parser extends tree_sitter_1.default {
    constructor() {
        super();
    }
    static *getNodesByName(node, nodeNames) {
        for (const namedChildNode of node.namedChildren) {
            const nodeName = namedChildNode.type;
            nodeNames.includes(nodeName)
                ? yield namedChildNode
                : yield* this.getNodesByName(namedChildNode, nodeNames);
        }
    }
    static getStatements(node) {
        const statements = [];
        for (const namedChildNode of node.namedChildren) {
            const name = namedChildNode.type;
            const expression = namedChildNode.text;
            if (name !== 'comment')
                statements.push({ name, expression });
        }
        return statements;
    }
}
exports.default = Parser;
//# sourceMappingURL=parser.js.map