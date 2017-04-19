FROM debian:8.7
# https://hub.docker.com/_/debian/

# 8.7, 8, jessie, latest 
# 7.11, 7, wheezy 

MAINTAINER Bolik WaterBolik@163.com

ENV TZ=Asia/Shanghai \
    # 配置中文语言
    LANG=zh_CN.UTF-8 \
    LANGUAGE=zh_CN.UTF-8:en_US.UTF-8:C.UTF-8 \
    SUPPORTED=zh_CN.UTF-8:en_US.UTF-8:C.UTF-8 \
    LC_ALL=zh_CN.UTF-8 

RUN set -ex \
    # 查看系统版本
    && cat /etc/issue \
    # 使用apt镜像请任选其一   
    && APT_MIRROR=mirrors.ustc.edu.cn \
    # && APT_MIRROR=mirrors.tuna.tsinghua.edu.cn \
    # && APT_MIRROR=mirrors.aliyun.com \
    && sed -i \
            -e "s|deb.debian.org|${APT_MIRROR}|g" \
            -e "s|security.debian.org|${APT_MIRROR}/debian-security|g" \   
            # -e "s|http|https|g" \
        /etc/apt/sources.list \
    && cat /etc/apt/sources.list \
    # -qq 隐藏更新Apt缓存过程中打印的日志
    # -y  参数来消除更新过程中所有向用户提问的部分
    && apt-get -y update \
    && apt-get -y upgrade \

    # 设置时区
    && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone \
    # && dpkg-reconfigure -f noninteractive tzdata \
    # 命令执行结束
    && echo "end"

CMD ["bin/bash"]  

# $ docker build -t debian_base /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/os_base/debian_base/
# docker build -t debian_base /B/OpenSource/WaterBolik/prestudy/bdocker/os_base/debian_base/
# docker run -it --rm debian_base 