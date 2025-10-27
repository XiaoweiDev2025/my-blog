#!/usr/bin/env bash
set -e

cd client
npm ci
npm run build
cd ..

cd server
npm ci
mkdir -p dist/client
cp -r ../client/dist/* dist/client/

#echo "=== Listing @prisma/client/runtime ==="
#ls -R node_modules/@prisma/client/runtime || echo "Directory not found"

npx prisma generate --schema prisma/schema.prisma
npx prisma migrate deploy --schema prisma/schema.prisma
pwd
npm run build

echo "Deploy script finished successfully"
