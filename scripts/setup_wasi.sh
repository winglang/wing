#!/usr/bin/env bash
set -eo pipefail

TOOL_INSTALL_DIR="./.cargo"

WASI_SDK_VERSION="20"
WASI_SDK_VERSION_FULL="$WASI_SDK_VERSION.0"
WASI_SDK_INSTALL_DIR="$TOOL_INSTALL_DIR/wasi-sdk-$WASI_SDK_VERSION_FULL"

BINARYEN_VERSION="version_116"
BINARYEN_INSTALL_DIR="$TOOL_INSTALL_DIR/binaryen-$BINARYEN_VERSION"

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
if [ ! -d $BINARYEN_INSTALL_DIR ]; then
    BINARYEN_TARBALL="binaryen-$BINARYEN_VERSION-$SYS_ARCH-$SYS_OS.tar.gz"
    BINARYEN_INSTALL_URL="https://github.com/WebAssembly/binaryen/releases/download/$BINARYEN_VERSION/$BINARYEN_TARBALL"
    OUTFILE="/tmp/$BINARYEN_TARBALL"

    echo "Installing Binaryen $BINARYEN_VERSION to $BINARYEN_INSTALL_DIR..."

    if [ ! -f $OUTFILE ]; then
        echo "Downloading Binaryen $BINARYEN_VERSION to $OUTFILE..."
        curl --retry 2 -L $BINARYEN_INSTALL_URL -o $OUTFILE
    fi

    echo "Extracting to $BINARYEN_INSTALL_DIR..."
    tar zxf $OUTFILE -C $TOOL_INSTALL_DIR
fi

if [ ! -d $WASI_SDK_INSTALL_DIR ]; then
    WASI_TARBALL="wasi-sdk-$WASI_SDK_VERSION_FULL-$SYS_OS.tar.gz"
    WASI_INSTALL_URL="https://github.com/WebAssembly/wasi-sdk/releases/download/wasi-sdk-$WASI_SDK_VERSION/$WASI_TARBALL"
    OUTFILE="/tmp/$WASI_TARBALL"

    echo "Installing WASI SDK $WASI_SDK_VERSION_FULL to $WASI_SDK_INSTALL_DIR..."

    if [ ! -f $OUTFILE ]; then
        echo "Downloading WASI SDK $WASI_SDK_VERSION_FULL to $OUTFILE..."
        curl --retry 2 -L $WASI_INSTALL_URL -o $OUTFILE
    fi
    
    echo "Extracting to $TOOL_INSTALL_DIR..."
    tar zxf $OUTFILE -C $TOOL_INSTALL_DIR
fi
