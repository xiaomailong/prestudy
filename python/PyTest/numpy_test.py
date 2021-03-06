#!/usr/bin/env python
# -*- coding:utf-8 -*-

from __future__ import division  # 使用Python 3中的除法

# numpy(Numerical Python extensions)是一个第三方的Python包，用于科学计算。
# 这个库的前身是1995年就开始开发的一个用于数组运算的库。
# 经过了长时间的发展，基本上成了绝大部分Python科学计算的基础包，当然也包括所有提供Python接口的深度学习框架。

import numpy as np
import numpy.random as random


def test_numpy_array():
    # 基本数组类型 -----------------------------------------------------------------
    a = [1, 2, 3, 4]
    b = np.array(a)                         # array([1, 2, 3, 4])
    assert type(b) == np.ndarray            # <type 'np.ndarray'>
    assert b.shape == (4,)
    assert b.size == 4
    assert b.argmax() == 3
    assert b.argmin() == 0
    assert b.max() == 4
    assert b.min() == 1
    assert b.mean() == 2.5

    c = [[1, 2], [3, 4]]                    # 二维列表
    d = np.array(c)                         # 二维np数组
    assert type(d) == np.ndarray            # <type 'np.ndarray'>
    assert d.shape == (2, 2)
    assert d.size == 2 * 2
    assert d.max() == 4
    # d.max(axis=0) np.array([3,4])
    # d.max(axis=1) np.array([2,4])
    assert d.min() == 1
    # d.min(axis=0) np.array([1,2])
    # d.min(axis=1) np.array([1,3])
    assert d.mean() == 2.5
    # d.mean(axis=0) np.array([ 2.,  3.])
    # d.mean(axis=1) np.array([ 1.5,  3.5])
    # d.flatten() np.array([1, 2, 3, 4])
    # np.ravel(d) np.array([1, 2, 3, 4])

    # 3x3的浮点型2维数组，并且初始化所有元素值为1
    e = np.ones((3, 3), dtype=np.float)
    # array([[ 1.,  1.,  1.],
    #   [ 1.,  1.,  1.],
    #   [ 1.,  1.,  1.]])
    assert e.shape == (3, 3)
    assert e.size == 3 * 3

    # 创建一个一维数组，元素值是把3重复4次，array([3, 3, 3, 3])
    f = np.repeat(3, 4)
    # array([3, 3, 3, 3])
    assert f.shape == (4,)
    assert f.size == 4

    # 2x2x3的无符号8位整型3维数组，并且初始化所有元素值为0
    g = np.zeros((2, 2, 3), dtype=np.uint8)
    assert g.shape == (2, 2, 3)
    assert g.size == 2 * 2 * 3
    h = g.astype(np.float)  # 用另一种类型表示
    assert h.shape == (2, 2, 3)
    assert h.size == 2 * 2 * 3

    l = np.arange(10)         # 类似range，array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    assert l.shape == (10,)
    assert l[8] == 8
    m = np.linspace(0, 6, 5)  # 等差数列，0到6之间5个取值，array([ 0., 1.5, 3., 4.5, 6.])
    assert m.shape == (5,)
    assert m[1] == 1.5

    p = np.array(
        [[1, 2, 3, 4],
         [5, 6, 7, 8]]
    )

    np.save('p.npy', p)     # 保存到文件
    q = np.load('p.npy')    # 从文件读取
    assert p.shape == (2, 4)
    assert p.shape == q.shape
    for i in range(2):
        for j in range(4):
            assert p[i][j] == q[i][j]

    '''
    array([[[ 0,  1,  2,  3],
            [ 4,  5,  6,  7],
            [ 8,  9, 10, 11]],

           [[12, 13, 14, 15],
            [16, 17, 18, 19],
            [20, 21, 22, 23]]])
    '''
    a = np.arange(24).reshape((2, 3, 4))
    assert a[1][1][1] == 17

    '''
    array([[ 8,  9, 10, 11],
           [20, 21, 22, 23]])
    '''
    c = a[:, 2, :]
    assert c[1][1] == 21

    ''' 用:表示当前维度上所有下标
    array([[ 1,  5,  9],
           [13, 17, 21]])
    '''
    d = a[:, :, 1]
    assert d[1][1] == 17

    ''' 用...表示没有明确指出的维度
    array([[ 1,  5,  9],
           [13, 17, 21]])
    '''
    e = a[..., 1]
    assert e[1][1] == 17

    '''
    array([[[ 5,  6],
            [ 9, 10]],

           [[17, 18],
            [21, 22]]])
    '''
    f = a[:, 1:, 1:-1]
    assert f[1][1][1] == 22

    '''
    平均分成3份
    [array([0, 1, 2]), array([3, 4, 5]), array([6, 7, 8])]
    '''
    g = np.split(np.arange(9), 3)
    assert g[1][1] == 4

    '''
    按照下标位置进行划分
    [array([0, 1]), array([2, 3, 4, 5]), array([6, 7, 8])]
    '''
    h = np.split(np.arange(9), [2, -3])
    assert h[1][1] == 3

    '''
    array([[0, 1, 2],
       [3, 4, 5]])
    '''
    l0 = np.arange(6).reshape((2, 3))
    assert l0[1][2] == 5
    '''
    array([[ 6,  7,  8],
       [ 9, 10, 11]])
    '''
    l1 = np.arange(6, 12).reshape((2, 3))
    assert l1[1][2] == 11

    '''
    vstack是指沿着纵轴拼接两个array，vertical
    hstack是指沿着横轴拼接两个array，horizontal
    更广义的拼接用concatenate实现，horizontal后的两句依次等效于vstack和hstack
    stack不是拼接而是在输入array的基础上增加一个新的维度
    '''

    '''
    array([[ 0,  1,  2],
       [ 3,  4,  5],
       [ 6,  7,  8],
       [ 9, 10, 11]])
    '''
    m = np.vstack((l0, l1))
    assert m.shape == (4, 3)
    '''
    array([[ 0,  1,  2,  6,  7,  8],
       [ 3,  4,  5,  9, 10, 11]])
    '''
    p = np.hstack((l0, l1))
    assert p.shape == (2, 6)
    '''
    array([[ 0,  1,  2],
       [ 3,  4,  5],
       [ 6,  7,  8],
       [ 9, 10, 11]])
    '''
    q = np.concatenate((l0, l1))
    assert q.shape == (4, 3)
    '''
    array([[ 0,  1,  2,  6,  7,  8],
       [ 3,  4,  5,  9, 10, 11]])
    '''
    r = np.concatenate((l0, l1), axis=-1)
    assert r.shape == (2, 6)
    '''
    array([[[ 0,  1,  2],
        [ 3,  4,  5]],

       [[ 6,  7,  8],
        [ 9, 10, 11]]])
    '''
    s = np.stack((l0, l1))
    assert s.shape == (2, 2, 3)

    '''
    按指定轴进行转置
    array([[[ 0,  3],
            [ 6,  9]],

           [[ 1,  4],
            [ 7, 10]],

           [[ 2,  5],
            [ 8, 11]]])
    '''
    t = s.transpose((2, 0, 1))
    assert t.shape == (3, 2, 2)

    '''
    默认转置将维度倒序，对于2维就是横纵轴互换
    array([[ 0,  4,  8],
           [ 1,  5,  9],
           [ 2,  6, 10],
           [ 3,  7, 11]])
    '''
    u = a[0].transpose()  # 或者u=a[0].T也是获得转置
    assert u.shape == (4, 3)

    '''
    逆时针旋转90度，第二个参数是旋转次数
    array([[ 3,  2,  1,  0],
           [ 7,  6,  5,  4],
           [11, 10,  9,  8]])
    '''
    v = np.rot90(u, 3)
    assert v.shape == (3, 4)

    '''
    沿纵轴左右翻转
    array([[ 8,  4,  0],
           [ 9,  5,  1],
           [10,  6,  2],
           [11,  7,  3]])
    '''
    w = np.fliplr(u)
    assert w.shape == (4, 3)

    '''
    沿水平轴上下翻转
    array([[ 3,  7, 11],
           [ 2,  6, 10],
           [ 1,  5,  9],
           [ 0,  4,  8]])
    '''
    x = np.flipud(u)
    assert x.shape == (4, 3)

    '''
    按照一维顺序滚动位移
    array([[11,  0,  4],
           [ 8,  1,  5],
           [ 9,  2,  6],
           [10,  3,  7]])
    '''
    y = np.roll(u, 1)
    assert y.shape == (4, 3)

    '''
    按照指定轴滚动位移
    array([[ 8,  0,  4],
           [ 9,  1,  5],
           [10,  2,  6],
           [11,  3,  7]])
    '''
    z = np.roll(u, 1, axis=1)
    assert z.shape == (4, 3)


