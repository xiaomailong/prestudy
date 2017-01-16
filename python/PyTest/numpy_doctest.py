#!/usr/bin/env python
# -*- coding:utf-8 -*-

# Numpy（Numerical Python extensions）是一个第三方的Python包，是Python的一种开源的数值计算扩展，用于科学计算的核心库。
# 可用来存储和处理大型矩阵，比Python自身的嵌套列表（nested list structure)结构要高效的多（该结构也可以用来表示矩阵（matrix））。
#   1. 一个强大的N维数组对象Array；
#   2. 比较成熟的（广播）函数库；
#   3. 用于整合C/C++和Fortran代码的工具包；
#   4. 实用的线性代数、傅里叶变换和随机数生成函数。

import numpy as np


'''
>>> import numpy as np
>>> a = [1,2,3,4]
>>> b = np.array(a)
>>> b
array([1, 2, 3, 4])
>>> type(b)
<type 'numpy.ndarray'>
>>>
'''
def numpy_test():
    import numpy as np
    a = [1, 2, 3, 4]
    b = np.array(a)
    assert type(b) == "<type 'numpy.ndarray'>"


if __name__ == '__main__':
    import doctest
    doctest.testmod(verbose=True)