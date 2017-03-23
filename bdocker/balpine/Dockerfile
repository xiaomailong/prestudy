FROM alpine:3.5
# https://hub.docker.com/_/alpine/

# Linux 01562754130f 4.9.4-moby #1 SMP Wed Jan 18 17:04:43 UTC 2017 x86_64 Linux

# FROM scratch
# ADD alpine-minirootfs-3.5.2-x86_64.tar.gz /

MAINTAINER Bolik WaterBolik@163.com

# 中文语言
ENV LANG        zh_CN.UTF-8 
ENV LANGUAGE    zh_CN.UTF-8:zh_CN:en_US.UTF-8:en_US:C.UTF-8 
ENV LC_ALL      zh_CN.UTF-8 

# JAVA_HOME & PATH
ENV JAVA_HOME   /usr/lib/jvm/java-1.8-openjdk 
ENV PATH        ${PATH}:${JAVA_HOME}/jre/bin:${JAVA_HOME}/bin

# 安装程序包 
# ENV APK_MIRROR  mirror.tuna.tsinghua.edu.cn
# ENV APK_MIRROR  mirrors.ustc.edu.cn
ENV APK_MIRROR  mirrors.aliyun.com
RUN set -ex \
    # 查看系统版本
    && cat /etc/issue \
    # 使用apk镜像
    && sed -i "s/dl-cdn.alpinelinux.org/${APK_MIRROR}/" /etc/apk/repositories \    
    && apk update \
    && apk upgrade \
    # 使用apk安装必备软件 
    && apk add --update --no-cache \

        # alpine(11): alpine 3.5 defaule apk list
        #   musl:                     the musl c library (libc) implementation
        #   busybox:                  Size optimized toolbox of many common UNIX utilities
        #   alpine-baselayout:        Alpine base dir structure and init scripts
        #   alpine-keys:              Public keys for Alpine Linux packages
        #   libressl2.4-libcrypto:    libressl libcrypto library
        #   libressl2.4-libssl:       libressl libssl library
        #   zlib:                     A compression/decompression Library
        #   apk-tools:                Alpine Package Keeper - package manager for alpine
        #   scanelf:                  Scan ELF binaries for stuff
        #   musl-utils:               the musl c library (libc) implementation
        #   libc-utils:               Meta package to pull in correct libc
        
        # tzdata: Timezone data
        tzdata \
  
        # curl(4-10): An URL retrival utility and library        
        #   ca-certificates:          Common CA certificates PEM files
        #   libssh2:                  library for accessing ssh1/ssh2 protocol servers
        #   libcurl:                  The multiprotocol file transfer library
        #   zlib-dev:                 A compression/decompression Library (development files)
        #   libressl2.4-libtls:       libressl libtls library
        #   libressl-dev:             Version of the TLS/crypto stack forked from OpenSSL (development files)
        #   libssh2-dev:              library for accessing ssh1/ssh2 protocol servers (development files)
        curl \
        curl-dev \
        # wget: A network utility to retrieve files from the Web
        wget \


        # bash(5): The GNU Bourne Again shell
        #   ncurses-terminfo-base:    Descriptions of common terminals
        #   ncurses-terminfo:         Console display library
        #   ncurses-libs:             Ncurses libraries
        #   readline:                 GNU readline library
        bash \
        # zsh(4): A very advanced and programmable command interpreter (shell)
        #   ncurses-terminfo-base:    Descriptions of common terminals
        #   ncurses-terminfo:         Console display library
        #   ncurses-libs:             Ncurses libraries
        zsh \

        # openssl(3-5): Toolkit for SSL v2/v3 and TLS v1
        #   libcrypto1.0:             Crypto library from openssl
        #   libssl1.0:                SSL shared libraries
        #   openssl:                  Toolkit for SSL v2/v3 and TLS v1
        openssl \
        # openssl-dev \

        # openssh(1-3): Port of OpenBSD's free SSH release
        #   openssh-client:           OpenBSD's SSH client 
        #   openssh-keysign:          ssh helper program for host-based authentication
        #   openssh-sftp-server:      ssh sftp server module
        #   sshpass:                  Non-interactive SSH authentication utility
        openssh-client \
        openssh-keysign \
        openssh \
        sshpass \
        # screen: A window manager that multiplexes a physical terminal
        screen \
        # sshfs: FUSE client based on the SSH File Transfer Protocol 
        #   fuse:                     A library that makes it possible to implement a filesystem in a userspace program.
        #   libuuid:                  DCE compatible Universally Unique Identifier library
        #   libblkid:                 Block device identification library from util-linux
        #   libmount:                 Block device identification library from util-linux
        #   glib:                     Common C routines used by Gtk+ and other libs
        sshfs \
        # acf-openssh: A web-based system administration interface for openssh
        # acf-opebssh \
        # rsync: A file transfer program to keep remote files in sync
        #   libattr:                  Dynamic library for extended attribute support
        #   libacl:                   Dynamic library for access control list support
        #   popt:                     A commandline option parser
        rsync \

        # build-base: Meta package for build base
        #   binutils-libs:            Runtime libraries from binutils - libbfd and libopcodes 
        #   binutils:                 Tools necessary to build programs
        #   gmp:                      A free library for arbitrary precision arithmetic         
        #   isl:                      An Integer Set Library for the Polyhedral Model    
        #   libgomp:                  GCC shared-memory parallel programming API library        
        #   libatomic:                GCC Atomic library          
        #   pkgconf:                  development framework configuration tools        
        #   libgcc:                   GNU C compiler runtime libraries       
        #   mpfr3:                    multiple-precision floating-point library      
        #   mpc1:                     Multiprecision C library    
        #   libstdc++:                GNU C++ standard runtime library          
        #   gcc:                      The GNU Compiler Collection            
        #   make:                     GNU make utility to maintain groups of programs     
        #   musl-dev:                 the musl c library (libc) implementation (development files)         
        #   libc-dev:                 Meta package to pull in correct libc         
        #   fortify-headers:          standalone fortify source implementation                
        #   g++:                      GNU C++ standard library and compiler    
        build-base \

        # autoconf(3): A GNU tool for automatically configuring source code
        #   m4:                       GNU macro processor
        #   perl:                     Larry Wall's Practical Extraction and Report Language
        autoconf \
        # automake(2): A GNU tool for automatically creating Makefiles
        #   perl:                     Larry Wall's Practical Extraction and Report Language
        automake \

        # cmake(15): CMake is a cross-platform open-source make system
        #   libattr libacl libbz2 expat xz-libs libarchive ca-certificates
        #   libssh2 libcurl ncurses-terminfo-base ncurses-terminfo ncurses-libs
        #   libgcc libstdc++ cmake
        #   libarchive:               library that can create and read several streaming archive formats
        #   xz-libs:                  Library and command line tools for XZ and LZMA compressed files (libraries)
        cmake \

        # linux-headers: Linux system headers
        linux-headers \

        # lapack(4-6): Linear Algebra PACKage  
        #   libgcc:                   GNU C compiler runtime libraries    
        #   libquadmath:              128-bit math library for GCC
        #   libgfortran:              Fortran runtime library for GCC
        #   lapack:                   Linear Algebra PACKage  
        lapack \
        lapack-dev \

        # icu(4-6): International Components for Unicode library
        #   libgcc:                   GNU C compiler runtime libraries    
        #   libstdc++:                GNU C++ standard runtime library         
        #   icu-libs:                 International Components for Unicode library (libraries)
        icu \
        icu-dev \

        # libffi: A portable, high level programming interface to various calling conventions.
        libffi \
        libffi-dev \     

        # libxslt(4-7): XML stylesheet transformation library
        #   libgpg-error:             Support library for libgcrypt
        #   libgcrypt:                general purpose crypto library based on the code used in GnuPG
        #   libxml2:                  XML parsing library, version 2
        #   libxslt:                  XML stylesheet transformation library
        #   zlib-dev:                 A compression/decompression Library (development files)
        libxslt \
        libxslt-dev \

        # imagemagick(26-29): A collection of tools and libraries for many image formats
        #   libgcc gmp libffi libstdc++ libxml2 pkgconf
        #   expat:                    An XML Parser library written in C
        #   libbz2:                   Shared library for bz2
        #   libpng:                   Portable Network Graphics library  
        #   freetype:                 TrueType font rendering library
        #   fontconfig:               The Fontconfig package is a library for configuring and customizing font access.
        #   dbus-libs:                Libraries for acces D-BUS
        #   libintl:                  GNU gettext runtime library
        #   avahi-libs:               Libraries for avahi run-time use
        #   nettle:                   A low-level cryptographic library        
        #   libtasn1:                 The ASN.1 library used in GNUTLS          
        #   p11-kit:                  Library for loading and sharing PKCS#11 modules
        #   gnutls:                   A TLS protocol implementation
        #   cups-libs:                CUPS libraries
        #   jbig2dec:                 JBIG2 image compression format decoder   
        #   libjpeg-turbo:            accelerated baseline JPEG compression and decompression library
        #   lcms2:                    Color Management Engine
        #   tiff:                     Provides support for the Tag Image File Format or TIFF
        #   ghostscript:              An interpreter for the PostScript language and for PDF
        #   libltdl:                  Runtime libraries for GNU Libtool Dynamic Module Loade
        #   libwebp:                  Libraries for working with WebP images
        #   imagemagick:              A collection of tools and libraries for many image formats
        #   imagemagick-c++:          ImageMagick Magick++ library (C++ bindings)
        imagemagick \
        imagemagick-dev \

        # python(12-14): A high-level scripting language
        #   libbz2 expat libffi ncurses-terminfo-base ncurses-terminfo ncurses-libs readline
        #   gdbm:                     GNU dbm is a set of database routines that use extensible hashing
        #   sqlite-libs:              Sqlite3 library
        #   py-setuptools:            A collection of enhancements to the Python distutils
        #   py2-pip:                  A tool for installing and managing Python packages
        python \
        py2-pip \
        python-dev \
  
        # ruby(10-16): An object-oriented language for quick and easy programming
        #   libffi gdbm gmp ncurses-terminfo-base ncurses-terminfo ncurses-libs readline
        #   yaml:                     YAML 1.1 parser and emitter written in C
        #   ruby-libs:                Libraries necessary to run Ruby
        #   libgmpxx:                 C++ support for gmp
        #   gmp-dev:                  A free library for arbitrary precision arithmetic (development files)
        #   ruby-irb:                 The Interactive Ruby
        #   ruby-bundler:             Manage an application's gem dependencies
        #   ruby-io-console:          Ruby simple console IO library
        #   ruby-rdoc:                Ruby documentation tool
        #   ruby-json:                JSON implementation as a Ruby extension in C
        #   An implementation of Ruby on the JVM
        ruby \
        ruby-dev \
        ruby-irb \
        ruby-bundler \
        ruby-rdoc \  
        # jruby(27): An implementation of Ruby on the JVM
        jruby \

        # nodejs: JavaScript runtime built on V8 engine - LTS version
        #   ca-certificates libcrypto1.0 libssl1.0 libgcc libstdc++ ncurses-terminfo-base ncurses-terminfo ncurses-libs readline
        #   http-parser:              HTTP request/response parser for C
        #   libuv:                    Cross-platform asychronous I/O
        nodejs \
        # nodejs-dev: JavaScript runtime built on V8 engine - LTS version (development files)
        nodejs-dev \
        
        # git: A distributed version control system
        #   ca-certificates expat
        #   pcre:                     Perl-compatible regular expression library
        git \      

        # openjdk8(39): OpenJDK 8 provided by IcedTea
        #   libffi ca-certificates libbz2 libpng freetype libgcc giflib libjpeg-turbo libstdc++ sqlite-libs 
        #   libtasn1:                 The ASN.1 library used in GNUTLS
        #   p11-kit:                  Library for loading and sharing PKCS#11 modules
        #   p11-kit-trust:            System trust module from p11-kit
        #   java-cacerts:             Script to update java cacerts store
        #   libxau:                   X11 authorisation library
        #   libxdmcp:                 X11 Display Manager Control Protocol library
        #   libxcb:                   X11 client-side library
        #   libx11:                   X11 client-side library
        #   libxcomposite:            X11 Composite extension library
        #   libxext:                  X11 miscellaneous extensions library
        #   libxi:                    X11 Input extension library
        #   libxrender:               X Rendering Extension client library
        #   libxtst:                  X11 Testing -- Resource extension library
        #   alsa-lib:                 An alternative implementation of Linux sound support    
        #   giflib:                   A library for reading and writing gif images    
        #   openjdk8-jre-lib:         OpenJDK 8 Java Runtime (class libraries)
        #   java-common:              Java common (updates java links)
        #   krb5-conf:                Shared krb5.conf for both MIT krb5 and heimdal
        #   libcom_err:               Common error description library
        #   nspr:                     Netscape Portable Runtime
        #   nss:                      Mozilla Network Security Services
        #   pcsc-lite-libs:           Middleware to access a smart card using SCard API (PC/SC) (libraries)
        #   lksctp-tools:             User-space access to Linux Kernel SCTP
        #   openjdk8-jre-base:        OpenJDK 8 Java Runtime (no GUI support)
        #   openjdk8-jre:             OpenJDK 8 Java Runtime
        openjdk8 \
       
        # openrc: OpenRC manages the services, startup and shutdown of a host
        openrc \

        # supervisor(13): A system for controlling process state under UNIX
        #   libbz2 expat libffi gdbm ncurses-terminfo-base ncurses-terminfo ncurses-libs readline
        #   sqlite-libs python2 py-setuptools
        #   py-meld3:                 An HTML/XML templating engine
        supervisor \

        # net-tools: Linux networking base tools
        #   mii-tool:                 media-independent interface (MII) tool
        net-tools \

        # shadow: PAM-using login and passwd utilities (usermod, useradd, ...)
        #   linux-pam:               pluggable authentication modules for linux
        shadow \

        # acl: Access control list utilities
        #   libattr:                Dynamic library for extended attribute support
        #   libacl:                 Dynamic library for access control list support
        acl \

        # bind-tools: The ISC DNS tools
        #   libgcc libxml2 bind-libs
        bind-tools \
        # bind: The ISC DNS server
        #   libgcc libxml2 bind-libs
        #   libcap:                 POSIX 1003.1e capabilities
        # bind \

        # sudo: Give certain users the ability to run some commands as root
        sudo \
        # su-exec: switch user and group id, setgroups and exec
        su-exec \

        # bc: An arbitrary precision numeric processing language (calculator)
        bc \

        # gnupg(15): GNU Privacy Guard 1 - a PGP replacement tool
        #   libgpg-error:           Support library for libgcrypt
        #   libassuan:              A IPC library used by some GnuPG related software
        #   libcap:                 POSIX 1003.1e capabilities
        #   ncurses-terminfo-base:  Descriptions of common terminals
        #   ncurses-terminfo:       Console display library
        #   ncurses-libs:           Ncurses libraries
        #   pinentry:               Collection of simple PIN or passphrase entry dialogs which utilize the Assuan protocol
        #   libbz2:                 Shared library for bz2  
        #   libgcrypt:              general purpose crypto library based on the code used in GnuPG  
        #   libksba:                Libksba is a CMS and X.509 access library  
        #   db:                     The Berkeley DB embedded database system
        #   libsasl:                Cyrus Simple Authentication and Security Layer (SASL) library
        #   libldap:                OpenLDAP libraries
        #   npth:                   The New GNU Portable Threads library
        gnupg \

    && echo "end"

