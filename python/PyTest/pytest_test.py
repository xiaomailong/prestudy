#!/usr/bin/env python
# -*- coding:utf-8 -*-

import pytest

# 编写 pytest 测试样例需要按照下面的规则：
#     测试文件以 test_ 开头（以 _test 结尾也可以）
#     测试类以 Test 开头，并且不能带有 __init__ 方法
#     测试函数以 test_ 开头
#     断言使用基本的 assert 即可


def func(x):
    return x + 1
# 测试函数


def test_func():
    assert func(3) == 4

# 测试类


class TestClass:

    def test_one(self):
        x = "this"
        assert 'h' in x

    def test_two(self):
        x = "hello"
        assert not hasattr(x, 'check')

# python内置异常树
# BaseException
#  +-- SystemExit
#  +-- KeyboardInterrupt
#  +-- GeneratorExit
#  +-- Exception
#       +-- StopIteration
#       +-- StopAsyncIteration
#       +-- ArithmeticError
#       |    +-- FloatingPointError
#       |    +-- OverflowError
#       |    +-- ZeroDivisionError
#       +-- AssertionError
#       +-- AttributeError
#       +-- BufferError
#       +-- EOFError
#       +-- ImportError
#            +-- ModuleNotFoundError
#       +-- LookupError
#       |    +-- IndexError
#       |    +-- KeyError
#       +-- MemoryError
#       +-- NameError
#       |    +-- UnboundLocalError
#       +-- OSError
#       |    +-- BlockingIOError
#       |    +-- ChildProcessError
#       |    +-- ConnectionError
#       |    |    +-- BrokenPipeError
#       |    |    +-- ConnectionAbortedError
#       |    |    +-- ConnectionRefusedError
#       |    |    +-- ConnectionResetError
#       |    +-- FileExistsError
#       |    +-- FileNotFoundError
#       |    +-- InterruptedError
#       |    +-- IsADirectoryError
#       |    +-- NotADirectoryError
#       |    +-- PermissionError
#       |    +-- ProcessLookupError
#       |    +-- TimeoutError
#       +-- ReferenceError
#       +-- RuntimeError
#       |    +-- NotImplementedError
#       |    +-- RecursionError
#       +-- SyntaxError
#       |    +-- IndentationError
#       |         +-- TabError
#       +-- SystemError
#       +-- TypeError
#       +-- ValueError
#       |    +-- UnicodeError
#       |         +-- UnicodeDecodeError
#       |         +-- UnicodeEncodeError
#       |         +-- UnicodeTranslateError
#       +-- Warning
#            +-- DeprecationWarning
#            +-- PendingDeprecationWarning
#            +-- RuntimeWarning
#            +-- SyntaxWarning
#            +-- UserWarning
#            +-- FutureWarning
#            +-- ImportWarning
#            +-- UnicodeWarning
#            +-- BytesWarning
#            +-- ResourceWarning


def f():
    # 测试异常
    raise SystemExit(1)


def test_mytest():
    # 测试异常
    with pytest.raises(SystemExit):
        f()


def test_zero_division():
    # 除数为零异常
    with pytest.raises(ZeroDivisionError):
        1 / 0


def test_recursion_depth():
    # 递归深度异常
    with pytest.raises(RuntimeError) as excinfo:
        def f():
            f()
        f()
    assert 'maximum recursion' in str(excinfo.value)


def myfunc():
    raise ValueError("Exception 123 raised")


def test_match():
    # 异常信息匹配
    with pytest.raises(ValueError) as excinfo:
        myfunc()
    excinfo.match(r'.* 123 .*')


def test_set_comparison():
    # 集合比较
    set1 = set("1308")
    set2 = set("8035")
    assert set1 != set2


class Foo:

    def __init__(self, val):
        self.val = val

    def __eq__(self, other):
        return self.val == other.val


def test_compare():
    # 自定义比较
    f1 = Foo(1)
    f2 = Foo(1)
    assert f1 == f2


def pytest_assertrepr_compare(op, left, right):
    if isinstance(left, Foo) and isinstance(right, Foo) and op == "==":
        return ['Comparing Foo instances:',
                '   vals: %s != %s' % (left.val, right.val)]
