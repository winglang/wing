FROM node:20.11.0-alpine

WORKDIR /app

COPY dist dist
COPY wing-console/console/app/preview/index.mjs dist/
COPY wing-console/console/app/demo demo

RUN npm init -y && npm install --no-package-lock ./dist/*-[0-9]*.[0-9]*.[0-9]*.tgz

ENV WING_DISABLE_ANALYTICS=true
ENV NO_SIGN_IN=true

ENTRYPOINT ["node", "dist/index.mjs"]
