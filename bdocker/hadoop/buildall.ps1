$ROOTPATH="B:/OpenSource/WaterBolik/prestudy/bdocker/hadoop"

docker build -t hadoop ${ROOTPATH}/hadoop/
docker build -t namenode ${ROOTPATH}/namenode/
docker build -t datanode ${ROOTPATH}/datanode/
docker build -t resourcemanager ${ROOTPATH}/resourcemanager/
docker build -t nodemanager ${ROOTPATH}/nodemanager/
docker build -t historyserver ${ROOTPATH}/historyserver/
docker build -t spark ${ROOTPATH}/spark/