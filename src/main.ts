import { CompositeDisposable } from 'atom';
import Rampcode from './rampcode';

let rampcode: Rampcode;
let subscriptions: CompositeDisposable;

module.exports = {
  config: {
    pdsendPath: {
      title: 'Pdsend path',
      description: 'Leave empty to use pdsend from the PATH.',
      type: 'string',
      default: '',
      order: 1,
    },
    port: {
      title: 'Port number',
      description: '',
      type: 'integer',
      default: 8080,
      order: 2,
    },
  },

  activate(): void {
    rampcode = new Rampcode();

    subscriptions = new CompositeDisposable();
    subscriptions.add(
      atom.commands.add('atom-workspace', {
        'atom-rampcode:toggle': () => rampcode.toggle(),
        'atom-rampcode:evalLine': () => rampcode.evalLine(),
        'atom-rampcode:evalBlock': () => rampcode.evalBlock(),
      })
    );
  },

  serialize(): void {
    return;
  },

  deactivate(): void {
    rampcode.stop();
    subscriptions.dispose();
  },
};
