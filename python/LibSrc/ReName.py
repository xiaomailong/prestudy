#!/usr/bin/env python
# -*- coding:utf-8 -*-

import os, re

def GetFileList(directory) :
    for filename in os.listdir(directory):
        fullfilename = os.path.join(directory, filename)
        if os.path.isfile(fullfilename):
            print(fullfilename)
            filename = re.compile(r'(\d{4}|\d{2})-(1[0-2]|0?[1-9])-([12][0-9]|3[01]|0?[1-9])').sub(r'\1\2\3', filename)
            os.rename(fullfilename, os.path.join(directory, filename))
        if os.path.isdir(fullfilename):
            GetFileList(fullfilename)

GetFileList("/Volumes/Work/OpenSource/WaterBolik/prestudy/Wiki/library")
