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
    static *nodesByNameGen(node, nodeNames) {
        for (const namedChildNode of node.namedChildren) {
            const nodeName = namedChildNode.type;
            nodeNames.includes(nodeName)
                ? yield namedChildNode
                : yield* this.nodesByNameGen(namedChildNode, nodeNames);
        }
    }
    static getNodesByName(node, nodeNames) {
        return [...Parser.nodesByNameGen(node, nodeNames)];
    }
}
exports.default = Parser;
//# sourceMappingURL=parser.js.map