# [optionals.w](../../../../../examples/tests/valid/optionals.w) | test | sim

## stdout.log
```log
captures: 
captures: Types:
  Super = Super

captures: Types:
  Super = Super

captures: 
captures: Variables:
  $inflight_init():
    payloadWithBucket => [c,c.put]
    payloadWithoutOptions => [b]
  handle():
    payloadWithBucket => [c,c.put]
    payloadWithoutOptions => [b]

fail ┌ optionals.wsim » root/env0/test:t
     │ Error: Failed to bundle function: ✘ [ERROR] Expected "}" but found "."
     │ 
     │     ../../../../examples/tests/valid/target/test/optionals.wsim/.wing/handler_c89b7b4e.js:12:36:
     │       12 │       })("BUCKET_HANDLE_781285e3"),c.put: undefined,},
     │          │                                     ^
     │          ╵                                     }
     │ 
     │ /Users/eladb/code/wing/libs/wingsdk/node_modules/esbuild-wasm/lib/main.js:2095
     │       throw reject;
     │       ^
     │ 
     │ Error: Build failed with 1 error:
     │ ../../../../examples/tests/valid/target/test/optionals.wsim/.wing/handler_c89b7b4e.js:12:36: ERROR: Expected "}" but found "."
     │     at failureErrorWithLog (/Users/eladb/code/wing/libs/wingsdk/node_modules/esbuild-wasm/lib/main.js:1626:15)
     │     at /Users/eladb/code/wing/libs/wingsdk/node_modules/esbuild-wasm/lib/main.js:1038:25
     │     at /Users/eladb/code/wing/libs/wingsdk/node_modules/esbuild-wasm/lib/main.js:983:52
     │     at buildResponseToResult (/Users/eladb/code/wing/libs/wingsdk/node_modules/esbuild-wasm/lib/main.js:1036:7)
     │     at /Users/eladb/code/wing/libs/wingsdk/node_modules/esbuild-wasm/lib/main.js:1065:16
     │     at responseCallbacks.<computed> (/Users/eladb/code/wing/libs/wingsdk/node_modules/esbuild-wasm/lib/main.js:687:9)
     │     at handleIncomingPacket (/Users/eladb/code/wing/libs/wingsdk/node_modules/esbuild-wasm/lib/main.js:742:9)
     │     at Socket.readFromStdout (/Users/eladb/code/wing/libs/wingsdk/node_modules/esbuild-wasm/lib/main.js:663:7)
     │     at Socket.emit (node:events:513:28)
     │     at addChunk (node:internal/streams/readable:324:12) {
     │   errors: [
     │     {
     │       detail: undefined,
     │       id: '',
     │       location: {
     │         column: 36,
     │         file: '../../../../examples/tests/valid/target/test/optionals.wsim/.wing/handler_c89b7b4e.js',
     │         length: 1,
     │         line: 12,
     │         lineText: '      })("BUCKET_HANDLE_781285e3"),c.put: undefined,},',
     │         namespace: '',
     │         suggestion: '}'
     │       },
     │       notes: [],
     │       pluginName: '',
     │       text: 'Expected "}" but found "."'
     │     }
     │   ],
     │   warnings: []
     │ }
     │ 
     │ Node.js v18.12.1
     │ 
     │     at createBundle (/Users/eladb/code/wing/libs/wingsdk/lib/shared/bundling.js:60:15)
     │     at Object.activity (/Users/eladb/code/wing/libs/wingsdk/lib/target-sim/function.inflight.js:57:63)
     │     at async Object.withTrace (/Users/eladb/code/wing/libs/wingsdk/lib/testing/simulator.js:72:38)
     │     at async TestRunnerClient.runTest (/Users/eladb/code/wing/libs/wingsdk/lib/target-sim/test-runner.inflight.js:31:13)
     │     at async testSimulator (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:199:22)
     │     at async testOne (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:114:20)
     └     at async test (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:55:29)
Error: Failed to bundle function: ✘ [ERROR] Expected "}" but found "."

    ../../../../examples/tests/valid/target/test/optionals.wsim/.wing/handler_c89b7b4e.js:12:36:
      12 │       })("BUCKET_HANDLE_781285e3"),c.put: undefined,},
         │                                     ^
         ╵                                     }

/Users/eladb/code/wing/libs/wingsdk/node_modules/esbuild-wasm/lib/main.js:2095
      throw reject;
      ^

Error: Build failed with 1 error:
../../../../examples/tests/valid/target/test/optionals.wsim/.wing/handler_c89b7b4e.js:12:36: ERROR: Expected "}" but found "."
    at failureErrorWithLog (/Users/eladb/code/wing/libs/wingsdk/node_modules/esbuild-wasm/lib/main.js:1626:15)
    at /Users/eladb/code/wing/libs/wingsdk/node_modules/esbuild-wasm/lib/main.js:1038:25
    at /Users/eladb/code/wing/libs/wingsdk/node_modules/esbuild-wasm/lib/main.js:983:52
    at buildResponseToResult (/Users/eladb/code/wing/libs/wingsdk/node_modules/esbuild-wasm/lib/main.js:1036:7)
    at /Users/eladb/code/wing/libs/wingsdk/node_modules/esbuild-wasm/lib/main.js:1065:16
    at responseCallbacks.<computed> (/Users/eladb/code/wing/libs/wingsdk/node_modules/esbuild-wasm/lib/main.js:687:9)
    at handleIncomingPacket (/Users/eladb/code/wing/libs/wingsdk/node_modules/esbuild-wasm/lib/main.js:742:9)
    at Socket.readFromStdout (/Users/eladb/code/wing/libs/wingsdk/node_modules/esbuild-wasm/lib/main.js:663:7)
    at Socket.emit (node:events:513:28)
    at addChunk (node:internal/streams/readable:324:12) {
  errors: [
    {
      detail: undefined,
      id: '',
      location: {
        column: 36,
        file: '../../../../examples/tests/valid/target/test/optionals.wsim/.wing/handler_c89b7b4e.js',
        length: 1,
        line: 12,
        lineText: '      })("BUCKET_HANDLE_781285e3"),c.put: undefined,},',
        namespace: '',
        suggestion: '}'
      },
      notes: [],
      pluginName: '',
      text: 'Expected "}" but found "."'
    }
  ],
  warnings: []
}

Node.js v18.12.1

    at createBundle (/Users/eladb/code/wing/libs/wingsdk/lib/shared/bundling.js:60:15)
    at Object.activity (/Users/eladb/code/wing/libs/wingsdk/lib/target-sim/function.inflight.js:57:63)
    at async Object.withTrace (/Users/eladb/code/wing/libs/wingsdk/lib/testing/simulator.js:72:38)
    at async TestRunnerClient.runTest (/Users/eladb/code/wing/libs/wingsdk/lib/target-sim/test-runner.inflight.js:31:13)
    at async testSimulator (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:199:22)
    at async testOne (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:114:20)
    at async test (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:55:29)
 




Tests 1 failed (1) 
Duration <DURATION>

```

