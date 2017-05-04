# https://bitbucket.org/uhopper/hadoop-docker.git

FROM alpine_base

MAINTAINER Bolik WaterBolik@163.com

ENV HADOOP_VERSION=2.8.0 \
# ENV HADOOP_VERSION=2.7.2 \
	PATH=$PATH:/opt/hadoop/bin/ \	
	HADOOP_PREFIX=/opt/hadoop \
    HADOOP_CONF_DIR=/etc/hadoop \
    HADOOP_DATA_DIR=/hadoop-data \
    MULTIHOMED_NETWORK=1 

ARG GPG_KEY=C823E3E5B12AF29C67F81976F5CECB3CB5E9BD2D

ADD entrypoint.sh /entrypoint.sh

RUN set -x \
	# 下载并安装hadoop到/opt/hadoop/目录下
	&& mkdir -p /opt \
	&& cd /opt \
	# && APACHE_MIRROT=mirror.tuna.tsinghua.edu.cn/apache \
	# && APACHE_MIRROT=mirrors.ustc.edu.cn/apache \
	&& APACHE_MIRROT=mirrors.aliyun.com/apache \
	# && apk add --no-cache --virtual .build-deps \
    #     gnupg \
    # && curl -fSL "$http://${APACHE_MIRROT}/hadoop/common/hadoop-${HADOOP_VERSION}/hadoop-${HADOOP_VERSION}.tar.gz" -o /opt/hadoop-${HADOOP_VERSION}.tar.gz \
    # && curl -fSL "http://www.apache.org/dist/hadoop/common/hadoop-${HADOOP_VERSION}/hadoop-${HADOOP_VERSION}.tar.gz.asc" -o /opt/hadoop-${HADOOP_VERSION}.tar.gz.asc \
    && wget -q "http://${APACHE_MIRROT}/hadoop/common/hadoop-${HADOOP_VERSION}/hadoop-${HADOOP_VERSION}.tar.gz" \
    && wget -q "http://www.apache.org/dist/hadoop/common/hadoop-${HADOOP_VERSION}/hadoop-${HADOOP_VERSION}.tar.gz.asc" \
    && export GNUPGHOME="$(mktemp -d)" \
    # && gpg --keyserver ha.pool.sks-keyservers.net --recv-key "$GPG_KEY" \
    # && gpg --batch --verify "hadoop-${HADOOP_VERSION}.tar.gz.asc" "hadoop-${HADOOP_VERSION}.tar.gz" \
    && tar -xzf "hadoop-${HADOOP_VERSION}.tar.gz" \
    # && tar -xvf hadoop-${HADOOP_VERSION}.tar.gz -C /opt/ \
	&& mv /opt/hadoop-${HADOOP_VERSION} /opt/hadoop \
    && ln -s /opt/hadoop/etc/hadoop /etc/hadoop \
    && cp /etc/hadoop/mapred-site.xml.template /etc/hadoop/mapred-site.xml \
    && mkdir /opt/hadoop/logs \
    && mkdir /hadoop-data \
    && rm -r "$GNUPGHOME" "hadoop-${HADOOP_VERSION}.tar.gz" "hadoop-${HADOOP_VERSION}.tar.gz.asc" \
    # && apk del \
	# 	.build-deps \

	&& chmod a+x /entrypoint.sh \

	&& echo "end"

VOLUME ["$HADOOP_DATA_DIR"]

WORKDIR /opt/hadoop

ENTRYPOINT ["/entrypoint.sh"]

# CMD ["sh"]

# 编译及执行方法如下: 
# docker build -t hadoop /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/hadoop/hadoop/
# docker build -t hadoop B:\OpenSource\WaterBolik\prestudy\bdocker\hadoop\hadoop\
