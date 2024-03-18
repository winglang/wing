---
title: Debugging
id: Debugging
description: Learn how to debug your Wing application
keywords: [debugging, debug, test, vscode]
---

## Overview

Internally Wing uses JavaScript to execute preflight and inflight code, so standard JavaScript debugging tools can be used to debug your Wing application. The best-supported debugger is the built-in VS Code one so this guide will focus on that. 

### Local/Simulator Debugging

To start, open your .w file in VS Code and set a breakpoint by clicking in the gutter to the left of the line number. Breakpoints can also be set in extern files. There are several ways to start the debugger, but let's use the "JavaScript Debug Terminal".
Open the command palette and type "Debug: Open JavaScript Debug Terminal". This works for any wing commands like `wing test` and `wing it`, although keep in mind that `wing compile` will only debug preflight code.

### Limitations

- When using the Wing Console (`wing it`) and attempting to debug inflight code in a `test` or Function, the first execution of the test will not hit a breakpoint and will need to be run again
- Caught/Unhandled will often not stop at expected places
- inflight code by default has a timeout that continues during debugging, so if execution is paused for too long the program is terminate

#### Non-VSCode Support

The Wing CLI itself is a Node.js application, so you can use the `--inspect` flag to debug it and expose a debug server.

```bash
node --inspect $(which wing)
```

Note that inflight code will be executed among multiple child processes, so it's recommended to use a debugger that supports automatically attaching to child processes.
