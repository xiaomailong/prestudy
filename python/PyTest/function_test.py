#!/usr/bin/env python
# -*- coding:utf-8 -*-

# 函数即“变量”： 函数名就是一个变量名，它的值就是其对应的函数体；函数体也可以赋值给其它变量，通过这个变量也能调用函数

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

# 递归函数 -----------------------------------------------------------------------
# 计算正整数n的阶乘 n! = 1 * 2 * 3 * ... * n


def test_recursion():
    def fact(n):
        if n <= 0:
            return 1
        return fact(n - 1) * n

    # 默认递归深度为1000
    import sys
    assert sys.getrecursionlimit() == 1000

    assert fact(-1) == 1
    assert fact(0) == 1
    assert fact(1) == 1
    assert fact(3) == 3 * 2 * 1
    assert fact(10) == 10 * 9 * 8 * 7 * 6 * 5 * 4 * 3 * 2 * 1


# 嵌套函数 -----------------------------------------------------------------------
# 函数内部可以嵌套定义（一层或多层）函数，内部函数可以在函数体内部调用，也可以当做返回值返回
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
# 在一个嵌套函数中，内部函数可以调用外部非全局变量并且不受外部函数生命周期的影响
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


# 匿名函数 -----------------------------------------------------------------------
def test_lambda():
    add = lambda x, y: x + y
    assert add(1, 3) == 1 + 3
    assert add(2, 3) == (lambda x, y: x + y)(2, 3)


# 高阶函数 -----------------------------------------------------------------------
# 函数的参数可以是函数
def test_higherorder():
    def nb_add(x, y, f):
        return f(x) + f(y)

    # 绝对值相加
    assert nb_add(10, -20, abs) == 30

    # 取平方函数
    def pow2(x):
        return pow(x, 2)
    # 平方和
    assert nb_add(10, -20, pow2) == 100 + 400

    # lambda方式取平方和
    assert nb_add(10, -20, lambda x: pow(x, 2)) == 100 + 400


# 装饰器 ------------------------------------------------------------------------
# 装饰器，是一种“语法糖”，其本质上就是个函数
# 它是一个装饰其他函数的函数，用来为其他函数添加一些额外的功能
# 装饰器对被装饰的函数应该是完全透明的，即
#     不能修改被装饰的函数的源代码
#     不能修改被装饰的函数的调用方式
# 高阶函数 + 嵌套函数 => 装饰器
# 这里的高阶函数需要同时满足以下两个条件：
#     接收函数名作为参数 -- 可以实现在不修改被装饰函数源代码的情况下为其添加新的功能
#     返回内部嵌套函数的函数名 -- 可以实现不用修改函数的调用方式
def test_decorator():
    # 统计函数运行时间
    import time

    def print_run_time(f):
        def warpper(*args, **kwargs):
            time_start = time.time()
            ret = f(*args, **kwargs)
            time_end = time.time()
            func_name = f.__name__
            print('%s run time is: %s' % (func_name, (time_end - time_start)))
            return ret
        return warpper

    @print_run_time             # 相当于 func1 = print_run_time(func1)
    def func1(string):
        print(string)
        time.sleep(1)
        print('func1')
        return 'func1 return'

    @print_run_time             # 相当于 func2 = print_run_time(func2)
    def func2():
        time.sleep(1)
        print('func2')
        return 'func2'

    assert func1('decorator test!') == 'func1 return'
    assert func2() == 'func2'

    import functools

    def print_run_time2(timeout=1):
        def decorator(f):
            @functools.wraps(f)
            def wrapper(*args, **kwargs):
                time_start = time.time()
                ret = f(*args, **kwargs)
                time_end = time.time()
                func_name = f.__name__
                run_time = time_end - time_start
                print('%s run time is: %s' % (func_name, run_time))
                if run_time > timeout:
                    print('PROBLEM'.rjust(30, '>'))
            return wrapper
        return decorator

    @print_run_time2()
    def func3(string):
        print(string)
        time.sleep(1)
        print('func3')
        return 'func3 return'

    # assert func3('test') == 'func3 return'

