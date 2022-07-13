FROM debian:bullseye-slim

# This is a development image. It is meant to be huge and used only during the
# development of the project. Do not optimize for size on disk in this image.

# Install build dependencies and other languages that we dynamically link to.
RUN apt-get update && apt-get install --no-install-recommends -y \
  cmake python3 g++ make python3-pip build-essential curl openjdk-11-jdk \
  libluajit-5.1-dev autoconf automake libtool pkg-config mono-complete nano \
  python3-dev ruby-dev libclang-dev

# Let's get Rusty
RUN curl https://sh.rustup.rs -sSf | bash -s -- -y
RUN echo 'source $HOME/.cargo/env' >> $HOME/.bashrc

# Let's Go!
RUN curl -sSL https://git.io/g-install | bash -s -- -y

# This Node is only a development dependency and used for automation
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash && \
  bash -c "source ~/.bashrc && nvm install --lts && nvm use --lts"

# We build runtime first as it is dependency of the compiler
ADD wingrr /wingrr

# Build the runtime
RUN bash -c "source ~/.bashrc && cd /wingrr && npm ci"

# Variables needed for runtime to work correctly
ENV WINGRR_ROOT=/wingrr/build
ENV LD_LIBRARY_PATH=$WINGRR_ROOT

# Run a sanity test to make sure the runtime is working
RUN bash -c "source ~/.bashrc && cd /wingrr && npm test"

# Let's set everything up to work on the compiler
ADD wingc /wingc
ADD playground /playground
RUN chmod +x /playground/wingc

# Done. At this point, if you build the container with:
# $ docker build -t winglang .
# You can access the container with:
# $ docker run -it --rm winglang
# Inside this container, you have all the tools you need to build the compiler.
# Also all necessary dependencies are installed, so you can develop the project.
