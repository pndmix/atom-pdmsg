# atom-rampcode
Running [Rampcode](https://github.com/gabochi/rampcode) on Atom editor. Providing syntax highlighting, snippets and commands.

## Setup
~~~bash
# install package
$ apm install atom-rampcode
~~~
- Setup instruction for Rampcode can be found at [https://github.com/gabochi/rampcode](https://github.com/gabochi/rampcode).
- If you haven't added **pdsend** to your PATH, add the path at this package's settings. `File > Settings > Packages > atom-rampcode`

## Usage
You have to start the rampcode-XXX.pd proccess before execute the following commands.

![preview-image](https://raw.githubusercontent.com/pndmix/atom-rampcode/master/assets/atom-rampcode.gif)

### Key bindings
| Binding | Command |
| --- | --- |
| ctrl-alt-r | Toggle |
| shift-enter | Evaluate line |
| alt-enter | Evaluate block |

### Notes
- file extension is **.ramp**.
- can be used some spaces and new lines in expression.
- unnecessary with an escape character like this `\,`, enough only `,`.
- supports comment syntax with `-- <message>` or `/* <message> */`.