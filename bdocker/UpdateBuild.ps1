
# base image pull -------------------------------------------------------------
docker pull alpine:latest
docker pull alpine:3.5

docker pull debian:latest
docker pull debian:8.7

docker pull ubuntu:latest
docker pull ubuntu:16.04

docker pull centos:latest
docker pull centos:7


# alpine base images ----------------------------------------------------------
docker build -t balpine B:\OpenSource\WaterBolik\prestudy\bdocker\balpine\
docker build -t bgollum B:\OpenSource\WaterBolik\prestudy\bdocker\bgollum\
docker build -t bnodejs B:\OpenSource\WaterBolik\prestudy\bdocker\bnodejs\
docker build -t bpython B:\OpenSource\WaterBolik\prestudy\bdocker\bpython\


# centos base images ----------------------------------------------------------
docker build -t bcentos B:\OpenSource\WaterBolik\prestudy\bdocker\bcentos\


# debian base images ----------------------------------------------------------
docker build -t bdebian B:\OpenSource\WaterBolik\prestudy\bdocker\bdebian\


# ubuntu base images ----------------------------------------------------------
docker build -t bubuntu B:\OpenSource\WaterBolik\prestudy\bdocker\bubuntu\


# 删除pull过程或者create过程产生的临时镜像
docker stop $(docker ps -a -f status=exited -q)

docker rm $(docker ps -a -f status=exited -q)

docker rmi $(docker images --filter dangling=true -q)