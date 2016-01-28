#!/bin/bash

# 临时使用淘宝 npm 库

# 淘宝 NPM 镜像
# npm install -g cnpm --registry=https://registry.npm.taobao.org

#alias for cnpm in .bashrc or .zshrc
# alias cnpm="npm --registry=https://registry.npm.taobao.org --cache=$HOME/.npm/.cache/cnpm --disturl=https://npm.taobao.org/dist --userconfig=$HOME/.cnpmrc"

# npm update
cnpm update -g

# npm install -g
cnpm install -g bower
cnpm install -g browserify
cnpm install -g express
cnpm install -g forever
cnpm install -g grunt-cli
cnpm install -g grunt-init
cnpm install -g gulp
cnpm install -g node-gyp
cnpm install -g node-inspector
cnpm install -g react-native-cli
cnpm install -g semver
cnpm install -g strongloop
cnpm install -g supervisor
cnpm install -g typescript
cnpm install -g webpack

# Yeoman 是一个创建项目框架的应用，使用它我们可以创建出网站项目的基本框架。
cnpm install -g yo
# 安装 yeoman 之后，还需要安装 OmniSharp ASP.NET generators。
cnpm install -g yo generator-aspnet

# brew upgrade
brew upgrade --all
