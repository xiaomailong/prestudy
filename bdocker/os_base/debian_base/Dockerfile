FROM debian:8.7
# FROM debian:jessie-backports

# https://hub.docker.com/_/debian/

# 8.7, 8, jessie, latest 
# 7.11, 7, wheezy 

MAINTAINER Bolik WaterBolik@163.com

ENV TZ=Asia/Shanghai \
    # 配置中文语言
    LANG=zh_CN.UTF-8 \
    LANGUAGE=zh_CN.UTF-8:en_US.UTF-8:C.UTF-8 \
    SUPPORTED=zh_CN.UTF-8:en_US.UTF-8:C.UTF-8 \
    # LC_ALL=C.UTF-8 
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
    && apt-get -y update --fix-missing \
    && apt-get -y install \
        apt-utils \
        locales \
        tzdata \
    && apt-get -y upgrade \
   
    # 设置时区
    && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone \
    && dpkg-reconfigure -f noninteractive tzdata \

    # 配置中文语言
    # && /usr/share/locales/install-language-pack zh_CN \
    && sed -i \
        -e 's~^# zh_CN.UTF-8~zh_CN.UTF-8~g' \
        -e 's~^# en_US.UTF-8~en_US.UTF-8~g' \
        /etc/locale.gen \
    && cat /etc/locale.gen \
    && locale-gen \
    && dpkg-reconfigure --frontend noninteractive locales \

# dpkg-reconfigure dash 
# 设置默认的shell为bash
# dpkg-reconfigure locales 
# 本地化语言设置
# dpkg-reconfigure tzdata 
# 设置时区
# dpkg-reconfigure console-setup 
# 设置控制台选项
# dpkg-reconfigure openssh-server 
# 生新生成ssh服务的RSA的DSA key

    # 删除不必要的软件和Apt缓存包列表
    && apt-get autoclean  \
    && apt-get autoremove  \
    
    # 命令执行结束
    && echo "end"

CMD ["bin/bash"]  

# $ docker build -t debian_base /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/os_base/debian_base/
# docker build -t debian_base B:/OpenSource/WaterBolik/prestudy/bdocker/os_base/debian_base/
# docker run -it --rm debian_base 