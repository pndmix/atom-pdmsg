'use babel';

import { spawn } from 'child_process';
import { isNull } from 'util';


export default class Pdsend {

  constructor(path, portNo) {
    this.process = spawn(path, [portNo]);

    this.process.stderr.on('data', (data) => {
      atom.notifications.addError('pdsend stderr.', {
        detail: data,
      });
    });

    this.process.on('close', (code) => {
      if (!isNull(code)) {
        atom.notifications.addError(`pdsend process exited with code ${code}.`);
      }
    });
  }

  write(code) {
    this.process.stdin.write(code + '\n\n');
  }

  kill() {
    this.process.kill();
  }
} 