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
START_SHA=$2
END_SHA=$3

git add --all
if [ -z "$START_SHA" ]; then
  git diff --staged --binary --patch > $1
else
  git diff --staged --binary --patch $START_SHA $END_SHA > $1
fi

if [ -s $1 ]; then
  echo "Diff found, creating a patch to apply later"
  cat $1
  echo "diff=true" >> $GITHUB_OUTPUT
  echo "diff_name=$1" >> $GITHUB_OUTPUT
fi
