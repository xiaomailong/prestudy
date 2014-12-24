// Copyright 2012 sgcc xj group

//
//  shared_count.hpp
//  摘抄自 boost 1.49.0 Smart Pointers 智能指针
//

#ifndef SHARED_COUNT_HPP
#define SHARED_COUNT_HPP

//
//  detail/shared_count.hpp
//
//  Copyright (c) 2001, 2002, 2003 Peter Dimov and Multi Media Ltd.
//  Copyright 2004-2005 Peter Dimov
//
// Distributed under the Boost Software License, Version 1.0. (See
// accompanying file LICENSE_1_0.txt or copy at
// http://www.boost.org/LICENSE_1_0.txt)
//

#include <qmutex.h>

#include <typeinfo>
#include <algorithm>

namespace sgcc {

struct sp_nothrow_tag {};

template< class D >
struct sp_inplace_tag {};

class sp_counted_base {
  private:
    sp_counted_base(sp_counted_base const&);  // NOLINT

    sp_counted_base& operator=(sp_counted_base const&);

    int use_count_;
    int weak_count_;
    QMutex mutex_;

  public:
    sp_counted_base() : use_count_(1), weak_count_(1) {}

    virtual ~sp_counted_base() {}

    virtual void dispose() = 0;

    virtual void destroy()
    {
        delete this;
    }

    virtual void* get_deleter(std::type_info const& ti) = 0;

    void add_ref_copy()
    {
        mutex_.lock();
        ++use_count_;
        mutex_.unlock();
    }

    bool add_ref_lock()
    {
        mutex_.lock();
        bool r = use_count_ == 0 ? false: (++use_count_, true);
        mutex_.unlock();
        return r;
    }

    void release()
    {
        mutex_.lock();
        int new_use_count = --use_count_;
        mutex_.unlock();
        if (new_use_count == 0) {
            dispose();
            weak_release();
        }
    }

    void weak_add_ref()
    {
        mutex_.lock();
        ++weak_count_;
        mutex_.unlock();
    }

    void weak_release()
    {
        mutex_.lock();
        int new_weak_count = --weak_count_;
        mutex_.unlock();
        if (new_weak_count == 0) {
            destroy();
        }
    }

    int use_count() const {
        return static_cast<int const volatile&>(use_count_);
    }
};

template<class X>
class sp_counted_impl_p : public sp_counted_base {
  private:
    typedef sp_counted_impl_p<X> this_type;

    X* px_;

    sp_counted_impl_p(sp_counted_impl_p const&);  // NOLINT

    sp_counted_impl_p& operator=(sp_counted_impl_p const&);

  public:
    explicit sp_counted_impl_p(X* px): px_(px) {}

    virtual void dispose()
    {
        checked_delete(px_);
    }

    virtual void* get_deleter(std::type_info const&)
    {
        return 0;
    }
};


template<class P, class D>
class sp_counted_impl_pd : public sp_counted_base {
  private:
    typedef sp_counted_impl_pd<P, D> this_type;

    P ptr;
    D del;

    sp_counted_impl_pd(sp_counted_impl_pd const&);  // NOLINT

    sp_counted_impl_pd& operator= (sp_counted_impl_pd const&);

  public:
    sp_counted_impl_pd(P p, const D& d): ptr(p), del(d) {}

    explicit sp_counted_impl_pd(P p): ptr(p), del() {}

    virtual void dispose()
    {
        del(ptr);
    }

    virtual void* get_deleter(std::type_info const& ti)
    {
        return ti == typeid(D) ? &reinterpret_cast<char&>(del): 0;  // NOLINT
    }
};

template<class P, class D, class A>
class sp_counted_impl_pda : public sp_counted_base {
  private:
    typedef sp_counted_impl_pda<P, D, A> this_type;

    P p_;
    D d_;
    A a_;

    sp_counted_impl_pda(sp_counted_impl_pda const&);  // NOLINT

    sp_counted_impl_pda& operator= (sp_counted_impl_pda const&);

  public:
    sp_counted_impl_pda(P p, const D& d, A a)
        : p_(p), d_(d), a_(a)
    {}

    sp_counted_impl_pda(P p, A a)
        : p_(p), d_(), a_(a)
    {}

    virtual void dispose()
    {
        d_(p_);
    }

    virtual void destroy()
    {
        typedef typename A::template rebind< this_type >::other A2;

        A2 a2(a_);
        this->~this_type();
        a2.deallocate(this, 1);
    }

    virtual void* get_deleter(std::type_info const& ti)
    {
        return ti == typeid(D) ? &reinterpret_cast<char&>(d_) : 0;  // NOLINT
    }
};

class weak_count;

class shared_count {
    friend class weak_count;

  private:
    sp_counted_base* pi_;

  public:
    shared_count() : pi_(0) {}

    template<class Y>
    explicit shared_count(Y* p) : pi_(0)
    {
        pi_ = new sp_counted_impl_p<Y>(p);
        if (pi_ == 0) {
            checked_delete(p);
        }
    }

    template<class Y, class D>
    shared_count(Y* p, D d) : pi_(0)
    {
        typedef Y* P;
        pi_ = new sp_counted_impl_pd<P, D>(p, d);
        if (pi_ == 0) {
            d(p);  // delete p
        }
    }

