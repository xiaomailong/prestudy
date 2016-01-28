#!/bin/bash

# 安装 mono
brew install mono

# Install Visual Studio Code
brew cask install visual-studio-code

# 安装 .NET 版本管理器（DNVM）
curl -sSL https://raw.githubusercontent.com/aspnet/Home/dev/dnvminstall.sh | DNX_BRANCH=dev sh && source ~/.dnx/dnvm/dnvm.sh

# DNVM，.NET Version Manager，就是 .NET 版本管理器，包含更新和配置 .NET 运行环境 ( KRE ) 所使用的一系列工具，
# 是 ASP.NET 5 项目的一个子项目。
# DNVM 的网址：https://github.com/aspnet/dnvm/
brew untap aspnet/dnx
brew tap aspnet/dnx
brew install dnvm
dnvm upgrade

dnvm list

# 安装 .NET 运行环境（DNX）
# 首先，你需要选择安装 mono 还是 coreclr ，从 beta7 开始 coreclr 已经可以用了，不过截至目前，默认安装的是 mono 版的。
# Visual Studio Code 需要 mono 才能提供调试等高级功能。
dnvm upgrade -r mono
# 本文选择coreclr版的运行时，通过以下命令获取最新版的 coreclr ，默认是 x64 。
dnvm upgrade -r coreclr

# 安装 ICU （在coreclr下，需要这个来避免已知问题）
brew install icu4c
