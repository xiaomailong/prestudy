FROM alpine:3.5

MAINTAINER Bolik WaterBolik@163.com

ENV LANG C.UTF-8 

# 配置中文语言
ENV LANG zh_CN.UTF-8 
ENV LANGUAGE zh_CN.UTF-8 
ENV LC_ALL=zh_CN.UTF-8 

# 设置时区 
ENV TZ=Asia/Shanghai

RUN set -ex \
    # 使用清华apk镜像
    && sed -i 's/dl-cdn.alpinelinux.org/mirror.tuna.tsinghua.edu.cn/' /etc/apk/repositories \
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
        
        # Timezone data
        tzdata \
  
        # curl: An URL retrival utility and library        
        #   ca-certificates:          Common CA certificates PEM files
        #   libssh2:                  library for accessing ssh1/ssh2 protocol servers
        #   libcurl:                  The multiprotocol file transfer library
        curl \

        # The GNU Bourne Again shell
        #   ncurses-terminfo-base:    Descriptions of common terminals
        #   ncurses-terminfo:         Console display library
        #   ncurses-libs:             Ncurses libraries
        #   readline:                 GNU readline library
        bash \

        # openssl: Toolkit for SSL v2/v3 and TLS v1
        #   libcrypto1.0:             Crypto library from openssl
        #   libssl1.0:                SSL shared libraries
        openssl \

        # openssh: Port of OpenBSD's free SSH release
        #   openssh-client:           OpenBSD's SSH client 
        #   openssh-sftp-server:      ssh sftp server module
        openssh \

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

        # Linux system headers
        linux-headers \

        # Linear Algebra PACKage
        #   libgcc
        #   libquadmath:              128-bit math library for GCC
        #   libgfortran:              Fortran runtime library for GCC
        lapack \
        lapack-dev \

        # icu: International Components for Unicode library
        #   libgcc libstdc++
        #   icu-libs:                 International Components for Unicode library (libraries)
        icu \
        icu-dev \

        # A portable, high level programming interface to various calling conventions.
        libffi \
        libffi-dev \     

        # libxslt: XML stylesheet transformation library
        #   libgpg-error:             Support library for libgcrypt
        #   libgcrypt:                general purpose crypto library based on the code used in GnuPG
        #   libxml2:                  XML parsing library, version 2
        libxslt \

        # imagemagick(26): A collection of tools and libraries for many image formats
        #   libgcc gmp libffi libstdc++ libxml2
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
        imagemagick \

        # python: A high-level scripting language
        #   libbz2 expat libffi ncurses-terminfo-base ncurses-terminfo ncurses-libs readline
        #   gdbm:                     GNU dbm is a set of database routines that use extensible hashing
        #   sqlite-libs:              Sqlite3 library
        python \
        # py2-pip: A tool for installing and managing Python packages
        #   py-setuptools:            A collection of enhancements to the Python distutils
        py2-pip \
        # python-dev: A high-level scripting language (development files)
        #   pkgconf
        python-dev \

        # ruby: An object-oriented language for quick and easy programming
        #   libffi gdbm gmp ncurses-terminfo-base ncurses-terminfo ncurses-libs readline
        #   yaml:                     YAML 1.1 parser and emitter written in C
        #   ruby-libs:                Libraries necessary to run Ruby
        ruby \
        # ruby-dev: An object-oriented language for quick and easy programming (development files)
        #   libgcc libstdc++ pkgconf
        #   libgmpxx:                 C++ support for gmp
        #   gmp-dev:                  A free library for arbitrary precision arithmetic (development files)
        ruby-dev \
         # The Interactive Ruby
        ruby-irb \
        # Manage an application's gem dependencies
        #   ruby-io-console:          Ruby simple console IO library
        ruby-bundler \
        # Ruby documentation tool
        #   ruby-json:                JSON implementation as a Ruby extension in C
        ruby-rdoc \  

        # Larry Wall's Practical Extraction and Report Language
        perl \ 

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
       
        # OpenRC manages the services, startup and shutdown of a host
        openrc \

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

        # The ISC DNS tools
        #   libgcc libxml2 bind-libs
        bind-tools \
        # The ISC DNS server
        #   libgcc libxml2 bind-libs
        #   libcap:                 POSIX 1003.1e capabilities
        # bind \

        # Give certain users the ability to run some commands as root
        sudo \

        # An arbitrary precision numeric processing language (calculator)
        bc \

    && echo "end"

RUN set -ex \
    # pip 清华镜像更新
    && mkdir -p ~/.pip \
    && echo "[global]" > ~/.pip/pip.conf \
    && echo "index-url = https://pypi.tuna.tsinghua.edu.cn/simple" >> ~/.pip/pip.conf \
    && pip install --no-cache-dir --upgrade --force-reinstall pip \
    && echo "end"

RUN set -ex \
    # npm 淘宝镜像 cnpm
    && echo "registry=https://registry.npm.taobao.org/" > ~/.npmrc \
    && echo "sass_binary_site=https://npm.taobao.org/mirrors/node-sass/" >> ~/.npmrc \
    && echo "phantomjs_cdnurl=http://npm.taobao.org/mirrors/phantomjs/" >> ~/.npmrc \
    && echo "ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/" >> ~/.npmrc \
    && npm install -g cnpm --registry=https://registry.npm.taobao.org \
    # yarn 淘宝镜像 tyarn
    && npm install yarn tyarn -g --registry=https://registry.npm.taobao.org \
    && yarn config set registry https://registry.npm.taobao.org \
    && echo "end"

RUN set -ex \
    # ruby 淘宝镜像
    && gem sources --add https://mirrors.tuna.tsinghua.edu.cn/rubygems/ --remove https://rubygems.org/ \
    # && gem sources --remove https://rubygems.org/ \
    # && gem sources -a https://ruby.taobao.org/ \
    && gem update --system \
    && echo "end"    

RUN set -ex \    
    # 设置时区
    && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone \
    && echo "end"

    # 生成 rsa key
    # && ssh-keygen -A \
    # && ls 
    # && cat $HOME/.ssh/*.pub > $HOME/.ssh/authorized_keys \

    # && mkdir $HOME/.ssh \
    # && chmod 700 $HOME/.ssh \
    # 创建SSH密钥并将其拷贝到远程主机
    # && ssh-keygen -A \
    # && cat /etc/ssh/*.pub > $HOME/.ssh/authorized_keys \
    # && chmod 600 $HOME/.ssh/authorized_keys \

    # && sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config \
    # && sed -ri 's/^PermitRootLogin\s+.*/PermitRootLogin yes/' /etc/ssh/sshd_config \
    # && sed -ri 's/UsePAM yes/#UsePAM yes/g' /etc/ssh/sshd_config \


# 容器需要开放SSH 22端口
# EXPOSE 22

#Auto running sshd service
# CMD ["/usr/sbin/sshd","-D"]

CMD ["bash"]

# 编译及执行方法如下: 
#     $ docker build -t balpine /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/balpine/
#     docker build -t balpine B:\OpenSource\WaterBolik\prestudy\bdocker\balpine\
#     docker run -it --rm balpine 