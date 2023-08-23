FROM node:18.16.0-alpine

WORKDIR /app

COPY dist dist
COPY apps/wing-console/console/app/preview/index.mjs dist/
COPY apps/wing-console/console/app/demo demo

RUN cd dist && for i in *; do npm install "$i"; done

ENTRYPOINT ["node", "preview/index.mjs"]
