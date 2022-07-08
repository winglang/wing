cmake_minimum_required(VERSION 3.12 FATAL_ERROR)

project(wingpf)

include(FindPkgConfig)
find_package(PkgConfig REQUIRED)
pkg_check_modules(MONO2 REQUIRED mono-2)

set(CMAKE_VERBOSE_MAKEFILE ON)
set(CMAKE_POSITION_INDEPENDENT_CODE ON)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

include_directories(
  ${CMAKE_CURRENT_SOURCE_DIR}/src/go
  ${CMAKE_CURRENT_SOURCE_DIR}/vendor/node/out/include
  ${CMAKE_CURRENT_SOURCE_DIR}/vendor/node/out/include/node
  ${MONO2_INCLUDE_DIRS}
)

add_link_options(LINKER:-z,defs)

add_library(wingpf SHARED wingpf.cc)
target_link_libraries(wingpf PRIVATE node ${MONO2_LIBRARIES} wrr-go)
target_link_directories(wingpf PRIVATE
  ${CMAKE_CURRENT_SOURCE_DIR}/vendor/node/out/lib
  ${CMAKE_CURRENT_SOURCE_DIR}/src/go
  ${MONO2_LIBRARY_DIRS}
)

add_executable(wingpf-cli wingpf-cli.cc)
target_link_libraries(wingpf-cli PRIVATE wingpf)
