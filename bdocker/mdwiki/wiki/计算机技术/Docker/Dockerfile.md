# 1. Dockerfile

## 1.1. Dockerfile格式

如果你的编译目录下有一些文件是不需要打包进Image的，你可以使用"dockerignoe file"文件进行过滤。重要涉及的指令是ADD和COPY。

```dockerfile
# Dockerfile指令是不区分大小写的，不过一般都使用大写来区分指令和参数。
# Dockerfile的第一句指令，必须是'FROM'，这个后面紧跟的是基础镜像名称。
# '#'可以用来注释。
FROM <image>
FROM <image>:<tag>
FROM <image>@<digest>
# FROM指令指定了目标Image的基础镜像。
# tag是某个特定版本的镜像, digest是最新引入的一种ID，类似于唯一标示符。

MAINTAINER <name>
# 这个字段一目了然，就是设置作者。

# 环境变量指令是ENV，这个类似于编程语言的变量，只能在Dockerfile中使用。
ENV foo /bar
WORKDIR ${foo}   # WORKDIR /bar
ADD . $foo       # ADD . /bar
COPY \$foo /quux # COPY $foo /quux
# 其中支持变量应用的指令包括：
ADD
COPY
ENV
EXPOSE
LABEL
USER
WORKDIR
VOLUME
STOPSIGNAL
ONBUILD

# RUN包含两种格式：
# RUN (shell格式，这种命令运行在shell中 /bin/sh -c)
# RUN ["executable", "arg1", "arg2"] (exec格式) 
# RUN指令可以执行任何命令，并在当前image的顶层添加一个文件层，并提交到新的image中。
# 由此我们可以看出，每一个RUN指令都会新加一层文件系统，
# 虽然这个并不占多少空间，不过还是推荐尽可能多的减少指令。
# 因此我们可以使用\来做换行处理。
# 换行模式
RUN /bin/bash -c 'source $HOME/.bashrc ; \
echo $HOME'
# 不换行模式
RUN /bin/bash -c 'source $HOME/.bashrc ; echo $HOME'
# exec模式
RUN apt-get dist-upgrade -y
```

### 1.1.1. 交互式方式制定CentOS镜像

```sh
# 下载centos镜像
docker pull centos
# 启动容器
docker run -it -d --name test-centos1 centos
# 进入容器
docker exec -it test-centos1 /bin/bash
# 检查工具
ifconfig
# 安装 net-tools 
yum install net-tools -y
# 安装 openssh-server
yum install openssh-server -y
# 创建ssh 所需的目录
mkdir -pv /var/run/sshd
# 在根目录创建sshd 启动脚本
cat /auto_sshd.sh
#!/bin/bash
/usr/sbin/sshd -D
# 给启动脚本权限
chmod +x /auto_sshd.sh
# 修改容器内root 的账户密码
echo "root:iloveworld" | chpasswd
# 生成ssh 主机dsa 密钥（不然ssh 该容器时，会出现错误。）
ssh-keygen -t dsa -f /etc/ssh/ssh_host_dsa_key
ssh-keygen -t rsa -f /etc/ssh/ssh_host_rsa_key
# history记录的时间
echo 'export HISTTIMEFORMAT="%F %T `whoami` "' >> /etc/profile

# 打包成新的镜像
docker commit test-centos1 centos_sshd:7.0
# 这条命令更方便以后启动
docker commit --change='CMD ["/auto_sshd.sh"]' -c "EXPOSE 22" test-centos1 centos_sshd:7.0
# --change : 将后期使用此镜像运行容器时的命令参数、开放的容器端口提前设置好。

# 启动新的容器
docker run -d -it --name centos_7.0-1 centos_sshd:7.0
# 查看容器ip
docker exec centos_7.0-1 hostname -I
# ssh连接容器
ssh root@172.17.0.2
```

### 1.1.2. Dockerfile方式制定CentOS镜像

dockerfile内容如下：

```dockerfile
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
```

构建

```sh
# 使用docker build命令来创建镜像
docker build -t centos_sshd_1 .
# -t 选项来docker build新的镜像以便于标记构建的镜像，
# . 表示当前目录，也可以指定dockerfile 文件所在目录。

# 查看镜像列表
docker images
# 创建容器
docker run -d -it --name centos-two centos_sshd_1
# 查看容器ip
docker exec centos-two hostname -I
# ssh
ssh root@172.17.0.2
```

### 1.1.3. Dockerfile准则

