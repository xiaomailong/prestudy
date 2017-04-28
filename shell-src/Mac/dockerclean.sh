#!/bin/bash


# 杀死所有正在运行的容器
# docker kill $(docker ps -a -q)
# 删除所有已经停止的容器
# docker rm $(docker ps -a -q)
# 删除所有未打 dangling 标签的镜像
# docker rmi $(docker images -q -f dangling=true)
# 删除所有镜像
# docker rmi $(docker images -q)

# 删除中间镜像
docker ps -a | grep "Exited" | awk '{print $1 }'| xargs docker stop
docker ps -a | grep "Exited" | awk '{print $1 }'| xargs docker rm
docker images | grep none | awk '{print $3 }'| xargs docker rmi