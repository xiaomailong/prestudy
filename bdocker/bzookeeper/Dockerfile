# https://hub.docker.com/_/zookeeper

FROM alpine_base
# FROM balpine

MAINTAINER Bolik WaterBolik@163.com

ENV ZOOKEEPER_VERSION=3.4.10 \
	PATH=$PATH:/opt/zookeeper/bin/ \	
	ZOOCFGDIR=/conf \
    ZOO_CONF_DIR=/conf \
    ZOO_DATA_DIR=/data \
    ZOO_DATA_LOG_DIR=/datalog \
    ZOO_PORT=2181 \
    ZOO_TICK_TIME=2000 \
    ZOO_INIT_LIMIT=5 \
    ZOO_SYNC_LIMIT=2 

ARG GPG_KEY=C823E3E5B12AF29C67F81976F5CECB3CB5E9BD2D

COPY docker-entrypoint.sh /

RUN set -x \
	# 添加用户、创建目录及赋权
	# && adduser -D "$ZOO_USER" \
    && mkdir -p "$ZOO_DATA_LOG_DIR" "$ZOO_DATA_DIR" "$ZOO_CONF_DIR" \
    # && chown "$ZOO_USER:$ZOO_USER" "$ZOO_DATA_LOG_DIR" "$ZOO_DATA_DIR" "$ZOO_CONF_DIR" \
	# 下载并安装zookeeper到/opt/zookeeper/目录下
	&& mkdir -p /opt \
	&& cd /opt \
	# && APACHE_MIRROT=mirror.tuna.tsinghua.edu.cn/apache \
	# && APACHE_MIRROT=mirrors.ustc.edu.cn/apache \
	&& APACHE_MIRROT=mirrors.aliyun.com/apache \
	# && APACHE_MIRROT=mirrors.cnnic.cn/apache \
	&& apk add --no-cache --virtual .build-deps \
        gnupg \
    && wget -q "http://${APACHE_MIRROT}/zookeeper/zookeeper-${ZOOKEEPER_VERSION}/zookeeper-${ZOOKEEPER_VERSION}.tar.gz" \
    && wget -q "http://www.apache.org/dist/zookeeper/zookeeper-${ZOOKEEPER_VERSION}/zookeeper-${ZOOKEEPER_VERSION}.tar.gz.asc" \
    && export GNUPGHOME="$(mktemp -d)" \
    # && gpg --keyserver ha.pool.sks-keyservers.net --recv-key "$GPG_KEY" \
    # && gpg --batch --verify "zookeeper-${ZOOKEEPER_VERSION}.tar.gz.asc" "zookeeper-${ZOOKEEPER_VERSION}.tar.gz" \
    && tar -xzf "zookeeper-${ZOOKEEPER_VERSION}.tar.gz" \
	&& mv /opt/zookeeper-${ZOOKEEPER_VERSION} /opt/zookeeper \
	&& mv "/opt/zookeeper/conf/"* "$ZOO_CONF_DIR" \
    && rm -r "$GNUPGHOME" "zookeeper-${ZOOKEEPER_VERSION}.tar.gz" "zookeeper-${ZOOKEEPER_VERSION}.tar.gz.asc" \
    && apk del \
		.build-deps \

	&& chmod a+x /docker-entrypoint.sh \

	&& echo "end"

VOLUME ["$ZOO_DATA_DIR", "$ZOO_DATA_LOG_DIR"]

EXPOSE ${ZOO_PORT} 2888 3888

WORKDIR /opt/zookeeper

ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["zkServer.sh", "start-foreground"]

# CMD ["sh"]

# 编译及执行方法如下: 
# docker build -t bzookeeper /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/bzookeeper/
# docker build -t bzookeeper B:\OpenSource\WaterBolik\prestudy\bdocker\bzookeeper\
