import Logger from './logger';
import { spawn, ChildProcessWithoutNullStreams } from 'child_process';

export default class Pdsend {
  readonly port: number;
  readonly host: string;
  private logger: Logger | null = null;
  private process: ChildProcessWithoutNullStreams | null = null;

  constructor(port: number, host: string, logger: Logger | null) {
    const cmd = atom.config.get('atom-rampcode.pdsendPath') || 'pdsend';

    this.port = port;
    this.host = host;
    this.logger = logger;
    this.process = spawn(cmd, [String(this.port), this.host]);

    this.process.stderr.on('data', (data) => {
      this.logger?.log({
        message: `@${this.host}:${this.port} <span class="message-error-pdmsg">${data}</span>`,
        raw: true,
      });
    });

    this.process.on('close', (code) => {
      if (code !== null) this.killProcess();
    });
  }

  private killProcess(): void {
    this.process?.kill();
    this.process = null;
  }

  hasProcess(): boolean {
    return this.process !== null;
  }

  write(message: string): void {
    this.process?.stdin.write(message + '\n\n');
    this.logger?.log({
      message: `@${this.host}:${this.port} <span class="message-info-pdmsg">${message}</span>`,
      raw: true,
    });
  }

  close(): void {
    this.killProcess();
    this.logger?.close();
    this.logger = null;
  }
}
