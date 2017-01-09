#!/bin/bash

# 创建目录
if [ ! -d "/Volumes/Work/OpenSource" ]; then
mkdir "/Volumes/Work/OpenSource"
fi

echo "ES6 相关开源项目更新"
if [ ! -d "/Volumes/Work/OpenSource/ES6" ]; then
mkdir "/Volumes/Work/OpenSource/ES6"
fi
# core-js
if [ -d "/Volumes/Work/OpenSource/ES6/core-js" ]; then
  cd "/Volumes/Work/OpenSource/ES6/core-js"
  git pull
else
  cd "/Volumes/Work/OpenSource/ES6/"
  git clone "https://github.com/zloirock/core-js"
fi
# es-class
if [ -d "/Volumes/Work/OpenSource/ES6/es-class" ]; then
  cd "/Volumes/Work/OpenSource/ES6/es-class"
  git pull
else
  cd "/Volumes/Work/OpenSource/ES6/"
  git clone "https://github.com/WebReflection/es-class"
fi
# es6-collections
if [ -d "/Volumes/Work/OpenSource/ES6/es6-collections" ]; then
  cd "/Volumes/Work/OpenSource/ES6/es6-collections"
  git pull
else
  cd "/Volumes/Work/OpenSource/ES6/"
  git clone "https://github.com/WebReflection/es6-collections"
fi
# es6-promise
if [ -d "/Volumes/Work/OpenSource/ES6/es6-promise" ]; then
  cd "/Volumes/Work/OpenSource/ES6/es6-promise"
  git pull
else
  cd "/Volumes/Work/OpenSource/ES6/"
  git clone "https://github.com/jakearchibald/es6-promise"
fi
# es6-shim
if [ -d "/Volumes/Work/OpenSource/ES6/es6-shim" ]; then
  cd "/Volumes/Work/OpenSource/ES6/es6-shim"
  git pull
else
  cd "/Volumes/Work/OpenSource/ES6/"
  git clone "https://github.com/paulmillr/es6-shim"
fi
# es6-tools
if [ -d "/Volumes/Work/OpenSource/ES6/es6-tools" ]; then
  cd "/Volumes/Work/OpenSource/ES6/es6-tools"
  git pull
else
  cd "/Volumes/Work/OpenSource/ES6/"
  git clone "https://github.com/addyosmani/es6-tools"
fi
# 全栈工程师培训材料，帮助学习者掌握全栈开发的基本知识，承担简单 Web 应用的前后端开发。
# 一共四讲，适合两天的训练营，请先阅读《培训准备》。培训时，需要完成课堂练习。
if [ -d "/Volumes/Work/OpenSource/ES6/jstraining" ]; then
  cd "/Volumes/Work/OpenSource/ES6/jstraining"
  git pull
else
  cd "/Volumes/Work/OpenSource/ES6/"
  git clone "https://github.com/ruanyf/jstraining.git"
fi

echo "Tools 相关开源项目新"
if [ ! -d "/Volumes/Work/OpenSource/Tools" ]; then
mkdir "/Volumes/Work/OpenSource/Tools"
fi
# amphtml
if [ -d "/Volumes/Work/OpenSource/Tools/amphtml" ]; then
  cd "/Volumes/Work/OpenSource/Tools/amphtml"
  git pull
else
  cd "/Volumes/Work/OpenSource/Tools/"
  git clone "https://github.com/ampproject/amphtml.git"
fi
# google-hosts
if [ -d "/Volumes/Work/OpenSource/Tools/google-hosts" ]; then
  cd "/Volumes/Work/OpenSource/Tools/google-hosts"
  git pull
else
  cd "/Volumes/Work/OpenSource/Tools/"
  git clone "https://github.com/txthinking/google-hosts"
fi
# 最新可用的google hosts文件。
if [ -d "/Volumes/Work/OpenSource/Tools/hosts" ]; then
  cd "/Volumes/Work/OpenSource/Tools/hosts"
  git pull
else
  cd "/Volumes/Work/OpenSource/Tools/"
  git clone "https://github.com/racaljk/hosts.git"
fi
# react-native
if [ -d "/Volumes/Work/OpenSource/Tools/react-native" ]; then
  cd "/Volumes/Work/OpenSource/Tools/react-native"
  git pull
