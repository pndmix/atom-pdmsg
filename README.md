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
gyp ERR! build error
```

##### On Windows
- Install [Node.js](https://nodejs.org/en/)
- Launch PS (or CMD) as admin and run: `npm install --global windows-build-tools`  
  Details: [windows-build-tools](https://github.com/felixrieseberg/windows-build-tools)

##### On the others
- Please see the [node-gyp#installation](https://github.com/nodejs/node-gyp#installation)

## Settings
You will need to have [Pure Data](https://puredata.info/downloads/pure-data) (Pd) and pdsend which is a CLI for sending messages to Pd, installed. If you don't have them installed, please install Pd only (Pd includes pdsend).  

#### Package Settings
You can change settings in Atom: `Atom > Settings > Packages > pdmsg`
- `Pdsend path`: Leave empty to use pdsend from the PATH

## Usage
### Key bindings
| Binding | Command | Description
| --- | --- | --- |
| ctrl-alt-p | Toggle | Start / Stop pdmsg |
| shift-enter | Evaluate line | Run a line of code |
| alt-enter | Evaluate block | Run a block of code |

### Execution flow
Building a pd patch:
1. Create a new canvas
1. Put a netreceive object: `[netreceive <port> <udp> <old>]`
1. Put a subpatch object (a patching target): `[pd <name>]`

Running pdmsg:
1. Create a file ending with `.pdmsg`
1. Enable pdmsg by running `toggle`
1. Edit your pdmsg code
1. Press `shift-enter` or `alt-enter` to run this

### Examples
Creating an instance of the pdmsg's connection allows you to communicate directly with Pd, i.e. `C(port, [host])`. It is used with the insertion operator, and then this operator inserts a message which is defined as a tuple.
```
C(3005) << (pd-ex, clear) // Send 'pd-ex clear;' to port 3005 on the local.
```
Send multiple messages by using the addition operator.
```
C(3005) << (pd-ex, clear) + (pd, dsp, 1) // Send 'pd-ex clear;pd dsp 1;'
```

##### Put a object
```
C(3005) << (pd-ex, obj, 10, 10, osc~, 440)
```

##### Put a message
```
C(3005) << (pd-ex, msg, 10, 50, 220)
```

##### Put a number
```
C(3005) << (pd-ex, floatatom, 10, 100)
```

##### Put a symbol
```
C(3005) << (pd-ex, symbolatom, 10, 130)
```

##### Put a comment
```
C(3005) << (pd-ex, text, 100, 10, "This is a comment")
```

##### Build a sine wave generator
```
C(3005) << (pd-ex, clear) // Clear a canvas
  + (pd-ex, obj, 10, 10, osc~, 440) + (pd-ex, obj, 10, 60, dac~) // Create objects
  + (pd-ex, connect, 0, 0, 1, 0) + (pd-ex, connect, 0, 0, 1, 1) // Connect them
  + (pd, dsp, 1) // Turn on audio
```
