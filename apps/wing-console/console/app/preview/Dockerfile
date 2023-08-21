FROM rust:1.71 as base

RUN apt-get update && \
    apt-get install -yq --no-install-recommends \
    curl \ 
    wget \
    git \
    gnupg \
    software-properties-common

# install node
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs \
    build-essential

# install terraform
RUN wget -O- https://apt.releases.hashicorp.com/gpg | \
    gpg --dearmor | \
    tee /usr/share/keyrings/hashicorp-archive-keyring.gpg
RUN echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] \
    https://apt.releases.hashicorp.com $(lsb_release -cs) main" | \
    tee /etc/apt/sources.list.d/hashicorp.list
RUN apt update
RUN apt-get install terraform

# install emscripten
RUN git clone https://github.com/emscripten-core/emsdk.git && \
    cd emsdk && \
    ./emsdk install latest && \
    sh -x ./emsdk activate latest && \
    . ./emsdk_env.sh

RUN npm install --global pnpm

WORKDIR /app

COPY . .

ENV PATH "$PATH:/emsdk:/emsdk/upstream/emscripten:/app/.cargo/wasi-sdk-19.0/bin"

RUN pnpm install --no-frozen-lockfile
RUN pnpm turbo compile --filter @wingconsole/app --concurrency=1
RUN pnpm --filter @wingconsole/app deploy --prod pruned

FROM node:18.16.0-alpine

WORKDIR /app

COPY --from=base /app/pruned/dist dist
COPY --from=base /app/apps/wing-console/console/app/preview preview
COPY --from=base /app/apps/wing-console/console/app/demo demo
COPY --from=base /app/pruned/node_modules node_modules

ENTRYPOINT ["node", "preview/index.mjs"]
