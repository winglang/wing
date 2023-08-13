FROM rust:1.71

RUN apt-get update && \
    apt-get install -yq --no-install-recommends \
    # open-ssl \
    curl \ 
    wget \
    git \
    gnupg \
    # emscripten \
    xz-utils \
    libncurses5 \
    libc6-dev \
    software-properties-common

RUN curl -fsSL https://deb.nodesource.com/setup_current.x | bash - && \
    apt-get install -y nodejs \
    build-essential

RUN curl -SL https://github.com/llvm/llvm-project/releases/download/llvmorg-15.0.0/clang+llvm-15.0.0-x86_64-linux-gnu-rhel-8.4.tar.xz \
 | tar -xJC . && \
    mv clang+llvm-15.0.0-x86_64-linux-gnu-rhel-8.4 clang_15

RUN wget -O- https://apt.releases.hashicorp.com/gpg | \
    gpg --dearmor | \
    tee /usr/share/keyrings/hashicorp-archive-keyring.gpg
RUN echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] \
    https://apt.releases.hashicorp.com $(lsb_release -cs) main" | \
    tee /etc/apt/sources.list.d/hashicorp.list
RUN apt update
RUN apt-get install terraform

RUN CARGO_GIT_FETCH_WITH_CLI=true cargo install cargo-wasi
RUN curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

RUN git clone https://github.com/emscripten-core/emsdk.git && \
    cd emsdk && \
    ./emsdk install latest && \
    sh -x ./emsdk activate latest && \
    . ./emsdk_env.sh

WORKDIR /app


RUN npm install --global pnpm
# COPY --from=base . .
COPY . .
RUN mkdir .cargo
RUN CARGO_GIT_FETCH_WITH_CLI=true pnpm install --no-frozen-lockfile

ENV PATH "$PATH:/emsdk:/emsdk/upstream/emscripten:/clang_15/bin"
ENV LD_LIBRARY_PATH "$LD_LIBRARY_PATH:/clang_15/lib"

RUN CARGO_GIT_FETCH_WITH_CLI=true pnpm turbo compile --filter @wingconsole/app --concurrency=1

# RUN apt-get install -y gcc python3 make

# FROM node:20

# RUN apt-get update

# # Get Ubuntu packages
# RUN apt-get install -y \
#     build-essential \
#     curl \
#     emscripten \
#     gnupg software-properties-common

# # Update new packages
# RUN apt-get update

# # Get Rust
# RUN curl https://sh.rustup.rs -sSf | bash -s -- --default-toolchain nightly -y

# ENV PATH="/root/.cargo/bin:${PATH}"

# RUN CARGO_GIT_FETCH_WITH_CLI=true cargo install cargo-wasi
# # RUN apt-get install emscripten -y
# # RUN apt-get update && apt-get install -y gnupg software-properties-common
# # RUN echo 'source $HOME/.cargo/env' >> $HOME/.bashrc

# # RUN apt install curl gcc python3 make
# # RUN curl https://sh.rustup.rs -sSf | sh -s -- --default-toolchain nightly -y
# # RUN . $HOME/.cargo/env

# WORKDIR /app


# RUN npm install --global pnpm
# COPY --from=base . .
# RUN mkdir .cargo
# RUN CARGO_GIT_FETCH_WITH_CLI=true pnpm install --no-frozen-lockfile

# CMD ["echo", "1"]
# #RUN cd libs/wingii
# #RUN CARGO_GIT_FETCH_WITH_CLI=true cargo wasi build --release -v
# #RUN pnpm turbo compile --filter @wingconsole/app --concurrency=1
