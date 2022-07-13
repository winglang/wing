cmake_minimum_required(VERSION 3.12 FATAL_ERROR)

project(wingrr-node)

include(ExternalProject)

ExternalProject_Add(node
  URL "https://nodejs.org/dist/v18.4.0/node-v18.4.0.tar.gz"
  CONFIGURE_COMMAND ./configure --prefix=<INSTALL_DIR> --with-intl=small-icu --shared
  INSTALL_COMMAND make install && node ${CMAKE_HOME_DIRECTORY}/scripts/install.js
  BUILD_COMMAND make -j 16
  EXCLUDE_FROM_ALL FALSE
  BUILD_IN_SOURCE TRUE
)