def test_numpy_numerical():
    # 基础数学运算 -----------------------------------------------------------------
    # 绝对值，1
    assert np.abs(-1) == 1

    # sin函数，1.0
    assert np.sin(np.pi / 2) == 1.0

    # tanh逆函数，0.54930614433405478
    r = np.arctanh(0.5)
    ret = 0.54930614433405478
    assert np.abs(r - ret) < 1e-8

    # e为底的指数函数，20.085536923187668
    assert np.exp(3) == 20.085536923187668

    # 2的3次方，8
    assert np.power(2, 3) == 8

    # 点积，1*3+2*4=11
    assert np.dot([1, 2], [3, 4]) == 11

    # 开方，5
    assert np.sqrt(25) == 5

    # 求和，10
    assert np.sum([1, 2, 3, 4]) == 10

    # 平均值，5.5
    assert np.mean([4, 5, 6, 7]) == 5.5

    # 标准差，0.96824583655185426
    assert np.std([1, 2, 3, 2, 1, 3, 2, 0]) == 0.96824583655185426

    # 对于array，默认执行对位运算。
    # 涉及到多个array的对位运算需要array的维度一致，如果一个array的维度和另一个array的子维度一致，
    # 则在没有对齐的维度上分别执行对位运算，这种机制叫做广播（broadcasting）
    a = np.array([
        [1, 2, 3],
        [4, 5, 6]
    ])

    b = np.array([
        [1, 2, 3],
        [1, 2, 3]
    ])

    '''
    维度一样的array，对位计算
    '''
    r = a + b
    ret = np.array([[2, 4, 6],
                    [5, 7, 9]])
    assert np.sum(r - ret) == 0

    r = a - b
    ret = np.array([[0, 0, 0],
                    [3, 3, 3]])
    assert np.sum(r - ret) == 0

    r = a * b
    ret = np.array([[1,  4,  9],
                    [4, 10, 18]])
    assert np.sum(r - ret) == 0

    r = a // b
    ret = np.array([[1, 1, 1],
                    [4, 2, 2]])
    assert np.sum(r - ret) == 0

    r = a / b
    ret = np.array([[1, 1, 1],
                    [4, 2.5, 2]])
    assert np.sum(r - ret) == 0

    r = a ** 2
    ret = np.array([[1,  4,  9],
                    [16, 25, 36]])
    assert np.sum(r - ret) == 0

    r = a ** b
    ret = np.array([[1,   4,  27],
                    [4,  25, 216]])
    assert np.sum(r - ret) == 0

    c = np.array([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [10, 11, 12]
    ])
    d = np.array([2, 2, 2])

    '''
    广播机制让计算的表达式保持简洁
    d和c的每一行分别进行运算
    '''

    r = c + d
    ret = np.array([[3,  4,  5],
                    [6,  7,  8],
                    [9, 10, 11],
                    [12, 13, 14]])
    assert np.sum(r - ret) == 0

    r = c * d
    ret = np.array([[2,  4,  6],
                    [8, 10, 12],
                    [14, 16, 18],
                    [20, 22, 24]])
    assert np.sum(r - ret) == 0

    '''
    1和c的每个元素分别进行运算
    '''
    r = c - 1
    ret = np.array([[0,  1,  2],
                    [3,  4,  5],
                    [6,  7,  8],
                    [9, 10, 11]])
    assert np.sum(r - ret) == 0


