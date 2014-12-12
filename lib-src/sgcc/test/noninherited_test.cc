#include <gtest/gtest.h>

#include <noninherited.hpp>


class A : public virtual sgcc::noninherited<A> {
  public:
    A(){}
    ~A(){}
};

//class B : public A  // will has error: inherited virtual base class 'sgcc::noninherited<A>' has private default constructor & has private default constructor
//{
//  public:
//    B(){}
//    ~B(){}
//};

//TEST(sgccTest, NonInherited)
//{
//    A a;       // 可以构造
//    B b;       // 不能构造
//}
