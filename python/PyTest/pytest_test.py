#!/usr/bin/env python
# -*- coding:utf-8 -*-

# 编写 pytest 测试样例需要按照下面的规则：
#     测试文件以 test_ 开头（以 _test 结尾也可以）
#     测试类以 Test 开头，并且不能带有 __init__ 方法
#     测试函数以 test_ 开头
#     断言使用基本的 assert 即可

def func(x):
    return x + 1
def test_func():
    assert func(3) == 4

class TestClass:

    def test_one(self):
        x = "this"
        assert 'h' in x

    # def test_two(self):
    #     x = "hello"
    #     assert hasattr(x, 'check')