# eval流函数 --------------------------------------------------------------------
# 计算指定表达式的值。也就是说它要执行的Python代码只能是单个运算表达式（注意eval不支持任意形式的赋值操作），
# 而不能是复杂的代码逻辑，这一点和lambda表达式比较相似。
# eval(expression, globals=None, locals=None)
# 参数说明：
#   expression：必选参数，可以是字符串，也可以是一个任意的code对象实例（可以通过compile函数创建）。
#       如果它是一个字符串，它会被当作一个（使用globals和locals参数作为全局和本地命名空间的）Python表达式进行分析和解释。
#   globals：可选参数，表示全局命名空间（存放全局变量），如果被提供，则必须是一个字典对象。
#   locals：可选参数，表示当前局部命名空间（存放局部变量），如果被提供，可以是任何映射对象。如果该参数被忽略，那么它将会取与globals相同的值。
#   如果globals与locals都被忽略，那么它们将取eval()函数被调用环境下的全局命名空间和局部命名空间。
# 返回值：
#   如果expression是一个code对象，且创建该code对象时，compile函数的mode参数是'exec'，那么eval()函数的返回值是None；
#   否则，如果expression是一个输出语句，如print()，则eval()返回结果为None；
#   否则，expression表达式的结果就是eval()函数的返回值；
x = 10


def test_eval():
    y = 20
    assert eval('x + y') == x + y
    assert eval('x + y', {'x': 1, 'y': 2}) == 1 + 2
    assert eval('x + y', {'x': 1, 'y': 2}, {'y': 3, 'z': 4}) == 1 + 3
    # assert eval('print(x, y)') is None


# exec函数 ---------------------------------------------------------------------
# 动态执行Python代码。也就是说exec可以执行复杂的Python代码，而不像eval函数那么样只能计算一个表达式的值。
# exec(object[, globals[, locals]])
# 参数说明：
#   object：必选参数，表示需要被指定的Python代码。它必须是字符串或code对象。
#       如果object是一个字符串，该字符串会先被解析为一组Python语句，然后在执行（除非发生语法错误）。
#       如果object是一个code对象，那么它只是被简单的执行。
#   globals：可选参数，同eval函数
#   locals：可选参数，同eval函数
# 返回值：
#   exec函数的返回值永远为None.
# 需要说明的是在Python 2中exec不是函数，而是一个内置语句(statement)，但是Python 2中有一个execfile()函数。
# 可以理解为Python 3把exec这个statement和execfile()函数的功能够整合到一个新的exec()函数中去了
x = 10
expr = """
z = 30
sum = x + y + z
print(sum)
"""


def test_exec():
    y = 20
    # assert execfile('x + y') is None
    # assert execfile('x + y', {'x': 1, 'y': 2}) is None
    # assert execfile('x + y', {'x': 1, 'y': 2}, {'y': 3, 'z': 4}) is None
    # assert execfile('print(x, y)') is None
    exec(expr)
    exec(expr, {'x': 1, 'y': 2})
    exec(expr, {'x': 1, 'y': 2}, {'y': 3, 'z': 4})


# globals()与locals()函数 -------------------------------------------------------
# globals()
# 返回一个表示当前全局标识符表的字典。
# 这永远是当前模块的字典（在一个函数或方法内部，这是指定义该函数或方法的模块，而不是调用该函数或方法的模块）
# locals()
# 更新并返回一个表示当前局部标识符表的字典。
# 自由变量在函数内部被调用时，会被locals()函数返回；
# 自由变量在类内不被调用时，不会被locals()函数返回。
# locals()返回的字典的内容不应该被改变；如果一定要改变，不应该影响被解释器使用的局部变量和自由变量。
name = 'Tom'
age = 18
G = globals()
L = locals()


def test_globals_locals():
    _G = globals()
    _L = locals()
    assert id(G) == id(L)
    assert id(G) == id(_G)
    assert id(L) != id(_L)


# compile函数 ------------------------------------------------------------------
# 将source编译为code对象或AST对象。code对象能够通过exec()函数来执行或者通过eval()函数进行计算求值。
# compile(source, filename, mode[, flags[, dont_inherit]])
# 参数说明：
#   source：字符串或AST（Abstract Syntax Trees）对象，表示需要进行编译的Python代码
#   filename：指定需要编译的代码文件名称，如果不是从文件读取代码则传递一些可辨认的值（通常是用'
#   mode：用于标识必须当做那类代码来编译；如果source是由一个代码语句序列组成，则指定mode='exec'；如果source是由单个表达式组成，则指定mode='eval'；如果source是由一个单独的交互式语句组成，则指定mode='single'。

s = """
for x in range(10):
    print(x, end='')
print()
"""


def test_compile():
    # code_exec = compile(s, '<string>', 'exec')
    code_eval = compile('10 + 20', '<string>', 'eval')
    # code_single = compile('name = input("Input Your Name: ")', '<string>', 'single')
    # assert exec code_exec is None
    assert eval(code_eval) == 30
    # assert exec(code_single) is None
    # assert eval(code_single) is None
    # assert name == 'Jerry'

# end
