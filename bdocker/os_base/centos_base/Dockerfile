FROM centos:7
# https://hub.docker.com/_/centos/

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
    # && cat /etc/issue \
    && rpm -qi centos-release \
    # && lsb_release -a \
    # 使用镜像源 cat /etc/yum.repos.d/CentOS-Base.repo
    # CentOS-Base.repo CentOS-Debuginfo.repo CentOS-Media.repo CentOS-Vault.repo CentOS-fasttrack.repo
    # 安装包源镜像请任选其一    
    # && YUM_MIRROR=mirrors.ustc.edu.cn \
    # && YUM_MIRROR=mirror.tuna.tsinghua.edu.cn \
    && YUM_MIRROR=mirrors.aliyun.com \
    && sed -i \
        -e "s|mirror.centos.org|${YUM_MIRROR}|g" \    
        -e "s|vault.centos.org|${YUM_MIRROR}|g" \    
        -e "s|#baseurl=|baseurl=|g" \    
        -e "s|mirrorlist=|#mirrorlist=|g" \    
        -e "s|http|https|g" \
        /etc/yum.repos.d/* \ 
    && cat /etc/yum.repos.d/CentOS-Base.repo \
    # 安装 epel repo 源
    # && yum -y install wget \
    # && yum -y install epel-release \
    # && wget -O /etc/yum.repos.d/epel.repo http://${YUM_MIRROR}/repo/epel-7.repo \
    # && wget -O /etc/yum.repos.d/CentOS-Base.repo http://${YUM_MIRROR}/repo/Centos-7.repo \
    && yum makecache \

    # 设置时区
    && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone \

    # 命令执行结束
    && echo "end"

RUN set -ex \

    # 配置中文语言
    && yum -y groupinstall chinese-support \
    && yum -y install fonts-chinese \ 
    # && /usr/share/locales/install-language-pack zh_CN \
    # && sed -i \
    #     -e 's~^# zh_CN.UTF-8~zh_CN.UTF-8~g' \
    #     -e 's~^# en_US.UTF-8~en_US.UTF-8~g' \
    #     /etc/locale.gen \
    # && cat /etc/locale.gen \
    # && locale-gen \
    && cat /etc/locale.conf \
    # && cat /etc/sysconfig/i18n \
    # && dpkg-reconfigure --frontend noninteractive locales \

    # 命令执行结束
    && echo "end"

CMD ["bin/bash"]

# $ docker build -t centos_base /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/os_base/centos_base/
# docker build -t centos_base /B/OpenSource/WaterBolik/prestudy/bdocker/os_base/bcentos_base/
# docker run -it --rm centos_base 
