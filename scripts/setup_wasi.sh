#!/usr/bin/env bash
set -eo pipefail

WASI_VERSION="16"

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

if [ ! -d "/opt/wasi-sdk" ]; then
    echo "Installing WASI SDK $WASI_VERSION to /opt/wasi-sdk..."
    wasi_sdk_url="https://github.com/WebAssembly/wasi-sdk/releases/download/wasi-sdk-$WASI_VERSION/wasi-sdk-$WASI_VERSION.0-$WASI_OS.tar.gz"
    curl --retry 2 -L $wasi_sdk_url | tar zxf - -C /opt
    mv /opt/wasi-sdk-$WASI_VERSION.0 /opt/wasi-sdk
fi

