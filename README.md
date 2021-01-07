# pdmsg
Dynamic patching environment with Pd Internal Messages. This package provides syntax highlighting, snippets and sending messages to Pd when you write pdmsg script in Atom.

#### Pd Internal Messages
These messages can be useful if you are running pd without a gui, or building patches dynamically. For more information, please see below.
- <https://puredata.info/community/pdwiki/PdInternalMessages>
- <https://puredata.info/docs/tutorials/TipsAndTricks#undocumented-pd-internal-messages>
- <https://puredata.info/docs/developer/PdFileFormat>

## Install
```
$ apm install pdmsg
```
Or, if you install from Atom gui: `Atom > Settings > Packages > pdmsg`

#### Unable to install
If you see an error like below, you need to install Python and C/C++ compiler toolchain, for [node-gyp](https://github.com/nodejs/node-gyp) depending on your OS.
```
prebuild-install WARN install No prebuilt binaries found (target=6.1.12 runtime=electron arch=x64 libc= platform=win32)
```
##### On Windows
- Install [Node.js](https://nodejs.org/en/)
- Install [windows-build-tools](https://github.com/felixrieseberg/windows-build-tools)  
  Start PowerShell as admin and run: `npm install --global windows-build-tools`

##### On the others
For more details, please see the [node-gyp#installation](https://github.com/nodejs/node-gyp#installation).

## Key bindings
| Binding | Command |
| --- | --- |
| ctrl-alt-p | Toggle |
| shift-enter | Evaluate line |
| alt-enter | Evaluate block |