else
  cd "/Volumes/Work/OpenSource/Tools/"
  git clone "https://github.com/facebook/react-native"
fi
# react-mix
if [ -d "/Volumes/Work/OpenSource/Tools/react-mix" ]; then
  cd "/Volumes/Work/OpenSource/Tools/react-mix"
  git pull
else
  cd "/Volumes/Work/OpenSource/Tools/"
  git clone "https://github.com/xueduany/react-mix.git"
fi
# react
if [ -d "/Volumes/Work/OpenSource/Tools/react" ]; then
  cd "/Volumes/Work/OpenSource/Tools/react"
  git pull
else
  cd "/Volumes/Work/OpenSource/Tools/"
  git clone "https://github.com/facebook/react"
fi
# flux
if [ -d "/Volumes/Work/OpenSource/Tools/flux" ]; then
  cd "/Volumes/Work/OpenSource/Tools/flux"
  git pull
else
  cd "/Volumes/Work/OpenSource/Tools/"
  git clone "https://github.com/facebook/flux"
fi
# jekyll
if [ -d "/Volumes/Work/OpenSource/Tools/jekyll" ]; then
  cd "/Volumes/Work/OpenSource/Tools/jekyll"
  git pull
else
  cd "/Volumes/Work/OpenSource/Tools/"
  git clone "git://github.com/jekyll/jekyll.git"
fi
# jekyll-bootstrap
if [ -d "/Volumes/Work/OpenSource/Tools/jekyll-bootstrap" ]; then
  cd "/Volumes/Work/OpenSource/Tools/jekyll-bootstrap"
  git pull
else
  cd "/Volumes/Work/OpenSource/Tools/"
  git clone "https://github.com/plusjade/jekyll-bootstrap.git"
fi
# kramdown
if [ -d "/Volumes/Work/OpenSource/Tools/kramdown" ]; then
  cd "/Volumes/Work/OpenSource/Tools/kramdown"
  git pull
else
  cd "/Volumes/Work/OpenSource/Tools/"
  git clone "git://github.com/gettalong/kramdown.git"
fi
# GitHub Markup
if [ -d "/Volumes/Work/OpenSource/Tools/markup" ]; then
  cd "/Volumes/Work/OpenSource/Tools/markup"
  git pull
else
  cd "/Volumes/Work/OpenSource/Tools/"
  git clone "https://github.com/github/markup.git"
fi
# Octopress
if [ -d "/Volumes/Work/OpenSource/Tools/octopress" ]; then
  cd "/Volumes/Work/OpenSource/Tools/octopress"
  git pull
else
  cd "/Volumes/Work/OpenSource/Tools/"
  git clone "https://github.com/octopress/octopress.git"
fi
# stackedit
if [ -d "/Volumes/Work/OpenSource/Tools/stackedit" ]; then
  cd "/Volumes/Work/OpenSource/Tools/stackedit"
  git pull
else
  cd "/Volumes/Work/OpenSource/Tools/"
  git clone "https://github.com/benweet/stackedit.git"
fi
# kramdown-with-pygments
if [ -d "/Volumes/Work/OpenSource/Tools/kramdown-with-pygments" ]; then
  cd "/Volumes/Work/OpenSource/Tools/kramdown-with-pygments"
  git pull
else
  cd "/Volumes/Work/OpenSource/Tools/"
  git clone "https://github.com/mvdbos/kramdown-with-pygments.git"
fi
# Hosts
if [ -d "/Volumes/Work/OpenSource/Tools/Hosts" ]; then
  cd "/Volumes/Work/OpenSource/Tools/Hosts"
  git pull
else
  cd "/Volumes/Work/OpenSource/Tools/"
  git clone "https://github.com/highsea/Hosts.git"
fi
# Electronic WeChat
if [ -d "/Volumes/Work/OpenSource/Tools/electronic-wechat" ]; then
  cd "/Volumes/Work/OpenSource/Tools/electronic-wechat"
  git pull
else
  cd "/Volumes/Work/OpenSource/Tools/"
  git clone "https://github.com/geeeeeeeeek/electronic-wechat.git"