# 配置时区
ENV TZ          Asia/Shanghai 
RUN set -ex \    
    && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone \
    && echo "end"

# 配置pip镜像
ENV PIP_MIRROR  pypi.tuna.tsinghua.edu.cn
# ENV PIP_MIRROR  mirrors.aliyun.com/pypi
RUN set -ex \
    && mkdir -p ~/.pip \

    &&  { \
		    echo "[global]"; \
            echo "index-url = https://${PIP_MIRROR}/simple"; \
	      } > ~/.pip/pip.conf \

    && pip install --no-cache-dir --upgrade --force-reinstall pip \
    && echo "end"

# 配置npm与yarn镜像
ENV NPM_MIRROR  npm.taobao.org
RUN set -ex \
    # cnpm
    &&  { \
            echo "registry=https://registry.${NPM_MIRROR}/"; \ 
            echo "sass_binary_site=https://${NPM_MIRROR}/mirrors/node-sass/"; \
            echo "phantomjs_cdnurl=http://${NPM_MIRROR}/mirrors/phantomjs/"; \
            echo "ELECTRON_MIRROR=http://${NPM_MIRROR}/mirrors/electron/"; \
        } > ~/.npmrc \

    && npm install -g cnpm --registry=https://registry.${NPM_MIRROR}/ \

    # yarn 淘宝镜像 tyarn
    && npm install yarn tyarn -g --registry=https://registry.${NPM_MIRROR}/ \
    && yarn config set registry https://registry.${NPM_MIRROR}/ \
    && echo "end"

