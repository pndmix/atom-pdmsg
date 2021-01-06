import Logger from './logger';
import { spawn, ChildProcessWithoutNullStreams } from 'child_process';

export default class Pdsend {
  readonly port: number;
  readonly host: string;
  private logger: Logger | null = null;
  private process: ChildProcessWithoutNullStreams | null = null;

  constructor(port: number, host: string, logger: Logger | null) {
    const cmd = atom.config.get('pdmsg.pdsendPath') || 'pdsend';

    this.port = port;
    this.host = host;
    this.logger = logger;
    this.process = spawn(cmd, [String(this.port), this.host]);

    this.process.stderr.on('data', (data) => {
      this.logger?.error(`${data} @${this.host}:${this.port}`);
    });

    this.process.on('close', (code) => {
      if (code !== 0) this.killProcess();
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
    this.logger?.log({ message });
  }

  close(): void {
    this.killProcess();
    this.logger?.close();
    this.logger = null;
  }
}
