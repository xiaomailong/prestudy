//  Copyright 2012 sgcc xj group

//
//  scoped_ptr.hpp
//  摘抄自 boost 1.49.0 Smart Pointers 智能指针
//  scoped_array 类模板存储一个指向一个动态分配数组的指针（动态分配数组是用 C++ new[] 表达式分配的）。
//  在 scoped_array 的析构过程中，或者经由一个显式的 reset，要保证它所指向的数组被删除。
//  scoped_array 模板是解决简单需要的简单方案。它提供了一个基本的“资源获取就是初始化”的机制，不包括共享所有权或所有权转让语义。
//  无论它的名字还是语义上的强制要求（作为一个 noncopyable），它的唯一目的就是在当前作用域内独自保留所有权。
//  因为它是 noncopyable（不可拷贝的），对于不可拷贝的指针来说，它比 shared_array 更加安全。
//  因为 scoped_array 很简单，在它的通常实现中，每一个操作都和内建数组指针有同样的速度，而且的它所占用的空间没有超过内建数组指针。
//  它不能用于 C++ 标准库中的容器中，如果 scoped_array 不能满足你的需要，请参考 shared_array。
//  它不能正确地持有指向单独对象的指针。关于那种用法请参见 scoped_ptr。
//  一个 std::vector 是一种可以代替 scoped_array 的可选方案，只需要稍微一点的额外代价，可以得到更多的灵活性。
//  一个 boost::array 是一种不使用动态分配时的可选方案。
//

#ifndef SCOPED_PTR_ARRAY_HPP
#define SCOPED_PTR_ARRAY_HPP

//  (C) Copyright Greg Colvin and Beman Dawes 1998, 1999.
//  Copyright (c) 2001, 2002 Peter Dimov
//
//  Distributed under the Boost Software License, Version 1.0. (See
//  accompanying file LICENSE_1_0.txt or copy at
//  http://www.boost.org/LICENSE_1_0.txt)
//
//  http://www.boost.org/libs/smart_ptr/scoped_array.htm
//

#include <checked_delete.hpp>

#include <algorithm>
#include <cstddef>

namespace sgcc {
//  scoped_array extends scoped_ptr to arrays. Deletion of the array pointed to
//  is guaranteed, either on destruction of the scoped_array or via an explicit
//  reset(). Use shared_array or std::vector if your needs are more complex.

template<class T>
class scoped_array  {
  private:
    typedef scoped_array<T> this_type;

    T* px;

    explicit scoped_array(scoped_array const&);

    scoped_array& operator=(scoped_array const&);

    void operator==(scoped_array const&) const;

    void operator!=(scoped_array const&) const;

  public:
    typedef T element_type;

    explicit scoped_array(T* p = NULL) : px(p)
    {}

    ~scoped_array()
    {
        checked_ptr_array_delete(px);
    }

    void reset(T* p = NULL)
    {
        this_type(p).swap(*this);
    }

    T& operator[](ptrdiff_t i) const
    {
        return px[i];
    }

    T* get() const {
        return px;
    }

    void swap(scoped_array& b)
    {
        T* tmp = b.px;
        b.px = px;
        px = tmp;
    }
};

template<class T>
inline void swap(scoped_array<T>& a, scoped_array<T>& b)
{
    a.swap(b);
}

}  // namespace sgcc

#endif  // #ifndef SCOPED_PTR_ARRAY_HPP
