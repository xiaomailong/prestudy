# $ docker pull registry.cn-hangzhou.aliyuncs.com/acs/ubuntu
# FROM registry.cn-hangzhou.aliyuncs.com/acs/ubuntu
FROM ubuntu:latest

MAINTAINER Bolik WaterBolik@163.com

ENV \
    # 配置中文语言
    LANGUAGE zh_CN.UTF-8 \
    LANG zh_CN.UTF-8 \
    LC_ALL=zh_CN.UTF-8 \
    # 设置时区
    TZ "PRC" 
    # 屏蔽交互界面
    # DEBIAN_FRONTEND noninteractive \
    # DEBCONF_NONINTERACTIVE_SEEN true \
    # 屏幕尺寸和颜色深度
    # SCREEN_WIDTH 1360 \
    # SCREEN_HEIGHT 1020 \
    # SCREEN_DEPTH 24 \
    # 可以使用任意Unix套接字编号
    # DISPLAY :99.0 \
    # 设置启动命令
    # APP_START "firefox infoq.com.cn" 

# 使用root用户
USER root

RUN set -ex \
  # 使用apk镜像
  # && echo "deb http://mirrors.aliyun.com/ubuntu trusty main universe" > /etc/apt/sources.list \
  # && echo "deb http://mirrors.aliyun.com/ubuntu trusty-updates main universe" >> /etc/apt/sources.list \
  # && echo "deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ trusty main restricted universe multiverse" > /etc/apt/sources.list
  # && echo "deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ trusty-security main restricted universe multiverse" >> /etc/apt/sources.list
  # && echo "deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ trusty-updates main restricted universe multiverse" >> /etc/apt/sources.list
  # && echo "deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ trusty-backports main restricted universe multiverse" >> /etc/apt/sources.list
  # && echo "deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ trusty-proposed main restricted universe multiverse" >> /etc/apt/sources.list
  # && echo "deb-src http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ trusty main restricted universe multiverse" >> /etc/apt/sources.list
  # && echo "deb-src http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ trusty-security main restricted universe multiverse" >> /etc/apt/sources.list
  # && echo "deb-src http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ trusty-updates main restricted universe multiverse" >> /etc/apt/sources.list
  # && echo "deb-src http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ trusty-backports main restricted universe multiverse" >> /etc/apt/sources.list
  # && echo "deb-src http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ trusty-proposed main restricted universe multiverse" >> /etc/apt/sources.list

  # 采用查找替换法修改镜像源
  # 阿里云镜像：mirrors.aliyun.com
  # 清华镜像：mirrors.tuna.tsinghua.edu.cn
  # Archive.ubuntu.com更新服务器（欧洲，此为官方源，电信网通用户使用)： 
  # Ubuntu.cn99.com更新服务器（江苏省常州市电信，推荐电信用户使用）
  # Mirrors.shlug.org更新服务器（电信服务器，Ubuntu China Official Mirror, maintained by Shanghai Linux User Group）
  # Mirror.lupaworld.com更新服务器（浙江省杭州市双线服务器）： 
  # 
  && sed -i 's/archive.ubuntu.com/mirrors.tuna.tsinghua.edu.cn/' /etc/apt/sources.list \
  
  # -qq隐藏更新Apt缓存过程中打印的日志
  # -y参数来消除更新过程中所有向用户提问的部分
  && apt-get update -y \
  && apt-get upgrade -y \

  # 配置中文语言
  && /usr/share/locales/install-language-pack zh_CN \
  && locale-gen zh_CN.UTF-8 \
  && dpkg-reconfigure --frontend noninteractive locales \
  && apt-get -qqy install \
    # 安装中文包
    language-pack-zh-hans \
    # 安装基本字体
    fonts-ipafont-gothic \
    xfonts-100dpi \
    xfonts-75dpi \
    xfonts-cyrillic \
    xfonts-scalable \
    # 安装文泉驿微米黑字体
    ttf-wqy-microhei \
  # 将文泉驿微米黑设置为系统默认字体
  && ln /etc/fonts/conf.d/65-wqy-microhei.conf /etc/fonts/conf.d/69-language-selector-zh-cn.conf \
  # 设置时区
  && echo "Asia/Shanghai" | tee /etc/timezone \
  && dpkg-reconfigure --frontend noninteractive tzdata \

  # 添加具有免密码sudo权限的普通用户docker
  && useradd docker --shell /bin/bash --create-home \
  && usermod -a -G sudo docker \
  && echo 'docker ALL = (ALL) NOPASSWD: ALL' >> /etc/sudoers \
  && echo 'docker:Pass@word8' | chpasswd \

  # 安装其他基础软件 --no-install-recommends 
  # && apt-get -y install \
  #   curl \
  #   wget \
    # Xvfb的全称是“X virtual frame buffer”，是一种X11服务端的特殊实现。
    # 说比较特殊是因为Xvfb不需要实际的显示装置和硬件驱动，它将渲染的图像内容保存在内存中，
    # 最初的应用场景主要是用于自动化测试等不需要看到执行界面的地方，作为完整X服务的替代。
    # xvfb \
    # Fluxbox：轻量级的窗口管理器。
    # fluxbox \
    # X11vnc，它提供了将X11服务端内容获取出来并展现到远程的用户控制端的功能。
    # x11vnc \

  # 生成Hash过的密码文件
  # && mkdir -p ~/.vnc \
  # && x11vnc -storepasswd pass@word8 ~/.vnc/passwd \

  # 安装Chrome
  # && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  # && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
  # && apt-get -qqy install google-chrome-stable \

  # 安装firefox
  # && apt-get -qqy install firefox \

  # 删除不必要的软件和Apt缓存包列表
  && apt-get autoclean  \
  && apt-get autoremove  \
  && rm -rf /var/lib/apt/lists/* \
  && echo "end"

CMD ["bin/bash"]  

# $ cd /Volumes/Work/OpenSource/WaterBolik/prestudy/docker/ubuntu
# $ docker build -t ubase .
# $ docker   && -it --rm -e DISPLAY=$DISPLAY -v /tmp/.X11-unix:/tmp/.X11-unix ugui
# $ docker   && -d -p 6080:6080 tobegit3hub/dockerized-openoffice