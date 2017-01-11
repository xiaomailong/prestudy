#!/bin/bash

# 进入python Dockerfile 目录
# cd /Volumes/Work/OpenSource/WaterBolik/prestudy/docker/python 

# 编译构建docker镜像
# docker build -t bpython .

# 执行docker
docker run -it --rm  -v /Volumes/Work/OpenSource/WaterBolik/prestudy/python/PyTest:/pytest cpython 