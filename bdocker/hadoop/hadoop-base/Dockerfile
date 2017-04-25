FROM bubuntu14

MAINTAINER Bolik WaterBolik@163.com

ENV HADOOP_VERSION=2.8.0 \
    HADOOP_HOME=/opt/hadoop \
    PATH=${PATH}:/opt/hadoop/bin:/opt/hadoop/sbin 

RUN set -ex \   
    # 下载并安装hadoop到/opt/hadoop/目录下
	&& mkdir -p /opt \
	# && APACHE_MIRROT=mirror.tuna.tcurlsinghua.edu.cn/apache \
	&& APACHE_MIRROT=mirrors.ustc.edu.cn/apache \
	# && APACHE_MIRROT=mirrors.aliyun.com/apache \
	&& curl -sSL http://${APACHE_MIRROT}/hadoop/common/hadoop-${HADOOP_VERSION}/hadoop-${HADOOP_VERSION}.tar.gz | tar -xzf - -C /opt \
	&& mv /opt/hadoop-${HADOOP_VERSION} ${HADOOP_HOME} \
    && cd ${HADOOP_HOME} \
    && echo "end"   

# COPY hadoop-${HADOOP_VERSION}.tar.gz /opt/

# RUN set -ex \   
#     && tar -xzf /opt/hadoop-${HADOOP_VERSION}.tar.gz -C /opt \
# 	&& mv /opt/hadoop-${HADOOP_VERSION} ${HADOOP_HOME} \
#     && cd ${HADOOP_HOME} \
#     && echo "end" 

COPY config/* /tmp/

RUN set -ex \  
    # 创建运行数据目录
    && mkdir -p /hdfs/namenode \ 
    && mkdir -p /hdfs/datanode \
    && mkdir -p ${HADOOP_HOME}/logs \
    # 复制配置文件
    && mv /tmp/hadoop-env.sh ${HADOOP_HOME}/etc/hadoop/hadoop-env.sh \
    && mv /tmp/hdfs-site.xml ${HADOOP_HOME}/etc/hadoop/hdfs-site.xml \ 
    && mv /tmp/core-site.xml ${HADOOP_HOME}/etc/hadoop/core-site.xml \
    && mv /tmp/mapred-site.xml ${HADOOP_HOME}/etc/hadoop/mapred-site.xml \
    && mv /tmp/yarn-site.xml ${HADOOP_HOME}/etc/hadoop/yarn-site.xml \
    && mv /tmp/slaves ${HADOOP_HOME}/etc/hadoop/slaves \
    && mv /tmp/ssh_config ${HOME}/.ssh/config \
    && mv /tmp/start-hadoop.sh ${HOME}/start-hadoop.sh \
    && mv /tmp/run-wordcount.sh ${HOME}/run-wordcount.sh \
    # 赋权
    && chmod +x ${HOME}/start-hadoop.sh \
    && chmod +x ${HOME}/run-wordcount.sh \
    && chmod +x ${HADOOP_HOME}/sbin/start-dfs.sh \
    && chmod +x ${HADOOP_HOME}/sbin/start-yarn.sh \
    # format namenode
    && ${HADOOP_HOME}/bin/hdfs namenode -format \
    && echo "end"    

CMD [ "sh", "-c", "service ssh start; bash"]
# CMD ["bin/bash"]

# $ docker build -t hadoop-base /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/hadoop/hadoop-base/
# docker build -t hadoop-base B:/OpenSource/WaterBolik/prestudy/bdocker/hadoop/hadoop-base/