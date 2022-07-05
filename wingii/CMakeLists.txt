cmake_minimum_required(VERSION 3.12 FATAL_ERROR)

project(wingii)

set(CMAKE_VERBOSE_MAKEFILE ON)
set(CMAKE_POSITION_INDEPENDENT_CODE ON)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

include_directories(
  ${CMAKE_CURRENT_SOURCE_DIR}/vendor/node/bin/include
  ${CMAKE_CURRENT_SOURCE_DIR}/vendor/node/build/node-prefix/include/node
)
link_directories(${CMAKE_CURRENT_SOURCE_DIR}/bin/lib)
add_library(wingii SHARED wingii.cc)
link_libraries(wingii)

# TODO: make the archive actually usable
# add_link_options(-Wl,--whole-archive)
