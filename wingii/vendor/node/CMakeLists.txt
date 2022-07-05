cmake_minimum_required(VERSION 3.12 FATAL_ERROR)

project(wingii-node)

include(ExternalProject)

ExternalProject_Add(node
  URL "https://github.com/nodejs/node/archive/refs/heads/v16.x.zip"
  CONFIGURE_COMMAND ./configure --prefix=<INSTALL_DIR> --enable-static --with-intl=small-icu
  PATCH_COMMAND node ${CMAKE_HOME_DIRECTORY}/patches/node.cc.patch.js
  INSTALL_COMMAND make install && node ${CMAKE_HOME_DIRECTORY}/scripts/install.js
  BUILD_COMMAND make -j 16
  EXCLUDE_FROM_ALL FALSE
  BUILD_IN_SOURCE TRUE
)
