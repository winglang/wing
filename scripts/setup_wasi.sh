#!/usr/bin/env bash
set -eo pipefail

TOOL_INSTALL_DIR="./.cargo"

BINARYEN_VERSION="version_116"
WASI_SDK_VERSION="20"
WASI_SDK_VERSION_FULL="$WASI_SDK_VERSION.0"

SYS_OS=$OSTYPE
SYS_ARCH=$(uname -m)

# Check if mac or linux
if [[ "$SYS_OS" == "linux-gnu"* ]]; then
    SYS_OS="linux"
elif [[ "$SYS_OS" == "darwin"* ]]; then
    SYS_OS="macos"
else
    echo "Unsupported OS"
    exit 1
fi

# Check if x86_64 or arm64
if [[ "$SYS_ARCH" != "x86_64" && "$SYS_ARCH" != "arm64" ]]; then
    echo "Unsupported architecture"
    exit 1
fi

# Download binaryen tools
BINARYEN_INSTALL_DIR="$TOOL_INSTALL_DIR/binaryen-$BINARYEN_VERSION"
BINARYEN_BINARIES="$BINARYEN_INSTALL_DIR/bin/wasm-opt"
if [ ! -f $BINARYEN_BINARIES ]; then
    TARBALL="binaryen-$BINARYEN_VERSION-$SYS_ARCH-$SYS_OS.tar.gz"
    INSTALL_URL="https://github.com/WebAssembly/binaryen/releases/download/$BINARYEN_VERSION/$TARBALL"
    OUTFILE="/tmp/$TARBALL"

    echo "Installing Binaryen $BINARYEN_VERSION to $BINARYEN_INSTALL_DIR..."

    if [ ! -f $OUTFILE ]; then
        echo "Downloading Binaryen $BINARYEN_VERSION to $OUTFILE..."
        if ! curl --retry 2 -L $INSTALL_URL -o $OUTFILE; then
            echo "Error downloading Binaryen. Exiting."
            exit 1
        fi
    fi

    echo "Extracting to $BINARYEN_INSTALL_DIR..."
    if ! tar zxf $OUTFILE -C $TOOL_INSTALL_DIR; then
        echo "Error extracting Binaryen. Exiting."
        exit 1
    fi
fi

# Download wasi-sdk
WASI_SDK_INSTALL_DIR="$TOOL_INSTALL_DIR/wasi-sdk-$WASI_SDK_VERSION_FULL"
if [ ! -d $WASI_SDK_INSTALL_DIR ]; then
    WASI_SDK_TARBALL="wasi-sdk-$WASI_SDK_VERSION_FULL-$SYS_OS.tar.gz"
    WASI_SDK_INSTALL_URL="https://github.com/WebAssembly/wasi-sdk/releases/download/wasi-sdk-$WASI_SDK_VERSION/$WASI_SDK_TARBALL"
    OUTFILE="/tmp/$WASI_SDK_TARBALL"

    echo "Installing WASI SDK $WASI_SDK_VERSION_FULL to $WASI_SDK_INSTALL_DIR..."

    if [ ! -f $OUTFILE ]; then
        echo "Downloading WASI SDK $WASI_SDK_VERSION_FULL to $OUTFILE..."
        curl --retry 2 -L $WASI_SDK_INSTALL_URL -o $OUTFILE
    fi

    echo "Extracting to $WASI_SDK_INSTALL_DIR..."
    tar zxf $OUTFILE -C $TOOL_INSTALL_DIR
fi
