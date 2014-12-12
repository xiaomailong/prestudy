//  Copyright 2012 sgcc xj group

//
//  scoped_ptr.hpp
//  摘抄自 boost 1.49.0 Smart Pointers 智能指针
//  scoped_ptr class template类模板存储一个指向动态分配对象的指针（动态分配对象是用 C++ new 表达式分配的）。
//  在 scoped_ptr 的析构过程中，或者经由一个显式的 reset，要保证它所指向的对象被删除
//  scoped_ptr 模板是解决简单需要的简单方案。它提供了一个基本的“资源获取就是初始化”的机制，不包括共享所有权或所有权转让语义。
//  无论它的名字还是语义上的强制要求（作为一个 noncopyable），它的唯一目的就是在当前作用域内独自保留所有权。
//  因为它是 noncopyable（不可拷贝的），对于不可拷贝的指针来说，它比 shared_ptr 或 std::auto_ptr 更加安全。
//  因为 scoped_ptr 很简单，在它的通常实现中，每一个操作都和内建指针有同样的速度，而且的它所占用的空间没有超过内建指针。
//  scoped_ptr 不能用于 C++ 标准库中的容器中，如果你需要一个能这样做的智能指针，请使用 shared_ptr。
//  scoped_ptr 不能正确持有指向一个动态分配数组的指针。关于那种用法请参见 scoped_array。
//
//


#ifndef SCOPED_PTR_HPP
#define SCOPED_PTR_HPP

//  (C) Copyright Greg Colvin and Beman Dawes 1998, 1999.
//  Copyright (c) 2001, 2002 Peter Dimov
//
//  Distributed under the Boost Software License, Version 1.0. (See
//  accompanying file LICENSE_1_0.txt or copy at
//  http://www.boost.org/LICENSE_1_0.txt)
//
//  http://www.boost.org/libs/smart_ptr/scoped_ptr.htm
//

#include <checked_delete.hpp>

#include <algorithm>

namespace sgcc {
//  scoped_ptr mimics a built-in pointer except that it guarantees deletion
//  of the object pointed to, either on destruction of the scoped_ptr or via
//  an explicit reset(). scoped_ptr is a simple solution for simple needs;
//  use shared_ptr or std::auto_ptr if your needs are more complex.

template<class T>
class scoped_ptr  {
  private:
    typedef scoped_ptr<T> this_type;

    T* px;

    explicit scoped_ptr(scoped_ptr const&);

    scoped_ptr& operator=(scoped_ptr const&);

    void operator==(scoped_ptr const&) const;

    void operator!=(scoped_ptr const&) const;

  public:
    typedef T element_type;

    explicit scoped_ptr(T* p = NULL): px(p)
    {}

    ~scoped_ptr()
    {
        checked_delete(px);
    }

    void reset(T* p = NULL)
    {
        this_type(p).swap(*this);
    }

    T& operator*() const
    {
        return *px;
    }

    T * operator->() const
    {
        return px;
    }

    T* get() const
    {
        return px;
    }

    void swap(scoped_ptr& b)
    {
        T* tmp = b.px;
        b.px = px;
        px = tmp;
    }
};

template<class T>
inline void swap(scoped_ptr<T>& a, scoped_ptr<T>& b)
{
    a.swap(b);
}

template<class T>
inline T* get_pointer(scoped_ptr<T> const& p)
{
    return p.get();
}

}  // namespace sgcc

#endif  // #ifndef SCOPED_PTR_HPP