fi
# netdata：实时监视 Linux 系统性能
# netdata 能够监视 CPU、内存、磁盘、网络、进程、应用程序、Apache、NGINX、MySQL、Postfix、Squid 等总计 2000 多项度量指标，
# 并提供可视化的实时显示图表，看起来可谓一目了然。
if [ -d "/Volumes/Work/OpenSource/Tools/netdata" ]; then
  cd "/Volumes/Work/OpenSource/Tools/netdata"
  git pull
else
  cd "/Volumes/Work/OpenSource/Tools/"
  git clone "https://github.com/firehol/netdata.git"
fi
# Atom is a hackable text editor for the 21st century,
# built on Electron, and based on everything we love about our favorite editors.
# We designed it to be deeply customizable, but still approachable using the default configuration.
if [ -d "/Volumes/Work/OpenSource/Tools/atom" ]; then
  cd "/Volumes/Work/OpenSource/Tools/atom"
  git pull
else
  cd "/Volumes/Work/OpenSource/Tools/"
  git clone "https://github.com/atom/atom.git"
fi
# Electron 可以让你使用纯 JavaScript 调用丰富的原生 APIs 来创造桌面应用。
# 你可以把它看作是专注于桌面应用而不是 web 服务器的，io.js 的一个变体。
# 这不意味着 Electron 是绑定了 GUI 库的 JavaScript。
# 相反，Electron 使用 web 页面作为它的 GUI，所以你能把它看作成一个被 JavaScript 控制的，精简版的 Chromium 浏览器。
if [ -d "/Volumes/Work/OpenSource/Tools/electron" ]; then
  cd "/Volumes/Work/OpenSource/Tools/electron"
  git pull
else
  cd "/Volumes/Work/OpenSource/Tools/"
  git clone "https://github.com/electron/electron.git"
fi
# CopyQ：跨平台的高级剪贴板管理器
# 对于频繁的做剪切、拷贝、粘贴之类的操作，有一款剪贴板管理器将会方便不少。
# CopyQ 支持 Linux、Windows、Mac OS X 10.9+ 系统，可跨平台运行。
# 同时，它还具有编辑及脚本化等高级功能，实为不二之选。
if [ -d "/Volumes/Work/OpenSource/Tools/CopyQ" ]; then
  cd "/Volumes/Work/OpenSource/Tools/CopyQ"
  git pull
else
  cd "/Volumes/Work/OpenSource/Tools/"
  git clone "https://github.com/hluk/CopyQ.git"
fi
# TensorFlow is an open source software library for numerical computation using data flow graphs.
# Nodes in the graph represent mathematical operations,
# while the graph edges represent the multidimensional data arrays (tensors) that flow between them.
# This flexible architecture lets you deploy computation to one or more CPUs or GPUs
# in a desktop, server, or mobile device without rewriting code.
# TensorFlow also includes TensorBoard, a data visualization toolkit.
# Computation using data flow graphs for scalable machine learning http://tensorflow.org
if [ -d "/Volumes/Work/OpenSource/Tools/tensorflow" ]; then
  cd "/Volumes/Work/OpenSource/Tools/tensorflow"
  git pull
else
  cd "/Volumes/Work/OpenSource/Tools/"
  git clone "https://github.com/tensorflow/tensorflow.git"
fi

# A tiny style-controlled SVG iconset
if [ -d "/Volumes/Work/OpenSource/Tools/bytesize-icons" ]; then
  cd "/Volumes/Work/OpenSource/Tools/bytesize-icons"
  git pull
else
  cd "/Volumes/Work/OpenSource/Tools/"
  git clone "https://github.com/danklammer/bytesize-icons.git"
fi

#  这个仓库主要是收集非常好用的Mac应用程序、软件以及工具，主要面向开发者和设计师。
if [ -d "/Volumes/Work/OpenSource/Tools/awesome-mac" ]; then
  cd "/Volumes/Work/OpenSource/Tools/awesome-mac"
  git pull
else
  cd "/Volumes/Work/OpenSource/Tools/"
  git clone "https://github.com/jaywcjlove/awesome-mac.git"
fi

# CommAI，Facebook的AI训练和测试系统
if [ -d "/Volumes/Work/OpenSource/Tools/CommAI-env" ]; then
  cd "/Volumes/Work/OpenSource/Tools/CommAI-env"
  git pull
