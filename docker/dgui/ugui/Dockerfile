# $ docker pull registry.cn-hangzhou.aliyuncs.com/acs/ubuntu
# FROM registry.cn-hangzhou.aliyuncs.com/acs/ubuntu:16.04
FROM ubuntu:latest

MAINTAINER Bolik WaterBolik@163.com

RUN set -ex \
  # 采用查找替换法修改镜像源
  && sed -i 's/archive.ubuntu.com/mirrors.tuna.tsinghua.edu.cn/' /etc/apt/sources.list \
   
  # -qq隐藏更新Apt缓存过程中打印的日志
  # -y参数来消除更新过程中所有向用户提问的部分
  && apt-get update -y \

  # 安装软件 eclipse
  && apt-get -y --fix-missing install \  
    firefox \   
    x11-xserver-utils \
  
  # 允许所有用户访问X11服务
  && xhost + |: \

  # $ id $User
  # 用你自己的 uid gid 替换下面的值
  && export uid=501 gid=20 \
  && mkdir -p /home/developer \
  && echo "developer:x:${uid}:${gid}:developer,,,:/home/developer:/bin/bash" >> /etc/passwd \
  && echo "developer:x:${uid}:" >> /etc/group \
  && echo "developer ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers \
  && chmod 0440 /etc/sudoers \
  && chown ${uid}:${gid} -R /home/developer \

  # 删除不必要的软件和Apt缓存包列表
  && apt-get autoclean \
  && apt-get autoremove \
  && rm -rf /var/lib/apt/lists/* 

USER developer

ENV HOME /home/developer

CMD ["/usr/bin/firefox"]

# $ cd /Volumes/Work/OpenSource/WaterBolik/prestudy/docker/dgui/ugui
# $ docker build -t ufirefox .
# $ docker run -it --rm -e DISPLAY=$DISPLAY -v /tmp/.X11-unix:/tmp/.X11-unix ufirefox
