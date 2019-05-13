'use babel';

const REPLACERS = [
  [/-{2}.*\r?\n+|\/\*.*\*\//g, ''],
  [/\s/g, ''],
  [/set/g, 'set '],
  [/rec/g, 'rec ']
];

export default function repl(code) {
  for (const replacer of REPLACERS) {
    code = code.replace(replacer[0], replacer[1]);
  }
  return code;
}
