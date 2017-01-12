#!/usr/bin/env python
# -*- coding:utf-8 -*-

# numpy(Numerical Python extensions)是一个第三方的Python包，用于科学计算。
# 这个库的前身是1995年就开始开发的一个用于数组运算的库。
# 经过了长时间的发展，基本上成了绝大部分Python科学计算的基础包，当然也包括所有提供Python接口的深度学习框架。

import numpy as numpy

def test_Array():
    a = [1, 2, 3, 4]
    b = numpy.array(a)                         # array([1, 2, 3, 4])
    assert type(b) == numpy.ndarray   # <type 'numpy.ndarray'>
    assert b.shape == (4,)
    assert b.size == 4
    assert b.argmax() == 3
    assert b.argmin() == 0
    assert b.max() == 4
    assert b.min() == 1
    assert b.mean() == 2.5

    c = [[1, 2], [3, 4]]                       # 二维列表
    d = numpy.array(c)                         # 二维numpy数组
    assert type(d) == numpy.ndarray            # <type 'numpy.ndarray'>
    assert d.shape == (2,2)
    assert d.size == 2 * 2
    assert d.max() == 4
    # d.max(axis=0) numpy.array([3,4])
    # d.max(axis=1) numpy.array([2,4])
    assert d.min() == 1
    # d.min(axis=0) numpy.array([1,2])
    # d.min(axis=1) numpy.array([1,3])
    assert d.mean() == 2.5
    # d.mean(axis=0) numpy.array([ 2.,  3.])
    # d.mean(axis=1) numpy.array([ 1.5,  3.5])
    # d.flatten() numpy.array([1, 2, 3, 4])
    # numpy.ravel(d) numpy.array([1, 2, 3, 4])

    # 3x3的浮点型2维数组，并且初始化所有元素值为1
    e = numpy.ones((3, 3), dtype=numpy.float)
    # array([[ 1.,  1.,  1.],
    #   [ 1.,  1.,  1.],
    #   [ 1.,  1.,  1.]])
    assert e.shape == (3,3)
    assert e.size == 3 * 3

    # 创建一个一维数组，元素值是把3重复4次，array([3, 3, 3, 3])
    f = numpy.repeat(3, 4)
    # array([3, 3, 3, 3])
    assert f.shape == (4,)
    assert f.size == 4

    # 2x2x3的无符号8位整型3维数组，并且初始化所有元素值为0
    g = numpy.zeros((2, 2, 3), dtype=numpy.uint8)
    assert g.shape == (2, 2, 3)
    assert g.size == 2 * 2 * 3
    h = g.astype(numpy.float)  # 用另一种类型表示
    assert h.shape == (2, 2, 3)
    assert h.size == 2 * 2 * 3

    l = numpy.arange(10)         # 类似range，array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    assert l.shape == (10,)
    assert l[8] == 8
    m = numpy.linspace(0, 6, 5)  # 等差数列，0到6之间5个取值，array([ 0., 1.5, 3., 4.5, 6.])
    assert m.shape == (5,)
    assert m[1] == 1.5

    p = numpy.array(
        [[1, 2, 3, 4],
         [5, 6, 7, 8]]
    )

    numpy.save('p.npy', p)     # 保存到文件
    q = numpy.load('p.npy')    # 从文件读取
    assert p.shape == (2,4)
    assert p.shape == q.shape
    for i in range(2):
        for j in range(4):
            assert p[i][j] == q[i][j]














#
