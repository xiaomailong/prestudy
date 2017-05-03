#!/bin/bash

# 构建镜像
docker build -t bzookeeper /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/bzookeeper/

# 运行集群
# COMPOSE_PROJECT_NAME=zk_test docker-compose up -d
docker-compose up -d

# 通过临时容器连接集群
# docker run -it --rm \
#     --link zoo1:zk1 \
#     --link zoo2:zk2 \
#     --link zoo3:zk3 \
#     --link zoo4:zk4 \
#     --link zoo5:zk5 \
#     --net zktest_default \
#     bzookeeper \
#     zkCli.sh -server \
#     zk1:2181,zk2:2181,zk3:2181,zk4:2181,zk5:2181

# 关闭集群
# COMPOSE_PROJECT_NAME=zk_test docker-compose down

# 查看zk服务器状态
echo stat | nc 127.0.0.1 2181
echo stat | nc 127.0.0.1 2182
echo stat | nc 127.0.0.1 2183
echo stat | nc 127.0.0.1 2184
echo stat | nc 127.0.0.1 2185


# 启动单实例
# docker run -it --rm --name zookeeperserver -p 2181:2181 bzookeeper

# 通过临时容器连接
# docker run -it --rm --link zookeeperserver:bzookeeper bzookeeper zkCli.sh -server bzookeeper

# 通过容器应用连接
# docker run --name some-app --link zookeeperserver:bzookeeper -d application-that-uses-zookeeper

# 覆盖zk配置
# docker run --name zookeeperserver --restart always -d -v $(pwd)/zoo.cfg:/conf/zoo.cfg bzookeeper

# 运行集群
# COMPOSE_PROJECT_NAME=zk_test docker-compose up -d

# 主机连接集群
# zkCli.sh -server localhost:2181,localhost:2182,localhost:2183,localhost:2184,localhost:2185
