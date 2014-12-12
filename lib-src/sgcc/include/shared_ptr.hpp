//  Copyright 2012 sgcc xj group

//  shared_ptr.hpp
//  摘抄自 boost 1.49.0 Smart Pointers 智能指针
//  shared_ptr 类模板存储一个指向动态分配对象（一般是用 C++ new-expression 生成的）的指针。在最后一个 shared_ptr 所指向的对象被销毁或重置时，要保证它所指向的对象被删除。
//  每一个 shared_ptr 都符合 C++ 标准库的 CopyConstructible 和 Assignable 的必要条件，并因此能够用于标准库容器。因为提供了比较操作，因此 shared_ptr 可以和标准库中的关联式容器一起工作。
//  通常，一个 shared_ptr 不能正确地持有一个指向动态分配的数组的指针。关于那种用法请参见 shared_array。
//  因为在实现中使用了引用计数，shared_ptr实例的循环引用不会被回收。例如，如果 main() 持有一个指向 A 的 shared_ptr， A 又直接或间接持有一个指回 A 的 shared_ptr，A 的使用计数是 2。
//  最初的 shared_ptr 析构后将导致一个使用计数为 1 的 A 被悬挂。使用 weak_ptr 以“打破循环”。
//  这个类模板被 T 参数化，T 是被指向的对象的类型。shared_ptr 和它的大多数成员函数对于 T 没什么要求，允许它是一个不完整类型，或者为 void。
//  对 T 有附加要求的成员函数 (constructors, reset) 都明确地记录在下面。
//  只要 T* 能被隐式地转换到 U*，则 shared_ptr<T> 就能被隐式地转换到 shared_ptr<U>。
//  特别是，shared_ptr<T> 隐式转换到 shared_ptr<T const>，当 U 是 T 的一个可访问基类的时候，还能转换到 shared_ptr<U>，以及转换到 shared_ptr<void>。
//

#ifndef SHARED_PTR_HPP
#define SHARED_PTR_HPP

//
//  shared_ptr.hpp
//
//  (C) Copyright Greg Colvin and Beman Dawes 1998, 1999.
//  Copyright (c) 2001-2008 Peter Dimov
//
//  Distributed under the Boost Software License, Version 1.0. (See
//  accompanying file LICENSE_1_0.txt or copy at
//  http://www.boost.org/LICENSE_1_0.txt)
//
//  See http://www.boost.org/libs/smart_ptr/shared_ptr.htm for documentation.
//

#include <checked_delete.hpp>
#include <shared_count.hpp>

#include <algorithm>            // for std::swap
#include <functional>           // for std::less
#include <typeinfo>             // for std::bad_cast
#include <cstddef>              // for std::size_t

namespace sgcc {

template<class T>
class shared_ptr;

template<class T>
class weak_ptr;

template<class T>
class enable_shared_from_this;

template<class T>
class enable_shared_from_this2;

struct static_cast_tag {};
struct const_cast_tag {};
struct dynamic_cast_tag {};
struct polymorphic_cast_tag {};

template<class T>
struct shared_ptr_traits {
    typedef T & reference;
};

// template<>
// struct shared_ptr_traits<void> {
//     typedef void reference;
// };

template<>
struct shared_ptr_traits<void const> {
    typedef void reference;
};

// template<>
// struct shared_ptr_traits<void volatile> {
//     typedef void reference;
// };

// template<>
// struct shared_ptr_traits<void const volatile> {
//     typedef void reference;
// };

template< class X, class Y, class T >
inline void sp_enable_shared_from_this(shared_ptr<X> const* ppx, Y const* py, enable_shared_from_this< T > const* pe)
{
    if (pe != 0) {
        pe->_internal_accept_owner(ppx, const_cast< Y* >(py));
    }
}

template< class X, class Y, class T >
inline void sp_enable_shared_from_this(shared_ptr<X>* ppx, Y const* py, enable_shared_from_this2< T > const* pe)
{
    if (pe != 0) {
        pe->_internal_accept_owner(ppx, const_cast< Y* >(py));
    }
}

inline void sp_enable_shared_from_this(...) {}

template< class Y, class T >
struct sp_convertible {
    typedef char (&yes) [1];
    typedef char (&no)  [2];

