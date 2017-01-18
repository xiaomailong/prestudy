FROM ubuntu

MAINTAINER Bolik WaterBolik@163.com

# Ubuntu官方的Apt源地址
#   "deb http://archive.ubuntu.com/ubuntu trusty main universe"
#   "deb http://archive.ubuntu.com/ubuntu trusty-updates main universe"

RUN set -ex \
  # 使用清华apk镜像
  # 使用Ubuntu官方的Apt源，也可以根据实际需要修改为国内源的地址
  && echo "deb http://archive.ubuntu.com/ubuntu trusty main universe" > /etc/apt/sources.list \
  && echo "deb http://archive.ubuntu.com/ubuntu trusty-updates main universe" >> /etc/apt/sources.list \



# $ cd /Volumes/Work/OpenSource/WaterBolik/prestudy/docker/ubuntu
# $ docker build -t ugui .
# $ docker run -it --rm -e DISPLAY=$DISPLAY -v /tmp/.X11-unix:/tmp/.X11-unix ugui
