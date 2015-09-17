cmake_minimum_required(VERSION 3.1)
project(clion_demo)

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++11")

set(SOURCE_FILES main.cpp)
add_executable(clion_demo ${SOURCE_FILES})