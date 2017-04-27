#!/bin/bash

# 下载并安装hadoop到/opt/hadoop/目录下
HADOOP_VERSION=2.8.0

cd /opt 

# APACHE_MIRROT=mirror.tuna.tcurlsinghua.edu.cn/apache 
# APACHE_MIRROT=mirrors.ustc.edu.cn/apache 
APACHE_MIRROT=mirrors.aliyun.com/apache 

curl -sSL http://${APACHE_MIRROT}/hadoop/common/hadoop-${HADOOP_VERSION}/hadoop-${HADOOP_VERSION}-src.tar.gz | tar -xzf - -C /opt 

mv /opt/hadoop-${HADOOP_VERSION}-src /opt/hadoop-src 

cd /opt/hadoop-src 

echo -e "\n\ncomile hadoop ${HADOOP_VERSION}..." 

mvn package -Pdist,native -DskipTests -Dtar 

if [[ $? -eq 0 ]]; then
	echo -e "\n\ncomile hadoop ${HADOOP_VERSION} success!\n\n"
	mv ./hadoop-dist/target/hadoop-${HADOOP_VERSION}.tar.gz /opt/hadoop 
else
    echo -e "\n\ncomile hadoop ${HADOOP_VERSION} fail!\n\n"
fi