#!/usr/bin/env bash

set -eu

# get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"
# cd to project root
cd $SCRIPT_DIR/..

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

# if /opt/wasi-sdk doesn't exist, download and install
if [ ! -d "/opt/wasi-sdk" ]; then
    wasi_sdk_url="https://github.com/WebAssembly/wasi-sdk/releases/download/wasi-sdk-$WASI_VERSION/wasi-sdk-$WASI_VERSION.0-$WASI_OS.tar.gz"
    curl -L $wasi_sdk_url | tar zxf - -C /opt
    mv /opt/wasi-sdk-$WASI_VERSION.0 /opt/wasi-sdk
else
    echo "WASI SDK already installed in /opt/wasi-sdk"
fi
