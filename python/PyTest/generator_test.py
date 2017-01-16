#!/usr/bin/env python
# -*- coding:utf-8 -*-

import pytest

# Iterable、Iterator与Generator之间的关系
# 生成器对象既是可迭代对象，也是生成器： 
#   生成器不但可以作用与for循环，还可以被next()函数不断调用并返回下一个值，
#   直到最后抛出StopIteration错误表示无法继续返回下一个值了。
#   生成器同时满足可迭代对象和迭代器的定义；
# 迭代器对象一定是可迭代对象，反之则不一定： 
#   例如list、dict、str等集合数据类型是可迭代对象，但不是迭代器，但是它们可以通过iter()函数生成一个迭代器对象。
# 也就是说：迭代器、生成器和可迭代对象都可以用for循环去迭代，生成器和迭代器还可以被next()方函数调用并返回下一个值。

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
#   调用内置的next()方法，以抛出一个StopIeration异常终止。
#   使用循环对生成器对象进行遍历（推荐，不会抛出StopIeration异常）
#   调用生成器对象的send()方法，可以给yield传值（第一次必须是None），其他功能同next()方法

# generator函数和普通函数的区别
#   generator函数包含一个以上的yield声明
#   generator函数被调用的时候，会返回一个iterator对象，但是函数并不会立即开始执行
#   __iter__()和__next__()方法被自动实现，所以可以使用next()函数对返回的此iterator对象进行迭代
#   一旦一个generator 执行到yield语句，generator函数暂停，程序控制流被转移到调用方
#   在对generator的连续调用之间，generator的本地变量和状态会被保存
#   最终，generator函数终止，再调用generator会引发StopIteration异常

ret = ''
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
    # 生成器在语境中只能被循环调用一次
    # 如果在调用会抛出StopIteration异常
    with pytest.raises(StopIteration):
        next(g1)
    
    # 调用生成器对象的send()方法
    #   next()会调用yield，但不给它传值
    #   send()会调用yield，也会给它传值（该值将成为当前yield表达式的结果值）
    # 注意：第一次调用生成器的send()方法时，参数只能为None，否则会抛出异常。
    #      当然也可以在调用send()方法之前先调用一次next()方法，目的是让生成器先进入yield表达式。
    def my_range3(start, end):
        for n in range(start, end):
            ret = yield 2*n + 1
            print(ret)

    g3 = my_range3(3, 6)
    assert g3.send(None) == 7
    # assert ret == ''
    assert g3.send('hello01') == 9
    # assert ret == 'hello01'
    assert g3.send('hello02') == 11
    # assert ret == 'hello02'
    g4 = my_range3(3, 6)
    assert next(g4) == 7
    assert next(g4) == 9
    assert next(g4) == 11
    # assert ret == 'test'
   
    
# List生成式与yield生成器区别
# 列表生成式是直接创建一个新的list，它会一次性地把所有数据都存放到内存中，这会存在以下几个问题：
#   内存容量有限，因此列表容量是有限的；
#   当列表中的数据量很大时，会占用大量的内存空间，如果我们仅仅需要访问前面有限个元素时，就会造成内存资源的极大浪费；
#   当数据量很大时，列表生成式的返回时间会很慢；
# yield生成器中的元素是按照指定的算法推算出来的，只有调用时才生成相应的数据。
# 这样就不必一次性地把所有数据都生成，从而节省了大量的内存空间，这使得其生成的元素个数几乎是没有限制的，
# 并且操作的返回时间也是非常快速的（仅仅是创建一个变量而已）。

import time
import sys
def test_list_vs_yield():
    time_start1 = time.time()
    g1 = [x for x in range(10000000)]
    time_end1 = time.time()
    t1 = (time_end1 - time_start1)
    m1 = sys.getsizeof(g1)
    print('列表生成式返回结果花费的时间： %s' % t1)
    print('列表生成式返回结果占用内存大小：%s' % m1)

    def my_range(start, end):
        for x in range(start, end):
            yield x
    time_start2 = time.time()
    g2 = my_range(0, 10000000)
    time_end2 = time.time()
    t2 = time_end2 - time_start2
    m2 = sys.getsizeof(g2)
    print('生成器返回结果花费的时间： %s' % t2)
    print('生成器返回结果占用内存大小：%s' % m2)
    
    assert t1 > t2 * 80000
    assert m1 > m2 * 800000

from collections import Iterable
from collections import Iterator
# import collections
# Python中的Iterator对象表示的是一个数据流，Iterator可以被next()函数调用被不断返回下一个数据，
# 直到没有数据可以返回时抛出StopIteration异常错误。
# 可以把这个数据流看做一个有序序列，但我们无法提前知道这个序列的长度。
# 同时，Iterator的计算是惰性的，只有通过next()函数时才会计算并返回下一个数据。
def test_iterator():
    assert isinstance([], Iterable)
    assert isinstance((x for x in range(5)), Iterator)
    def my_range(start, end):
        for x in range(start, end):
            yield x
    g = my_range(0, 100)
    assert isinstance(g, Iterator)