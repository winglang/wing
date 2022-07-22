# this is an opaque image that is not meant to be used directly.
# it is only available in Drone CI runner environment.
# it's built and tagged by winglang-infra repo.
FROM winglang-dev
# import NPM creds from enviroment
ADD ~/.npmrc /root/.npmrc
# import sources
ADD . /drone/src
# we expect sources to be mount under /drone/src
WORKDIR /drone/src
# build the runtime+wingc for the target architecture
RUN source ~/.bashrc \
  && wingrr/scripts/build.sh \
  && cd playground && ./wingc examples/hello.w
