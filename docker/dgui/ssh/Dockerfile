# https://github.com/rogaha/docker-desktop

# FROM ubuntu

MAINTAINER Bolik WaterBolik@163.com

ENV DEBIAN_FRONTEND noninteractive
ENV HOME /home/ubuntu

RUN set -ex \
  # 使用阿里apk镜像
  && echo "deb http://mirrors.aliyun.com/ubuntu trusty main universe" > /etc/apt/sources.list \
  && echo "deb http://mirrors.aliyun.com/ubuntu trusty-updates main universe" >> /etc/apt/sources.list \
  && apt-get update \

  # Installing the environment required: xserver, xdm, flux box, roc-filer and ssh
  && apt-get install -y xpra rox-filer openssh-server pwgen xserver-xephyr xdm fluxbox xvfb sudo \

  # Configuring xdm to allow connections from any IP address and ssh to allow X11 Forwarding. 
  && sed -i 's/DisplayManager.requestPort/!DisplayManager.requestPort/g' /etc/X11/xdm/xdm-config \
  && sed -i '/#any host/c\*' /etc/X11/xdm/Xaccess \
  && ln -s /usr/bin/Xorg /usr/bin/X \
  && echo X11Forwarding yes >> /etc/ssh/ssh_config \

  # Fix PAM login issue with sshd
  && sed -i 's/session    required     pam_loginuid.so/#session    required     pam_loginuid.so/g' /etc/pam.d/sshd \

  # Upstart and DBus have issues inside docker. We work around in order to install firefox.
  && dpkg-divert --local --rename --add /sbin/initctl && ln -sf /bin/true /sbin/initctl \

  # Installing fuse package (libreoffice-java dependency) and it's going to try to create
  # a fuse device without success, due the container permissions. || : help us to ignore it. 
  # Then we are going to delete the postinst fuse file and try to install it again!
  # Thanks Jerome for helping me with this workaround solution! :)
  # Now we are able to install the libreoffice-java package  
  && apt-get -y install fuse  || : \
  && rm -rf /var/lib/dpkg/info/fuse.postinst \
  && apt-get -y install fuse \

  # Installing the apps: Firefox, flash player plugin, LibreOffice and xterm
  # libreoffice-base installs libreoffice-java mentioned before
  && apt-get install -y libreoffice-base firefox libreoffice-gtk libreoffice-calc xterm \

  # Set locale (fix the locale warnings)
  && localedef -v -c -i en_US -f UTF-8 en_US.UTF-8 || : \

# Copy the files into the container
ADD . /src

EXPOSE 22

# Start xdm and ssh services.
CMD ["/bin/bash", "/src/startup.sh"]
