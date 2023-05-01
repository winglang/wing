#!/usr/bin/env bash
set -eo pipefail

SCRIPT_DIR=$(dirname "$0")

# first arg should be the wing executable
WING_EXECUTABLE=$1
if [ -z "$WING_EXECUTABLE" ]; then
    echo "First argument must be the wing executable"
    exit 1
fi


# ensure hyperfine is installed
if ! command -v hyperfine &> /dev/null; then
    echo "Running a benchmark requires hyperfine to be installed."

    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo "Installing hyperfine..."
        brew install hyperfine
    else
        echo "Please install hyperfine"
        exit 1
    fi
fi

BENCHMARK_FILES=$(find $SCRIPT_DIR/../examples/tests/valid/benchmarks -name "*.w" -type f)
# make this comma-separated for hyperfine
BENCHMARK_FILES=$(echo $BENCHMARK_FILES | sed 's/ /,/g')

HYPERFINE_CASES=""
for BENCHMARK_FILE in $BENCHMARK_FILES; do
    HYPERFINE_CASES="$HYPERFINE_CASES '$WING_EXECUTABLE compile --no-update-check -t sim $BENCHMARK_FILE'"
    HYPERFINE_CASES="$HYPERFINE_CASES '$WING_EXECUTABLE compile --no-update-check -t tf-aws $BENCHMARK_FILE'"
done

echo "Running benchmarks..."
hyperfine -w 1 -r 3 -L wing_file $BENCHMARK_FILES "$WING_EXECUTABLE compile --no-update-check -t sim {wing_file}"
hyperfine -w 1 -r 3 -L wing_file $BENCHMARK_FILES "$WING_EXECUTABLE compile --no-update-check -t tf-aws {wing_file}"