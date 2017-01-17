#!/usr/bin/env python
# -*- coding:utf-8 -*-

import re

# re.compile(strPattern[, flag])
# 将字符串形式的正则表达式编译为Pattern对象。
# 第二个参数flag是匹配模式，取值可以使用按位或运算符'|'表示同时生效，比如re.I | re.M。
# 可以在regex字符串中指定模式，比如re.compile('pattern', re.I | re.M)与re.compile('(?im)pattern')是等价的。
# 可选值有：
#   re.I(re.IGNORECASE): 忽略大小写（括号内是完整写法，下同）
#   M(MULTILINE): 多行模式，改变'^'和'$'的行为（参见上图）
#   S(DOTALL): 点任意匹配模式，改变'.'的行为
#   L(LOCALE): 使预定字符类 \w \W \b \B \s \S 取决于当前区域设定
#   U(UNICODE): 使预定字符类 \w \W \b \B \s \S \d \D 取决于unicode定义的字符属性
#   X(VERBOSE): 详细模式。这个模式下正则表达式可以是多行，忽略空白字符，并可以加入注释。


def test_re():
     # 将正则表达式编译成Pattern对象
    pattern = re.compile(r'hello')
    # 使用Pattern匹配文本，获得匹配结果，无法匹配时将返回None
    # match = pattern.match('hello world!')
    # if match:
    #     # 使用Match获得分组信息
    #     print match.group()
    # assert 1 == 2
