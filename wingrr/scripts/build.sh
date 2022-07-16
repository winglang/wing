#!/usr/bin/env bash

set -eu
source ~/.bashrc
cd "$(dirname "$0")"

cd ..
echo "Building in $(pwd)"

export CI=true

npm ci --ignore-scripts
rm -rf build
mkdir build

pushd build
cmake .. -DCMAKE_BUILD_TYPE=Release
cmake --build . --config Release
popd

export WINGRR_ROOT=$(pwd)/build
export LD_LIBRARY_PATH=$WINGRR_ROOT
cargo test --manifest-path src/crate/Cargo.toml -- --test-threads=1
