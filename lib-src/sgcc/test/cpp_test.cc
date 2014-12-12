#include <gtest/gtest.h>

TEST(CppTest, PrePlusPlus2)
{
    int i = 3, s = 0;
    s = (++i) + (++i);
    EXPECT_EQ(i, 5);
  #ifdef _MSC_VER
    EXPECT_EQ(s, 10);  // 5 + 5
  #else
    EXPECT_EQ(s, 9);   // 4 + 5
  #endif
}

TEST(CppTest, PrePlusPlus3)
{
    int i = 3, s = 0;
    s = (++i) + (++i) + (++i);
    EXPECT_EQ(i, 6);
  #ifdef _MSC_VER
    EXPECT_EQ(s, 18);  // 6 + 6 + 6
  #else
    EXPECT_EQ(s, 15);  // 4 + 5 + 6
  #endif
}

TEST(CppTest, PrePlusPlus4)
{
    int i = 3, s = 0;
    s = (++i) + (++i) + (++i) + (++i);
    EXPECT_EQ(i, 7);
  #ifdef _MSC_VER
    EXPECT_EQ(s, 28);  // 7 + 7 + 7 + 7
  #else
    EXPECT_EQ(s, 22);  // 4 + 5 + 6 + 7
  #endif
}
