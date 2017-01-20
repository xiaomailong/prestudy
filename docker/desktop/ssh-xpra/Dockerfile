FROM alpine:3.5

MAINTAINER Bolik WaterBolik@163.com

ENV LANG C.UTF-8 \
    DEBIAN_FRONTEND noninteractive

RUN set -ex \
  # 使用清华apk镜像
  && echo "https://mirror.tuna.tsinghua.edu.cn/alpine/v3.5/main" > /etc/apk/repositories \
  && echo "https://mirror.tuna.tsinghua.edu.cn/alpine/v3.5/community" >> /etc/apk/repositories \

  && apk update \
  && apk add --update --no-cache \
    ca-certificates \
    bash \
    # Give certain users the ability to run some commands as root
    sudo \
    # PAM-using login and passwd utilities (usermod, useradd, ...)
    shadow \
    # Larry Wall's Practical Extraction and Report Language
    perl \
    # Xpra is 'screen for X' & allows you to run X programs, usually on a remote host over SSH or encrypted tcp.
    xpra \
    # Port of OpenBSD's free SSH release
    openssh \
    # A Password Generator
    pwgen \
    # kdrive based X Server which targets a window on a host X Server as its framebuffer
    xorg-server-xephyr \
    # X Display Manager
    xdm \
    # A lightweight and highly-configurable window manager
    fluxbox \
    # Virtual Framebuffer 'fake' X server
    xvfb \
    # A tool for installing and managing Python packages
    py2-pip \
    # Firefox web browser
    firefox-esr \
    # X Terminal Emulator
    xterm \
 
  # Configuring xdm to allow connections from any IP address and ssh to allow X11 Forwarding. 
  && sed -i 's/DisplayManager.requestPort/!DisplayManager.requestPort/g' /etc/X11/xdm/xdm-config \
  && sed -i '/#any host/c\*' /etc/X11/xdm/Xaccess \
  && ln -s -f /usr/bin/Xorg /usr/bin/X \
  && echo X11Forwarding yes >> /etc/ssh/ssh_config \

  && pip install --upgrade pip \
  && echo "end"

# Copy the files into the container
ADD . /src

EXPOSE 22

# Start xdm and ssh services.
CMD ["/bin/bash", "/src/startup.sh"]


# $ cd /Volumes/Work/OpenSource/WaterBolik/prestudy/docker/desktop/ssh-xpra
# $ docker build -t ssh-xpra .
# $ docker run -it --rm ssh-xpra

# CONTAINER_ID=$(docker run -d -p 2222:22 ssh-xpra)
# echo $(docker logs $CONTAINER_ID | sed -n 1p)
# ssh docker@localhost -p 2222 "sh -c './docker-desktop -s 800x600 -d 10 > /dev/null 2>&1 &'"