# atom-rampcode
Running [Rampcode](https://github.com/gabochi/rampcode) on Atom editor. Providing syntax highlighting, snippets and commands.

![preview-image](https://raw.githubusercontent.com/pndmix/atom-rampcode/master/assets/atom-rampcode.gif)

## Setup
~~~bash
# install packages
$ apm install atom-rampcode language-rampcode
~~~
- Setup instruction for Rampcode can be found at [https://github.com/gabochi/rampcode](https://github.com/gabochi/rampcode).
- If you haven't added **pdsend** to your PATH, add the path at this package's settings.  
`File > Settings > Packages > atom-rampcode`
- [language-rampcode](https://github.com/pndmix/atom-language-rampcode) provides syntax highlighting and snippets.

## Usage
### Flow
1. Open the rampcode patch in PD.
2. Enable atom-rampcode by running `toggle` on Atom.
3. Edit your code in a **ramp** file.
4. Press `shift-enter` or `alt-enter` to evaluate this.

### Key bindings
| Binding | Command |
| --- | --- |
| ctrl-alt-r | Toggle |
| shift-enter | Evaluate line |
| alt-enter | Evaluate block |
| alt-. | Stop sound |

### Notes
- file extension is **.ramp**.
- can be used some spaces and new lines in expression.
- unnecessary with an escape character like this `\,`, enough only `,`.
- supports comment syntax: `-- <message>` and `/* <message> */`.