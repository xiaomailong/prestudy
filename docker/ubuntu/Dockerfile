# $ docker pull registry.cn-hangzhou.aliyuncs.com/acs/ubuntu
FROM registry.cn-hangzhou.aliyuncs.com/acs/ubuntu
# FROM ubuntu

MAINTAINER Bolik WaterBolik@163.com

# 配置中文语言
ENV LANGUAGE zh_CN.UTF-8 
ENV LANG zh_CN.UTF-8
ENV LC_ALL=zh_CN.UTF-8

# 设置时区
ENV TZ "PRC"

# 屏蔽交互界面
ENV DEBIAN_FRONTEND noninteractive
ENV DEBCONF_NONINTERACTIVE_SEEN true

# 屏幕尺寸和颜色深度
ENV SCREEN_WIDTH 1360
ENV SCREEN_HEIGHT 1020
ENV SCREEN_DEPTH 24

# 可以使用任意Unix套接字编号
ENV DISPLAY :99.0

# 暴露VNC的端口
EXPOSE 5900

# 拷贝启动脚本
COPY entry_point.sh /opt/bin/entry_point.sh 

# 设置启动命令
ENV APP_START "firefox infoq.com.cn"

# Ubuntu官方的Apt源地址
#   "deb http://archive.ubuntu.com/ubuntu trusty main universe"
#   "deb http://archive.ubuntu.com/ubuntu trusty-updates main universe"


RUN set -ex \
  # 使用apk镜像
  # && echo "deb http://mirrors.aliyun.com/ubuntu trusty main universe" > /etc/apt/sources.list \
  # && echo "deb http://mirrors.aliyun.com/ubuntu trusty-updates main universe" >> /etc/apt/sources.list \
  && echo "deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ trusty main restricted universe multiverse" > /etc/apt/sources.list
  && echo "deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ trusty-security main restricted universe multiverse" >> /etc/apt/sources.list
  && echo "deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ trusty-updates main restricted universe multiverse" >> /etc/apt/sources.list
  && echo "deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ trusty-backports main restricted universe multiverse" >> /etc/apt/sources.list
  && echo "deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ trusty-proposed main restricted universe multiverse" >> /etc/apt/sources.list
  && echo "deb-src http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ trusty main restricted universe multiverse" >> /etc/apt/sources.list
  && echo "deb-src http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ trusty-security main restricted universe multiverse" >> /etc/apt/sources.list
  && echo "deb-src http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ trusty-updates main restricted universe multiverse" >> /etc/apt/sources.list
  && echo "deb-src http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ trusty-backports main restricted universe multiverse" >> /etc/apt/sources.list
  && echo "deb-src http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ trusty-proposed main restricted universe multiverse" >> /etc/apt/sources.list

  # 采用查找替换法修改镜像源
  # && sed -i 's/archive.ubuntu.com/mirrors.aliyun.com/'       /etc/apt/sources.list \
  
  # -qq隐藏更新Apt缓存过程中打印的日志
  # -y参数来消除更新过程中所有向用户提问的部分
  && apt-get update -y \
  && apt-get upgrade -y \

  # 配置中文语言 --no-install-recommends
  && /usr/share/locales/install-language-pack zh_CN \
  && locale-gen zh_CN.UTF-8 \
  && dpkg-reconfigure --frontend noninteractive locales \
  && apt-get -qqy install language-pack-zh-hans \
  # 安装基本字体 --no-install-recommends
  && apt-get -qqy install \
    fonts-ipafont-gothic \
    xfonts-100dpi \
    xfonts-75dpi \
    xfonts-cyrillic \
    xfonts-scalable \
  # 安装文泉驿微米黑字体
  && apt-get -qqy install ttf-wqy-microhei \
  && ln /etc/fonts/conf.d/65-wqy-microhei.conf /etc/fonts/conf.d/69-language-selector-zh-cn.conf \
  # 设置时区
  && echo "Asia/Shanghai" | tee /etc/timezone \
  && dpkg-reconfigure --frontend noninteractive tzdata \

  # 添加具有免密码sudo权限的普通用用户
  && useradd bolik --shell /bin/bash --create-home \
  && usermod -a -G sudo bolik \
  && echo 'bolik ALL = (ALL) NOPASSWD: ALL' >> /etc/sudoers \
  && echo 'bolik:pass@word8' | chpasswd \

  # 安装其他基础软件 --no-install-recommends 
  && apt-get -y install \
    curl \
    wget \
    # Xvfb的全称是“X virtual frame buffer”，是一种X11服务端的特殊实现。
    # 说比较特殊是因为Xvfb不需要实际的显示装置和硬件驱动，它将渲染的图像内容保存在内存中，
    # 最初的应用场景主要是用于自动化测试等不需要看到执行界面的地方，作为完整X服务的替代。
    xvfb \
    # Fluxbox：轻量级的窗口管理器。
    fluxbox \
    # X11vnc，它提供了将X11服务端内容获取出来并展现到远程的用户控制端的功能。
    x11vnc \

  # 生成Hash过的密码文件
  && mkdir -p ~/.vnc \
  && x11vnc -storepasswd pass@word8 ~/.vnc/passwd \

  # 安装Chrome
  # && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  # && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
  # && apt-get -qqy install google-chrome-stable \

  # 安装firefox
  && apt-get -qqy install firefox \

  # 删除不必要的软件和Apt缓存包列表
  && apt-get autoclean  \
  && apt-get autoremove  \
  && rm -rf /var/lib/apt/lists/* \

  # 给启动脚本权限
  && chmod +x /opt/bin/entry_point.sh

CMD ["/opt/bin/entry_point.sh"]  

# $ cd /Volumes/Work/OpenSource/WaterBolik/prestudy/docker/ubuntu
# $ docker build -t ugui .
# $ docker   && -it --rm -e DISPLAY=$DISPLAY -v /tmp/.X11-unix:/tmp/.X11-unix ugui
# $ docker   && -d -p 6080:6080 tobegit3hub/dockerized-openoffice