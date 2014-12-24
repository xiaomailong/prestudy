//  Copyright 2012 sgcc xj group

#ifndef BOUNDEDPQUEUE_HPP
#define BOUNDEDPQUEUE_HPP

/**************************************************************
 * File: BoundedPQueue.h
 * Author: Keith Schwarz (htiek@cs.stanford.edu)
 *
 * An implementation of the bounded priority queue abstraction.
 * A bounded priority queue is in many ways like a regular priority
 * queue.  It stores a collection of elements tagged with a real-
 * valued priority, and allows for access to the element whose
 * priority is the smallest.  However, unlike a regular priority
 * queue, the number of elements in a bounded priority queue has
 * a hard limit that is specified in the constructor.  Whenever an
 * element is added to the bounded priority queue such that the
 * size exceeds the maximum, the element with the highest priority
 * value will be ejected from the bounded priority queue.  In this
 * sense, a bounded priority queue is like a high score table for
 * a video game that stores a fixed number of elements and deletes
 * the least-important entry whenever a new value is inserted.
 *
 * When creating a bounded priority queue, you must specify the
 * maximum number of elements to store in the queue as an argument
 * to the constructor.  For example:
 *
 * BoundedPQueue<int> bpq(15); // Holds up to fifteen values.
 *
 * The maximum size of the bounded priority queue can be obtained
 * using the maxSize() function, as in
 *
 * size_t k = bpq.maxSize();
 *
 * Beyond these restrictions, the bounded priority queue behaves
 * similarly to other containers.  You can query its size using
 * size() and check whether it is empty using empty().  You
 * can enqueue an element into the bounded priority queue by
 * writing
 *
 * bpq.enqueue(elem, priority);
 *
 * Note that after enqueuing the element, there is no guarantee
 * that the value will actually be in the queue.  If the queue
 * is full and the new element's priority exceeds the largest
 * priority in the container, it will not be added.
 *
 * You can dequeue elements from a bounded priority queue using
 * the dequeueMin() function, as in
 *
 * int val = bpq.dequeueMin();
 *
 * The bounded priority queue also allows you to query the min
 * and max priorities of the values in the queue.  These values
 * can be queried using the best() and worst() functions, which
 * return the smallest and largest priorities in the queue,
 * respectively.
 */

#include <stdlib.h>
#include <qmutex.h>

#include <map>
#include <limits>
#include <functional>

namespace sgcc {

template <typename T, typename Comparator = std::less<T> >
class BoundedPQueue {
  public:
    explicit BoundedPQueue(size_t max_size, Comparator comp = Comparator())
        :elems_(comp)
    {
        maximum_size_ = max_size;
    }

    void Enqueue(const T& value, double priority)
    {
        QMutexLocker locker(&mutex_);
        if (Size() == MaxSize() && elems_.key_comp()(Worst(), priority)) {
            return;
        }

        elems_.insert(make_pair(priority, value));
        if (Size() > MaxSize()) {
            typename std::multimap<double, T, Comparator>::iterator last = elems_.end();
            --last;
            elems_.erase(last);
        }
    }

    T DequeueMin()
    {
        QMutexLocker locker(&mutex_);
        T result = elems_.begin()->second;
        elems_.erase(elems_.begin());
        return result;
    }

    size_t Size() const
    {
        return elems_.size();
    }

    bool Empty() const
    {
        return elems_.empty();
    }

    size_t MaxSize() const
    {
        return maximum_size_;
    }

    double Best()  const
    {
        QMutexLocker locker(&mutex_);
        return Empty() ? std::numeric_limits<double>::infinity() : elems_.begin()->first;
    }

    double Worst() const
    {
        QMutexLocker locker(&mutex_);
        return Empty() ? std::numeric_limits<double>::infinity() : elems_.rbegin()->first;
    }

  private:
    std::multimap<double, T, Comparator> elems_;
    size_t maximum_size_;
    QMutex mutex_;
};

}  // namespace sgcc

#endif  // BOUNDEDPQUEUE_HPP
