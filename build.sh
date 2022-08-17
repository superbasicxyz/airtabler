#!/bin/bash

# Exit on any errors
set -e

# Compile the project
npx tsc

# Re-generate the documentation
npx typedoc --entryPointStrategy expand ./src

echo "Success!"
