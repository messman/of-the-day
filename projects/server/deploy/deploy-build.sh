#!/bin/bash
set -eou
# ^ Stops on errors

# Script executed to prepare for production deploy.
# Run from server project folder's package.json (working directory will be that folder).
echo 'Install & Prune'
npm install
npm prune

# Build shared library
echo 'Build Shared Library'
cd ../shared
npm install
npm run build-production
SHARED_PATH=$(npm pack | tail -n 1)
echo $SHARED_PATH

# Build client project
echo 'Build Client Project'
cd ../client
npm install
npm install ../shared/$SHARED_PATH --no-save
npm run production

# Install shared into server
echo 'Install Shared Library'
cd ../server
npm install ../shared/$SHARED_PATH --no-save

# Build
echo 'Build'
npm run clean
npm run build

# Copy client into server
mkdir -p ./dist-client
cp ../client/dist ./dist-client