def test_numpy_linalg():
    # 线性代数 -------------------------------------------------------------------
    a = np.array([3, 4])
    assert np.linalg.norm(a) == 5

    b = np.array([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ])
    c = np.array([1, 0, 1])

    # 矩阵和向量之间的乘法
    r = np.dot(b, c)
    ret = np.array([4, 10, 16])
    assert np.sum(r - ret) == 0
    r = np.dot(c, b.T)
    assert np.sum(r - ret) == 0

    # 求矩阵的迹，15
    assert np.trace(b) == 15

    # 求矩阵的行列式值，0
    r = np.linalg.det(b)
    assert np.abs(r) < 1e-8

    # 求矩阵的秩，2，不满秩，因为行与行之间等差
    assert np.linalg.matrix_rank(b) == 2

    d = np.array([
        [2, 1],
        [1, 2]
    ])

    '''
    对正定矩阵求本征值和本征向量
    本征值为u，array([ 3.,  1.])
    本征向量构成的二维array为v，
    array([[ 0.70710678, -0.70710678],
           [ 0.70710678,  0.70710678]])
    是沿着45°方向
    eig()是一般情况的本征值分解，对于更常见的对称实数矩阵，
    eigh()更快且更稳定，不过输出的值的顺序和eig()是相反的
    '''
    u, v = np.linalg.eig(d)
    ret = np.array([3.,  1.])
    assert np.sum(u - ret) == 0
    ret = np.array([[0.70710678, -0.70710678],
                    [0.70710678,  0.70710678]])
    assert np.abs(np.sum(v - ret)) < 1e-8

    # Cholesky分解并重建
    l = np.linalg.cholesky(d)
    ret = np.array([[1.41421356,  0.],
                    [0.70710678,  1.22474487]])
    assert np.abs(np.sum(l - ret)) < 1e-8

    r = np.dot(l, l.T)
    ret = np.array([[2.,  1.],
                    [1.,  2.]])
    assert np.sum(r - ret) == 0

    e = np.array([
        [1, 2],
        [3, 4]
    ])

    # 对不正定矩阵，进行SVD分解并重建
    U, s, V = np.linalg.svd(e)

    ret = np.array([5.4649857,  0.36596619])
    assert np.abs(np.sum(s - ret)) < 1e-8

    ret = np.array([[-0.40455358, -0.9145143],
                    [-0.9145143,  0.40455358]])
    assert np.abs(np.sum(U - ret)) < 1e-8

    ret = np.array([[-0.57604844, -0.81741556],
                    [0.81741556, -0.57604844]])
    assert np.abs(np.sum(V - ret)) < 1e-8

    S = np.array([
        [s[0], 0],
        [0, s[1]]
    ])

    r = np.dot(U, np.dot(S, V))
    ret = np.array([[1.,  2.],
                    [3.,  4.]])
    assert np.abs(np.sum(r - ret)) < 1e-8


