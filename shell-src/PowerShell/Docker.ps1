# 检查并确认版本
docker --version
docker-compose --version
docker-machine --version
# 容器版本信息
docker version
# 查看容器信息
docker info
# 运行经典示例检查安装是否成功
docker run hello-world
# 运行ubuntu命令行
docker run -it ubuntu bash
# 运行centos命令行
docker run -it centos bash
# 运行经典nginx Web服务
docker run -d -p 80:80 --name webserver nginx
# 访问 http://localhost/ 检查是否成功建立Web服务
# 查看当前正在运行的webserver容器
docker ps
# 停止容器运行
docker stop webserver
# 查看停止运行的容器
docker ps -a
# 启动容器
docker start webserver
# 移除容器，移除容器时并不会删除本地镜像
docker rm -f webserver
# 查看本地镜像
docker images
# 删除本地镜像 docker rmi <imageID>|<imageName>
docker rmi nginx   

# You can see from the above output that the HTTP_PROXY, http_proxy and no_proxy environment variables are set
docker run -it alpine env

# Set up tab completion in PowerShell
Set-ExecutionPolicy RemoteSigned 
Get-Executionpolicy
Import-Module posh-docker
Install-Module -Scope CurrentUser posh-docker -Force
Add-Content $PROFILE "`nImport-Module posh-docker"
Notepad $PROFILE

cd B:\OpenSource\WaterBolik\prestudy\docker\
# 创建目录
mkdir mydockerbuild
cd mydockerbuild
# 创建Dockerfile
# Dockerfile
# ls

# 查看Dockerfile内容
Notepad Dockerfile
# 编译镜像
docker build -t docker-whale .

# 搜索docker镜像
docker search coreos
# 拉取一个镜像
docker pull steigr/coreos
docker pull centos

# 运行Python交互环境
docker run -it --rm python:alpine
docker run -it --rm python:2-alpine

# 运行Python3脚本
docker run -it --rm --name my-running-script -v "$PWD":/usr/src/myapp -w /usr/src/myapp python:alpine python your-daemon-or-script.py
# 运行Python2脚本
docker run -it --rm --name my-running-script -v "$PWD":/usr/src/myapp -w /usr/src/myapp python:2-alpine python your-daemon-or-script.py

# 构建deepleaning
cd B:\OpenSource\WaterBolik\prestudy\docker\deepleaning\
docker build -t deeplearning .
docker run -it -v /B/OpenSource/WaterBolik/prestudy/python/PyTest:/pytest deeplearing sh


