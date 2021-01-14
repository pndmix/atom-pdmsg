import Logger from './logger';
import Parser from './parser';
import Pdsend from './pdsend';
import { SyntaxNode } from 'tree-sitter';
import { ParseError } from './error';

type PdMessage = {
  port: number;
  host: string;
  expressions: string[][];
};

const DEFAULT_MESSAGE: PdMessage = {
  port: 3001,
  host: 'localhost',
  expressions: [],
};

const ESCAPED_RULES: { search: RegExp; value: string }[] = [
  { search: /\s/g, value: '' },
  { search: /\\,|,/g, value: '\\,' },
  { search: /\\;|;/g, value: ' \\;' },
];

export default class Repl {
  private logger: Logger | null = null;
  private parser: Parser | null = null;
  private pdsends: Map<string, Pdsend> | null = null;

  constructor() {
    this.logger = new Logger();
    this.parser = new Parser();
    this.parser.setLanguage(require('tree-sitter-pdmsg'));
    this.pdsends = new Map<string, Pdsend>();
  }

  private getStatementNodes(message: string): SyntaxNode[] {
    const tree = this.parser!.parse(message);

    if (tree.rootNode.hasError()) {
      const errorNodes = Parser.getNodesByName(tree.rootNode, ['ERROR']);
      const token = errorNodes.length === 0 ? '' : errorNodes[0].text;
      throw new ParseError(`syntax error near unexpected token "${token}"`);
    }

    const nodes: SyntaxNode[] = [];
    for (const namedChildNode of tree.rootNode.namedChildren) {
      if (namedChildNode.type !== 'comment') nodes.push(namedChildNode);
    }

    return nodes;
  }

  private parseConnect(node: SyntaxNode): [number, string | undefined] {
    const [port, host] = Parser.getNodesByName(node, ['port', 'host']).map((v) => v.text);
    return [Number(port), host];
  }

  private parseMessage(node: SyntaxNode): string[] {
    return Parser.getNodesByName(node, ['expression']).map((v) => v.text);
  }

  private parseSyntax(node: SyntaxNode): PdMessage {
    const pdMessage: PdMessage = { ...DEFAULT_MESSAGE };
    pdMessage.expressions = [];

    for (const namedChildNode of node.namedChildren) {
      switch (namedChildNode.type) {
        case 'connect':
          const [port, host] = this.parseConnect(namedChildNode);
          pdMessage.port = port;
          if (typeof host !== 'undefined') pdMessage.host = host;
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

  private getPdsend(port: number, host: string): Pdsend {
    const name = `${host}:${port}`;
    let pdsend = this.pdsends!.get(name);

    if (typeof pdsend !== 'undefined' && pdsend.hasProcess()) return pdsend;

    pdsend = new Pdsend(port, host, this.logger);
    if (this.pdsends!.has(name)) this.pdsends!.delete(name);
    this.pdsends!.set(name, pdsend);

    return pdsend;
  }

  private convertExpressions(expressions: string[][]): string {
    const escapeExpression = (expr: string): string => {
      ESCAPED_RULES.forEach((rule) => (expr = expr.replace(rule.search, rule.value)));
      return expr;
    };

    const messages = expressions.map((expression) => {
      return expression
        .map((elm) => {
          const found = elm.match(/^"(?<expr>.+)"$/) || elm.match(/^'(?<expr>.+)'$/);
          return found === null ? escapeExpression(elm) : found.groups!['expr'];
        })
        .join(' ');
    });

    return messages.join(';') + ';';
  }

  eval(message: string): void {
    try {
      const pdMessages = this.getStatementNodes(message).map((node) => this.parseSyntax(node));

      for (const pdMessage of pdMessages) {
        const { port, host, expressions } = pdMessage;
        const pdsend = this.getPdsend(port, host);
        const message = this.convertExpressions(expressions);
        pdsend.write(message);
      }

      this.pdsends!.forEach((pdsend, name) => {
        if (!pdsend.hasProcess()) this.pdsends!.delete(name);
      });
    } catch (e) {
      if (e instanceof ParseError) {
        console.error(e);
        this.logger?.error(e.message);
      } else {
        throw e;
      }
    }
  }

  close(): void {
    this.logger?.close();
    this.logger = null;

    this.parser = null;

    this.pdsends?.forEach((pdsend) => pdsend.close());
    this.pdsends?.clear();
    this.pdsends = null;
  }
}
