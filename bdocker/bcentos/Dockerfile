FROM centos

MAINTAINER Bolik WaterBolik@163.com

# 设置时区 
ENV TZ            Asia/Shanghai
ENV LANG          C.UTF-8

# ENV YUM_MIRROR    mirrors.ustc.edu.cn
# ENV YUM_MIRROR  mirror.tuna.tsinghua.edu.cn
ENV YUM_MIRROR    mirrors.aliyun.com
RUN set -ex \
    # 使用镜像源 cat /etc/yum.repos.d/CentOS-Base.repo
    # CentOS-Base.repo CentOS-Debuginfo.repo CentOS-Media.repo CentOS-Vault.repo CentOS-fasttrack.repo
    && sed -i \
        -e "s|mirror.centos.org|${YUM_MIRROR}|g" \    
        -e "s|vault.centos.org|${YUM_MIRROR}|g" \    
        -e "s|#baseurl=|baseurl=|g" \    
        -e "s|mirrorlist=|#mirrorlist=|g" \    
        -e "s|http|https|g" \
        /etc/yum.repos.d/* \ 

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
        sudo \
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

# 配置ssh
# RUN set -ex \
#     # 创建 /var/run/sshd/目录，不然sshd服务启动会报错
#     && mkdir -p /var/run/sshd \
#     && mkdir -p $HOME/.ssh \
#     && chmod 700 $HOME/.ssh \
#     &&  { \
#             echo '#!/bin/bash'; \ 
#             echo '/usr/sbin/sshd -D'; \
#         } > /auto_sshd.sh \
#     && cat /auto_sshd.sh \
#     && chmod +x /auto_sshd.sh \
#     &&  { \
#             echo 'Host *'; \ 
#             echo '  UserKnownHostsFile /dev/null'; \
#             echo '  StrictHostKeyChecking no'; \ 
#             echo '  LogLevel quiet'; \
#             echo '  Port 2122'; \ 
#         } > $HOME/.ssh/config \ 
#     && chmod 600 $HOME/.ssh/config \
#     # 生成ssh访问秘钥 /etc/ssh/
#     && ssh-keygen -A \
#     # passwordless ssh
#     # && ssh-keygen -q -N "" -t dsa -f /etc/ssh/ssh_host_dsa_key \
#     # && ssh-keygen -q -N "" -t rsa -f /etc/ssh/ssh_host_rsa_key \
#     && ssh-keygen -q -N "" -t rsa -f $HOME/.ssh/id_rsa \
#     && cp $HOME/.ssh/id_rsa.pub $HOME/.ssh/authorized_keys \
#     # && ls /etc/ssh/ \
#     # && cat /etc/ssh/ssh_host_rsa_key \
#     # && cat /etc/ssh/ssh_host_rsa_key.pub \
#     # && cat /etc/ssh/sshd_config \
#     # 将本机加入访问列表
#     # && cat /etc/ssh/*.pub > $HOME/.ssh/authorized_keys \
#     && chmod 600 $HOME/.ssh/authorized_keys \
#     # 免密访问配置
#     # && sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config \
#     # && sed -ri 's/^PermitRootLogin\s+.*/PermitRootLogin yes/' /etc/ssh/sshd_config \
#     # && sed -ri 's/UsePAM yes/#UsePAM yes/g' /etc/ssh/sshd_config \
#     && sed -i \
#         -e 's~^PasswordAuthentication yes~PasswordAuthentication no~g' \
#         -e 's~^#PermitRootLogin yes~PermitRootLogin no~g' \
#         -e 's~^#UseDNS yes~UseDNS no~g' \
#         -e 's~^\(.*\)/usr/libexec/openssh/sftp-server$~\1internal-sftp~g' \
#         /etc/ssh/sshd_config \

#     # fix the 254 error code
#     && sed  -i "/^[^#]*UsePAM/ s/.*/#&/"  /etc/ssh/sshd_config \
#     # && echo "UsePAM no" >> /etc/ssh/sshd_config \
#     && echo "Port 2122" >> /etc/ssh/sshd_config \

#     # 修改root用户密码 
#     && echo "root:root" | chpasswd \
#     && echo "end"    

# 容器需要开放SSH 22端口
EXPOSE 22

CMD ["bin/bash"]

# $ docker build -t bcentos /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/bcentos/
# docker build -t bcentos B:\OpenSource\WaterBolik\prestudy\bdocker\bcentos\
# docker run -it --rm bcentos 
