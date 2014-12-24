
#include <string>

#include <gtest/gtest.h>

#include <../include/stringextensions.hpp>

TEST(StringExtensionsTest, Format)
{
//    string s1("");
//    EXPECT_EQ(s1.Format("abc%d", 1), "abc1");
//    string s2("");
//    EXPECT_EQ(s2.Format("abc%s", "d"), "abcd");
//    string s3("a");
//    EXPECT_EQ(s3.Format("abc%s", "d"), "aabcd");        // TODO 解决CString会不断增长Bug
//    EXPECT_EQ(s3.Format("abc%s", "d"), "aabcdabcd");    // TODO 解决CString会不断增长Bug

    CString cs1("");
    EXPECT_EQ(cs1.Format("abc%d", 1), "abc1");
    CString cs2("");
    EXPECT_EQ(cs2.Format("abc%s", "d"), "abcd");
    CString cs3("a");
    EXPECT_EQ(cs3.Format("abc%s", "d"), "aabcd");        // TODO 解决CString会不断增长Bug
    EXPECT_EQ(cs3.Format("abc%s", "d"), "aabcdabcd");    // TODO 解决CString会不断增长Bug
}

