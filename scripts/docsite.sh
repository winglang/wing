#!/bin/sh
scriptdir=$(cd $(dirname $0) && pwd)
workdir="$HOME/.winglang-docsite"
docsdir=$(cd $scriptdir/../docs && pwd)

echo $docsdir

symlink_target="./docs"

if [ ! -d $workdir ]; then
  mkdir -p $workdir
  cd $workdir
  echo "🍄 Cloning winglang/docsite into ${workdir}..."
  git clone --depth=1 git@github.com:winglang/docsite.git .
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