else
  cd "/Volumes/Work/OpenSource/Tools/"
  git clone "https://github.com/facebookresearch/CommAI-env.git"
fi

# FastText是一个旨在协助创建文本表达和分类的可伸缩解决方案的资料库。
# 它最主要的一个优势是适用于非常大的数据库、某种深度神经网络--其中一种经常被拿来解决文本分类问题的解决方案，这意味着它能用于协助文本处理。
# FAIR指出，深度学习方法通常都需要缓慢的训练和测试才能实现。
# FastText能够在几秒钟或几分钟内完成某一个大型数据库的培训。
# 类似于它这样的系统已经在网络的垃圾邮件过滤中得到运用，相信伴随着fastText的开源，像Siri、Google Now等这样的语音助手将能更有效地对自然语言展开解析。
# fastText is a library for efficient learning of word representations and sentence classification.
if [ -d "/Volumes/Work/OpenSource/Tools/fastText" ]; then
  cd "/Volumes/Work/OpenSource/Tools/fastText"
  git pull
else
  cd "/Volumes/Work/OpenSource/Tools/"
  git clone "https://github.com/facebookresearch/fastText.git"
fi

# artistic QR Code in Python （Animated GIF qr code）
# Python 艺术二维码生成器 （GIF动态二维码、图片二维码）
if [ -d "/Volumes/Work/OpenSource/Tools/qrcode" ]; then
  cd "/Volumes/Work/OpenSource/Tools/qrcode"
  git pull
else
  cd "/Volumes/Work/OpenSource/Tools/"
  git clone "https://github.com/sylnsfar/qrcode.git"
fi

# 悟空全文搜索引擎
if [ -d "/Volumes/Work/OpenSource/Tools/wukong" ]; then
  cd "/Volumes/Work/OpenSource/Tools/wukong"
  git pull
else
  cd "/Volumes/Work/OpenSource/Tools/"
  git clone "https://github.com/huichen/wukong.git"
fi


# Google 深度学习笔记
if [ -d "/Volumes/Work/OpenSource/Tools/GDLnotes" ]; then
  cd "/Volumes/Work/OpenSource/Tools/GDLnotes"
  git pull
else
  cd "/Volumes/Work/OpenSource/Tools/"
  git clone "https://github.com/ahangchen/GDLnotes.git"
fi

# StuQ 程序员技能图谱 http://skill-map.stuq.org/
if [ -d "/Volumes/Work/OpenSource/Tools/skill-map" ]; then
  cd "/Volumes/Work/OpenSource/Tools/skill-map"
  git pull
else
  cd "/Volumes/Work/OpenSource/Tools/"
  git clone "https://github.com/TeamStuQ/skill-map.git"
fi

# 中国人的数据库分支AliSQL开放源代码下载 功能新增秒杀场景优化、TokuDB
if [ -d "/Volumes/Work/OpenSource/Tools/AliSQL" ]; then
  cd "/Volumes/Work/OpenSource/Tools/AliSQL"
  git pull
else
  cd "/Volumes/Work/OpenSource/Tools/"
  git clone "https://github.com/alibaba/AliSQL.git"
fi

# Generate Google Slides from markdown
if [ -d "/Volumes/Work/OpenSource/Tools/md2googleslides" ]; then
  cd "/Volumes/Work/OpenSource/Tools/md2googleslides"
  git pull
else
  cd "/Volumes/Work/OpenSource/Tools/"
  git clone "https://github.com/googlesamples/md2googleslides.git"
fi

# markdown wiki by python
# 采用Python+Flask+Redis+SQLite开发
# 首先它的定位是一款wiki系统，旨在作为个人或小团队的知识库管理系统。
#   markdown编辑器支持图片粘贴与拖拽上传,支持实时预览。
#   wiki检索
#   图片管理
#   备份管理
#   标签
#   文章编辑定时独占锁定
#   IP、session两层登录次数等限制及登录验证码。
#   通过fabric支持自动化分发部署
#   不开放注册，仅限个人或小团体使用。
#   提供dokuwiki to markdown转换脚本
#   其他
if [ -d "/Volumes/Work/OpenSource/Tools/mdwiki" ]; then
  cd "/Volumes/Work/OpenSource/Tools/mdwiki"
  git pull
