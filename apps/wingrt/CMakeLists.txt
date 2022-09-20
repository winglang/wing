cmake_minimum_required(VERSION 3.2 FATAL_ERROR)

project(wingrt)

set(CMAKE_CXX_STANDARD 11)
set(CMAKE_ENABLE_EXPORTS ON)
set(CMAKE_VERBOSE_MAKEFILE ON)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(THREADS_PREFER_PTHREAD_FLAG ON)
set(CMAKE_POSITION_INDEPENDENT_CODE ON)

set(NODE_INCLUDE_PREFIX "${CMAKE_CURRENT_SOURCE_DIR}/vendor/node")
set(NODE_LIBRARY_PREFIX "${NODE_INCLUDE_PREFIX}/lib")

find_package(Threads REQUIRED)

file(GLOB NODE_LIBRARY_STATIC RELATIVE ${NODE_LIBRARY_PREFIX} ${NODE_LIBRARY_PREFIX}/*.a)
list(TRANSFORM NODE_LIBRARY_STATIC REPLACE "^lib" "")
list(TRANSFORM NODE_LIBRARY_STATIC REPLACE "\.a$" "")

# main target
add_executable(wingrt
  ../../libs/tree-sitter-wing/src/parser.c
  src/wingrt.cc
)

# webpack target that builds the src/entry.js
add_custom_target(bundle ALL npx webpack
  COMMAND ${CMAKE_COMMAND} -E touch ${CMAKE_CURRENT_SOURCE_DIR}/src/wingrt.cc
  WORKING_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}
  SOURCES ${CMAKE_CURRENT_SOURCE_DIR}/src/entry.js
)

add_dependencies(wingrt bundle)

# v8 headers are not properly guarded against multiple C++ ABIs
target_compile_definitions(wingrt PRIVATE -Dremove_cv_t=remove_cv)

target_link_directories(wingrt PRIVATE
  ${NODE_LIBRARY_PREFIX}
  ../../target/release
)
target_link_libraries(wingrt PRIVATE
  uv node v8_libplatform ${NODE_LIBRARY_STATIC}
  Threads::Threads ${CMAKE_DL_LIBS} m wingc
)
target_include_directories(wingrt PRIVATE
  ${NODE_INCLUDE_PREFIX}/include/node
  ${NODE_INCLUDE_PREFIX}/include
  ../../libs/tree-sitter-wing/src
)