1.  尽量将Dockerfile放在空目录中，如果目录中必须有其他文件，则使用.dockerignore文件。
2.  避免安装不必须的包。
3.  每个容器应该只关注一个功能点。
4.  最小化镜像的层数。
5.  多行参数时应该分类。这样更清晰直白，便于阅读和review，另外，在每个换行符`\`前都增加一个空格。
6.  固定软件版本。固定所有依赖的版本是实现良好实践最佳途径。这包括基本映象，从GitHub中提取的代码，代码依赖的库等等。通过版本控制，您可以简化应用程序已知的工作版本。
7.  对构建缓存要有清楚的认识。自我清理。确保所有的清理语句在同一个部分运行，否则它们将看起来清除，但最终仍然存在于Docker容器成为残留。
8.  组合运行语句。把逻辑上属于一起操作步骤的语句合并进入Dockerfile中，这样以避免类似缓存和不必要地使用磁盘空间有关常见问题。 
9.  使用启动脚本。创建和调试比较大型的项目，不要直接使用CMD命令运行，建立一个开始脚本，每次调用运行。
10. 创建 Non-Root User。

```dockerfile
RUN useradd --user-group --shell /bin/false docker 
USER docker
```

## 1.2. 指令注意事项

### 1.2.1. FROM

[Dockerfile reference for the FROM instruction](https://docs.docker.com/engine/reference/builder/#from)

任何时候，尽量使用官方镜像源作为你镜像的基础镜像。我们建议使用[Debian Image](https://hub.docker.com/_/debian/)，因为其被很好地管理着，并且作为一个完整的发布包，但体积却保持着最小化（当前不足150MB）。

1.  FROM必须是除了注释以外的第一行；
2.  可以有多个FROM语句，来创建多个image；

### 1.2.2. LABEL

[Dockerfile reference for the LABEL instruction](https://docs.docker.com/engine/reference/builder/#label)

### 1.2.3. RUN

[Dockerfile reference for the RUN instruction](https://docs.docker.com/engine/reference/builder/#run)

RUN语句有两种格式：

#### 1.2.3.1. apt-get

尽量避免使用RUN apt-get upgrade或者dist-upgrade，因为基础镜像的很多核心包不会再未授权的容器中升级。

要结合RUN apt-get update和apt-get install在同一个RUN语句下一起使用。如：

```dockerfile
RUN apt-get update && apt-get install -y \
        package-bar \
        package-baz \
        package-foo
