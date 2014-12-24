//  Copyright 2012 sgcc xj group

//  weak_ptr.hpp
//  摘抄自 boost 1.49.0 Smart Pointers 智能指针
//  weak_ptr 类模板存储一个引向已被 shared_ptr 管理的对象的 "weak reference"（弱引用）。
//  为了访问这个对象，一个 weak_ptr 可以利用 shared_ptr 的构造函数或成员函数 lock 转换为 shared_ptr。
//  当最后一个指向对象的 shared_ptr 消失，而对象也被删除后，从一个引向已被删除对象的 weak_ptr 实例获取 shared_ptr 的企图就会失败：
//  构造函数会抛出一个 boost::bad_weak_ptr 类型的异常，而 weak_ptr::lock 会返回一个 empty shared_ptr。
//  每一个 weak_ptr 都符合 C++ 标准库的 CopyConstructible 和 Assignable 的必要条件，并因此能够用于标准库容器。因为提供了比较操作，因此 weak_ptr 可以和标准库中的关联式容器一起工作。
//  weak_ptr 的操作绝不会抛出异常。 这个类模板被 T 参数化，T 是被指向的对象的类型。
//  相对于 shared_ptr，weak_ptr 提供了一个非常有限的操作子集，因为在多线程程序中访问它所存储的指针是非常危险的，甚至有时在一个单线程程序中也是不安全的（也就是说，它可能引起未定义行为）。
//  姑且假设 weak_ptr 有一个返回 raw pointer（裸指针）的 get 成员函数
//

#ifndef WEAK_PTR_HPP
#define WEAK_PTR_HPP

//
//  weak_ptr.hpp
//
//  Copyright (c) 2001, 2002, 2003 Peter Dimov
//
// Distributed under the Boost Software License, Version 1.0. (See
// accompanying file LICENSE_1_0.txt or copy at
// http://www.boost.org/LICENSE_1_0.txt)
//
//  See http://www.boost.org/libs/smart_ptr/weak_ptr.htm for documentation.
//

#include <shared_count.hpp>
#include <shared_ptr.hpp>

#include <algorithm>

namespace sgcc {

template<class Y>
class shared_ptr;

template<class Y>
class weak_ptr;

template<class T>
class weak_ptr {
    template<class Y> friend class shared_ptr;
    template<class Y> friend class weak_ptr;

  private:
    T* px;          // contained pointer
    weak_count pn;  // reference counter

  private:
    // Borland 5.5.1 specific workarounds
    typedef weak_ptr<T> this_type;

  public:
    typedef T element_type;

    weak_ptr() : px(0), pn() {}

    weak_ptr(weak_ptr const& r) : px(r.px), pn(r.pn) {}  // NOLINT

    weak_ptr& operator=(weak_ptr const& r)
    {
        px = r.px;
        pn = r.pn;
        return *this;
    }

//    template<class Y>
//    weak_ptr(weak_ptr<Y> const& r)
//        : px(r.lock().get()), pn(r.pn) {}

//    template<class Y>
//    weak_ptr(weak_ptr<Y> && r): px(r.lock().get()), pn(static_cast< weak_count && >(r.pn))
//    {
//        r.px = 0;
//    }

//    weak_ptr(weak_ptr && r): px(r.px), pn(static_cast< weak_count && >(r.pn))
//    {
//        r.px = 0;
//    }

//    weak_ptr& operator=(weak_ptr && r)
//    {
//        this_type(static_cast< weak_ptr && >(r)).swap(*this);
//        return *this;
//    }

    template<class Y>
    weak_ptr(shared_ptr<Y> const& r) : px(r.px), pn(r.pn) {}  // NOLINT

    shared_ptr<T> lock() const
    {
        return shared_ptr<element_type>(*this, sp_nothrow_tag());
    }

    int use_count() const
    {
        return pn.use_count();
    }

    bool expired() const
    {
        return pn.use_count() == 0;
    }

    bool _empty() const
    {
        return pn.empty();
    }

    void reset()
    {
        this_type().swap(*this);
    }

    void swap(this_type& other)
    {
        std::swap(px, other.px);
        pn.swap(other.pn);
    }

//    void _internal_assign(T * px2, shared_count const& pn2)
//    {
//        px = px2;
//        pn = pn2;
//    }

    template<class Y>
    bool owner_before(weak_ptr<Y> const& rhs) const
    {
        return pn < rhs.pn;
    }

    template<class Y>
    bool owner_before(shared_ptr<Y> const& rhs) const
    {
        return pn < rhs.pn;
    }
};  // weak_ptr

template<class T, class U>
inline bool operator<(weak_ptr<T> const& a, weak_ptr<U> const& b)
{
    return a.owner_before(b);
}

template<class T>
void swap(weak_ptr<T>& a, weak_ptr<T>& b)
{
    a.swap(b);
}

}  // namespace sgcc

#endif  // #ifndef WEAK_PTR_HPP