else
  cd "/Volumes/Work/OpenSource/Tools/"
  git clone "https://github.com/xbynet/mdwiki.git"
fi

echo "Web 相关开源项目更新"
if [ ! -d "/Volumes/Work/OpenSource/Web" ]; then
mkdir "/Volumes/Work/OpenSource/Web"
fi
# 18F Pages
if [ -d "/Volumes/Work/OpenSource/Web/pages" ]; then
  cd "/Volumes/Work/OpenSource/Web/pages"
  git pull
else
  cd "/Volumes/Work/OpenSource/Web/"
  git clone "https://github.com/18F/pages"
fi
# web-design-standards
if [ -d "/Volumes/Work/OpenSource/Web/web-design-standards" ]; then
  cd "/Volumes/Work/OpenSource/Web/web-design-standards"
  git pull
else
  cd "/Volumes/Work/OpenSource/Web/"
  git clone "https://github.com/18F/web-design-standards.git"
fi
# web-design-standards-assets
if [ -d "/Volumes/Work/OpenSource/Web/web-design-standards-assets" ]; then
  cd "/Volumes/Work/OpenSource/Web/web-design-standards-assets"
  git pull
else
  cd "/Volumes/Work/OpenSource/Web/"
  git clone "https://github.com/18F/web-design-standards-assets.git"
fi
# netlify-cms
if [ -d "/Volumes/Work/OpenSource/Web/netlify-cms" ]; then
  cd "/Volumes/Work/OpenSource/Web/netlify-cms"
  git pull
else
  cd "/Volumes/Work/OpenSource/Web/"
  git clone "https://github.com/netlify/netlify-cms.git"
fi
# Bourbon
if [ -d "/Volumes/Work/OpenSource/Web/bourbon" ]; then
  cd "/Volumes/Work/OpenSource/Web/bourbon"
  git pull
else
  cd "/Volumes/Work/OpenSource/Web/"
  git clone "https://github.com/thoughtbot/bourbon.git"
fi
# Neat
if [ -d "/Volumes/Work/OpenSource/Web/neat" ]; then
  cd "/Volumes/Work/OpenSource/Web/neat"
  git pull
else
  cd "/Volumes/Work/OpenSource/Web/"
  git clone "https://github.com/thoughtbot/neat.git"
fi
# Bitters
if [ -d "/Volumes/Work/OpenSource/Web/bitters" ]; then
  cd "/Volumes/Work/OpenSource/Web/bitters"
  git pull
else
  cd "/Volumes/Work/OpenSource/Web/"
  git clone "https://github.com/thoughtbot/bitters.git"
fi
# Refills
if [ -d "/Volumes/Work/OpenSource/Web/refills" ]; then
  cd "/Volumes/Work/OpenSource/Web/refills"
  git pull
else
  cd "/Volumes/Work/OpenSource/Web/"
  git clone "https://github.com/thoughtbot/refills.git"
fi
# normalize.css
if [ -d "/Volumes/Work/OpenSource/Web/normalize.css" ]; then
  cd "/Volumes/Work/OpenSource/Web/normalize.css"
  git pull
else
  cd "/Volumes/Work/OpenSource/Web/"
  git clone "https://github.com/necolas/normalize.css.git"
fi
# react-native-web
if [ -d "/Volumes/Work/OpenSource/Web/react-native-web" ]; then
  cd "/Volumes/Work/OpenSource/Web/react-native-web"
  git pull
else
  cd "/Volumes/Work/OpenSource/Web/"
  git clone "https://github.com/necolas/react-native-web.git"
fi
# lib-flexible
if [ -d "/Volumes/Work/OpenSource/Web/lib-flexible" ]; then
  cd "/Volumes/Work/OpenSource/Web/lib-flexible"
  git pull
else
  cd "/Volumes/Work/OpenSource/Web/"
  git clone "https://github.com/amfe/lib-flexible.git"
fi
# prism
if [ -d "/Volumes/Work/OpenSource/Web/prism" ]; then
  cd "/Volumes/Work/OpenSource/Web/prism"
  git pull
