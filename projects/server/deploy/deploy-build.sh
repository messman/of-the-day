#!/bin/bash

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

# Install shared into server-http
echo 'Install Shared Library'
cd ../server
npm install ../shared/$SHARED_PATH

# Build
echo 'Build'
npm run clean
npm run build