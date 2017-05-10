FROM centos:7
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

# use systemd
# RUN (cd /lib/systemd/system/sysinit.target.wants/; for i in *; do [ $i == \
# systemd-tmpfiles-setup.service ] || rm -f $i; done); \
# rm -f /lib/systemd/system/multi-user.target.wants/*;\
# rm -f /etc/systemd/system/*.wants/*;\
# rm -f /lib/systemd/system/local-fs.target.wants/*; \
# rm -f /lib/systemd/system/sockets.target.wants/*udev*; \
# rm -f /lib/systemd/system/sockets.target.wants/*initctl*; \
# rm -f /lib/systemd/system/basic.target.wants/*;\
# rm -f /lib/systemd/system/anaconda.target.wants/*;

RUN set -ex \
    # 查看系统版本
    # && cat /etc/issue \
    && rpm -qi centos-release \

    # 设置时区
    && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone \

    # 配置中文语言
    && localedef -i zh_CN -f UTF-8 zh_CN.utf8 \
    && sed -i \
        -e 's~^override_install_langs=en_US.utf8~override_install_langs=zh_CN.utf8~g' \
        /etc/yum.conf \
    && cat /etc/yum.conf \
    && cat /etc/locale.conf \   
    && { \
            echo 'LANG="zh_CN.utf8"'; \ 
            echo 'LANGUAGE="zh_CN.utf8:en_US.utf8:C.utf8"'; \
            echo 'SUPPORTED="zh_CN.utf8:en_US.utf8:C.utf8"'; \
            echo 'LC_ALL="zh_CN.utf8"'; \
            echo 'SYSFONT="lat0-sun16"'; \
        } > /etc/locale.conf \
    && cat /etc/locale.conf \   
    && echo "export LC_ALL=zh_CN.utf8" >> /etc/profile \
    && cat /etc/profile \
   
    # 使用镜像源 
    # CentOS-Base.repo CentOS-Debuginfo.repo CentOS-Media.repo CentOS-Vault.repo CentOS-fasttrack.repo
    # 安装包源镜像请任选其一    
    # && YUM_MIRROR=mirrors.ustc.edu.cn \
    # && YUM_MIRROR=mirror.tuna.tsinghua.edu.cn \
    && YUM_MIRROR=mirrors.aliyun.com \
    && sed -i \
        -e "s|^mirrorlist=|#mirrorlist=|g" \    
        -e "s|^#baseurl=|baseurl=|g" \    
        -e "s|mirror.centos.org|${YUM_MIRROR}|g" \    
        -e "s|vault.centos.org|${YUM_MIRROR}|g" \    
        -e "s|http:|https:|g" \
        /etc/yum.repos.d/* \ 
    && cat /etc/yum.repos.d/CentOS-Base.repo \
    # 安装 epel repo 源
    && yum -y update \  
    && yum -y install \
        epel-release \
        yum-utils \
    && sed -i \
        -e "s|^mirrorlist=|#mirrorlist=|g" \
        -e "s|^#baseurl=|baseurl=|g" \
        -e "s|download.fedoraproject.org/pub|${YUM_MIRROR}|g" \
        -e "s|http:|https:|g" \
        /etc/yum.repos.d/epel.repo /etc/yum.repos.d/epel-testing.repo \
    # 更新源列表
    && yum repolist \            
    && yum -y upgrade \  
    && yum -y install \
        openssh-server \
        openssh-clients \
        rsync \
        supervisor \
        ntp \
        ntpdate \
    && yum clean all \
    # && yum makecache \

    # ssh免密访问配置
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
    # passwordless ssh
    # 生成ssh访问秘钥 /etc/ssh/
    && ssh-keygen -A \
    # && ssh-keygen -q -N "" -t dsa -f /etc/ssh/ssh_host_dsa_key \
    # && ssh-keygen -q -N "" -t rsa -f /etc/ssh/ssh_host_rsa_key \
    && ssh-keygen -q -N "" -t rsa -f $HOME/.ssh/id_rsa \
    && cat $HOME/.ssh/id_rsa.pub >> $HOME/.ssh/authorized_keys \
    && chmod 600 $HOME/.ssh/authorized_keys \   
    # 配置sshd服务

    # 命令执行结束
    && echo "end"

EXPOSE 2222

COPY supervisord.conf /etc/supervisord.conf

# CMD ["bin/bash"]
CMD ["/usr/sbin/sshd", "-D"]
# CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]

# $ docker build -t centos_base /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/os_base/centos_base/
# docker build -t centos_base B:/OpenSource/WaterBolik/prestudy/bdocker/os_base/centos_base/
# docker run -it --rm centos_base 
