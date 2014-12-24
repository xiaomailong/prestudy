//  Copyright 2012 sgcc xj group

#ifndef MINSTACK_HPP
#define MINSTACK_HPP

/******************************************************************************
 * File: MinStack.hpp
 * Author: Keith Schwarz (htiek@cs.stanford.edu)
 *
 * A LIFO stack class that supports O(1) push, pop, and find-min.  Here, the
 * find-min operation returns (but does not remove) the minimum value in the
 * stack.  This sort of stack is often used as a subroutine in other problems.
 * It can be used to construct a queue with equivalent properties by
 * using one of the many stack-to-queue constructions, for example.
 *
 * The implementation of the min-stack is actually quite simple.  The idea is
 * that since the stack can only grow and shrink at the top, we only need to
 * consider two ways that the minimum element of the stack can change:
 *
 *  1. The minimum element is on the top, and it is popped off, and
 *  2. A new element is added to the stack that is smaller than the minimum.
 *
 * Because of this, we can augment a standard stack to track the minimum value
 * as follows.  Whenever we push an element atop the stack, we compare it to
 * the current minimum value.  If it is smaller, we augment the value we just
 * added into the stack by recording that it is the minimum.  If not, we store
 * a pointer down to the element of the stack that actually is the minimum.  In
 * this way, we can find the minimum element in constant time by simply
 * inspecting the top element of the stack and following its pointer to the
 * minimum element.
 */

#include <qmutex.h>

#include <deque>
#include <functional>
#include <utility>

namespace sgcc {

template <typename T, typename Comparator = std::less<T> >
class MinStack {
  public:
    explicit MinStack(Comparator c = Comparator())
        : stack_(), comparator_(c)
    {}

    void push(const T& elem)
    {
        QMutexLocker locker(&mutex_);
        if (empty()) {
            stack_.push_back(std::make_pair(elem, 0));
        } else {
            size_t smallestIndex = stack_.back().second;
            if (comparator_(elem, minimum())) {
                smallestIndex = stack_.size();
            }
            stack_.push_back(std::make_pair(elem, smallestIndex));
        }
    }

    T pop()
    {
        QMutexLocker locker(&mutex_);
        T first = stack_.back().first;
        stack_.pop_back();
        return first;
    }

    const T& top() const
    {
        return stack_.back().first;
    }

    const T& minimum() const
    {
        return stack_[stack_.back().second].first;
    }

    bool empty() const { return stack_.empty(); }

    size_t size() const { return stack_.size(); }

  private:
    std::deque< std::pair<T, size_t> > stack_;
    Comparator comparator_;
    QMutex mutex_;
};

}  // namespace sgcc

#endif  // MINSTACK_HPP
