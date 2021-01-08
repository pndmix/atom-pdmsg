# pdmsg
Dynamic patching environment with Pd Internal Messages. This package provides syntax highlighting, snippets and sending messages to Pd via pdsend when you write pdmsg code in Atom.

#### Pd Internal Messages
These messages can be useful if you are running pd without a gui, or building patches dynamically. For more information, please see below.
- <https://puredata.info/community/pdwiki/PdInternalMessages>
- <https://puredata.info/docs/tutorials/TipsAndTricks#undocumented-pd-internal-messages>
- <https://puredata.info/docs/developer/PdFileFormat>

## Install
You can install in Atom: `Atom > Settings > Packages > pdmsg`  
Or, using `apm`
```
$ apm install pdmsg
```

#### Unable to install
If you see an error like below, you need to install Python and C/C++ compiler toolchain, for [node-gyp](https://github.com/nodejs/node-gyp) depending on your OS.
```
prebuild-install WARN install No prebuilt binaries found (target=6.1.12 runtime=electron arch=x64 libc= platform=win32)
```

##### On Windows
- Install [Node.js](https://nodejs.org/en/)
- Launch PS (or CMD) as admin and run: `npm install --global windows-build-tools`  
  Details: [windows-build-tools](https://github.com/felixrieseberg/windows-build-tools)

##### On the others
- Please see the [node-gyp#installation](https://github.com/nodejs/node-gyp#installation)

## Settings
You will need to have [Pure Data](https://puredata.info/downloads/pure-data) (Pd) and pdsend, a CLI for sending messages to Pd, installed. If you don't have them installed, please install Pd (Pd includes pdsend).  

##### Package Settings
You can change settings in Atom: `Atom > Settings > Packages > pdmsg`
- `Pdsend path`: Leave empty to use pdsend from the PATH

## Usage
### Key bindings
| Binding | Command | Description
| --- | --- | --- |
| ctrl-alt-p | Toggle | Start / Stop pdmsg |
| shift-enter | Evaluate line | Run a line of code |
| alt-enter | Evaluate block | Run a block of code |

### Examples
#### Execution flow
Building a pd patch:
1. Create a netreceive object `[netreceive <port> <udp> <old>]`

Running pdmsg:
1. Create a file ending with `.pdmsg`
1. Enable pdmsg by running `toggle`
1. Edit your pdmsg code
1. Press `shift-enter` or `alt-enter` to run this

#### Pdmsg grammar
##### Put a object
##### Put a message
##### Put a number
##### Put a symbol
##### Put a comment
##### Connect them