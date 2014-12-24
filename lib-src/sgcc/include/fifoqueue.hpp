//  Copyright 2012 sgcc xj group

#ifndef MINQUEUE_HPP
#define MINQUEUE_HPP

/*****************************************************************************
 * File: MinQueue.hpp
 * Author: Keith Schwarz (htiek@cs.stanford.edu)
 *
 * A FIFO queue class that supports amortized O(1) enqueue, dequeue, and find-
 * min.  Here, the find-min returns (but does not remove) the minimum value in
 * the queue.  This is not the same as a priority queue, which always removes
 * the smallest element on each dequeue.  The min-queue simply allows
 * for constant-time access to that element.
 *
 * The construction that enables the min-queue to work is based on a classic
 * construction for creating a queue out of two stacks.  We first discuss how
 * to do this, then explain how we generalize the construction to work for a
 * min-queue.
 *
 * The idea behind the queue-from-stacks construction is to maintain two
 * stacks, an "old" stack and a "new" stack.  Graphically, the stacks are
 * shown here:
 *
 *                  10      1
 *                   9      2
 *                   8      3
 *                   7      4
 *                   6      5
 *                  ---    ---
 *                  new    old
 *
 * Intuitively, the queue is represented by walking down the old stack from
 * top to bottom, then walking up the new stack from bottom to top.  In the
 * above picture, the queue contains the elements 1, 2, 3, 4, 5, 6, 7, 8, 9,
 * and 10, in that order.
 *
 * Whenever we enqueue a new element, we push it atop the new stack.  To
 * dequeue an element, if there are any elements in the old stack, we pop the
 * topmost element off.  Thus in the above picture, if we wanted to enqueue
 * the value 11, we'd end up with this setup:
 *
 *                  11
 *                  10      1
 *                   9      2
 *                   8      3
 *                   7      4
 *                   6      5
 *                  ---    ---
 *                  new    old
 *
 * Similarly, to dequeue the value 1, we'd pop it off of the old stack to get
 *
 *                  11
 *                  10
 *                   9      2
 *                   8      3
 *                   7      4
 *                   6      5
 *                  ---    ---
 *                  new    old
 *
 * If we then dequeued 2, 3, 4, and 5, we would end up holding
 *
 *                  11
 *                  10
 *                   9
 *                   8
 *                   7
 *                   6
 *                  ---    ---
 *                  new    old
 *
 * The question, now, is what happens if we want to dequeue another value from
 * the queue, given that the old stack is now empty.  To do this, we pop every
 * value from the new stack and push it into the old stack.  This reverses the
 * order of the elements in the new stack, giving
 *
 *                          6
 *                          7
 *                          8
 *                          9
 *                          10
 *                          11
 *                  ---    ---
 *                  new    old
 *
 * From here, we can now dequeue the top value of the old stack to get 6, the
 * correct value.
 *
 * This algorithm may seem inefficient, since any dequeue operation might take
 * O(n) time to move over every element from the new array into the old.
 * However, in an amortized sense, the runtime of these operations is quite
 * fast.  We can show, using a proper analysis, that the amortized complexity
 * of any one operation is O(1).  To do this, we define a potential function
 * over the data structure such that P(q) is equal to the number of elements
 * in the 'new' stack.  From here, we get the following:
 *
 * 1. The actual complexity of enqueuing an element is 1 unit of work (pushing
 *    onto a stack), and it raises the potential by one.  This means that the
 *    amortized cost of the operation is 1 + DP(q) = 2 = O(1).
 * 2. The actual complexity of dequeuing an element depends on whether the old
 *    stack is empty or not:
 *
 *    *  If the old stack is empty, the actual complexity is 1 unit of work
 *       (popping off a stack) and there is no change in potential.  The
 *       amortized cost is thus 1 + DP(q) = 1 + 0 = O(1).
 *    *  If the old stack is not empty, the actual complexity is n units of
 *       work (popping n elements off one stack and moving them), plus one
 *       extra unit of work for the final pop for an actual complexity of
 *       n + 1 units of work.  However, this drops the potential by n, so the
 *       amortized complexity is n + 1 + DP(q) = n + 1 - n = 1 = O(1)
 *
 * Consequently, each operation takes amortized O(1) to complete.
 *
 * In order to use this solution to build a min-queue from two min-stacks, we
 * apply this construction to two min-stacks instead of two regular stacks.
 * The minimum element of the queue can then be found by looking at the
 * minimum element of the two stacks taken together.
 *
 * This implementation references the MinStack class, also available in the
 * Archive of Interesting Code.  You can find it online at
 *
 *          http://www.keithschwarz.com/interesting/code/?dir=min-stack
 */

#include <qmutex.h>
#include <minstack.hpp>

#include <functional>

namespace sgcc {

template <typename T, typename Comparator = std::less<T> >
class FIFOQueue {
  public:
    explicit FIFOQueue(Comparator c = Comparator())
        : new_(c), old_(c), comparator_(c)
    {}

    void enqueue(const T& elem)
    {
        QMutexLocker locker(&mutex_);
        new_.push(elem);
    }

    T dequeue()
    {
        MoveIfNecessary();
        QMutexLocker locker(&mutex_);
        T first = old_.top();
        old_.pop();
        return first;
    }

    const T& front()
    {
        MoveIfNecessary();
        return old_.top();
    }

    const T& minimum() const
    {
        QMutexLocker locker(&mutex_);
        if (!new_.empty() && !old_.empty()) {
            return comparator_(old_.minimum(), new_.minimum()) ? old_.minimum() : new_.minimum();
        } else if (!new_.empty()) {
            return new_.minimum();
        } else {
            return old_.minimum();
        }
    }

    bool empty() const
    {
        return new_.empty() && old_.empty();
    }

    size_t size() const
    {
        QMutexLocker locker(&mutex_);
        return new_.size() + old_.size();
    }

  private:
    void MoveIfNecessary()
    {
        QMutexLocker locker(&mutex_);
        if (!old_.empty()) {
            return;
        }
        while (!new_.empty()) {
            old_.push(new_.top());
            new_.pop();
        }
    }

  private:
    mutable MinStack<T, Comparator> new_, old_;
    Comparator comparator_;
    QMutex mutex_;
};

}  // namespace sgcc

#endif  // MINQUEUE_HPP
