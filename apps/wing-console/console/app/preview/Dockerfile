FROM rust:1.71 as base

RUN apt-get update && \
    apt-get install -yq --no-install-recommends \
    # open-ssl \
    curl \ 
    wget \
    git \
    gnupg \
    # emscripten \
    # xz-utils \
    # libncurses5 \
    # libc6-dev \
    # libstdc++-9-dev \
    # musl-dev \
    software-properties-common

RUN curl -fsSL https://deb.nodesource.com/setup_current.x | bash - && \
    apt-get install -y nodejs \
    build-essential

# RUN curl -SL https://github.com/llvm/llvm-project/releases/download/llvmorg-15.0.0/clang+llvm-15.0.0-x86_64-linux-gnu-rhel-8.4.tar.xz \
#  | tar -xJC . && \
#     mv clang+llvm-15.0.0-x86_64-linux-gnu-rhel-8.4 clang_15

RUN wget -O- https://apt.releases.hashicorp.com/gpg | \
    gpg --dearmor | \
    tee /usr/share/keyrings/hashicorp-archive-keyring.gpg
RUN echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] \
    https://apt.releases.hashicorp.com $(lsb_release -cs) main" | \
    tee /etc/apt/sources.list.d/hashicorp.list
RUN apt update
RUN apt-get install terraform

# RUN CARGO_GIT_FETCH_WITH_CLI=true cargo install cargo-wasi
# RUN curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

RUN git clone https://github.com/emscripten-core/emsdk.git && \
    cd emsdk && \
    ./emsdk install latest && \
    sh -x ./emsdk activate latest && \
    . ./emsdk_env.sh

WORKDIR /app


RUN npm install --global pnpm
# COPY --from=base . .
COPY . .
# RUN mkdir .cargo
RUN CARGO_GIT_FETCH_WITH_CLI=true pnpm install --no-frozen-lockfile

ENV PATH "$PATH:/emsdk:/emsdk/upstream/emscripten:/app/.cargo/wasi-sdk-19.0/bin"
# ENV LD_LIBRARY_PATH "/app/.cargo/wasi-sdk-19.0/lib:$LD_LIBRARY_PATH"
# ENV C_INCLUDE_PATH "/app/.cargo/wasi-sdk-19.0/share:$C_INCLUDE_PATH"
# ENV WASI_SDK "/app/.cargo/wasi-sdk-19.0"
# ENV CC_wasm32_wasi "/app/.cargo/wasi-sdk-19.0/bin/clang"
# ENV AR_wasm32_wasi "/app/.cargo/wasi-sdk-19.0/bin/ar"

RUN CARGO_GIT_FETCH_WITH_CLI=true pnpm turbo compile --filter @wingconsole/app --concurrency=1
RUN pnpm --filter @wingconsole/app deploy --prod pruned

FROM node:20-alpine

WORKDIR /app

COPY --from=base /app/pruned/dist dist
COPY --from=base /app/apps/wing-console/console/app/preview preview
COPY --from=base /app/apps/wing-console/console/app/demo demo
COPY --from=base /app/pruned/node_modules node_modules

ENTRYPOINT ["node", "preview/index.mjs"]
