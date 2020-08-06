import Editor from './editor';
import Parser from './parser';
import Logger from './logger';
import Pdsend from './pdsend';

export default class Rampcode {
  private state = { isActive: false };
  private logger: Logger | null = null;
  private parser: Parser | null = null;
  private pdsends: Map<string, Pdsend> | null = null;

  start(): void {
    this.logger = new Logger();
    this.parser = new Parser();
    this.parser.setLanguage(require('tree-sitter-rampcode'));
    this.pdsends = new Map();
  }

  stop(): void {
    this.logger?.close();
    this.logger = null;

    this.parser = null;

    this.pdsends?.forEach((pdsend) => pdsend.kill());
    this.pdsends?.clear();
    this.pdsends = null;
  }

  toggle(): void {
    this.state.isActive ? this.stop() : this.start();
    this.state.isActive = !this.state.isActive;
  }

  private getPdsendConnection(name: string): Pdsend | undefined {
    const pdsend = this.pdsends!.get(name);
    if (pdsend?.hasProcess()) return pdsend;
    this.pdsends!.delete(name);
    return;
  }

  private eval(message: string): void {
    if (!this.state.isActive) return;

    let pdsend = this.getPdsendConnection('8080');
    if (!pdsend) {
      pdsend = new Pdsend();
      this.pdsends!.set(pdsend.name, pdsend);
    }

    pdsend.write(message);
  }

  evalLine(): void {
    return this.eval(Editor.getLineOfText());
  }

  evalBlock(): void {
    return this.eval(Editor.getBlockOfText());
  }
}