# 配置ruby镜像 
# ENV GEM_MIRROR  mirrors.aliyun.com 
# ENV GEM_MIRROR  mirrors.tuna.tsinghua.edu.cn
ENV GEM_MIRROR  mirrors.ustc.edu.cn
RUN set -ex \
    && gem sources --remove https://rubygems.org/ --add https://${GEM_MIRROR}/rubygems/ \
    && gem update --system \
    && echo "end"    

# 配置Shell
ENV SHELL       /bin/zsh
RUN set -ex \    
    && chsh -s /bin/zsh \
    && echo "end"    

COPY ./.zshrc $HOME/.zshrc

# 配置ssh
RUN set -ex \
    # && mkdir -p /var/run/sshd \
    # 生成ssh访问秘钥 /etc/ssh/
    && ssh-keygen -A \
    # 免密访问配置
    && sed -i \
        -e 's~^#PermitRootLogin prohibit-password~PermitRootLogin yes~g' \
        -e 's~^#HostKey /etc/ssh/ssh_host_rsa_key~HostKey /etc/ssh/ssh_host_rsa_key~g' \
        -e 's~^#PubkeyAuthentication yes~PubkeyAuthentication yes~g' \
        -e 's~^#PasswordAuthentication yes~PasswordAuthentication yes~g' \
        -e 's~^#PermitEmptyPasswords no~PermitEmptyPasswords yes~g' \
        -e 's~^#UseDNS no~UseDNS no~g' \
        -e 's~^#Port 22~Port 2222~g' \
        /etc/ssh/sshd_config \
    && cat /etc/ssh/sshd_config \
   
    # 客户端配置
    && mkdir -p $HOME/.ssh \
    && chmod 700 $HOME/.ssh \
    &&  { \
            echo 'Host *'; \ 
            echo '  UserKnownHostsFile /dev/null'; \
            echo '  StrictHostKeyChecking no'; \ 
            echo '  LogLevel quiet'; \
            echo '  Port 2222'; \ 
        } > $HOME/.ssh/config \ 
    && chmod 600 $HOME/.ssh/config \
    && cat $HOME/.ssh/config \
    && ssh-keygen -q -N "" -t rsa -f $HOME/.ssh/id_rsa \
    && cat $HOME/.ssh/id_rsa.pub >> $HOME/.ssh/authorized_keys \
    && chmod 600 $HOME/.ssh/authorized_keys \   

    # 配置sshd服务
    && rc-update add sshd sysinit\
    && rc-status \
    && touch /run/openrc/softlevel \

    && echo "end"    

