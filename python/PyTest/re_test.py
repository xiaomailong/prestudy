#!/usr/bin/env python
# -*- coding:utf-8 -*-

import re
# import regex as re

# re 模块的一般使用步骤如下：
#   使用 compile 函数将正则表达式的字符串形式编译为一个 Pattern
#   对象通过 Pattern 对象提供的一系列方法对文本进行匹配查找，获得匹配结果（一个 Match 对象）
#   最后使用 Match 对象提供的属性和方法获得信息，根据需要进行其他的操作


def test_re_compile():
    # re.compile(strPattern[, flag])：将字符串形式的正则表达式编译为Pattern对象。
    #   第二个参数flag是匹配模式，取值可以使用按位或运算符'|'表示同时生效，比如re.I | re.M。
    #   可以在regex字符串中指定模式，比如re.compile('pattern', re.I | re.M)与re.compile('(?im)pattern')是等价的。
    #   可选值有：
    #       re.I(re.IGNORECASE): 忽略大小写（括号内是完整写法，下同）
    #       re.M(re.MULTILINE): 多行模式，改变'^'和'$'的行为（参见上图）
    #       re.S(re.DOTALL): 点任意匹配模式，改变'.'的行为
    #       re.L(re.LOCALE): 使预定字符类 \w \W \b \B \s \S 取决于当前区域设定
    #       re.U(re.UNICODE): 使预定字符类 \w \W \b \B \s \S \d \D 取决于unicode定义的字符属性
    #       re.X(re.VERBOSE): 详细模式。这个模式下正则表达式可以是多行，忽略空白字符，并可以加入注释。

    # 将正则表达式编译成Pattern对象
    # 如果匹配规则经常用到，预编译可以提高效率
    pattern = re.compile(r'hello')
    # 使用Pattern匹配文本，获得匹配结果，无法匹配时将返回None
    match = pattern.match('hello world!')
    assert match.group() == 'hello'
    a = re.compile(r"""
                    \d +  # the integral part
                    \.    # the decimal point
                    \d *  # some fractional digits
                    """, re.X)
    b = re.compile(r"\d+\.\d*")
    c = r'123324.123abc'
    ma = a.match(c)
    mb = b.match(c)
    assert ma.group() == mb.group() == r'123324.123'
    assert ma.span() == mb.span() == (0, 10)
    # assert a == b
    # assert a.pattern == b.pattern
    # assert a.flags == b.flags
    assert a.groups == b.groups
    assert a.groupindex == b.groupindex


def test_re_pattern():
    # Pattern对象是一个编译好的正则表达式，通过Pattern提供的一系列方法可以对文本进行匹配查找。
    #   Pattern不能直接实例化，必须使用re.compile()进行构造。
    #   Pattern提供了几个可读属性用于获取表达式的相关信息：
    #       pattern: 编译时用的表达式字符串。
    #       flags: 编译时用的匹配模式。数字形式。
    #       groups: 表达式中分组的数量。
    #       groupindex: 以表达式中有别名的组的别名为键、以该组对应的编号为值的字典，没有别名的组不包含在内。
    p = re.compile(r'(\w+) (\w+)(?P<sign>.*)', re.S)
    assert p.pattern == r'(\w+) (\w+)(?P<sign>.*)'
    # 48 = re.compile('(\\w+) (\\w+)(?P<sign>.*)', re.S).flags
    assert p.flags == 48
    # 8240 = regex.Regex('(\\w+) (\\w+)(?P<sign>.*)', flags=regex.S | regex.V0).flags
    # assert p.flags == 8240
    assert p.groups == 3
    assert p.groupindex == {'sign': 3}