    template< class P, class D >
    shared_count(P p, sp_inplace_tag<D>) : pi_(0)
    {
        pi_ = new sp_counted_impl_pd< P, D >(p);
        if (pi_ == 0) {
            D()(p);  // delete p
        }
    }

    template<class P, class D, class A>
    shared_count(P p, D d, A a) : pi_(0)
    {
        typedef sp_counted_impl_pda<P, D, A> impl_type;
        typedef typename A::template rebind< impl_type >::other A2;

        A2 a2(a);
        pi_ = a2.allocate(1, static_cast< impl_type* >(0));
        if (pi_ != 0) {
            new(static_cast< void* >(pi_)) impl_type(p, d, a);
        } else {
            d(p);
        }
    }

    template< class P, class D, class A >
    shared_count(P p, sp_inplace_tag< D >, A a) : pi_(0)
    {
        typedef sp_counted_impl_pda< P, D, A > impl_type;
        typedef typename A::template rebind< impl_type >::other A2;

        A2 a2(a);
        pi_ = a2.allocate(1, static_cast< impl_type* >(0));
        if (pi_ != 0) {
            new(static_cast< void* >(pi_)) impl_type(p, a);
        } else {
            D()(p);
        }
    }

    ~shared_count()
    {
        if (pi_ != 0) { pi_->release(); }
    }

    shared_count(shared_count const& r) : pi_(r.pi_)  // NOLINT
    {
        if (pi_ != 0) { pi_->add_ref_copy(); }
    }

    shared_count(weak_count const& r);  // NOLINT
    shared_count(weak_count const& r, sp_nothrow_tag);

    shared_count& operator= (shared_count const& r)
    {
        sp_counted_base* tmp = r.pi_;
        if (tmp != pi_)
        {
            if (tmp != 0) tmp->add_ref_copy();
            if (pi_ != 0) pi_->release();
            pi_ = tmp;
        }
        return *this;
    }

    void swap(shared_count& r)
    {
        sp_counted_base* tmp = r.pi_;
        r.pi_ = pi_;
        pi_ = tmp;
    }

    int use_count() const
    {
        return pi_ != 0? pi_->use_count(): 0;
    }

    bool unique() const
    {
        return use_count() == 1;
    }

    bool empty() const
    {
        return pi_ == 0;
    }

    friend inline bool operator==(shared_count const& a, shared_count const& b)
    {
        return a.pi_ == b.pi_;
    }

    friend inline bool operator<(shared_count const& a, shared_count const& b)
    {
        // return less<sp_counted_base *>()(a.pi_, b.pi_);
        return a.pi_ < b.pi_;
    }

    void* get_deleter(std::type_info const& ti) const
    {
        return pi_? pi_->get_deleter(ti): 0;
    }
};


class weak_count {
    friend class shared_count;

  private:
    sp_counted_base* pi_;

  public:
    weak_count() : pi_(0) {}

    weak_count(shared_count const& r) : pi_(r.pi_)  // NOLINT
    {
        if (pi_ != 0) {
            pi_->weak_add_ref();
        }
    }

    weak_count(weak_count const& r) : pi_(r.pi_)  // NOLINT
    {
        if (pi_ != 0) {
            pi_->weak_add_ref();
        }
    }

    ~weak_count()
    {
        if (pi_ != 0) {
            pi_->weak_release();
        }
    }

    weak_count& operator=(shared_count const& r)
    {
        sp_counted_base* tmp = r.pi_;
        if (tmp != pi_) {
            if (tmp != 0) tmp->weak_add_ref();
            if (pi_ != 0) pi_->weak_release();
            pi_ = tmp;
        }
        return *this;
    }

    weak_count& operator=(weak_count const& r)
    {
        sp_counted_base* tmp = r.pi_;
        if (tmp != pi_) {
            if (tmp != 0) tmp->weak_add_ref();
            if (pi_ != 0) pi_->weak_release();
            pi_ = tmp;
        }
        return *this;
    }

    void swap(weak_count& r)
    {
        sp_counted_base* tmp = r.pi_;
        r.pi_ = pi_;
        pi_ = tmp;
    }

    int use_count() const
    {
        return pi_ != 0 ? pi_->use_count(): 0;
    }

    bool empty() const
    {
        return pi_ == 0;
    }

    friend inline bool operator==(weak_count const& a, weak_count const& b)
    {
        return a.pi_ == b.pi_;
    }

    friend inline bool operator<(weak_count const& a, weak_count const& b)
    {
        // return less<sp_counted_base *>()(a.pi_, b.pi_);
        return a.pi_ < b.pi_;
    }
};

inline shared_count::shared_count(weak_count const& r): pi_(r.pi_)
{
    if (pi_ == 0 || !pi_->add_ref_lock()) {
        // boost::throw_exception(boost::bad_weak_ptr());
    }
}

inline shared_count::shared_count(weak_count const& r, sp_nothrow_tag): pi_(r.pi_)
{
    if (pi_ != 0 && !pi_->add_ref_lock()) {
        pi_ = 0;
    }
}

}  // namespace sgcc

#endif  // #ifndef SHARED_COUNT_HPP
