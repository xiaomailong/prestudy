$ROOTPATH="B:/OpenSource/WaterBolik/prestudy/bdocker/hadoop"

docker build -t alpine_base B:/OpenSource/WaterBolik/prestudy/bdocker/os_base/alpine_base/

docker build -t hadoop-base ${ROOTPATH}/hadoop-base/
docker build -t hadoop-namenode ${ROOTPATH}/hadoop-namenode/
docker build -t hadoop-datanode ${ROOTPATH}/hadoop-datanode/
docker build -t hadoop-resourcemanager ${ROOTPATH}/hadoop-resourcemanager/
docker build -t hadoop-nodemanager ${ROOTPATH}/hadoop-nodemanager/
docker build -t hadoop-historyserver ${ROOTPATH}/hadoop-historyserver/
docker build -t hadoop-spark ${ROOTPATH}/hadoop-spark/

docker network create hadoop 
docker network create kafka

docker volume create --name=hadoop_namenode
docker volume create --name=hadoop_datanode1
docker volume create --name=hadoop_datanode2
docker volume create --name=hadoop_historyserver