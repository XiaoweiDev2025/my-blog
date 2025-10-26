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

npm run build

npx prisma generate --schema prisma/schema.prisma
npx prisma migrate deploy --schema prisma/schema.prisma

echo "Deploy script finished successfully"
