FROM centos:7
# https://hub.docker.com/_/centos/

MAINTAINER Bolik WaterBolik@163.com

ENV TZ=Asia/Shanghai \
    # 安装包源镜像请任选其一    
    YUM_MIRROR=mirrors.ustc.edu.cn \
    # YUM_MIRROR=mirror.tuna.tsinghua.edu.cn \
    # YUM_MIRROR=mirrors.aliyun.com \
    # 配置中文语言
    LANG=zh_CN.UTF-8 \
    LANGUAGE=zh_CN.UTF-8:en_US.UTF-8:C.UTF-8 \
    # SUPPORTED=zh_CN.UTF-8:en_US.UTF-8:C.UTF-8 \
    # SYSFONT=lat0-sun16 \
    LC_ALL=C 
    # LC_ALL=zh_CN.UTF-8 


RUN set -ex \
    # 查看系统版本
    # && cat /etc/issue \
    && rpm -qi centos-release \
    # && lsb_release -a \
    # 使用镜像源 cat /etc/yum.repos.d/CentOS-Base.repo
    # CentOS-Base.repo CentOS-Debuginfo.repo CentOS-Media.repo CentOS-Vault.repo CentOS-fasttrack.repo
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

    # && yum -y update \
    # && yum -y reinstall glibc-common \
    # && yum -y install kde-l10n-Chinese \
    # && yum -y install system-config-language \
    # && yum -y install snack \
    # && yum -y install fontconfig \
    # && yum -y groupinstall chinese-support \
    && yum -y install \
        sudo \
        openssh \
        openssh-server \
        openssh-clients \
        sshpass \
        openrc \
    && yum clean all \

    # 设置时区
    && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone \

    # && locale-gen en_US.UTF-8 \

    # 命令执行结束
    && echo "end"

# 配置ssh
RUN set -ex \
    # && mkdir -p /var/run/sshd \
    # 生成ssh访问秘钥 /etc/ssh/
    && ssh-keygen -A \
    # 免密访问配置
    && sed -i \
        -e 's~^#PermitRootLogin prohibit-password~PermitRootLogin yes~g' \
        -e 's~^#HostKey /etc/ssh/ssh_host_rsa_key~HostKey /etc/ssh/ssh_host_rsa_key~g' \
        -e 's~^#PubkeyAuthentication yes~PubkeyAuthentication yes~g' \
        -e 's~^#PasswordAuthentication yes~PasswordAuthentication yes~g' \
        -e 's~^#PermitEmptyPasswords no~PermitEmptyPasswords yes~g' \
        -e 's~^#UseDNS no~UseDNS no~g' \
        -e 's~^#Port 22~Port 2222~g' \
        /etc/ssh/sshd_config \
    && cat /etc/ssh/sshd_config \   
    # 客户端配置
    && mkdir -p $HOME/.ssh \
    && chmod 700 $HOME/.ssh \
    &&  { \
            echo 'Host *'; \ 
            echo '  UserKnownHostsFile /dev/null'; \
            echo '  StrictHostKeyChecking no'; \ 
            echo '  LogLevel quiet'; \
            echo '  Port 2222'; \ 
        } > $HOME/.ssh/config \ 
    && chmod 600 $HOME/.ssh/config \
    && cat $HOME/.ssh/config \
    && ssh-keygen -q -N "" -t rsa -f $HOME/.ssh/id_rsa \
    && cat $HOME/.ssh/id_rsa.pub >> $HOME/.ssh/authorized_keys \
    && chmod 600 $HOME/.ssh/authorized_keys \   
    # 配置sshd服务
    # && rc-update add sshd sysinit\
    # && rc-status \
    # && touch /run/openrc/softlevel \
    # 结束标志
    && echo "end"    

EXPOSE 2222

# CMD openrc && bash
CMD ["bin/bash"]

# $ docker build -t bcentos /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/bcentos/
# docker build -t bcentos B:\OpenSource\WaterBolik\prestudy\bdocker\bcentos\
# docker run -it --rm bcentos 
