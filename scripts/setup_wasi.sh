#!/usr/bin/env bash

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

# sudo mkdir -p /opt/wasi-sdk-$WASI_VERSION
wasi_sdk_url="https://github.com/WebAssembly/wasi-sdk/releases/download/wasi-sdk-$WASI_VERSION/wasi-sdk-$WASI_VERSION.0-$WASI_OS.tar.gz"
sudo curl -L $wasi_sdk_url | sudo tar zxf - -C /opt
sudo mv /opt/wasi-sdk-$WASI_VERSION.0 /opt/wasi-sdk