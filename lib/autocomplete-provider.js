"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const suggestions = require('../assets/autocomplete.json');
class AutocompleteProvider {
    constructor() {
        this.selector = '.source.pdmsg';
        this.disableForSelector = '.source.pdmsg .comment';
    }
    getPrefix(editor, bufferPosition) {
        const line = editor.getTextInRange([[bufferPosition.row, 0], bufferPosition]);
        const match = line.match(/\S+$/);
        return match ? match[0] : '';
    }
    inflateSuggestion(replacementPrefix, suggestion) {
        suggestion.replacementPrefix = replacementPrefix;
        return Object.assign({}, suggestion);
    }
    getSuggestions(option) {
        const { editor, bufferPosition } = option;
        const prefix = this.getPrefix(editor, bufferPosition);
        if (prefix.length < 1)
            return [];
        const matchedSuggestions = suggestions.filter((suggestion) => {
            return suggestion.displayText.startsWith(prefix);
        });
        return matchedSuggestions.map(this.inflateSuggestion.bind(this, prefix));
    }
}
exports.default = AutocompleteProvider;
//# sourceMappingURL=autocomplete-provider.js.map