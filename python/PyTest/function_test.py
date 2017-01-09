#!/usr/bin/env python
# -*- coding:utf-8 -*-

# 循环 -------------------------------------------------------------------------
# 计算正整数n的阶乘 n! = 1 * 2 * 3 * ... * n
def test_loop():
    def fact(n):
        if n == 0:
            return 1

        result = 1
        while n >= 1:
            result *= n
            n -= 1
        return result
    assert fact(-1) == 1
    assert fact(0) == 1
    assert fact(1) == 1
    assert fact(3) == 3 * 2 * 1
    assert fact(10) == 10 * 9 * 8 * 7 * 6 * 5 * 4 * 3 * 2 * 1

# 递归函数 ----------------------------------------------------------------------
# 计算正整数n的阶乘 n! = 1 * 2 * 3 * ... * n
def test_recursion():
    def fact(n):
        if n <= 0:
            return 1
        return fact(n-1) * n

    # 默认递归深度为1000
    import sys
    assert sys.getrecursionlimit() == 1000

    assert fact(-1) == 1
    assert fact(0) == 1
    assert fact(1) == 1
    assert fact(3) == 3 * 2 * 1
    assert fact(10) == 10 * 9 * 8 * 7 * 6 * 5 * 4 * 3 * 2 * 1


# 嵌套函数 ----------------------------------------------------------------------
def test_nest():
    def outer():
        level = 1
        print('outer', level)
        def inner():
            level = 2
            print('inner', level)
            return 2
        return inner() + level

    assert outer() == 2 + 1


# 闭包 -------------------------------------------------------------------------
# 如果在一个内部函数中，引用了外部非全局作用域中的变量，那么这个内部函数就被认为是闭包(closure)。
# 闭包就是根据不同的配置信息得到不同的结果。
# 专业解释是：闭包（closure）是词法闭包（Lexical Closure）的简称，是引用了自由变量的函数。
# 这个被引用的自由变量将和这个函数一同存在，即使已经离开了创造它的环境也不例外。
# 所以，有另一种说法认为闭包是由函数和与其相关的应用环境组合而成的实体。
def test_closure():
    def outer(x):
        def inner(y):
            return (x + y)
        return inner

    f1 = outer(10)
    f2 = outer(20)
    assert f1(100) == 110
    assert f2(100) == 120
# 闭包的工作原理
# Python支持一种特性叫做函数闭包（function closres），它的工作原理是：
# 在非全局（global）作用域（函数）中定义inner函数时，
# 这个inner函数会记录下外层函数的namespaces（外层函数作用域的locals，其中包括外层函数局部作用域中的所有变量），
# 可以称作：定义时状态，inner函数可以通过__closure__（早期版本中为func_closure）这个属性来获得inner函数外层嵌套函数的namespaces。
# 其实我们可以通过打印一个函数的__closesure__属性值是否为None来判断闭包是否发生。


# 匿名函数 ----------------------------------------------------------------------
def lambda_test():
    add = lambda x, y: x+y
    assert add(1, 3) == 1 + 3
    assert add(2, 3) == (lambda x, y: x+y)(2, 3)


# 高阶函数 ----------------------------------------------------------------------
def higherorder_test():
    def nb_add(x, y, f):
        return f(x) + f(y)

    # 绝对值相加
    assert nb_add(10, -20, abs)  == 30

    # 取平方函数
    def pow2(x):
        return pow(x, 2)
    # 平方和
    assert nb_add(10, -20, pow2) == 100 + 400

    # lambda方式取平方和
    assert nb_add(10, -20, lambda x: pow(x, 2)) == 100 + 400










# end