def test_re_match():
    # match 方法用于查找字符串的头部（也可以指定起始位置），
    #   它是一次匹配，只要找到了一个匹配的结果就返回，而不是查找所有匹配的结果。
    # match(string[, pos[, endpos]]) | re.match(pattern, string[, flags]):
    #   这个方法将从string的pos下标处起尝试匹配pattern；
    #   如果pattern结束时仍可匹配，则返回一个Match对象；
    #   如果匹配过程中pattern无法匹配，或者匹配未结束就已到达endpos，则返回None。
    #       pos和endpos的默认值分别为0和len(string)；(不会执行pos+1...)
    #       re.match()无法指定这两个参数，参数flags用于编译pattern时指定匹配模式。
    #   注意：这个方法并不是完全匹配。
    #       当pattern结束时若string还有剩余字符，仍然视为成功。
    #       想要完全匹配，可以在表达式末尾加上边界匹配符'$'。

    # 使用 match()方法匹配字符串
    # Match对象是一次匹配的结果，包含了很多关于此次匹配的信息，可以使用Match提供的可读属性或方法来获取这些信息。
    m = re.match(r'(\w+) (\w+)(?P<sign>.*)', 'hello world!')
    # string: 匹配时使用的文本。
    assert m.string == 'hello world!'
    # re: 匹配时使用的Pattern对象。
    assert m.re == re.compile('(\\w+) (\\w+)(?P<sign>.*)')
    # pos: 文本中正则表达式开始搜索的索引。值与Pattern.match()和Pattern.seach()方法的同名参数相同。
    assert m.pos == 0
    # endpos: 文本中正则表达式结束搜索的索引。值与Pattern.match()和Pattern.seach()方法的同名参数相同。
    assert m.endpos == 12
    # lastindex: 最后一个被捕获的分组在文本中的索引。如果没有被捕获的分组，将为None。
    assert m.lastindex == 3
    # lastgroup: 最后一个被捕获的分组的别名。如果这个分组没有别名或者没有被捕获的分组，将为None。
    assert m.lastgroup == 'sign'
    # regs:
    assert m.regs == ((0, 12), (0, 5), (6, 11), (11, 12))
    # group([group1, …]): 获得一个或多个分组截获的字符串；指定多个参数时将以元组形式返回。
    #   group1可以使用编号也可以使用别名；
    #   编号0代表整个匹配的子串；不填写参数时，返回group(0)；
    #   没有截获字符串的组返回None；
    #   截获了多次的组返回最后一次截获的子串。
    assert m.group() == 'hello world!'
    assert m.group() == m.group(0)
    assert m.group(1) == 'hello'
    assert m.group('sign') == '!'
    assert m.group(1, 2) == ('hello', 'world')
    # groups([default]): 以元组形式返回全部分组截获的字符串。
    #   相当于调用group(1,2,…last)。
    #   default表示没有截获字符串的组以这个值替代，默认为None。
    assert m.groups() == ('hello', 'world', '!')
    # groupdict([default]): 返回以有别名的组的别名为键、以该组截获的子串为值的字典，没有别名的组不包含在内。
    #   default含义同上。
    assert m.groupdict() == {'sign': '!'}
    # start([group]): 返回指定的组截获的子串在string中的起始索引（子串第一个字符的索引）。group默认值为0。
    assert m.start(2) == 6
    # end([group]): 返回指定的组截获的子串在string中的结束索引（子串最后一个字符的索引+1）。group默认值为0。
    assert m.end(2) == 11
    # span([group]): 返回(start(group), end(group))。
    assert m.span(2) == (6, 11)
    # expand(template): 将匹配到的分组代入template中然后返回。
    #   template中可以使用\id或\g<id>、\g<name>引用分组，但不能使用编号0。
    #   \id与\g<id>是等价的；但\10将被认为是第10个分组，如果你想表达\1之后是字符'0'，只能使用\g<1>0。
    assert m.expand(r'\2 \1\3') == 'world hello!'


