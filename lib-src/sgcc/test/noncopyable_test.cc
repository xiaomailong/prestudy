#include <gtest/gtest.h>

#include <noncopyable.hpp>

class A : public sgcc::noncopyable {
  public:
    A(){}
    ~A(){}
};

TEST(sgccTest, NonCopyable)
{
    A a;
//    A c(a);
//    A b = a;
}
