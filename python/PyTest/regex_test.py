#!/usr/bin/env python
# -*- coding:utf-8 -*-

import re
import regex

# regex.DEFAULT_VERSION = regex.V1


def test_regex_Version_0_vs_1():
    # 零宽匹配
    # Version 0 behaviour (like re)
    #   .split 不能在零宽匹配处切割字符串。
    #   .sub 在匹配零宽之后向前传动一个位置。
    assert regex.sub(r'(?V0).*', 'x', 'test') == 'x'
    assert regex.sub(r'(?V0).*?', '|', 'test') == '|t|e|s|t|'
    assert regex.split(r'(?V0).*', 'test') == ['', '']
    assert regex.split(r'(?V0).*?', 'test') == ['test']
    assert re.sub(r'.*', 'x', 'test') == 'x'
    assert re.sub(r'.*?', '|', 'test') == '|t|e|s|t|'
    assert re.split(r'.*', 'test') == ['', '']
    assert re.split(r'.*?', 'test') == ['test']
    # Version 1 behaviour (like Perl)
    #   .split 可以在零宽匹配处切割字符串。
    #   .sub 采用正确的行为。
    assert regex.sub(r'(?V1).*', 'x', 'test') == 'xx'
    assert regex.sub(r'(?V1).*?', '|', 'test') == '|||||||||'
    assert regex.split(r'(?V1).*', 'test') == ['', '']
    assert regex.split(r'(?V1).*?', 'test') == ['', '', '', '', '', '']