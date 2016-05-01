#!/bin/bash

# brew update
brew update

brew install android-sdk
# brew install android-ndk
# brew install android-platform-tools

# Aria2 是 Mac/Linux 下一个不错的高速下载工具。
# 由于它具有分段下载引擎，所以支持从多个地址或者从一个地址的多个连接来下载同一个文件。
# 这样自然就大大加快了文件的下载速度。
# aria2 也具有断点续传功能，这使你随时能够恢复已经中断的文件下载。
# 除了支持一般的 http(s) 和 ftp 协议外，aria2 还支持 BitTorrent 协议。
# 这意味着，你也可以使用 aria2 来下载 torrent 文件。
brew install aria2

brew install cmake
brew install colorsvn
brew install cvs

# GCC 是 GNU 编译器套件（GNU Compiler Collection）
# 包括 C、C++、Objective-C、Fortran、Java、Ada 和 Go 语言的前端，
# 也包括了这些语言的库（如 libstdc++、libgcj 等等）。
brew install gcc

brew install gdb
brew install git
brew install hg
brew install icu4c

# LLVM
brew install llvm
# brew install --with-clang --with-lldb llvm
# brew install cmake pkg-config boost homebrew/x11/gtksourceviewmm3 aspell clang-format

brew install maven

brew install mono

# mysql
brew install mysql
# MyCli 是一个 MySQL 命令行工具，支持自动补全和语法高亮。也可用于 MariaDB 和 Percona。
#
brew install mycli

brew install node

# Pidgin 流行的跨平台即时通讯软件
# brew install pidgin

brew install phantomjs
brew install postgresql
brew install python
brew install qt
# brew install qt5
brew install ruby

brew install subversion


brew install tmux
# Wine是一个非常伟大的项目，能够让用户在Linux、Mac设备上运行Windows应用程序。
# brew cask install xquartz
brew install wine
brew install wget

# brew upgrade
brew upgrade --all
