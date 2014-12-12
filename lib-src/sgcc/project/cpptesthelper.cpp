// Copyright 2012 sgcc Bolik

#include <gtest/gtest.h>
#include "cpptesthelper.h"

std::ostream& operator<<(std::ostream& os, const ObjectTestHelper& objHelper) {
    objHelper.writeTo(os);
    return os;
}

//TEST(Other, DefineTest) {
//    int a[10];
//    for (int i = 0; i < 10; i++)
//        a[i] = i;
//    int *ip = a;
//    PrintExpression(*ip);
//    PrintExpression(*++ip);
//    PrintExpression(*(ip+5));

//    int *ip2 = ip + 5;
//    PrintExpression(*ip2);
//    PrintExpression(*(ip2 - 4));
//    PrintExpression(*--ip2);
//    PrintExpression(ip2-ip);
//}