else
  cd "/Volumes/Work/OpenSource/Web/"
  git clone "https://github.com/PrismJS/prism.git"
fi
# typo.css
if [ -d "/Volumes/Work/OpenSource/Web/typo.css" ]; then
  cd "/Volumes/Work/OpenSource/Web/typo.css"
  git pull
else
  cd "/Volumes/Work/OpenSource/Web/"
  git clone "https://github.com/sofish/typo.css.git"
fi

echo "Cpp 相关开源项目新"
if [ ! -d "/Volumes/Work/OpenSource/Cpp" ]; then
mkdir "/Volumes/Work/OpenSource/Cpp"
fi
# CPPFormatLibrary
if [ -d "/Volumes/Work/OpenSource/Cpp/CPPFormatLibrary" ]; then
  cd "/Volumes/Work/OpenSource/Cpp/CPPFormatLibrary"
  git pull
else
  cd "/Volumes/Work/OpenSource/Cpp/"
  git clone "https://github.com/sczybt/CPPFormatLibrary"
fi
# fann
if [ -d "/Volumes/Work/OpenSource/Cpp/fann" ]; then
  cd "/Volumes/Work/OpenSource/Cpp/fann"
  git pull
else
  cd "/Volumes/Work/OpenSource/Cpp/"
  git clone "https://github.com/libfann/fann"
fi
# google-glog
if [ -d "/Volumes/Work/OpenSource/Cpp/google-glog" ]; then
  cd "/Volumes/Work/OpenSource/Cpp/google-glog"
  git pull
else
  cd "/Volumes/Work/OpenSource/Cpp/"
  git clone "https://github.com/svn2github/google-glog.git"
fi
# googlemock
if [ -d "/Volumes/Work/OpenSource/Cpp/googlemock" ]; then
  cd "/Volumes/Work/OpenSource/Cpp/googlemock"
  git pull
else
  cd "/Volumes/Work/OpenSource/Cpp/"
  git clone "https://github.com/svn2github/googlemock.git"
fi
# googletest
if [ -d "/Volumes/Work/OpenSource/Cpp/googletest" ]; then
  cd "/Volumes/Work/OpenSource/Cpp/googletest"
  git pull
else
  cd "/Volumes/Work/OpenSource/Cpp/"
  git clone "https://github.com/svn2github/googletest.git"
fi
# log4cxx
if [ -d "/Volumes/Work/OpenSource/Cpp/log4cxx" ]; then
  cd "/Volumes/Work/OpenSource/Cpp/log4cxx"
  git pull
else
  cd "/Volumes/Work/OpenSource/Cpp/"
  git clone "https://github.com/apache/log4cxx.git"
fi
# protobuf
if [ -d "/Volumes/Work/OpenSource/Cpp/protobuf" ]; then
  cd "/Volumes/Work/OpenSource/Cpp/protobuf"
  git pull
else
  cd "/Volumes/Work/OpenSource/Cpp/"
  git clone "https://github.com/svn2github/protobuf.git"
fi
# Computational Network Toolkit (CNTK)
if [ -d "/Volumes/Work/OpenSource/Cpp/CNTK" ]; then
  cd "/Volumes/Work/OpenSource/Cpp/CNTK"
  git pull
else
  cd "/Volumes/Work/OpenSource/Cpp/"
  git clone "https://github.com/Microsoft/CNTK.git"
fi
# juCi++
# a lightweight, platform independent C++-IDE with support for C++11, C++14, and experimental C++17 features
# depending on libclang version.
if [ -d "/Volumes/Work/OpenSource/Cpp/jucipp" ]; then
  cd "/Volumes/Work/OpenSource/Cpp/jucipp"
  git pull
else
  cd "/Volumes/Work/OpenSource/Cpp/"
  git clone "https://github.com/cppit/jucipp"
fi

# ZeroMQ core engine in C++, implements ZMTP/3.0 http://www.zeromq.org
if [ -d "/Volumes/Work/OpenSource/Cpp/libzmq" ]; then
  cd "/Volumes/Work/OpenSource/Cpp/libzmq"
  git pull
else
  cd "/Volumes/Work/OpenSource/Cpp/"
  git clone "https://github.com/zeromq/libzmq.git"
