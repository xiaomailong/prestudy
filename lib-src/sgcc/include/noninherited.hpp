//  Copyright 2013 sgcc xj group

#ifndef NONINHERITED_HPP
#define NONINHERITED_HPP

namespace sgcc {

//  Private constructor and copy assignment ensure classes derived from
//  class noncopyable cannot be copied.

template <class T>
class noninherited {
  private:
    friend T;
    noninherited(){}
    ~noninherited(){}
};

}  // namespace sgcc

#endif  // NONINHERITED_HPP
