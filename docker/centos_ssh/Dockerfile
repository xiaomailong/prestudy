# The dockerfile has Change add sshd services on Centos7.0
FROM centos:latest
# FROM ubuntu:latest

MAINTAINER WaterBolik,http://waterbolik.github.io

#Install sshd net-tools
RUN yum install openssh-server net-tools -y
# for ubuntu
# RUN apt-get update
# RUN apt-get install -y openssh-server

RUN mkdir /var/run/sshd

#Set password for root
RUN echo 'root:root' | chpasswd
# RUN sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config
RUN sed -ri 's/^PermitRootLogin\s+.*/PermitRootLogin yes/' /etc/ssh/sshd_config
RUN sed -ri 's/UsePAM yes/#UsePAM yes/g' /etc/ssh/sshd_config

#Set history record
# ENV HISTTIMEFORMAT "%F %T  "

#Fix sshd service:Read from socket failed: Connection reset by peer?
# RUN ssh-keygen -A

#Change timezone CST
RUN \cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

#Open 22 port
EXPOSE 22

#Auto running sshd service
CMD ["/usr/sbin/sshd","-D"]
