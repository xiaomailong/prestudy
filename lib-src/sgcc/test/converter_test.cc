#include <gtest/gtest.h>

#include <../include/converter.hpp>

TEST(ConverterTest, RomanToInt)
{
    EXPECT_EQ(sgcc::Converter::RomanToInt(std::string("IV")), 4);
    EXPECT_EQ(sgcc::Converter::RomanToInt(std::string("VIII")), 8);
    EXPECT_EQ(sgcc::Converter::RomanToInt(std::string("VIIII")), 9); // Error
    EXPECT_EQ(sgcc::Converter::RomanToInt(std::string("IIV")), 5);   // Error
    // TODO 边界及非法输入数据测试
}
