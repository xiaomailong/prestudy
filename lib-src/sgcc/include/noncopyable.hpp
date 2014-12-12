//  Copyright 2012 sgcc xj group

//
//  noncopyable.hpp
//  摘抄自 boost 1.49.0
//  类 noncopyable 是一个基类。
//  当你想禁止复制构造和复制赋值时，可以从 noncopyable 派生你的类。
//

//  Boost noncopyable.hpp header file  --------------------------------------//

//  (C) Copyright Beman Dawes 1999-2003. Distributed under the Boost
//  Software License, Version 1.0. (See accompanying file
//  LICENSE_1_0.txt or copy at http://www.boost.org/LICENSE_1_0.txt)

//  See http://www.boost.org/libs/utility for documentation.

#ifndef NONCOPYABLE_HPP
#define NONCOPYABLE_HPP

// 摘自Google编程规范
// 删除构造函数宏定义，放在类代码最后，声明为private：
#define DISALLOW_COPY_AND_ASSIGN(TypeName) \
TypeName(const TypeName&); \
void operator=(const TypeName&)

namespace sgcc {

//  Private copy constructor and copy assignment ensure classes derived from
//  class noncopyable cannot be copied.

//  Contributed by Dave Abrahams

namespace noncopyable_  {

class noncopyable {
  protected:
    noncopyable() {}
    ~noncopyable() {}

  private:
    noncopyable(const noncopyable&);
    const noncopyable& operator=(const noncopyable&);
};

}  // namespace noncopyable_

typedef noncopyable_::noncopyable noncopyable;

}  // namespace sgcc
#endif  // NONCOPYABLE_HPP
