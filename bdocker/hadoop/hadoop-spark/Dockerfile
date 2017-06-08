FROM hadoop-base

# http://mirrors.aliyun.com/apache/spark/

ENV SPARK_VERSION=2.1.1 \
# ENV SPARK_VERSION=2.0.2 \
    SPARK_HADOOP_PROFILE=2.8 \
    SPARK_HOME=/opt/spark \
    PATH=$PATH:/opt/spark/bin

ADD spark-entrypoint.sh /
ADD spark-historyserver.sh /
ADD spark-master.sh /
ADD spark-slave.sh /

RUN set -x \
    # && APACHE_MIRROT=mirror.tuna.tsinghua.edu.cn/apache \
	# && APACHE_MIRROT=mirrors.ustc.edu.cn/apache \
	&& APACHE_MIRROT=mirrors.aliyun.com/apache \
    && wget -q "http://${APACHE_MIRROT}/spark/spark-${SPARK_VERSION}/spark-${SPARK_VERSION}-bin-without-hadoop.tgz" -O /tmp/spark.tar.gz \
    && tar -xvf /tmp/spark.tar.gz -C /opt \
    && mv /opt/spark-$SPARK_VERSION-* $SPARK_HOME \
    && rm -f /tmp/spark.tar.gz \
    && chmod a+x \
        /spark-entrypoint.sh \
        /spark-historyserver.sh \
        /spark-master.sh \
        /spark-slave.sh \
    && echo "export SPARK_DIST_CLASSPATH=$(hadoop classpath)" >> /opt/spark/conf/spark-env.sh \
    && echo "end"

WORKDIR $SPARK_HOME

ENTRYPOINT ["/spark-entrypoint.sh"]
