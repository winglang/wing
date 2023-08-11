#!/usr/bin/env bash

# Check if running in GitHub Actions
if [ -z "$GITHUB_ACTIONS" ]; then
  echo "Not running in GitHub Actions, skipping patch creation"
  exit 0
fi

# Get patch name from args
if [ -z "$1" ]; then
  echo "No patch name specified, skipping patch creation"
  exit 1
fi

PATCH_NAME=$1

git add --all
git diff --staged --binary --patch > $1
if [ -s $1 ]; then
  echo "Diff found, creating a patch to apply later"
  cat $1
  echo "diff=true" >> $GITHUB_OUTPUT
  echo "diff_name=$1" >> $GITHUB_OUTPUT
fi
