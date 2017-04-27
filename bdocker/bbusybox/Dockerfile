FROM busybox:musl
# https://hub.docker.com/_/busybox/
# busybox:glibc: glibc from Debian (which is then included in the image)
# busybox:musl: musl from Alpine (statically compiled)
# busybox:uclibc: uClibc via Buildroot (statically compiled) latest

MAINTAINER Bolik WaterBolik@163.com

COPY ./my-static-binary /my-static-binary

CMD ["/my-static-binary"]

# 编译及执行方法如下: 
#     $ docker build -t bbusybox /Volumes/Work/OpenSource/WaterBolik/prestudy/bdocker/bbusybox/
#     docker build -t bbusybox B:\OpenSource\WaterBolik\prestudy\bdocker\bbusybox\
#     docker run -it --rm bbusybox 

# This Dockerfile will allow you to create a minimal image for your statically compiled binary. 
# You will have to compile the binary in some other place like another container. 
# For a simpler alternative that's similarly tiny but easier to extend, see alpine.