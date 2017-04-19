FROM centos_base

MAINTAINER Bolik WaterBolik@163.com

ENV LC_ALL=zh_CN.UTF-8 

RUN set -ex \
   
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

# $ docker build -t bcentos /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/os_base/bcentos/
# docker build -t bcentos /B/OpenSource/WaterBolik/prestudy/bdocker/os_base/bcentos/
# docker run -it --rm bcentos 
