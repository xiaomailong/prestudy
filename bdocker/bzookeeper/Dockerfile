# https://hub.docker.com/_/zookeeper
# https://github.com/31z4/zookeeper-docker/blob/7e7eac6d6c11428849ec13bb7d240e4cfa21b2e7/3.4.9/Dockerfile

FROM balpine

MAINTAINER Bolik WaterBolik@163.com

ENV ZOOKEEPER_VERSION=3.4.9 \
	PATH=$PATH:/opt/zookeeper/bin/ \	
	# ZOO_USER=zookeeper \
    ZOO_CONF_DIR=/conf \
	ZOOCFGDIR=/conf \
    ZOO_DATA_DIR=/data \
    ZOO_DATA_LOG_DIR=/datalog \
    ZOO_PORT=2181 \
    ZOO_TICK_TIME=2000 \
    ZOO_INIT_LIMIT=5 \
    ZOO_SYNC_LIMIT=2 

COPY docker-entrypoint.sh /

# Add a user and make dirs
RUN set -x \
	# 添加用户
    # && adduser -D "$ZOO_USER" \
	# 创建目录及赋权
    && mkdir -p "$ZOO_DATA_LOG_DIR" "$ZOO_DATA_DIR" "$ZOO_CONF_DIR" \
    # && chown "$ZOO_USER:$ZOO_USER" "$ZOO_DATA_LOG_DIR" "$ZOO_DATA_DIR" "$ZOO_CONF_DIR" \
	# 下载并安装zookeeper到/opt/zookeeper/目录下
	&& mkdir -p /opt \
	# && APACHE_MIRROT=mirror.tuna.tsinghua.edu.cn/apache/ \
	# && APACHE_MIRROT=mirrors.ustc.edu.cn/apache/ \
	&& APACHE_MIRROT=mirrors.aliyun.com/apache/ \
	&& curl -sSL https://${APACHE_MIRROT}/zookeeper/zookeeper-${ZOOKEEPER_VERSION}/zookeeper-${ZOOKEEPER_VERSION}.tar.gz | tar -xzf - -C /opt \
	&& mv /opt/zookeeper-${ZOOKEEPER_VERSION} /opt/zookeeper \
	&& mv "/opt/zookeeper/conf/"* "$ZOO_CONF_DIR" \
	&& chmod 700 /docker-entrypoint.sh \
	&& echo "end"

VOLUME ["$ZOO_DATA_DIR", "$ZOO_DATA_LOG_DIR"]

EXPOSE $ZOO_PORT 2888 3888

WORKDIR /opt/zookeeper

ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["zkServer.sh", "start-foreground"]

# 编译及执行方法如下: 
# docker build -t bzookeeper /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/bzookeeper/
# docker build -t bzookeeper B:\OpenSource\WaterBolik\prestudy\bdocker\bzookeeper\


# 启动单实例
# docker run -it --rm --name zookeeperserver -p 2181:2181 bzookeeper

# 通过容器应用连接
# docker run --name some-app --link zookeeperserver:bzookeeper -d application-that-uses-zookeeper

# 通过临时容器连接
# docker run -it --rm --link zookeeperserver:zookeeper bzookeeper zkCli.sh -server bzookeeper

# 覆盖zk配置
# docker run --name zookeeperserver --restart always -d -v $(pwd)/zoo.cfg:/conf/zoo.cfg bzookeeper

# 运行集群
# COMPOSE_PROJECT_NAME=zk_test docker-compose up -d

# 通过临时容器连接集群
# docker run -it --rm --link zoo1:zk1 --link zoo2:zk2 --link zoo3:zk3 --net zktest_default bzookeeper zkCli.sh -server zk1:2181,zk2:2181,zk3:2181

# 主机连接集群
# zkCli.sh -server localhost:2181,localhost:2182,localhost:2183

# 查看zk服务器状态
# echo stat | nc 127.0.0.1 2181
# echo stat | nc 127.0.0.1 2182
# echo stat | nc 127.0.0.1 2183