def test_re_search():
    # search 方法用于查找字符串的任何位置，
    #   它也是一次匹配，只要找到了一个匹配的结果就返回，而不是查找所有匹配的结果
    # search(string[, pos[, endpos]]) | re.search(pattern, string[, flags]):
    #   这个方法用于查找字符串中可以匹配成功的子串。
    #   从string的pos下标处起尝试匹配pattern，如果pattern结束时仍可匹配，则返回一个Match对象；
    #   若无法匹配，则将pos加1后重新尝试匹配；直到pos=endpos时仍无法匹配则返回None。
    #       pos和endpos的默认值分别为0和len(string))；
    #       re.search()无法指定这两个参数，参数flags用于编译pattern时指定匹配模式。

    # search()的工作方式与match()完全一致，不同之处在于search()是对给定正则表达式模式搜索第一次出现的匹配情况。
    p = re.compile(r'bugs')
    m = p.match(r'hello bugsbunny bugs2')
    assert m == None
    m = p.match(r'bugsbunny bugs2')
    s = p.search(r'hello bugsbunny bugs2')
    assert s.group() == 'bugs'
    assert s.span() == (6, 10)
    assert m.group() == 'bugs'
    assert m.span() == (0, 4)


def test_re_findall():
    # 搜索整个字符串，获得所有匹配的结果。
    # findall(string[, pos[, endpos]]) | re.findall(pattern, string[, flags]):
    #   搜索string，以列表形式返回全部能匹配的子串。
    p = re.compile(r'\d+')
    assert p.findall(r'one1two2three3four4') == ['1', '2', '3', '4']


def test_re_finditer():
    # finditer 方法的行为跟 findall 的行为类似，也是搜索整个字符串，获得所有匹配的结果。
    #   但它返回一个顺序访问每一个匹配结果（Match 对象）的迭代器。
    # finditer(string[, pos[, endpos]]) | re.finditer(pattern, string[, flags]):
    #   搜索string，返回一个顺序访问每一个匹配结果（Match对象）的迭代器。
    p = re.compile(r'\d+')
    r = []
    for m in p.finditer('one1two2three3four4'):
        r.append(m.group())
    assert r == ['1', '2', '3', '4']


def test_re_split():
    # split方法按照能够匹配的子串将字符串分割后返回列表
    # split(string[, maxsplit]) | re.split(pattern, string[, maxsplit]):
    #   按照能够匹配的子串将string分割后返回列表。
    #       maxsplit用于指定最大分割次数，不指定将全部分割。
    p = re.compile(r'\d+')
    assert p.split(r'one1two2three3four4') == [
        'one', 'two', 'three', 'four', '']


def test_re_sub():
    # sub 方法用于替换。
    # sub(repl, string[, count]) | re.sub(pattern, repl, string[, count]):
    #   使用repl替换string中每一个匹配的子串后返回替换后的字符串。
    #   当repl是一个字符串时，可以使用\id或\g<id>、\g<name>引用分组，但不能使用编号0。
    #   当repl是一个方法时，这个方法应当只接受一个参数（Match对象），
    #       并返回一个字符串用于替换（返回的字符串中不能再引用分组）。
    #   count用于指定最多替换次数，不指定时全部替换。
    p = re.compile(r'(\w+) (\w+)')
    s = 'i say, hello world!'

    assert p.sub(r'\2 \1', s) == 'say i, world hello!'

    def func(m):
        return m.group(1).title() + ' ' + m.group(2).title()

    assert p.sub(func, s) == 'I Say, Hello World!'


def test_re_subn():
    # subn 方法跟 sub 方法的行为类似，也用于替换。
    # subn(repl, string[, count]) |re.sub(pattern, repl, string[, count]):
    #   返回 (sub(repl, string[, count]), 替换次数)。
    p = re.compile(r'(\w+) (\w+)')
    s = 'i say, hello world!'

    assert p.subn(r'\2 \1', s) == ('say i, world hello!', 2)

    def func(m):
        return m.group(1).title() + ' ' + m.group(2).title()

    assert p.subn(func, s) == ('I Say, Hello World!', 2)


# def test_re_scanner():
    # scanner

def test_re_chinese():
    # 中文的 unicode 编码范围 主要在 [u4e00-u9fa5]，这里说主要是因为这个范围并不完整，比如没有包括全角（中文）标点，不过，在大部分情况下，应该是够用的。

    # 假设现在想把字符串 title = u'你好，hello，世界' 中的中文提取出来，可以这么做：
    title = u'你好，hello，世界'
    pattern = re.compile(r'[\u4e00-\u9fa5]+')
    assert pattern.findall(title) == [u'\u4f60\u597d', u'\u4e16\u754c']
