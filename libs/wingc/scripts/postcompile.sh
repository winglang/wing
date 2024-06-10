#!/usr/bin/env bash

###
# This script should be run after release build of wingc to the wasm32-wasi target.
# The end result will be a final wasm file in the wingc directory.
# If running in CI (env "CI" is set), it will run wasm-opt on the generated wasm file.
# Otherwise, the wasm file will be copied to the wingc directory from its original output location.
###

wingc=$(cd $(dirname $0)/.. && pwd)

# Currently we only do release wasm builds
target="release"

wasm_opt="$wingc/../../.cargo/binaryen-version_117/bin/wasm-opt"
input_wasm="$wingc/../../target/wasm32-wasi/$target/wingc.wasm"
output_wasm="$wingc/wingc.wasm"

# If CI env is set, run wasm-opt with extra optimizations
echo "Optimising wasm..."
if [ -n "$CI" ]; then
  $wasm_opt --enable-bulk-memory --strip-debug --strip-producers -O3 -o $output_wasm $input_wasm
else
  $wasm_opt --enable-bulk-memory --strip-debug --strip-producers -o $output_wasm $input_wasm
fi
echo "Done!"