fi

# NN++ NNplusplus
# A small and easy to use neural net implementation for C++. Just download and #include!
if [ -d "/Volumes/Work/OpenSource/Cpp/NNplusplus" ]; then
  cd "/Volumes/Work/OpenSource/Cpp/NNplusplus"
  git pull
else
  cd "/Volumes/Work/OpenSource/Cpp/"
  git clone "https://github.com/stagadish/NNplusplus.git"
fi

# JavaScript 相关例程更新
if [ ! -d "/Volumes/Work/OpenSource/JavaScript" ]; then
mkdir "/Volumes/Work/OpenSource/JavaScript"
fi
# mojs motion graphics toolbelt for the web http://mojs.io/
if [ -d "/Volumes/Work/OpenSource/JavaScript/mojs" ]; then
  cd "/Volumes/Work/OpenSource/JavaScript/mojs"
  git pull
else
  cd "/Volumes/Work/OpenSource/JavaScript/"
  git clone "https://github.com/legomushroom/mojs.git"
fi
# Sorts JavaScript 十大经典排序算法
if [ -d "/Volumes/Work/OpenSource/JavaScript/Sorts" ]; then
  cd "/Volumes/Work/OpenSource/JavaScript/Sorts"
  git pull
else
  cd "/Volumes/Work/OpenSource/JavaScript/"
  git clone "https://github.com/damonare/Sorts.git"
fi
# nodePPT - 让你爱上做分享！
if [ -d "/Volumes/Work/OpenSource/JavaScript/nodePPT" ]; then
  cd "/Volumes/Work/OpenSource/JavaScript/nodePPT"
  git pull
else
  cd "/Volumes/Work/OpenSource/JavaScript/"
  git clone "https://github.com/ksky521/nodePPT.git"
fi

# Hadoop 生态更新
if [ ! -d "/Volumes/Work/OpenSource/Hadoop" ]; then
mkdir "/Volumes/Work/OpenSource/Hadoop"
fi

# Run Hadoop Custer within Docker Containers
if [ -d "/Volumes/Work/OpenSource/Hadoop/hadoop-cluster-docker" ]; then
  cd "/Volumes/Work/OpenSource/Hadoop/hadoop-cluster-docker"
  git pull
else
  cd "/Volumes/Work/OpenSource/Hadoop/"
  git clone "https://github.com/kiwenlau/hadoop-cluster-docker.git"
fi

# Apache Hadoop on Docker
if [ -d "/Volumes/Work/OpenSource/Hadoop/hadoop-docker" ]; then
  cd "/Volumes/Work/OpenSource/Hadoop/hadoop-docker"
  git pull
else
  cd "/Volumes/Work/OpenSource/Hadoop/"
  git clone "https://github.com/sequenceiq/hadoop-docker.git"
fi

# Docker contaier to build Apache Hadoop
if [ -d "/Volumes/Work/OpenSource/Hadoop/docker-hadoop-build" ]; then
  cd "/Volumes/Work/OpenSource/Hadoop/docker-hadoop-build"
  git pull
else
  cd "/Volumes/Work/OpenSource/Hadoop/"
  git clone "https://github.com/sequenceiq/docker-hadoop-build.git"
fi

# Apache Spark on Docker
if [ -d "/Volumes/Work/OpenSource/Hadoop/docker-spark" ]; then
  cd "/Volumes/Work/OpenSource/Hadoop/docker-spark"
  git pull
else
  cd "/Volumes/Work/OpenSource/Hadoop/"
  git clone "https://github.com/sequenceiq/docker-spark.git"
fi

# Docker PAM workaround
# If you start your docker container with host networking enabled then due to a kernel bug commands like su does not work.
# One solution for this issue is to patch the host kernel with the following: AUDIT: Allow login in non-init namespaces
# Another option is to patch the libpam on the guest OS running inside the docker container.
# For this purpose the sequenceiq/pam images are created for the most popular operating systems.
if [ -d "/Volumes/Work/OpenSource/Hadoop/docker-pam" ]; then
  cd "/Volumes/Work/OpenSource/Hadoop/docker-pam"
  git pull
else
  cd "/Volumes/Work/OpenSource/Hadoop/"
  git clone "https://github.com/sequenceiq/docker-pam.git"
