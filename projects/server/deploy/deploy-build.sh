#!/bin/bash
set -eou
# ^ Stops on errors

# Script executed to prepare for production deploy.
# Run from server project folder's package.json (working directory will be that folder).
echo 'Install & Prune'
npm uninstall oftheday-shared
npm install
npm prune

# Build shared library
echo 'Build Shared Library'
cd ../shared
npm install
npm run build-production
SHARED_PATH=$(npm pack | tail -n 1)
echo $SHARED_PATH

# Install shared into server
echo 'Install Shared Library'
cd ../server
npm install ../shared/$SHARED_PATH --no-save

# Build
echo 'Build Server Project'
npm run clean
npm run build

# Build client project
echo 'Build Client Project'
cd ../client
npm uninstall oftheday-shared
npm install
npm install ../shared/$SHARED_PATH --no-save
npm run production

# Copy client into server
echo 'Copy Client Project'
cd ../server
mkdir -p ./dist-client
cp ../client/dist/* ./dist-client/

echo '-- Finished Successfully --'