FROM centos:6.9
# https://hub.docker.com/_/centos/

MAINTAINER Bolik WaterBolik@163.com

# ENV container=docker \
ENV TZ=Asia/Shanghai \
    # 配置中文语言
    LANG=zh_CN.utf8 \
    LANGUAGE=zh_CN.utf8:en_US.utf8:C.utf8 \
    SUPPORTED=zh_CN.utf8:en_US.utf8:C.utf8 \
    # LC_ALL=C.utf8 
    LC_ALL=zh_CN.utf8 

RUN set -ex \
    # 查看系统版本
    # && cat /etc/issue \
    && rpm -qi centos-release \
    # && lsb_release -a \
    # 使用镜像源 cat /etc/yum.repos.d/CentOS-Base.repo
    # CentOS-Base.repo CentOS-Debuginfo.repo CentOS-Media.repo CentOS-Vault.repo CentOS-fasttrack.repo
    # 安装包源镜像请任选其一    
    # && YUM_MIRROR=mirrors.ustc.edu.cn \
    && YUM_MIRROR=mirror.tuna.tsinghua.edu.cn \
    # && YUM_MIRROR=mirrors.aliyun.com \
    && sed -i \
        -e "s|^mirrorlist=|#mirrorlist=|g" \    
        -e "s|^#baseurl=|baseurl=|g" \    
        -e "s|mirror.centos.org|${YUM_MIRROR}|g" \    
        -e "s|vault.centos.org|${YUM_MIRROR}|g" \    
        -e "s|http:|https:|g" \
        /etc/yum.repos.d/* \ 
    && cat /etc/yum.repos.d/CentOS-Base.repo \
    # 安装 epel repo 源
    && yum -y install epel-release \
    && sed -i \
        -e "s|^mirrorlist=|#mirrorlist=|g" \
        -e "s|^#baseurl=|baseurl=|g" \
        -e "s|download.fedoraproject.org/pub|${YUM_MIRROR}|g" \
        -e "s|http:|https:|g" \
        /etc/yum.repos.d/epel.repo /etc/yum.repos.d/epel-testing.repo \
    # 更新源列表
    && yum repolist \   
    && yum -y update \  
    && yum clean all \
    # && yum makecache \

    # 设置时区
    && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone \
    # ln -snf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
    # echo Asia/Shanghai > /etc/timezone
    # && timedatectl list-timezones \
    # && timedatectl set-timezone Asia/Shanghai \

    # 命令执行结束
    && echo "end"

RUN set -ex \

    # 配置中文语言
    # && yum -y groupinstall chinese-support \
    # && yum -y install fonts-chinese \ 
    # && localedef -i zh_CN -f utf8 zh_CN.utf8 \
    # && sed -i \
    #     -e 's~^override_install_langs=en_US.utf8~override_install_langs=zh_CN.utf8~g' \
    #     /etc/yum.conf \
    # && cat /etc/yum.conf \
    # && yum reinstall -y \
    #     glibc-common \
    #     systemd \
    # && yum -y install \
    #     sudo \
    #     which \
    && cat /etc/sysconfig/i18n \   
    && { \
            echo 'LANG="zh_CN.utf8"'; \ 
            echo 'LANGUAGE="zh_CN.utf8:en_US.utf8:C.utf8"'; \
            echo 'SUPPORTED="zh_CN.utf8:en_US.utf8:C.utf8"'; \
            echo 'LC_ALL="zh_CN.utf8"'; \
            # echo 'SYSFONT="lat0-sun16"'; \
        } > /etc/sysconfig/i18n \
    && cat /etc/sysconfig/i18n \   
    && echo "export LC_ALL=zh_CN.utf8" >> /etc/profile \
    && cat /etc/profile \
    # && cat /etc/sysconfig/i18n \
    # && localectl status \
    # && localectl list-locales \
    # && localectl set-locale LANG=zh_CN.utf8 \
    # && dpkg-reconfigure --frontend noninteractive locales \

    # 命令执行结束
    && echo "end"

CMD ["bin/bash"]

# $ docker build -t centos6_base /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/os_base/centos6_base/
# docker build -t centos6_base B:/OpenSource/WaterBolik/prestudy/bdocker/os_base/centos6_base/
# docker run -it --rm centos6_base 
