FROM centos6_base

MAINTAINER Bolik WaterBolik@163.com

ENV JAVA_HOME=/usr/lib/jvm/java-1.7-openjdk \
    PATH=${PATH}:/usr/lib/jvm/java-1.7-openjdk/jre/bin:/usr/lib/jvm/java-1.7-openjdk/bin 

RUN set -ex \
    && yum -y install \
        # tar \
        # bzip2 \
        # yum-utils \
        # rpm-build \
        rsync \
        curl \
        sudo \
        openjdk7 \
    && yum clean all \
    # && yum-builddep -y pam \
    # && yumdownloader --source pam \
    # && rpmbuild --rebuild  --define 'WITH_AUDIT 0' --define 'dist +noaudit' pam*.src.rpm \
    # && rpm -Uvh --oldpackage ~/rpmbuild/RPMS/*/pam*+noaudit*.rpm \
    # && rm -f /*.rpm \
    # && rm -rf ~/rpmbuild \

    # 命令执行结束
    && echo "end"

# CMD openrc && bash
CMD ["bin/bash"]

# $ docker build -t bcentos6 /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/os_base/bcentos6/
# docker build -t bcentos6 B:/OpenSource/WaterBolik/prestudy/bdocker/os_base/bcentos6/
# docker run -it --rm bcentos6 