    static yes f(T* t);
    static no  f(...);

    enum _vt { value = sizeof((f)(static_cast<Y*>(0))) == sizeof(yes) };
};

struct sp_empty {};

template< bool >
struct sp_enable_if_convertible_impl;

template<>
struct sp_enable_if_convertible_impl<true> {
    typedef sp_empty type;
};

template<>
struct sp_enable_if_convertible_impl<false> {
};

template< class Y, class T >
struct sp_enable_if_convertible: public sp_enable_if_convertible_impl< sp_convertible< Y, T >::value > {};

//
//  shared_ptr
//
//  An enhanced relative of scoped_ptr with reference counted copy semantics.
//  The object pointed to is deleted when the last shared_ptr pointing to it
//  is destroyed or reset.
//

template<class T>
class shared_ptr {
    template<class Y> friend class shared_ptr;
    template<class Y> friend class weak_ptr;

  private:
    T* px;             // contained pointer
    shared_count pn;    // reference counter

  private:
    // Borland 5.5.1 specific workaround
    typedef shared_ptr<T> this_type;

  public:
    typedef T element_type;
    typedef T value_type;
    typedef T* pointer;
    typedef typename shared_ptr_traits<T>::reference reference;

    shared_ptr(): px(0), pn() {}

    template<class Y>
    explicit shared_ptr(Y* p) : px(p), pn(p)
    {
        sp_enable_shared_from_this(this, p, p);
    }

    template<class Y, class D>
    shared_ptr(Y* p, D d): px(p), pn(p, d)
    {
        sp_enable_shared_from_this(this, p, p);
    }

    template<class Y, class D, class A>
    shared_ptr(Y* p, D d, A a) : px(p), pn(p, d, a)
    {
        sp_enable_shared_from_this(this, p, p);
    }

    shared_ptr(shared_ptr const& r) : px(r.px), pn(r.pn) {} // NOLINT

    template<class Y>
    explicit shared_ptr(weak_ptr<Y> const& r): pn(r.pn)
    {
        px = r.px;
    }

    template<class Y>
    shared_ptr(weak_ptr<Y> const& r, sp_nothrow_tag) : px(0), pn(r.pn, sp_nothrow_tag())
    {
        if (!pn.empty()) {
            px = r.px;
        }
    }

//    template<class Y>
//    shared_ptr(shared_ptr<Y> const& r, typename sp_enable_if_convertible<Y, T>::type = sp_empty())
//        : px(r.px), pn(r.pn) {}

    template< class Y >
    shared_ptr(shared_ptr<Y> const& r, T* p) : px(p), pn(r.pn) {}

    template<class Y>
    shared_ptr(shared_ptr<Y> const& r, static_cast_tag)
        : px(static_cast<element_type*>(r.px)), pn(r.pn)
    {}

    template<class Y>
    shared_ptr(shared_ptr<Y> const& r, const_cast_tag)
        : px(const_cast<element_type*>(r.px)), pn(r.pn)
    {}

    template<class Y>
    shared_ptr(shared_ptr<Y> const& r, dynamic_cast_tag)
        : px(static_cast<element_type*>(r.px)), pn(r.pn)
    {
        if (px == 0) {
            pn = shared_count();
        }
    }

    template<class Y>
    shared_ptr(shared_ptr<Y> const& r, polymorphic_cast_tag)
        : px(static_cast<element_type*>(r.px)), pn(r.pn)
    {
        if (px == 0) {
            // boost::throw_exception(std::bad_cast());
        }
    }

    shared_ptr& operator=(shared_ptr const& r)
    {
        this_type(r).swap(*this);
        return *this;
    }

//    template<class Y>
//    shared_ptr& operator=(shared_ptr<Y> const& r) {
//        this_type(r).swap(*this);
//        return *this;
//    }

//    shared_ptr(shared_ptr&& r)
//        : px(r.px), pn()
//    {
//        pn.swap(r.pn);
//        r.px = 0;
//    }

//    template<class Y>
//    shared_ptr(shared_ptr<Y>&& r, typename sp_enable_if_convertible<Y, T>::type = sp_empty())
//        : px(r.px), pn()
//    {
//        pn.swap(r.pn);
//        r.px = 0;
//    }

//    shared_ptr& operator=(shared_ptr&& r) {
//        this_type(static_cast< shared_ptr&& >(r)).swap(*this);
//        return *this;
//    }

//    template<class Y>
//    shared_ptr& operator=(shared_ptr<Y>&& r) {
//        this_type(static_cast< shared_ptr<Y>&& >(r)).swap(*this);
//        return *this;
//    }

