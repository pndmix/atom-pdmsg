import { Point, TextBuffer } from 'atom';
import { Suggestion, SuggestionOption } from 'autocomplete';
export default class AutocompleteProvider {
    selector: string;
    disableForSelector: string;
    constructor();
    getPrefix(editor: TextBuffer, bufferPosition: Point): string;
    inflateSuggestion(replacementPrefix: string, suggestion: Suggestion): Suggestion;
    getSuggestions(option: SuggestionOption): Suggestion[] | null;
}
//# sourceMappingURL=autocomplete-provider.d.ts.map