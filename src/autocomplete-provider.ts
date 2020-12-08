import { Point, TextBuffer } from 'atom';
import { Suggestion, SuggestionOption } from 'autocomplete';

const suggestions: Suggestion[] = require('../assets/autocomplete.json');

export default class AutocompleteProvider {
  selector: string;
  disableForSelector: string;

  constructor() {
    this.selector = '.source.pdmsg';
    this.disableForSelector = '.source.pdmsg .comment';
  }

  getPrefix(editor: TextBuffer, bufferPosition: Point): string {
    const line = editor.getTextInRange([[bufferPosition.row, 0], bufferPosition]);
    const match = line.match(/\S+$/);
    return match ? match[0] : '';
  }

  inflateSuggestion(replacementPrefix: string, suggestion: Suggestion): Suggestion {
    suggestion.replacementPrefix = replacementPrefix;
    return { ...suggestion };
  }

  getSuggestions(option: SuggestionOption): Suggestion[] {
    const { editor, bufferPosition } = option;
    const prefix = this.getPrefix(editor, bufferPosition);

    if (prefix.length < 1) return [];

    const matchedSuggestions = suggestions.filter((suggestion) => {
      return suggestion.displayText!.startsWith(prefix);
    });
    return matchedSuggestions.map(this.inflateSuggestion.bind(this, prefix));
  }
}
