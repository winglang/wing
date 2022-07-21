cmake_minimum_required(VERSION 3.12 FATAL_ERROR)

project(wingrr)

include(ExternalProject)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_POSITION_INDEPENDENT_CODE ON)
set(CMAKE_VERBOSE_MAKEFILE ON)

if(DEFINED ENV{CI})
  set(NODE_INCLUDE_PREFIX "/usr/local")
  set(NODE_LIBRARY_PREFIX "/usr/local/lib")
  set(NODE_LIBRARY_SHARED "${NODE_LIBRARY_PREFIX}/libnode.so")
else()
  set(NODE_INCLUDE_PREFIX "${CMAKE_CURRENT_SOURCE_DIR}/vendor/node/out")
  set(NODE_LIBRARY_PREFIX "${NODE_INCLUDE_PREFIX}/lib")
  set(NODE_LIBRARY_SHARED "${NODE_LIBRARY_PREFIX}/libnode.so")
endif()

# https://gitlab.kitware.com/cmake/community/-/wikis/doc/cmake/RPATH-handling
# set(CMAKE_SKIP_RPATH TRUE)
# add_link_options("-Wl,-rpath,./")

# the main library. this is wingrr
add_library(wingrr SHARED src/wingrr.cc
  src/utils/runtime-path.cc
  src/engines/js/libwrr-javascript.cc
  src/engines/ts/libwrr-typescript.cc
  src/bridges/js/node_bridge.cc
)

# compiler configuration to get everything linked and included
target_link_options(wingrr PUBLIC LINKER:-z,defs)
target_link_libraries(wingrr PUBLIC
  ${NODE_LIBRARY_SHARED}
)
target_include_directories(wingrr PRIVATE
  ${NODE_INCLUDE_PREFIX}/include/node
  ${NODE_INCLUDE_PREFIX}/include
)
target_link_directories(wingrr PUBLIC
  ${NODE_LIBRARY_PREFIX}
)

# this is a test driver CLI for sanity testing
add_executable(wingrr-cli src/wingrr-cli.cc)
target_link_libraries(wingrr-cli PUBLIC wingrr)
set_target_properties(wingrr-cli PROPERTIES OUTPUT_NAME wingrr)
