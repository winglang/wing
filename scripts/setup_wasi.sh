#!/usr/bin/env bash
set -eo pipefail

WASI_VERSION="19"
WASI_VERSION_FULL="$WASI_VERSION.0"
WASI_INSTALL_PARENT_DIR="./.cargo"
WASI_INSTALL_DIR="$WASI_INSTALL_PARENT_DIR/wasi-sdk-$WASI_VERSION_FULL"

# Check if mac or linux
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    WASI_OS="linux"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    WASI_OS="macos"
else
    echo "Unsupported OS"
    exit 1
fi

if ! command -v cargo-wasi &> /dev/null; then
    echo "Installing cargo-wasi..."
    cargo install cargo-wasi
fi

if [ ! -d $WASI_INSTALL_DIR ]; then
    WASI_INSTALL_URL="https://github.com/WebAssembly/wasi-sdk/releases/download/wasi-sdk-$WASI_VERSION/wasi-sdk-$WASI_VERSION_FULL-$WASI_OS.tar.gz"
    echo "Installing WASI SDK $WASI_VERSION_FULL to $WASI_INSTALL_DIR..."
    curl --retry 2 -L $WASI_INSTALL_URL | tar zxf - -C $WASI_INSTALL_PARENT_DIR
fi

