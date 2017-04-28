#!/bin/bash

diskutil list

# 修改/etc/fstab文件
sudo nano /etc/fstab
# LABEL=BolikU none ntfs rw,auto,nobrowse

sudo cp /Volumes/Work/OpenSource/WaterBolik/prestudy/shell-src/Mac/fstab /etc/fstab

cat /etc/fstab

sudo ln -s /Volumes ~/Desktop/Volumes