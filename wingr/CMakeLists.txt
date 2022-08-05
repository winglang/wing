cmake_minimum_required(VERSION 3.12 FATAL_ERROR)

project(wingr)

set(CMAKE_CXX_STANDARD 11)
set(CMAKE_ENABLE_EXPORTS ON)
set(CMAKE_VERBOSE_MAKEFILE ON)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(THREADS_PREFER_PTHREAD_FLAG ON)
set(CMAKE_POSITION_INDEPENDENT_CODE ON)

set(NODE_INCLUDE_PREFIX "${CMAKE_CURRENT_SOURCE_DIR}/vendor/node")
set(NODE_LIBRARY_PREFIX "${NODE_INCLUDE_PREFIX}/lib")

add_link_options("-Wl,-rpath,./")
find_package(Threads REQUIRED)

# the main library. this is wingr
add_library(wingr STATIC src/wingr.cc
  src/utils/runtime-path.cc
  src/engines/js/libwr-javascript.cc
  src/engines/ts/libwr-typescript.cc
  src/engines/wing/libwr-wing.cc
  src/bridges/js/node_bridge.cc
  ../wingc/grammar/src/parser.c
)

# compiler configuration to get everything linked and included
file(GLOB NODE_LIBRARY_STATIC RELATIVE ${NODE_LIBRARY_PREFIX} ${NODE_LIBRARY_PREFIX}/*.a)
list(TRANSFORM NODE_LIBRARY_STATIC REPLACE "^lib" "")
list(TRANSFORM NODE_LIBRARY_STATIC REPLACE "\.a$" "")
target_link_directories(wingr PUBLIC
  ${NODE_LIBRARY_PREFIX}
  ../wingc/target/release
)
target_link_libraries(wingr PUBLIC
  uv node v8_libplatform ${NODE_LIBRARY_STATIC}
  Threads::Threads ${CMAKE_DL_LIBS} m wingc
)
target_include_directories(wingr PRIVATE
  ${NODE_INCLUDE_PREFIX}/include/node
  ${NODE_INCLUDE_PREFIX}/include
  ../wingc/grammar/src
)

# this is a test driver CLI for sanity testing
add_executable(wingr-cli src/wingr-cli.cc)
set_target_properties(wingr-cli PROPERTIES OUTPUT_NAME wingr)
target_link_libraries(wingr-cli PUBLIC wingr)
