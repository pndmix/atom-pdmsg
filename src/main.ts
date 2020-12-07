import { CompositeDisposable } from 'atom';
import Rampcode from './rampcode';
import AutocompleteProvider from './autocomplete-provider';

let rampcode: Rampcode | null = null;
let subscriptions: CompositeDisposable | null = null;
let autocomplete: AutocompleteProvider | null = null;

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
        'atom-rampcode:toggle': () => rampcode!.toggle(),
        'atom-rampcode:evalLine': () => rampcode!.evalLine(),
        'atom-rampcode:evalBlock': () => rampcode!.evalBlock(),
      })
    );
  },

  serialize(): void {
    return;
  },

  deactivate(): void {
    rampcode!.stop();
    subscriptions!.dispose();

    rampcode = null;
    subscriptions = null;
    autocomplete = null;
  },

  getProvider() {
    autocomplete = new AutocompleteProvider();
    return autocomplete;
  },
};
