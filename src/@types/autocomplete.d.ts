declare module 'autocomplete' {
  import { Point, ScopeDescriptor, TextBuffer } from 'atom';

  export interface Suggestion {
    text?: string;
    snippet?: string;
    displayText?: string;
    replacementPrefix?: string;
    type?:
      | 'variable'
      | 'constant'
      | 'property'
      | 'value'
      | 'method'
      | 'function'
      | 'class'
      | 'type'
      | 'keyword'
      | 'tag'
      | 'snippet'
      | 'import'
      | 'require';
    leftLabel?: string;
    leftLabelHTML?: string;
    rightLabel?: string;
    rightLabelHTML?: string;
    className?: string;
    iconHTML?: string;
    description?: string;
    descriptionMoreURL?: string;
    characterMatchIndices?: string;
  }

  export interface SuggestionOption {
    editor: TextBuffer;
    bufferPosition: Point;
    scopeDescriptor: ScopeDescriptor;
    prefix: string;
    activatedManually: boolean;
  }
}
