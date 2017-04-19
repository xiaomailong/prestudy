FROM alpine:3.5
# https://hub.docker.com/_/alpine/

# Linux 01562754130f 4.9.4-moby #1 SMP Wed Jan 18 17:04:43 UTC 2017 x86_64 Linux

# FROM scratch
# ADD alpine-minirootfs-3.5.2-x86_64.tar.gz /

MAINTAINER Bolik WaterBolik@163.com

ENV TZ=Asia/Shanghai \
    # 配置中文语言
    LANG=zh_CN.UTF-8 \
    LANGUAGE=zh_CN.UTF-8:en_US.UTF-8:C.UTF-8 \
    SUPPORTED=zh_CN.UTF-8:en_US.UTF-8:C.UTF-8 \
    LC_ALL=C.UTF-8 

RUN set -ex \
    # 查看系统版本
    && cat /etc/issue \
    # 使用apk镜像
    # && APK_MIRROR=mirror.tuna.tsinghua.edu.cn \
    # && APK_MIRROR=mirrors.ustc.edu.cn \
    && APK_MIRROR=mirrors.aliyun.com \
    && sed -i "s/dl-cdn.alpinelinux.org/${APK_MIRROR}/" /etc/apk/repositories \    
    && apk update \
    && apk upgrade \

    # 配置时区
    && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone \
    && echo "end"

CMD sh

# 编译及执行方法如下: 
# docker build -t alpine_base /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/os_base/alpine_base/
# docker build -t alpine_base B:\OpenSource\WaterBolik\prestudy\bdocker\os_base\alpine_base\
# docker run -it --rm alpine_base 
