//  Copyright 2012 sgcc xj group

#ifndef SHARED_PTR_ARRAY_HPP
#define SHARED_PTR_ARRAY_HPP

//
//  shared_array.hpp
//
//  (C) Copyright Greg Colvin and Beman Dawes 1998, 1999.
//  Copyright (c) 2001, 2002 Peter Dimov
//
//  Distributed under the Boost Software License, Version 1.0. (See
//  accompanying file LICENSE_1_0.txt or copy at
//  http://www.boost.org/LICENSE_1_0.txt)
//
//  See http://www.boost.org/libs/smart_ptr/shared_array.htm for documentation.
//


#include <checked_delete.hpp>

#include <shared_count.hpp>

#include <cstddef>            // for std::ptrdiff_t
#include <algorithm>          // for std::swap
#include <functional>         // for std::less

namespace sgcc {
//
//  shared_array
//
//  shared_array extends shared_ptr to arrays.
//  The array pointed to is deleted when the last shared_array pointing to it
//  is destroyed or reset.
//

template<class T>
class shared_array {
  private:
    typedef checked_ptr_array_deleter<T> deleter;
    typedef shared_array<T> this_type;

  public:
    typedef T element_type;

    explicit shared_array(T* p = 0) : px(p), pn(p, deleter()) {}

    template<class D>
    shared_array(T* p, D d) : px(p), pn(p, d) {}

    explicit shared_array(shared_array const& r) : px(r.px), pn(r.pn) {}

    shared_array & operator=(shared_array const& r)
    {
        this_type(r).swap(*this);
        return *this;
    }

    void reset(T* p = 0)
    {
        this_type(p).swap(*this);
    }

    template<class D>
    void reset(T* p, D d)
    {
        this_type(p, d).swap(*this);
    }

    T& operator[](ptrdiff_t i) const
    {
        return px[i];
    }

    T* get() const
    {
        return px;
    }

    bool unique() const
    {
        return pn.unique();
    }

    int use_count() const
    {
        return pn.use_count();
    }

    void swap(shared_array<T>& other)
    {
        std::swap(px, other.px);
        pn.swap(other.pn);
    }

    void* _internal_get_deleter(std::type_info const& ti) const
    {
        return pn.get_deleter(ti);
    }

  private:
    T* px;              // contained pointer
    shared_count pn;    // reference counter
};

template<class T>
inline bool operator==(shared_array<T> const& a, shared_array<T> const& b)
{
    return a.get() == b.get();
}

template<class T>
inline bool operator!=(shared_array<T> const& a, shared_array<T> const& b)
{
    return a.get() != b.get();
}

template<class T>
inline bool operator<(shared_array<T> const& a, shared_array<T> const& b)
{
    return std::less<T*>()(a.get(), b.get());
}

template<class T>
void swap(shared_array<T>& a, shared_array<T>& b)
{
    a.swap(b);
}

template<class D, class T> D* get_deleter(shared_array<T> const& p)
{
    return static_cast<D*>(p._internal_get_deleter(typeid(D)));
}

}  // namespace sgcc

#endif  // #ifndef SHARED_PTR_ARRAY_HPP
