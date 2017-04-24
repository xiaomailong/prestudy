FROM ubuntu_base

MAINTAINER Bolik WaterBolik@163.com

ENV HADOOP_VERSION=2.8.0 \
    JAVA_HOME=/usr/lib/jvm/java-1.8-openjdk \
    HADOOP_HOME=/opt/hadoop \
    PATH=${PATH}:/usr/lib/jvm/java-1.8-openjdk/jre/bin:/usr/lib/jvm/java-1.8-openjdk/bin:/opt/hadoop/bin:/opt/hadoop/sbin 

# install dependencies for compiling hadoop
RUN set -ex \   
    && apt-get -y install --no-install-recommends \
        ssh \
        rsync \
        openjdk-8-jdk \
        curl \
    && echo "end"   

RUN set -ex \   
    # 下载并安装hadoop到/opt/hadoop/目录下
	&& mkdir -p /opt \
	# && APACHE_MIRROT=mirror.tuna.tcurlsinghua.edu.cn/apache \
	# && APACHE_MIRROT=mirrors.ustc.edu.cn/apache \
	&& APACHE_MIRROT=mirrors.aliyun.com/apache \
	&& curl -sSL http://${APACHE_MIRROT}/hadoop/common/hadoop-${HADOOP_VERSION}/hadoop-${HADOOP_VERSION}.tar.gz \
        | tar -xzf - -C /opt \
	&& mv /opt/hadoop-${HADOOP_VERSION} ${HADOOP_HOME} \
    && cd ${HADOOP_HOME} \
    && echo "end"   

# ssh without key
RUN ssh-keygen -t rsa -f ~/.ssh/id_rsa -P '' && \
    cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys

RUN mkdir -p ${HOME}/hdfs/namenode && \ 
    mkdir -p ${HOME}/hdfs/datanode && \
    mkdir -p ${HADOOP_HOME}/logs

COPY config/* /tmp/

RUN mv /tmp/ssh_config ~/.ssh/config && \
    mv /tmp/hadoop-env.sh ${HADOOP_HOME}/etc/hadoop/hadoop-env.sh && \
    mv /tmp/hdfs-site.xml ${HADOOP_HOME}/etc/hadoop/hdfs-site.xml && \ 
    mv /tmp/core-site.xml ${HADOOP_HOME}/etc/hadoop/core-site.xml && \
    mv /tmp/mapred-site.xml ${HADOOP_HOME}/etc/hadoop/mapred-site.xml && \
    mv /tmp/yarn-site.xml ${HADOOP_HOME}/etc/hadoop/yarn-site.xml && \
    mv /tmp/slaves ${HADOOP_HOME}/etc/hadoop/slaves && \
    mv /tmp/start-hadoop.sh ${HOME}/start-hadoop.sh && \
    mv /tmp/run-wordcount.sh ${HOME}/run-wordcount.sh

RUN chmod +x ${HOME}/start-hadoop.sh && \
    chmod +x ${HOME}/run-wordcount.sh && \
    chmod +x ${HADOOP_HOME}/sbin/start-dfs.sh && \
    chmod +x ${HADOOP_HOME}/sbin/start-yarn.sh 

# format namenode
RUN ${HADOOP_HOME}/bin/hdfs namenode -format

CMD [ "sh", "-c", "service ssh start; bash"]

# $ docker build -t hadoop-base /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/hadoop/hadoop-base/
# docker build -t hadoop-base B:/OpenSource/WaterBolik/prestudy/bdocker/hadoop/hadoop-base/