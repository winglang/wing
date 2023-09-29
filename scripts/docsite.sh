#!/usr/bin/env bash

scriptdir=$(cd $(dirname $0) && pwd)
workdir="$HOME/.winglang-docsite"
docsdir=$(cd $scriptdir/../docs && pwd)

echo $docsdir

symlink_target="./docs"

if [ ! -d $workdir ]; then
  mkdir -p $workdir
  cd $workdir
  echo "🍄 Cloning winglang/docsite into ${workdir}..."
  git clone --depth=1 https://github.com/winglang/docsite.git .
  if [ $? != 0 ]; then
    rm -rf $workdir
    echo "🍄 Removed ${workdir} because git clone failed."
    echo "❗ Failed to setup winglang documentation site locally!"
    exit 1
  fi
else
  echo "🍄 Updating winglang/docsite in ${workdir}..."
  cd $workdir
  rm -fr $symlink_target
  git restore .
  git pull
fi

echo "🍄 Symlinking ${docsdir} into ${workdir}..."
rm -fr $symlink_target
ln -s $docsdir $symlink_target
echo '["current"]' > versions.json

echo "🍄 Installing dependencies..."
npm i

echo "🍄 Starting local docsite server..."
npm run start