fi

# CentOS-Dockerfiles
# This repository provides Dockerfiles for use with CentOS.
# Popular implementations here will be published to the CentOS namespace in the docker index.
if [ -d "/Volumes/Work/OpenSource/Hadoop/CentOS-Dockerfiles" ]; then
  cd "/Volumes/Work/OpenSource/Hadoop/CentOS-Dockerfiles"
  git pull
else
  cd "/Volumes/Work/OpenSource/Hadoop/"
  git clone "https://github.com/CentOS/CentOS-Dockerfiles.git"
fi

# A semi-random collection of odds and ends.
if [ -d "/Volumes/Work/OpenSource/Hadoop/dockerfiles" ]; then
  cd "/Volumes/Work/OpenSource/Hadoop/dockerfiles"
  git pull
else
  cd "/Volumes/Work/OpenSource/Hadoop/"
  git clone "https://github.com/tianon/dockerfiles.git"
fi

# Docker Official Image packaging for Java (openJDK) http://openjdk.java.net
if [ -d "/Volumes/Work/OpenSource/Hadoop/openjdk" ]; then
  cd "/Volumes/Work/OpenSource/Hadoop/openjdk"
  git pull
else
  cd "/Volumes/Work/OpenSource/Hadoop/"
  git clone "https://github.com/docker-library/openjdk.git"
fi

# CoreOS Vagrant
# This repo provides a template Vagrantfile to create a CoreOS virtual machine using the VirtualBox software hypervisor.
# After setup is complete you will have a single CoreOS virtual machine running on your local machine.
if [ -d "/Volumes/Work/OpenSource/Hadoop/coreos-vagrant" ]; then
  cd "/Volumes/Work/OpenSource/Hadoop/coreos-vagrant"
  git pull
else
  cd "/Volumes/Work/OpenSource/Hadoop/"
  git clone "https://github.com/coreos/coreos-vagrant.git"
fi

# Apache Spark™
if [ -d "/Volumes/Work/OpenSource/Hadoop/spark" ]; then
  cd "/Volumes/Work/OpenSource/Hadoop/spark"
  git pull
else
  cd "/Volumes/Work/OpenSource/Hadoop/"
  git clone "https://github.com/apache/spark.git"
fi

# Apache CarbonData (Incubating)
if [ -d "/Volumes/Work/OpenSource/Hadoop/incubator-carbondata" ]; then
  cd "/Volumes/Work/OpenSource/Hadoop/incubator-carbondata"
  git pull
else
  cd "/Volumes/Work/OpenSource/Hadoop/"
  git clone "https://github.com/apache/incubator-carbondata.git"
fi

# # Sample 相关例程更新
# if [ ! -d "/Volumes/Work/OpenSource/Sample" ]; then
# mkdir "/Volumes/Work/OpenSource/Sample"
# fi
#
# if [ -d "/Volumes/Work/OpenSource/Sample/so" ]; then
#   cd "/Volumes/Work/OpenSource/Sample/so"
#   git pull
# else
#   cd "/Volumes/Work/OpenSource/Sample/"
#   git clone "https://github.com/ca0gu0/so"
# fi
#
# if [ -d "/Volumes/Work/OpenSource/Sample/mm" ]; then
#   cd "/Volumes/Work/OpenSource/Sample/mm"
#   git pull
# else
#   cd "/Volumes/Work/OpenSource/Sample/"
#   git clone "https://github.com/tsq/mm"
# fi
#
# if [ -d "/Volumes/Work/OpenSource/Sample/React-Learning" ]; then
#   cd "/Volumes/Work/OpenSource/Sample/React-Learning"
#   git pull
# else
#   cd "/Volumes/Work/OpenSource/Sample/"
#   git clone "https://github.com/zhangmengxue/React-Learning"
# fi
#
# if [ -d "/Volumes/Work/OpenSource/Sample/browserify-babel-demo" ]; then
#   cd "/Volumes/Work/OpenSource/Sample/browserify-babel-demo"
#   git pull
# else
#   cd "/Volumes/Work/OpenSource/Sample/"
#   git clone "https://github.com/sitepoint-editors/browserify-babel-demo"
# fi
