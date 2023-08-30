FROM node:18.16.0-alpine

WORKDIR /app

COPY dist dist
COPY apps/wing-console/console/app/preview/index.mjs dist/
COPY apps/wing-console/console/app/demo demo

RUN npm init -y && npm install --no-package-lock ./dist/*-[0-9]*.[0-9]*.[0-9]*.tgz

ENTRYPOINT ["node", "dist/index.mjs"]
