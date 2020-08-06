import { spawn, ChildProcessWithoutNullStreams } from 'child_process';

type Address = {
  port: string;
  host?: string;
  protocol?: 'tcp' | 'udp';
};

const DEFAULT_ADDRESS: Address = {
  port: atom.config.get('atom-rampcode.port') || '8080',
};

export default class Pdsend {
  name: string;
  address: Address;
  private process: ChildProcessWithoutNullStreams | null = null;

  constructor(address: Address = DEFAULT_ADDRESS, name?: string) {
    this.address = { ...address };
    this.name = name || address.port;
    this.launchProcess();
  }

  private getSpawnOptions(): string[] {
    const port = this.address.port;
    const host = this.address.host || 'localhost';
    const protocol = this.address.protocol || 'tcp';
    return [port, host, protocol];
  }

  launchProcess(): void {
    const pdsend = atom.config.get('atom-rampcode.pdsendPath') || 'pdsend';
    this.process = spawn(pdsend, this.getSpawnOptions());

    this.process.stderr.on('data', (data) => {
      console.log(data);
    });

    this.process.on('close', (code) => {
      if (code !== null) {
        this.process = null;
      }
    });

    // Logger.success(`Connect to ${this.name}.`);
  }

  hasProcess(): boolean {
    return this.process !== null;
  }

  private static convertMessage(message: string): string {
    const rules = [
      {
        search: /\/\/.*(\r?\n+)?|\/\*.*\*\//g,
        value: '',
      },
      {
        search: /\s/g,
        value: '',
      },
      {
        search: /\\,|,/g,
        value: '\\,',
      },
      {
        search: /@/g,
        value: ' ',
      },
    ];
    rules.forEach(({ search, value }) => {
      message = message.replace(search, value);
    });
    return message;
  }

  write(message: string): void {
    if (this.process !== null) {
      const newMessage = Pdsend.convertMessage(message);
      console.log(newMessage);
      this.process.stdin.write(newMessage + '\n\n');
      // Logger.log({
      //   message: `<span class="message-success-rampcode">${this.name} > </span> ${newMessage}`,
      //   raw: true,
      // });
    }
  }

  kill(): void {
    this.process?.kill();
    this.process = null;
  }
}