    void reset()
    {
        this_type().swap(*this);
    }

    template<class Y>
    void reset(Y* p)
    {
        this_type(p).swap(*this);
    }

    template<class Y, class D>
    void reset(Y* p, D d)
    {
        this_type(p, d).swap(*this);
    }

    template<class Y, class D, class A>
    void reset(Y* p, D d, A a)
    {
        this_type(p, d, a).swap(*this);
    }

    template<class Y> void
    reset(shared_ptr<Y> const& r, T* p)
    {
        this_type(r, p).swap(*this);
    }

    reference operator* () const { return *px; }

    T* operator-> () const { return px; }

    T* get() const { return px; }

    bool unique() const { return pn.unique(); }

    int use_count() const { return pn.use_count(); }

    void swap(shared_ptr<T>& other)
    {
        std::swap(px, other.px);
        pn.swap(other.pn);
    }

    template<class Y>
    bool owner_before(shared_ptr<Y> const& rhs) const
    {
        return pn < rhs.pn;
    }

    template<class Y>
    bool owner_before(weak_ptr<Y> const& rhs) const
    {
        return pn < rhs.pn;
    }

    void* _internal_get_deleter(std::type_info const& ti) const
    {
        return pn.get_deleter(ti);
    }

    bool _internal_equiv(shared_ptr const& r) const
    {
        return px == r.px && pn == r.pn;
    }
};

template<class T, class U>
inline bool operator==(shared_ptr<T> const& a, shared_ptr<U> const& b)
{
    return a.get() == b.get();
}

template<class T, class U>
inline bool operator!=(shared_ptr<T> const& a, shared_ptr<U> const& b)
{
    return a.get() != b.get();
}

// template<class T>
// inline bool operator!=(shared_ptr<T> const& a, shared_ptr<T> const& b) {
//     return a.get() != b.get();
// }

template<class T, class U>
inline bool operator<(shared_ptr<T> const& a, shared_ptr<U> const& b)
{
    return a.owner_before(b);
}

template<class T>
inline void swap(shared_ptr<T>& a, shared_ptr<T>& b)
{
    a.swap(b);
}

template<class T, class U>
shared_ptr<T> static_pointer_cast(shared_ptr<U> const& r)
{
    return shared_ptr<T>(r, static_cast_tag());
}

template<class T, class U>
shared_ptr<T> const_pointer_cast(shared_ptr<U> const& r)
{
    return shared_ptr<T>(r, const_cast_tag());
}

template<class T, class U>
shared_ptr<T> dynamic_pointer_cast(shared_ptr<U> const& r)
{
    return shared_ptr<T>(r, dynamic_cast_tag());
}

template<class T, class U>
shared_ptr<T> shared_static_cast(shared_ptr<U> const& r)
{
    return shared_ptr<T>(r, static_cast_tag());
}

template<class T, class U>
shared_ptr<T> shared_dynamic_cast(shared_ptr<U> const& r)
{
    return shared_ptr<T>(r, dynamic_cast_tag());
}

template<class T, class U>
shared_ptr<T> shared_polymorphic_cast(shared_ptr<U> const& r)
{
    return shared_ptr<T>(r, polymorphic_cast_tag());
}

template<class T, class U>
shared_ptr<T> shared_polymorphic_downcast(shared_ptr<U> const& r)
{
    return shared_static_cast<T>(r);
}

template<class T>
inline T* get_pointer(shared_ptr<T> const& p)
{
    return p.get();
}

template<class D, class T>
D* get_deleter(shared_ptr<T> const& p)
{
    void const* q = p._internal_get_deleter(typeid(D));
    return const_cast<D *>(static_cast<D const*>(q));
}

template< class T >
struct hash;

template< class T >
size_t hash_value(shared_ptr<T> const& p)
{
    return hash< T* >()(p.get());
}

}  // namespace sgcc

#endif  // #ifndef SHARED_PTR_HPP
