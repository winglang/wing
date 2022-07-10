cmake_minimum_required(VERSION 3.12 FATAL_ERROR)

project(wingrr)

include(FindPkgConfig)
include(ExternalProject)
find_package(JNI REQUIRED)
find_package(Ruby REQUIRED)
find_package(Python3 REQUIRED COMPONENTS Development)
find_package(PkgConfig REQUIRED)
pkg_check_modules(MONO2 REQUIRED mono-2)
pkg_check_modules(LUAJIT REQUIRED luajit)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_POSITION_INDEPENDENT_CODE ON)
set(CMAKE_VERBOSE_MAKEFILE ON)

# https://gitlab.kitware.com/cmake/community/-/wikis/doc/cmake/RPATH-handling
# set(CMAKE_SKIP_RPATH TRUE)
# add_link_options("-Wl,-rpath,./")

# The Go engine is built with its own toolchain
ExternalProject_Add(wingrr-go
  DOWNLOAD_COMMAND ""
  SOURCE_DIR ${CMAKE_HOME_DIRECTORY}/src/go
  CONFIGURE_COMMAND go mod tidy
  INSTALL_COMMAND ${CMAKE_COMMAND} -E copy
  <SOURCE_DIR>/libwrr-go.so ${CMAKE_CURRENT_BINARY_DIR}
  BUILD_COMMAND go build -o libwrr-go.so -buildmode=c-shared libwrr.go
  EXCLUDE_FROM_ALL FALSE
  BUILD_IN_SOURCE TRUE
)

# The C# engine is built with its own toolchain
ExternalProject_Add(wingrr-cs
  DOWNLOAD_COMMAND "" CONFIGURE_COMMAND ""
  SOURCE_DIR ${CMAKE_HOME_DIRECTORY}/src/cs
  INSTALL_COMMAND ${CMAKE_COMMAND} -E copy
  <SOURCE_DIR>/libwrr.dll ${CMAKE_CURRENT_BINARY_DIR}/libwrr-cs.dll
  BUILD_COMMAND csc /target:library /reference:Mono.CSharp.dll libwrr.cs
  EXCLUDE_FROM_ALL FALSE
  BUILD_IN_SOURCE TRUE
)

# The Java engine is built with its own toolchain
ExternalProject_Add(wingrr-java
  DOWNLOAD_COMMAND "" CONFIGURE_COMMAND ""
  SOURCE_DIR ${CMAKE_HOME_DIRECTORY}/src/java
  INSTALL_COMMAND ${CMAKE_COMMAND} -E copy
  <SOURCE_DIR>/libwrr.class ${CMAKE_CURRENT_BINARY_DIR}/libwrr.class
  BUILD_COMMAND javac libwrr.java
  EXCLUDE_FROM_ALL FALSE
  BUILD_IN_SOURCE TRUE
)

# pybind11 is header-only, used for integration with cpython
ExternalProject_Add(pybind11
  URL https://github.com/pybind/pybind11/archive/refs/tags/v2.9.2.zip
  CONFIGURE_COMMAND "" INSTALL_COMMAND "" BUILD_COMMAND ""
  EXCLUDE_FROM_ALL FALSE
  BUILD_IN_SOURCE TRUE
)
ExternalProject_Get_property(pybind11 SOURCE_DIR)
set(PYBIND11_INCLUDE_DIR ${SOURCE_DIR}/include)
unset(SOURCE_DIR)

# sol3 is header-only, used for integration with lua jit
ExternalProject_Add(sol3
  URL https://github.com/ThePhD/sol2/archive/refs/tags/v3.3.0.zip
  CONFIGURE_COMMAND "" INSTALL_COMMAND "" BUILD_COMMAND ""
  EXCLUDE_FROM_ALL FALSE
  BUILD_IN_SOURCE TRUE
)
ExternalProject_Get_property(sol3 SOURCE_DIR)
set(SOL3_INCLUDE_DIR ${SOURCE_DIR}/include)
unset(SOURCE_DIR)

# the main library. this is wingrr
add_library(wingrr SHARED src/wingrr.cc)
add_dependencies(wingrr wingrr-go wingrr-cs wingrr-java pybind11 sol3)

# compiler configuration to get everything linked and included
target_link_options(wingrr PUBLIC LINKER:-z,defs)
target_link_libraries(wingrr PUBLIC
  node wrr-go
  ${Python3_LIBRARIES}
  ${LUAJIT_LIBRARIES}
  ${MONO2_LIBRARIES}
  ${JNI_LIBRARIES}
  ${RUBY_LIBRARY}
)
target_include_directories(wingrr PRIVATE
  ${CMAKE_CURRENT_SOURCE_DIR}/src/go
  ${CMAKE_CURRENT_SOURCE_DIR}/vendor/node/out/include
  ${CMAKE_CURRENT_SOURCE_DIR}/vendor/node/out/include/node
  ${PYBIND11_INCLUDE_DIR}
  ${Python3_INCLUDE_DIRS}
  ${LUAJIT_INCLUDE_DIRS}
  ${MONO2_INCLUDE_DIRS}
  ${RUBY_INCLUDE_DIRS}
  ${JNI_INCLUDE_DIRS}
  ${SOL3_INCLUDE_DIR}
)
target_link_directories(wingrr PUBLIC
  ${CMAKE_CURRENT_SOURCE_DIR}/vendor/node/out/lib
  ${CMAKE_CURRENT_SOURCE_DIR}/src/go
  ${Python3_LIBRARY_DIRS}
  ${MONO2_LIBRARY_DIRS}
  ${JNI_LIBRARY_DIRS}
)

# this is a test driver CLI for sanity testing
add_executable(wingrr-cli src/wingrr-cli.cc)
target_link_libraries(wingrr-cli PUBLIC wingrr)
set_target_properties(wingrr-cli PROPERTIES OUTPUT_NAME wingrr)
add_custom_command(TARGET wingrr-cli POST_BUILD
  COMMAND ${CMAKE_COMMAND} -E copy
  ${CMAKE_CURRENT_SOURCE_DIR}/src/wingrr.h
  ${CMAKE_CURRENT_SOURCE_DIR}/vendor/node/out/lib/libnode.so
  ${CMAKE_CURRENT_BINARY_DIR}/${CMAKE_BUILD_TYPE}/libwingrr.so
  ${CMAKE_CURRENT_BINARY_DIR}/
  COMMAND ${CMAKE_COMMAND} -E tar
  czf ${CMAKE_CURRENT_BINARY_DIR}/wingrr.tar.gz
  ${CMAKE_CURRENT_BINARY_DIR}/wingrr
  ${CMAKE_CURRENT_BINARY_DIR}/wingrr.h
  ${CMAKE_CURRENT_BINARY_DIR}/libnode.so
  ${CMAKE_CURRENT_BINARY_DIR}/libwingrr.so
  ${CMAKE_CURRENT_BINARY_DIR}/libwrr-cs.dll
  ${CMAKE_CURRENT_BINARY_DIR}/libwrr-go.so
  ${CMAKE_CURRENT_BINARY_DIR}/libwrr.class
)
