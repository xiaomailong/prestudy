#!/bin/bash

# 配置软件源rpmforge
# CentOS是RHEL编译过来的，去掉了所有关于版权问题的东西。
# 因此，在没有使用第三方软件库的情况下，很多软件无法用yum install来直接安装。
#
# EPEL(Extra Packages for EnterpriseLinux)软件库提供为RHEL系列(4.x、5.x、6.x等等)重新编译的Fedora组件。
# 这个软件库在不替换系统组件方面下了功夫。
# 在某些情况下它尝试直接针对CentOS兼容性的问题，但坚决否定软件库间的兼容性是目标之一。
# 当它与其它第三方软件库混合使用时，问题可能会出现。
# 故此，当你使用EPEL时，尤其是当你亦会运用其它件库的组件时，请确保你使用yum的Priorities插件。
#
# RPMForge库现在已经拥有超过10000种的CentOS的软件包，被CentOS社区认为是最安全也是最稳定的一个第三方软件库。
#
# 安装yum-priorities插件。
# 这个插件是用来设置yum在调用软件源时的顺序的。因为官方提供的软件源，都是比较稳定和被推荐使用的。
# 因此，官方源的顺序要高于第三方源的顺序。如何保证这个顺序，就需要安装yum-priorities这插件了。
yum install yum-priorities
# 安装完后需要设置/etc/yum.repos.d/目录下的.repo相关文件（如CentOS-Base.repo），
# 在这些文件中插入顺序指令：priority=N （N为1到99的正整数，数值越小越优先）
#
# 下载与安装相应EPEL的rpm文件包
# 32位系统
rpm -ivh http://download.Fedora.RedHat.com/pub/epel/6/i386/epel-release-6-5.noarch.rpm
# 64位系统
# [root@CentOS ~]# rpm -ivh http://download.Fedora.RedHat.com/pub/epel/6/x86_64/epel-release-6-5.noarch.rpm
# 导入DAG的PGP Key
rpm --import /etc/pki/rpm-gpg/RPM-GPG-KEY-EPEL-6
# 设置/etc/yum.repos.d/epel.repo文件中源的级别，就是添加priority=11这句
#
# 下载与安装相应rpmforge的rpm文件包
# 32位系统
wget http://pkgs.repoforge.org/rpmforge-release/rpmforge-release-0.5.3-1.el6.rf.i686.rpm
# 64位系统
# wget http://pkgs.repoforge.org/rpmforge-release/rpmforge-release-0.5.3-1.el6.rf.x86_64.rpm
# wget http://pkgs.repoforge.org/rpmforge-release/rpmforge-release-0.5.3-1.el7.rf.x86_64.rpm
# 安装DAG的PGP Key
rpm --import http://dag.wieers.com/rpm/packages/RPM-GPG-KEY.dag.txt
# 验证rpmforge的rpm文件包
# rpm -K rpmforge-release-0.5.2-2.el6.rf.*.rpm
# 如果报XXX not an rpm package的错，查看是否wget下载的包不完整，包的大小是12K
# 安装rpmforge的rpm文件包
# rpm -ivh rpmforge-release-0.5.2-2.el6.rf.*.rpm
# 设置/etc/yum.repos.d/rpmforge.repo文件中源的级别，就是添加priority=12这句，如我的rpmforge.repo文件内容：
#
# 测试升级
# [root@CentOS ~]# yum check-update

# DKMS（Dynamic Kernel Module Support）
# DKMS全称是Dynamic Kernel Module Support，它可以帮我们维护内核外的这些驱动程序，在内核版本变动之后可以自动重新生成新的模块。
yum install dkms

# 安装内核对应版本的kernel-devel
# version=`uname -a | awk '{print $3}'`
# yum install kernel-devel-${version}
yum install kernel-devel-$(uname -r)
# yum install kernel-headers
yum install kernel-headers-$(uname -r)
