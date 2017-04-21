
# $ROOTPATH="/B/OpenSource/WaterBolik/prestudy/bdocker"
$ROOTPATH="B:\OpenSource\WaterBolik\prestudy\bdocker\"

# base image pull -------------------------------------------------------------
docker pull alpine:latest
docker pull alpine:3.5

docker pull centos:latest
docker pull centos:7

docker pull debian:latest
docker pull debian:8.7

docker pull ubuntu:latest
docker pull ubuntu:16.04

# os base images
docker build -t alpine_base ${ROOTPATH}/os_base/alpine_base/
docker build -t centos_base ${ROOTPATH}/os_base/centos_base/
docker build -t debian_base ${ROOTPATH}/os_base/debian_base/
docker build -t ubuntu_base ${ROOTPATH}/os_base/ubuntu_base/
# docker build -t balpine ${ROOTPATH}/os_base/balpine/
# docker build -t bcentos ${ROOTPATH}/os_base/bcentos/
# docker build -t bdebian ${ROOTPATH}/os_base/bdebian/
# docker build -t bubuntu ${ROOTPATH}/os_base/bubuntu/

# docker build -t bgollum ${ROOTPATH}/bgollum/

# docker build -t bnodejs ${ROOTPATH}/bnodejs/

# docker build -t bpython ${ROOTPATH}/bpython/

# docker build -t bzookeeper ${ROOTPATH}/bzookeeper/

# 查看Docker的磁盘使用情况
docker system df

# 清理dangling镜像(参考What are Docker : images?)和容器，以及失效的数据卷和网络。
docker system prune -f

# 查看Docker的磁盘使用情况
docker system df

# 删除pull过程或者create过程产生的临时镜像
# docker stop $(docker ps -a -f status=exited -q)
# docker rm $(docker ps -a -f status=exited -q)
# docker rmi $(docker images --filter dangling=true -q)