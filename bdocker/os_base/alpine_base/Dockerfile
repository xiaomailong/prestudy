FROM alpine:3.5
# https://hub.docker.com/_/alpine/

# Linux 01562754130f 4.9.4-moby #1 SMP Wed Jan 18 17:04:43 UTC 2017 x86_64 Linux

# FROM scratch
# ADD alpine-minirootfs-3.5.2-x86_64.tar.gz /

MAINTAINER Bolik WaterBolik@163.com

ENV DOCKER_USER=docker \
    # 时区
    TZ=Asia/Shanghai \
    # 中文语言
    LANG=zh_CN.UTF-8 \
    LANGUAGE=zh_CN.UTF-8:en_US.UTF-8:C.UTF-8 \
    SUPPORTED=zh_CN.UTF-8:en_US.UTF-8:C.UTF-8 \
    LC_ALL=C.UTF-8 \
    # LC_ALL=zh_CN.UTF-8 
	JAVA_HOME=/usr/lib/jvm/java-1.8-openjdk/jre \
	PATH=$PATH:/usr/lib/jvm/java-1.8-openjdk/jre/bin:/usr/lib/jvm/java-1.8-openjdk/bin

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
    && apk add --update --no-cache \
        tzdata \
		su-exec \
		bash \
		openssh \
		openjdk8-jre \
        perl \
        net-tools \
        curl \
	# 验证JAVA_HOME
	&& { \
		echo '#!/bin/sh'; \
		echo 'set -e'; \
		echo; \
		echo 'dirname "$(dirname "$(readlink -f "$(which javac || which java)")")"'; \
	} > /usr/local/bin/docker-java-home \
	&& chmod +x /usr/local/bin/docker-java-home \
	&& [ "$JAVA_HOME" = "$(docker-java-home)" ] \
    # 配置时区
    && ln -snf /usr/share/zoneinfo/${TZ} /etc/localtime \
    && echo ${TZ} > /etc/timezone \
    # 删除tzdata将会使时区设置失效
    # && apk del \
    #     tzdata \

	# 配置ssh    
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
    
    # 添加用户、创建目录及赋权
	&& adduser -D "${DOCKER_USER}" \
    
    && echo "end"

EXPOSE 2222

# USER ${DOCKER_USER}

CMD ["sh"]

# 编译及执行方法如下: 
# docker build -t alpine_base /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/os_base/alpine_base/
# docker build -t alpine_base B:\OpenSource\WaterBolik\prestudy\bdocker\os_base\alpine_base\
# docker run -it --rm alpine_base 
