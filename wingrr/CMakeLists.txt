cmake_minimum_required(VERSION 3.12 FATAL_ERROR)

project(wingrr)

set(CMAKE_CXX_STANDARD 11)
set(CMAKE_ENABLE_EXPORTS ON)
set(CMAKE_VERBOSE_MAKEFILE ON)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(THREADS_PREFER_PTHREAD_FLAG ON)
set(CMAKE_POSITION_INDEPENDENT_CODE ON)

set(NODE_INCLUDE_PREFIX "${CMAKE_CURRENT_SOURCE_DIR}/vendor/node")
set(NODE_LIBRARY_PREFIX "${NODE_INCLUDE_PREFIX}/lib")
set(NODE_LIBRARY_SHARED "${NODE_LIBRARY_PREFIX}/libnode.so")

add_link_options("-Wl,-rpath,./")
find_package(Threads REQUIRED)

# the main library. this is wingrr
add_library(wingrr SHARED src/wingrr.cc
  src/utils/runtime-path.cc
  src/engines/js/libwrr-javascript.cc
  src/engines/ts/libwrr-typescript.cc
  src/bridges/js/node_bridge.cc
)

# compiler configuration to get everything linked and included
file(GLOB NODE_LIBRARY_STATIC RELATIVE ${NODE_LIBRARY_PREFIX} ${NODE_LIBRARY_PREFIX}/*.a)
list(TRANSFORM NODE_LIBRARY_STATIC REPLACE "^lib" "")
list(TRANSFORM NODE_LIBRARY_STATIC REPLACE "\.a$" "")
target_link_directories(wingrr PRIVATE ${NODE_LIBRARY_PREFIX})
target_link_libraries(wingrr PRIVATE

  # shared linking with Node
  ${NODE_LIBRARY_SHARED}

  # static linking with Node
  # uv node v8_libplatform ${NODE_LIBRARY_STATIC}
  # Threads::Threads ${CMAKE_DL_LIBS} m
)
target_include_directories(wingrr PRIVATE
  ${NODE_INCLUDE_PREFIX}/include/node
  ${NODE_INCLUDE_PREFIX}/include
)

# this is a test driver CLI for sanity testing
add_executable(wingrr-cli src/wingrr-cli.cc)
set_target_properties(wingrr-cli PROPERTIES OUTPUT_NAME wingrr)
target_link_libraries(wingrr-cli PUBLIC wingrr)
