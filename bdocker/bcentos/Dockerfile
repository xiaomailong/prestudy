# $ docker pull registry.cn-hangzhou.aliyuncs.com/acs/centos
FROM centos

MAINTAINER Bolik WaterBolik@163.com

# 设置时区 
ENV TZ            Asia/Shanghai
ENV LANG          C.UTF-8

# 中科大镜像
ENV YUM_MIRROR    mirrors.ustc.edu.cn
# 阿里
# ENV YUM_MIRROR    mirrors.aliyun.com

RUN set -ex \
    # 使用镜像源 cat /etc/yum.repos.d/CentOS-Base.repo
    # CentOS-Base.repo CentOS-Debuginfo.repo CentOS-Media.repo CentOS-Vault.repo CentOS-fasttrack.repo
    && sed -i "s|mirror.centos.org|${YUM_MIRROR}|g" /etc/yum.repos.d/* \    
    && sed -i "s|#baseurl=|baseurl=|g" /etc/yum.repos.d/* \    
    && sed -i "s|mirrorlist=|#mirrorlist=|g" /etc/yum.repos.d/* \    
    && sed -i "s|http|https|g" /etc/yum.repos.d/* \ 

    # 安装 epel repo 源
    # && yum -y install wget \
    # && yum -y install epel-release \
    # && wget -O /etc/yum.repos.d/epel.repo http://${YUM_MIRROR}/repo/epel-7.repo \
    && yum clean all \
    && yum makecache \

    # && yum -y update \
    # && yum -y reinstall glibc-common \
    # && yum -y install kde-l10n-Chinese \
    # && yum -y install system-config-language \
    # && yum -y install snack \
    # && yum -y install fontconfig \
    # && yum -y groupinstall chinese-support \
    && yum -y install \
        openssh \
        openssh-server \
        openssh-clients \

    # 设置时区
    && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone \

    # && locale-gen en_US.UTF-8 \

    # 命令执行结束
    && echo "end"

# 配置中文语言
ENV LANG          zh_CN.UTF-8
ENV LANGUAGE      zh_CN.UTF-8:zh_CN:zh:en_US.UTF-8:en_US:en:C.UTF-8 
ENV LC_ALL        zh_CN.UTF-8
ENV SUPPORTED     zh_CN.UTF-8:zh_CN:zh:en_US.UTF-8:en_US:en:C.UTF-8 
ENV SYSFONT       lat0-sun16

RUN set -ex \
    # 配置ssh
    # 创建 /var/run/sshd/目录，不然sshd服务启动会报错
    && mkdir -p /var/run/sshd \
    && mkdir -p $HOME/.ssh \
    &&  { \
            echo '#!/bin/bash'; \ 
            echo '/usr/sbin/sshd -D'; \
        } > /auto_sshd.sh \
    # && cat /auto_sshd.sh \
    && chmod +x /auto_sshd.sh \
    # 生成ssh访问秘钥 /etc/ssh/
    && ssh-keygen -A \
    # && ls /etc/ssh/ \
    # && cat /etc/ssh/ssh_host_rsa_key \
    # && cat /etc/ssh/ssh_host_rsa_key.pub \
    # && cat /etc/ssh/sshd_config \
    # 将本机加入访问列表
    && cat /etc/ssh/*.pub > $HOME/.ssh/authorized_keys \
    && chmod +x  $HOME/.ssh/authorized_keys \
    # 取消账户访问设置
    && sed -i 's/UsePAM yes/UsePAM no/' /etc/ssh/sshd_config \
    # 免密访问设置
    && sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config \

    # 修改root用户密码 
    && echo "root:root" | chpasswd \

    && echo "end"

EXPOSE 22

CMD ["bin/bash"]

# $ docker build -t bcentos /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/bcentos/
# docker build -t bcentos B:\OpenSource\WaterBolik\prestudy\bdocker\bcentos\
# docker run -it --rm bcentos 