EXPOSE 2222

# 将物理机本地的~/.ssh/id_rsa.pub拷贝到容器里
# COPY /Users/Bolik/.ssh/id_rsa.pub $HOME/.ssh/authorized_keys
# docker cp ~/.ssh/id_rsa.pub containerid:/root/.ssh/authorized_keys

# CMD ["/usr/sbin/sshd", "-D"]
CMD openrc && bash

# 编译及执行方法如下: 
#     $ docker build -t balpine /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/balpine/
#     docker build -t balpine B:\OpenSource\WaterBolik\prestudy\bdocker\balpine\
#     docker run -it --rm balpine 

# 从容器中拷贝出配置文件
# scp -P 2222 root@127.0.0.1:/etc/ssh/sshd_config ./

# 生成ssl证书
# 创建私钥和证书签署请求
# docker run -v $PWD:/work -it balpine openssl req -out /work/CSR.csr -new -newkey rsa:2048 -nodes -keyout /work/privateKey.key

# 创建自签名的证书
# docker run -v $PWD:/work -it balpine openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout privateKey.key -out /work/certificate.crt

# 如何用正确的姿势查看 主机系统的CPU信息

# 查看cpu颗数
cat /proc/cpuinfo |grep "physical id" | sort -u |wc -l
# 查看cpu核心数
cat /proc/cpuinfo |grep "cpu cores"|sort -u
# 逻辑cpu总数
cat /proc/cpuinfo |grep "core id"|wc -l
# 查看是否开启了超线程
grep -E "cpu cores|siblings|physical id" /proc/cpuinfo |xargs -n 11 |sort -u

# 快速查看主机上总逻辑CPU数量
nproc --all
getconf _NPROCESSORS_ONLN
cat /sys/devices/system/cpu/online
lscpu