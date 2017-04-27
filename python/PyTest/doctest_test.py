#!/usr/bin/env python
# -*- coding:utf-8 -*-

# doctest 模块会搜索那些看起来像交互式会话的 Python 代码片段，然后尝试执行并验证结果
# 测试用例的位置必须放在整个模块文件的开头，或者紧接着对象声明语句的下一行。
# 也就是可以被 __doc__ 这个属性引用到的地方。并非像普通注释一样写在哪里都可以。

"""
这里也可以写
"""


def multiply(a, b):
    """
    >>> multiply(2,3)
    6
    >>> multiply('baka~',3)
    'baka~baka~baka~'
    """
    return a * b

if __name__ == '__main__':
    import doctest
    doctest.testmod(verbose=True)
