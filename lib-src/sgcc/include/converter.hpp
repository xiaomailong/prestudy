#ifndef CONVERTER_HPP
#define CONVERTER_HPP

#include <string>

namespace sgcc {

class Converter {
  private:
    // 罗马数字有下面七个基本符号：Ⅰ（1）、Ⅴ（5）、Ⅹ（10）、L（50）、C（100）、D（500）、M（1000）
    static int rtoi(char ch) {
        switch(ch) {
        case 'I':
            return 1;
        case 'V':
            return 5;
        case 'X':
            return 10;
        case 'L':
            return 50;
        case 'C':
            return 100;
        case 'D':
            return 500;
        case 'M':
            return 1000;
        default:
            return 0;
        }
    }

  public:
    /***************************************************************************************************************
     * 罗马数字计数方法：
     *    ① 罗马数字有下面七个基本符号：Ⅰ（1）、Ⅴ（5）、Ⅹ（10）、L（50）、C（100）、D（500）、M（1000）。
     *    ② 相同的数字连写，所表示的数等于这些数字相加得到的数，如：Ⅲ = 3；XX=20；CC=200；MMM=3000；
     *    ③ 小的数字在大的数字的右边，所表示的数等于这些数字相加得到的数， 如：Ⅷ = 8；Ⅻ = 12；
     *    ④ 小的数字，（限于Ⅰ、X 和C）在大的数字的左边，所表示的数等于大数减小数得到的数，如：Ⅳ= 4；Ⅸ= 9；
     *    ⑤ 正常使用时连写的数字重复不得超过三次；
     * 罗马数组数规则：
     *    ① 基本数字Ⅰ、X 、C 中的任何一个，自身连用构成数目，或者放在大数的右边连用构成数目，都不能超过三个；放在大数的左边只能用一个。
     *    ② 不能把基本数字V 、L 、D 中的任何一个作为小数放在大数的左边采用相减的方法构成数目；放在大数的右边采用相加的方式构成数目；
     *    ③ V 和 X 左边的小数字只能用Ⅰ。
     *    ④ L 和 C 左边的小数字只能用X。
     *    ⑤ D 和 M 左边的小数字只能用C。
     ***************************************************************************************************************/

    // 将罗马数字转化成整数
    static int RomanToInt(std::string s) {
        int res = 0;
        if (s.empty()) {
            return 0;
        }
        int temp, last;
        temp = rtoi(s[0]);
        last = temp;
        res += last;
        for (unsigned i = 1; i < s.size(); ++i) {
            temp = rtoi(s[i]);
            if (temp <= last) {
                res += temp;
            } else {
                res += temp - 2*last;
            }
            last = temp;
        }
        return res;
    }

  private:
    Converter(){}
    ~Converter(){}
};

}  // namespace sgcc

#endif // CONVERTER_HPP
