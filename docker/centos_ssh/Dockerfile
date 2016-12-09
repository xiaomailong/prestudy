# The dockerfile has Change add sshd services on Centos7.0
#centos7:latest image
FROM centos:latest

MAINTAINER Yifeng,http://www.cnblogs.com/hanyifeng

#Install sshd net-tools
RUN yum install openssh-server net-tools -y
RUN mkdir /var/run/sshd

#Set password for root
RUN echo 'root:iloveworld' | chpasswd
RUN sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

#Set history record
ENV HISTTIMEFORMAT "%F %T  "

#Fix sshd service:Read from socket failed: Connection reset by peer?
RUN ssh-keygen -A

#Change timezone CST
RUN \cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

#Open 22 port
EXPOSE 22

#Auto running sshd service
CMD ["/usr/sbin/sshd","-D"]