```

如果将update和install分开使用，执行多个Dockerfile时，会引起缓存问题，导致后面执行的install语句会失败。

另外，执行完apt-get语句后，最后最好加上删除安装包的语句，以减小镜像的体积。如：

```dockerfile
RUN apt-get update && apt-get install -y \
    aufs-tools \
    automake \
    build-essential \
 && rm -rf /var/lib/apt/lists/*
```

**注意**：官方的Debian和Ubuntu镜像会自动执行“`RUN apt-get clean`”，所以不需要明确地删除指令。

#### 1.2.3.2. 管道使用

很多RUN命令都需要使用到管道，如：

```dockerfile
RUN wget -O - https://some.site | wc -l > /number
```

Docker使用`/bin/sh -c`解释器来执行这些命令，该解释器只评估管道最后一个操作的返回值来判断整个命令是否成功。在上面的例子中，只要`wc -l`命令成功了，即使`wget`命令失败了，也会创建一个新镜像。为了避免上述情况，可以在语句首部加上`set -o pipefail &&`。比如：

```dockerfile
RUN set -o pipefail && wget -O - https://some.site | wc -l > /number
```

**注意**：并非所有的shell都支持`-o pipefail`选项，比如说基于Debian的镜像下的模式`shell：dash shell`。这种情况下，我们可以使用`exec`格式的RUN命令来显示地选择shell来支持pipefail选项。如：

```dockerfile
RUN ["/bin/bash", "-c", "set -o pipefail && wget -O - https://some.site | wc -l > /number"]
```

### 1.2.4. CMD

[Dockerfile reference for the CMD instruction](https://docs.docker.com/engine/reference/builder/#cmd)

CMD语句与RUN不同，RUN是在build镜像的时候运行，而CMD语句是在build结束后运行。一个Dockerfile钟可以有多个RUN语句，虽然也可以有多个CMD语句，但是却只有最后一条CMD语句会执行。CMD语句格式为：

```dockerfile
CMD [“executable”, “param1”, “param2”…]
```

### 1.2.5. EXPOSE

[Dockerfile reference for the EXPOSE instruction](https://docs.docker.com/engine/reference/builder/#expose)

EXPOSE指令指明容器会监听链接的端口。因此，最好使用常用的、传统的应用端口。比如，Apache web服务器使用EXPOSE 80等。

为了给外部链接使用，你需要使用`docker run`命令来制定容器端口和host端口的映射。

### 1.2.6. ENV

[Dockerfile reference for the ENV instruction](https://docs.docker.com/engine/reference/builder/#env)

用于设置环境变量，设置后，后面的RUM指令就可以使用之前的环境变量了。同时，还可以通过`docker run --env key=value`，在容器启动时设置环境变量。如：

```dockerfile
ENV PG_MAJOR 9.3
ENV PG_VERSION 9.3.4
RUN curl -SL http://example.com/postgres-$PG_VERSION.tar.xz | tar -xJC /usr/src/postgress && …
ENV PATH /usr/local/postgres-PG_MAJOR/bin:PATH
```

### 1.2.7. ADD和COPY

[Dockerfile reference for the ADD instruction](https://docs.docker.com/engine/reference/builder/#add)

[Dockerfile reference for the COPY instruction](https://docs.docker.com/engine/reference/builder/#copy)

虽然ADD和COPY功能相似，但一般来讲，更建议使用COPY。因为COPY比ADD更透明，COPY只支持从本地文件到容器的拷贝，但是ADD还有一些其他不明显的特性（比如本地tar包解压缩和远程URL支持）。因此，ADD的最优用处是本地tar包自动解压缩到镜像中。如：ADD rootfs.tar.xz /。

如果有多个Dockerfile步骤用于处理不同的文件，建议分开COPY它们，而不是一次性拷贝。这可以保证每个步骤的build缓存只在对应的文件改变时才无效。比如：

```dockerfile
COPY requirements.txt /tmp/
RUN pip install --requirement /tmp/requirements.txt
COPY . /tmp/
```

镜像的大小很重要，因此不鼓励使用ADD从远端URL获取包；可以使用curl或者wget来代替。这种方式你可以删除不再需要的文件，如解压缩后的tar包，从而不需要再添加额外的layer到镜像中。

```dockerfile
# 你应该避免这样使用：
ADD http://example.com/big.tar.xz /usr/src/things/
RUN tar -xJf /usr/src/things/big.tar.xz -C /usr/src/things
RUN make -C /usr/src/things all

# 而应该如此：
RUN mkdir -p /usr/src/things \
    && curl -SL http://example.com/big.tar.xz | tar -xJC /usr/src/things \
    && make -C /usr/src/things all
```

对于不需要使用ADD命令tar包自动解压缩功能的文件和目录，你应该总是使用COPY。

### 1.2.8. ENTRYPOINT

[Dockerfile reference for the ENTRYPOINT instruction](https://docs.docker.com/engine/reference/builder/#entrypoint)

使用ENTRYPOINT来设置镜像的主命令，就像这个镜像运行时就是这条命令一样（然后再使用CMD作为默认的flag）。

我们使用s3cmd命令作为镜像的主命令。

```dockerfile
ENTRYPOINT ["s3cmd"]
CMD ["--help"]
```

### 1.2.9. VOLUME

[Dockerfile reference for the VOLUME instruction](https://docs.docker.com/engine/reference/builder/#volume)

VOLUME指令一般用于数据库的存储区域，配置存储，或者docker容器创建的文件和目录。

### 1.2.10. USER

[Dockerfile reference for the USER instruction](https://docs.docker.com/engine/reference/builder/#user)

如果服务可以在不需要特权的情况下运行，那么就应该使用USER来切换用户至非root用户。可以用RUN命令创建用户组和用户如：

```dockerfile
RUN groupadd -r postgres && useradd -r -g postgres postgres
```

应该避免安装和使用sudo，因为它有不可预知的TTY和信号转移特性，会产生很多问题。如果的确一定要使用类似sudo的功能（如root下初始化daemon，非root下运行），可以使用“gosu”。

### 1.2.11. WORKDIR

[Dockerfile reference for the WORKDIR instruction](https://docs.docker.com/engine/reference/builder/#workdir)

为了Dockerfile内容更加清晰和可靠，最好总是使用绝对路径。同样地，应该使用WORKDIR，而不是使用类似“`cd … && do-something`”这样的指令，因为那样会导致难以阅读、查找错误和维护。

### 1.2.12. ONBUILD

[Dockerfile reference for the ONBUILD instruction](https://docs.docker.com/engine/reference/builder/#onbuild)

### 1.2.13. 其他资源

[Dockerfile Best Practices](https://docs.docker.com/engine/userguide/eng-image/dockerfile_best-practices/)

[Dockerfile Reference](https://docs.docker.com/engine/reference/builder/)

[jessie-Dockerfile](https://github.com/docker-library/buildpack-deps/blob/master/jessie/Dockerfile)

[.dockerignore file](https://docs.docker.com/engine/reference/builder/#dockerignore-file)

[Dockerfile实践优化建议](http://dockone.io/article/2034)

[build-optimisation/](https://docs.resin.io/deployment/build-optimisation/)

## 1.3. 编写最佳的Dockerfile

### 目标

-   更快的构建速度
-   更小的Docker镜像大小
-   更少的Docker镜像层
-   充分利用镜像缓存
-   增加Dockerfile可读性
-   让Docker容器使用起来更简单

### 总结

-   编写.dockerignore文件
-   容器只运行单个应用
-   将多个RUN指令合并为一个
-   基础镜像的标签不要用latest
-   每个RUN指令后删除多余文件
-   选择合适的基础镜像(alpine版本最好)
-   设置WORKDIR和CMD
-   使用ENTRYPOINT (可选)
-   在entrypoint脚本中使用exec
-   COPY与ADD优先使用前者
-   合理调整COPY与RUN的顺序
-   设置默认的环境变量，映射端口和数据卷
-   使用LABEL设置镜像元数据
-   添加HEALTHCHECK

### 1.3.3. 使用.dockerignore

构建镜像时，Docker需要先准备context ，将所有需要的文件收集到进程中。默认的context包含Dockerfile目录中的所有文件，但是实际上，我们并不需要.git目录，node_modules目录等内容。 .dockerignore 的作用和语法类似于 .gitignore，可以忽略一些不需要的文件，这样可以有效加快镜像构建时间，同时减少Docker镜像的大小。

### 1.3.4. 容器只运行单个应用

从技术角度讲，你可以在Docker容器中运行多个进程。你可以将数据库，前端，后端，ssh，supervisor都运行在同一个Docker容器中。但是，这会让你非常痛苦:

-   非常长的构建时间(修改前端之后，整个后端也需要重新构建)
-   非常大的镜像大小
-   多个应用的日志难以处理(不能直接使用stdout，否则多个应用的日志会混合到一起)
-   横向扩展时非常浪费资源(不同的应用需要运行的容器数并不相同)
-   僵尸进程问题 - 你需要选择合适的init进程

因此，我建议大家为每个应用构建单独的Docker镜像，然后使用 Docker Compose 运行多个Docker容器。

SSH可以用docker exec替代。

### 1.3.5. 将多个RUN指令合并为一个

Docker镜像是分层的，下面这些知识点非常重要:

-   Dockerfile中的每个指令都会创建一个新的镜像层。
-   镜像层将被缓存和复用
-   当Dockerfile的指令修改了，复制的文件变化了，或者构建镜像时指定的变量不同了，对应的镜像层缓存就会失效
-   某一层的镜像缓存失效之后，它之后的镜像层缓存都会失效
-   镜像层是不可变的，如果我们在某一层中添加一个文件，然后在下一层中删除它，则镜像中依然会包含该文件(只是这个文件在Docker容器中不可见了)。

Docker镜像类似于洋葱。它们都有很多层。为了修改内层，则需要将外面的层都删掉。我们只能将变化频率一样的指令合并在一起。

### 1.3.6. 基础镜像的标签不要用latest

当镜像没有指定标签时，将默认使用latest 标签。因此， FROM ubuntu 指令等同于FROM ubuntu:latest。当时，当镜像更新时，latest标签会指向不同的镜像，这时构建镜像有可能失败。如果你的确需要使用最新版的基础镜像，可以使用latest标签，否则的话，最好指定确定的镜像标签。

### 1.3.7. 每个RUN指令后删除多余文件

假设我们更新了apt-get源，下载，解压并安装了一些软件包，它们都保存在/var/lib/apt/lists/目录中。但是，运行应用时Docker镜像中并不需要这些文件。我们最好将它们删除，因为它会使Docker镜像变大。

### 1.3.8. 选择合适的基础镜像(alpine版本最好)

alpine是一个极小化的Linux发行版，只有不到4MB，这让它非常适合作为基础镜像。

apk是Alpine的包管理工具。它与apt-get有些不同，但是非常容易上手。另外，它还有一些非常有用的特性，比如no-cache和 --virtual选项，它们都可以帮助我们减少镜像的大小。

### 1.3.9. 设置WORKDIR和 CMD

WORKDIR指令可以设置默认目录，也就是运行RUN / CMD / ENTRYPOINT指令的地方。

CMD指令可以设置容器创建是执行的默认命令。另外，你应该将命令写在一个数组中，数组中每个元素为命令的每个单词(参考官方文档)。

### 1.3.10. 使用ENTRYPOINT (可选)

ENTRYPOINT指令并不是必须的，因为它会增加复杂度。ENTRYPOINT是一个脚本，它会默认执行，并且将指定的命令错误其参数。它通常用于构建可执行的Docker镜像。

entrypoint.sh如下:

```sh
#!/usr/bin/env sh
# $0 is a script name,
# $1, $2, $3 etc are passed arguments
# $1 is our command
CMD=$1

case "$CMD" in
  "dev" )
    npm install
    export NODE_ENV=development
    exec npm run dev
    ;;

  "start" )
    # we can modify files here, using ENV variables passed in 
    # "docker create" command. It can't be done during build process.
    echo "db: $DATABASE_ADDRESS" >> /app/config.yml
    export NODE_ENV=production
    exec npm start
    ;;

   * )
    # Run custom command. Thanks to this line we can still use 
    # "docker run our_image /bin/bash" and it will work
    exec $CMD ${@:2}
    ;;
esac
```

示例Dockerfile:

```dockerfile
FROM node:7-alpine

WORKDIR /app
ADD . /app
RUN npm install

ENTRYPOINT ["./entrypoint.sh"]
CMD ["start"]
```

可以使用如下命令运行该镜像:

```sh
# 运行开发版本
docker run our-app dev

# 运行生产版本
docker run our-app start

# 运行bash
docker run -it our-app /bin/bash
```

### 1.3.11. 在entrypoint脚本中使用exec

在前文的entrypoint脚本中，我使用了exec命令运行node应用。不使用exec的话，我们则不能顺利地关闭容器，因为SIGTERM信号会被bash脚本进程吞没。exec命令启动的进程可以取代脚本进程，因此所有的信号都会正常工作。

### 1.3.12. COPY与ADD优先使用前者

COPY指令非常简单，仅用于将文件拷贝到镜像中。ADD相对来讲复杂一些，可以用于下载远程文件以及解压压缩包(参考官方文档)。

### 1.3.13. 合理调整COPY与RUN的顺序

我们应该把变化最少的部分放在Dockerfile的前面，这样可以充分利用镜像缓存。

示例中，源代码会经常变化，则每次构建镜像时都需要重新安装NPM模块，这显然不是我们希望看到的。因此我们可以先拷贝package.json，然后安装NPM模块，最后才拷贝其余的源代码。这样的话，即使源代码变化，也不需要重新安装NPM模块。

### 1.3.14. 设置默认的环境变量，映射端口和数据卷

运行Docker容器时很可能需要一些环境变量。在Dockerfile设置默认的环境变量是一种很好的方式。另外，我们应该在Dockerfile中设置映射端口和数据卷。

ENV指令指定的环境变量在容器中可以使用。如果你只是需要指定构建镜像时的变量，你可以使用ARG指令。

### 1.3.15. 使用LABEL设置镜像元数据

使用LABEL指令，可以为镜像设置元数据，例如镜像创建者或者镜像说明。旧版的Dockerfile语法使用MAINTAINER指令指定镜像创建者，但是它已经被弃用了。有时，一些外部程序需要用到镜像的元数据，例如nvidia-docker需要用到com.nvidia.volumes.needed。

示例如下:

```dockerfile
FROM node:7-alpine
LABEL maintainer "jakub.skalecki@example.com"
...
```

### 1.3.16. 添加HEALTHCHECK

运行容器时，可以指定--restart always选项。这样的话，容器崩溃时，Docker守护进程(docker daemon)会重启容器。对于需要长时间运行的容器，这个选项非常有用。但是，如果容器的确在运行，但是不可(陷入死循环，配置错误)用怎么办？使用HEALTHCHECK指令可以让Docker周期性的检查容器的健康状况。我们只需要指定一个命令，如果一切正常的话返回0，否则返回1。对HEALTHCHECK感兴趣的话，可以参考这篇博客。

示例如下:

```dockerfile
FROM node:7-alpine
LABEL maintainer "jakub.skalecki@example.com"

ENV PROJECT_DIR=/app
WORKDIR $PROJECT_DIR

COPY package.json $PROJECT_DIR
RUN npm install
COPY . $PROJECT_DIR

ENV MEDIA_DIR=/media \
    NODE_ENV=production \
    APP_PORT=3000

VOLUME $MEDIA_DIR
EXPOSE $APP_PORT
HEALTHCHECK CMD curl --fail http://localhost:$APP_PORT || exit 1

ENTRYPOINT ["./entrypoint.sh"]
CMD ["start"]
```

当请求失败时，curl --fail 命令返回非0状态。
