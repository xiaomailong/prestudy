FROM ubuntu:16.04
# https://hub.docker.com/_/ubuntu/
# 12.04.5, 12.04, precise-20170214, precise (precise/Dockerfile)
# 14.04.5, 14.04, trusty-20170214, trusty (trusty/Dockerfile)
# 16.04, xenial-20170214, xenial, latest (xenial/Dockerfile)
# 16.10, yakkety-20170224, yakkety, rolling (yakkety/Dockerfile)
# 17.04, zesty-20170224, zesty, devel (zesty/Dockerfile)

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
    # && APT_MIRROR=mirrors.ustc.edu.cn \
    # && APT_MIRROR=mirrors.tuna.tsinghua.edu.cn \
    && APT_MIRROR=mirrors.aliyun.com \   
    && sed -i \
        -e "s|archive.ubuntu.com|${APT_MIRROR}|g" \    
        # -e "s|http|https|g" \
        /etc/apt/sources.list \
    && cat /etc/apt/sources.list \
    # -qq隐藏更新Apt缓存过程中打印的日志
    # -y参数来消除更新过程中所有向用户提问的部分
    && apt-get -y update --fix-missing \
    && apt-get -y install \
        apt-utils \
        language-pack-zh-hans \
        tzdata \
    && apt-get -y upgrade \
  
    # 设置时区
    && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone \
    && dpkg-reconfigure -f noninteractive tzdata \

    # 配置中文语言
    # && /usr/share/locales/install-language-pack zh_CN \
    && locale-gen zh_CN.UTF-8 \
    && dpkg-reconfigure --frontend noninteractive locales \

    # 删除不必要的软件和Apt缓存包列表
    && apt-get autoclean  \
    && apt-get autoremove  \

    # 命令执行结束
    && echo "end"

CMD ["bin/bash"]  

# $ docker build -t ubuntu_base /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/os_base/ubuntu_base/
# docker build -t ubuntu_base /B/OpenSource/WaterBolik/prestudy/bdocker/os_base/ubuntu_base/
# docker run -it --rm ubuntu_base 