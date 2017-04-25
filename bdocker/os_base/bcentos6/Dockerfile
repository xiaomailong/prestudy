FROM centos6_base

MAINTAINER Bolik WaterBolik@163.com

ENV JAVA_HOME=/usr/lib/jvm/java-1.7-openjdk \
    PATH=${PATH}:/usr/lib/jvm/java-1.7-openjdk/jre/bin:/usr/lib/jvm/java-1.7-openjdk/bin 

RUN set -ex \
    && yum -y install \
        tar \
        bzip2 \
        yum-utils \
        rpm-build \
        # ssh \
        rsync \
        # openjdk-7-jdk \
        curl \
        sudo \
        # openssh \
        # openssh-server \
        # openssh-clients \
        openjdk7 \
        # sshpass \
        # openrc \
    && yum clean all \
    && yum-builddep -y pam \
    && yumdownloader --source pam \
    && rpmbuild --rebuild  --define 'WITH_AUDIT 0' --define 'dist +noaudit' pam*.src.rpm \
    && rpm -Uvh --oldpackage ~/rpmbuild/RPMS/*/pam*+noaudit*.rpm \
    && rm -f /*.rpm \
    && rm -rf ~/rpmbuild \

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

# $ docker build -t bcentos6 /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/os_base/bcentos6/
# docker build -t bcentos6 B:/OpenSource/WaterBolik/prestudy/bdocker/os_base/bcentos6/
# docker run -it --rm bcentos6 
