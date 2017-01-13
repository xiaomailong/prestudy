#!/usr/bin/env python
# -*- coding:utf-8 -*-

# 列表生成式 ----------------------------------------------------------------------
# 基础：    [exp for iter_var in iterable]
# 带过滤：  [exp for iter_var in iterable if_exp]
# 循环嵌套：[exp for iter_var_A in iterable_A for iter_var_B in iterable_B]


def test_list_generator():
    # 生成一个从3到10的数字列表
    list1 = list(range(3, 11))
    list2 = [x for x in range(3, 11)]
    # assert len(list1) == len(list2)
    # list2.append(13)
    assert list1 == list2

    # 生成一个2n+1的数字列表，n为从3到11的数字
    list3 = []
    for n in range(3, 11):
        list3.append(2 * n + 1)
    list4 = [2 * n + 1 for n in range(3, 11)]
    # assert len(list3) == len(list4)
    assert list3 == list4

    # 过滤出一个指定的数字列表中值大于20的元素
    L = [3, 7, 11, 14, 19, 33, 26, 57, 99]
    list5 = []
    for x in L:
        if x > 20:
            list5.append(x)
    list6 = [x for x in L if x > 20]
    assert list5 == list6

    # 计算两个集合的全排列，并将结果作为保存至一个新的列表中
    L1 = ['香蕉', '苹果', '橙子']
    L2 = ['可乐', '牛奶']
    list7 = []
    for x in L1:
        for y in L2:
            list7.append((x, y))
    list8 = [(x, y) for x in L1 for y in L2]
    assert list7 == list8

    # 将一个字典转换成由一组元组组成的列表，元组的格式为(key, value)
    D = {'Tom': 15, 'Jerry': 18, 'Peter': 13}
    list9 = []
    for k, v in D.items():
        list9.append((k, v))
    list10 = [(k, v) for k, v in D.items()]
    assert list9 == list10

    # 把一个列表中所有的字符串转换成小写，非字符串元素原样保留
    L3 = ['TOM', 'Peter', 10, 'Jerry']
    list11 = [x.lower() if isinstance(x, str) else x for x in L3]
    # 用map()函数实现
    list12 = list(map(lambda x: x.lower() if isinstance(x, str) else x,  L3))
    assert list11 == list12
    assert 10 in list11
    assert 'peter' in list12

    # 把一个列表中所有的字符串转换成小写，非字符串元素移除
    L4 = ['TOM', 'Peter', 10, 'Jerry']
    # 用列表生成式实现
    list13 = [x.lower() for x in L4 if isinstance(x, str)]
    # 用map()和filter()函数实现
    list14 = list(map(lambda x: x.lower(),
                      filter(lambda x: isinstance(x, str), L4)))
    assert list13 == list14
    assert 10 not in list13
    assert 'peter' in list14

# yield生成器 -------------------------------------------------------------------
# 计算过程比较复杂可以通过包含yield的函数来构造generator。
# 说明： Python 3.3之前的版本中，不允许迭代函数法中包含return语句。
# 生成器在执行过程中，遇到yield关键字就会中断执行，下次调用则继续从上次中断的位置继续执行。
# 生成器的特性：
#   只有在调用时才会生成相应的数据
#   只记录当前的位置
#   只能next，不能prev
# 调用生成器产生新的元素，有两种方式：
#   调用内置的next()方法
#   使用循环对生成器对象进行遍历（推荐）
#   调用生成器对象的send()方法


def test_yield_generator():
    # 使用类似列表生成式的方式构造生成器
    g1 = (2 * n + 1 for n in range(3, 6))

    # 使用包含yield的函数构造生成器
    def my_range(start, end):
        for n in range(start, end):
            yield 2 * n + 1
    g2 = my_range(3, 6)
    assert list(g1) == list(g2)
    # 使用next()方法遍历生成器
    for x1 in g1:
        assert x1 == next(g2)
    #
    # print(next(g1)) 
    # 生成器在语境中只能被循环调用一次
    # for x2 in g2:
    #     assert x2 == next(g1)
    


#
