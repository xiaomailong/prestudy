# 删除中间镜像
# docker ps -a | grep "Exited" | awk '{print $1 }'| xargs docker stop
# docker ps -a | grep "Exited" | awk '{print $1 }'| xargs docker rm
# docker images | grep none | awk '{print $3 }'| xargs docker rmi

docker rmi $(docker images -q --filter "dangling=true") 

# docker rmi $(docker images -q | awk '/^<none>/ { print $3 }')