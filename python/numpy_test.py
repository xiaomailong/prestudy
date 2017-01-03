#!/usr/bin/env python
# -*- coding:utf-8 -*-

# numpy(Numerical Python extensions)是一个第三方的Python包，用于科学计算。
# 这个库的前身是1995年就开始开发的一个用于数组运算的库。
# 经过了长时间的发展，基本上成了绝大部分Python科学计算的基础包，当然也包括所有提供Python接口的深度学习框架。

import numpy as numpy
import unittest

class NumPyTestCase(unittest.TestCase):
    def setUp(self):
        # self.widget = Widget()
        pass
    def tearDown(self):
        pass
        # self.widget.dispose()
        # self.widget = None
    # def testSize(self):
        # self.assertEqual(self.widget.getSize(), (40, 40))
    # def testResize(self):
        # self.widget.resize(100, 100)
        # self.assertEqual(self.widget.getSize(), (100, 100))
    # array，也就是数组，是numpy中最基础的数据结构，最关键的属性是维度和元素类型，
    # 在numpy中，可以非常方便地创建各种不同类型的多维数组，并且执行一些基本基本操作
    def testArray(self):
        a = [1, 2, 3, 4]
        b = numpy.array(a)                         # array([1, 2, 3, 4])
        self.assertEqual(type(b), numpy.ndarray)   # <type 'numpy.ndarray'>
        self.assertEqual(b.shape, (4,))
        self.assertEqual(b.argmax(), 3)
        self.assertEqual(b.max(), 4)
        self.assertEqual(b.min(), 1)
        self.assertEqual(b.mean(), 2.5)
        c = [[1, 2], [3, 4]]                       # 二维列表
        d = numpy.array(c)                         # 二维numpy数组
        self.assertEqual(type(d), numpy.ndarray)   # <type 'numpy.ndarray'>
        self.assertEqual(d.shape, (2,2))
        self.assertEqual(d.size, 4)
        self.assertEqual(d.max(), 4)
        self.assertEqual(d.min(), 1)

        # numpy.assertEqual(d.max(axis=0), numpy.array([3,4]))
        # self.assertEqual(d.max(axis=0), numpy.array([3,4]))
        # self.assertEqual(d.min(axis=0), numpy.array([1,2]))
        # self.assertEqual(d.max(axis=1), numpy.array([2,4]))
        # self.assertEqual(d.min(axis=1), numpy.array([1,3]))
        # self.assertEqual(d.mean(axis=0), 2.5)
        # self.assertEqual(d.mean(axis=1), 2.5)
        # self.assertEqual(d.flatten(), 2.5)
        # self.assertEqual(numpy.ravel(c), 2.5)
        # self.assertEqual(d.mean(), 2.5)
        # self.assertEqual(d.mean(), 2.5)


# main()测试
if __name__ == "__main__":
    unittest.main()




d.shape                   	# (2, 2)
d.size                   	# 4
d.max(axis=0)            	# 找维度0，也就是最后一个维度上的最大值，array([3, 4])
d.max(axis=1)            	# 找维度1，也就是倒数第二个维度上的最大值，array([2, 4])
d.mean(axis=0)          	# 找维度0，也就是第一个维度上的均值，array([ 2.,  3.])
d.flatten()              	# 展开一个numpy数组为1维数组，array([1, 2, 3, 4])
numpy.ravel(c)               # 展开一个可以解析的结构为1维数组，array([1, 2, 3, 4])

# 3x3的浮点型2维数组，并且初始化所有元素值为1
e = numpy.ones((3, 3), dtype=numpy.float)

# 创建一个一维数组，元素值是把3重复4次，array([3, 3, 3, 3])
f = numpy.repeat(3, 4)

# 2x2x3的无符号8位整型3维数组，并且初始化所有元素值为0
g = numpy.zeros((2, 2, 3), dtype=numpy.uint8)
g.shape                    # (2, 2, 3)
h = g.astype(numpy.float)  # 用另一种类型表示

l = numpy.arange(10)      	# 类似range，array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
m = numpy.linspace(0, 6, 5)# 等差数列，0到6之间5个取值，array([ 0., 1.5, 3., 4.5, 6.])

p = numpy.array(
    [[1, 2, 3, 4],
     [5, 6, 7, 8]]
)

numpy.save('p.npy', p)     # 保存到文件
q = numpy.load('p.npy')    # 从文件读取
