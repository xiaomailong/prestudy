#include <gtest/gtest.h>

#include <null_ptr.hpp>


class CCObject {
  public:
    CCObject(){}
    ~CCObject(){}
};


void call_back_process(CCObject* target, void* data){
    target = NULL;
    data = NULL;
}


TEST(null_ptr_Test, call_back_process)
{
//    void call_back_process(CCObject* target, void* data);
//    bind(call_back_process, target, NULL); // error 函数类型是void* ，但是我们绑定的是一个整型 0

    CCObject* target = NULL;
    call_back_process(target, NULL);
}