def test_numpy_random():
    # 随机模块（random） -----------------------------------------------------------
    # 设置随机数种子
    # random.seed(42)

    # 产生一个1x3，[0,1)之间的浮点型随机数
    # array([[ 0.37454012,  0.95071431,  0.73199394]])
    # 后面的例子就不在注释中给出具体结果了
    random.rand(1, 3)

    # 产生一个[0,1)之间的浮点型随机数
    random.random()

    # 下边4个没有区别，都是按照指定大小产生[0,1)之间的浮点型随机数array，不Pythonic…
    random.random((3, 3))
    random.sample((3, 3))
    random.random_sample((3, 3))
    random.ranf((3, 3))

    # 产生10个[1,6)之间的浮点型随机数
    5 * random.random(10) + 1
    random.uniform(1, 6, 10)

    # 产生10个[1,6]之间的整型随机数
    random.randint(1, 6, 10)

    # 产生2x5的标准正态分布样本
    random.normal(size=(5, 2))

    # 产生5个，n=5，p=0.5的二项分布样本
    random.binomial(n=5, p=0.5, size=5)

    a = np.arange(10)

    # 从a中有回放的随机采样7个
    random.choice(a, 7)

    # 从a中无回放的随机采样7个
    random.choice(a, 7, replace=False)

    # 对a进行乱序并返回一个新的array
    b = random.permutation(a)

    # 对a进行in-place乱序
    random.shuffle(a)

    # 生成一个长度为9的随机bytes序列并作为str返回
    # '\x96\x9d\xd1?\xe6\x18\xbb\x9a\xec'
    random.bytes(9)

    # 随机模块可以很方便地让我们做一些快速模拟去验证一些结论。
    # 比如来考虑一个非常违反直觉的概率题例子：
    #   一个选手去参加一个TV秀，有三扇门，其中一扇门后有奖品，这扇门只有主持人知道。
    #   选手先随机选一扇门，但并不打开，主持人看到后，会打开其余两扇门中没有奖品的一扇门。
    #   然后，主持人问选手，是否要改变一开始的选择？

    # 这个问题的答案是应该改变一开始的选择。
    #   在第一次选择的时候，选错的概率是2/3，选对的概率是1/3。
    #   第一次选择之后，主持人相当于帮忙剔除了一个错误答案，所以如果一开始选的是错的，这时候换掉就选对了；
    #   而如果一开始就选对，则这时候换掉就错了。
    #   根据以上，一开始选错的概率就是换掉之后选对的概率（2/3），这个概率大于一开始就选对的概率（1/3），所以应该换。
    # 虽然道理上是这样，但是还是有些绕，要是通过推理就是搞不明白怎么办，没关系，用随机模拟就可以轻松得到答案：

    # 做10000次实验
    n_tests = 10000

    # 生成每次实验的奖品所在的门的编号
    # 0表示第一扇门，1表示第二扇门，2表示第三扇门
    winning_doors = random.randint(0, 3, n_tests)

    # 记录如果换门的中奖次数
    change_mind_wins = 0

    # 记录如果坚持的中奖次数
    insist_wins = 0

    # winning_door就是获胜门的编号
    for winning_door in winning_doors:

        # 随机挑了一扇门
        first_try = random.randint(0, 3)

        # 其他门的编号
        remaining_choices = [i for i in range(3) if i != first_try]

        # 没有奖品的门的编号，这个信息只有主持人知道
        wrong_choices = [i for i in range(3) if i != winning_door]

        # 一开始选择的门主持人没法打开，所以从主持人可以打开的门中剔除
        if first_try in wrong_choices:
            wrong_choices.remove(first_try)

        # 这时wrong_choices变量就是主持人可以打开的门的编号
        # 注意此时如果一开始选择正确，则可以打开的门是两扇，主持人随便开一扇门
        # 如果一开始选到了空门，则主持人只能打开剩下一扇空门
        screened_out = random.choice(wrong_choices)
        remaining_choices.remove(screened_out)

        # 所以虽然代码写了好些行，如果策略固定的话，
        # 改变主意的获胜概率就是一开始选错的概率，是2/3
        # 而坚持选择的获胜概率就是一开始就选对的概率，是1/3

        # 现在除了一开始选择的编号，和主持人帮助剔除的错误编号，只剩下一扇门
        # 如果要改变注意则这扇门就是最终的选择
        changed_mind_try = remaining_choices[0]

        # 结果揭晓，记录下来
        change_mind_wins += 1 if changed_mind_try == winning_door else 0
        insist_wins += 1 if first_try == winning_door else 0

    # 输出10000次测试的最终结果，和推导的结果差不多：
    # You win 6616 out of 10000 tests if you changed your mind
    # You win 3384 out of 10000 tests if you insist on the initial choice
    print(
        'You win {1} out of {0} tests if you changed your mind\n'
        'You win {2} out of {0} tests if you insist on the initial choice'.format(
            n_tests, change_mind_wins, insist_wins
        )
    )
    assert change_mind_wins / insist_wins > 1.9
