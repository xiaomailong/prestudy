//  Copyright 2012 sgcc xj group

//
//  next_prior.hpp
//  摘抄自 boost 1.49.0
//  有些数据类型，如C++标准库的前向和双向迭代器，不提供 operator+() 或 operator-() 的加法和减法。
//  这意味着即使已经有了 operator++() 或 operator--()，但如果想不修改原值而获得 next 或 prior 值就需要一个临时存储。
//  这也意味着在一个模板中编写象 itr+1 这样的代码就限制了迭代器类别必须是随机访问迭代器。
//  next() 和 prior() 函数提供了一个绕过这些问题的简单方法：
//

//  Boost next_prior.hpp header file  ---------------------------------------//

//  (C) Copyright Dave Abrahams and Daniel Walker 1999-2003. Distributed under the Boost
//  Software License, Version 1.0. (See accompanying file
//  LICENSE_1_0.txt or copy at http://www.boost.org/LICENSE_1_0.txt)

//  See http://www.boost.org/libs/utility for documentation.

//  Revision History
//  13 Dec 2003  Added next(x, n) and prior(x, n) (Daniel Walker)

#ifndef NEXT_PRIOR_HPP
#define NEXT_PRIOR_HPP

#include <iterator>

namespace sgcc {

//  Helper functions for classes like bidirectional iterators not supporting
//  operator+ and operator-
//
//  Usage:
//    const std::list<T>::iterator p = get_some_iterator();
//    const std::list<T>::iterator prev = boost::prior(p);
//    const std::list<T>::iterator next = boost::next(prev, 2);

//  Contributed by Dave Abrahams

template <class T>
inline T next(T x)
{
    return ++x;
}

template <class T, class Distance>
inline T next(T x, Distance n)
{
    std::advance(x, n);
    return x;
}

template <class T>
inline T prior(T x)
{
    return --x;
}

template <class T, class Distance>
inline T prior(T x, Distance n)
{
    std::advance(x, -n);
    return x;
}

}  // namespace sgcc

#endif  // NEXT_PRIOR_HPP
