#!/usr/bin/env python
# -*- coding:utf-8 -*-


def test_eq_vs_is():
    # “==” Vs “is”
    #     is是比较两个引用是否指向了同一个对象（引用比较）。
    #     ==是比较两个对象是否相等。(值比较，通过`__eq__`函数实现)
    a = [1, 2, 3]
    b = a                       # a的引用复制给b，他们在内存中其实是指向了用一个对象
    assert b is a               # 引用相同
    assert b == a               # 值相同
    assert id(b) == id(a)       # 内存地址相同
    c = a[:]                    # c通过a切片获得a的部分，这里的切片操作重新分配了对象
    assert c is not a           # 引用不同
    assert c == a               # 值相同
    assert id(c) != id(a)       # 内存地址不同

    # Python会对比较小的对象缓存，下次用到比较小的对象时，会去缓存区查找，
    # 如果找到，不会再开辟新的内存，而是继续把小对象的地址赋给新的值。
    # 通过计算得到的赋值，不会使用缓存区。
    d = 1
    e = 1
    assert e is d               # 引用相同
    assert id(e) == id(d)       # 内存地址相同
    assert e is 1               # 引用相同
    assert 1000 is 1000         # 引用相同
    assert 1000 == 10**3        # 值相同
    assert 1000 is not 10**3    # 通过计算得到的赋值，不会使用缓存区


# “Make a script both importable and executable”
# 如果我们是直接执行某个.py文件的时候，该文件中"__name__ == '__main__'"，
# 如果从另一个.py文件通过import导入该文件的时候，"__name__ != '__main__'"
# 这时__name__ == py文件的名字。
# 这个功能还有一个用处：
#     调试代码的时候，在”if __name__ == '__main__'“中加入一些我们的调试代码，
#     我们可以让外部模块调用的时候不执行我们的调试代码，
#     但是如果我们想排查问题的时候，直接执行该模块文件，调试代码能够正常运行！
def main():
    print("we are in %s" % __name__)
    if __name__ == '__main__':
        main()
