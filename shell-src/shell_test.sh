#!/bin/sh
# 程序必须以上面的行开始（必须放在文件的第一行）

# 判别SHELL环境 流程控制用if
if [ "$SHELL" = "/bin/bash" ]; then
  echo "your login shell is the bash (bourne again shell)"
elif [ "$SHELL" = "/bin/zsh" ]; then
  echo "your login shell is the bash (zsh)"
else
  echo "your login shell is not bash but ${SHELL}"
fi

# 在shell编程中，所有的变量都由字符串组成，并且您不需要对变量进行声明。可以使用花括号来区别变量名
# echo "some text": 将文字内容打印在屏幕上
a="hello world"
echo "a is: $a or ${a}"

myarray=(one two three four five)
echo $myarray
echo ${myarray[2]}
echo ${myarray[*]}

# 采用$[]进行整数计算
n1 = 23
expr2=$[(${n1}-1)/2*5]
echo $expr2

# 采用bc进行浮点计算
expr1=`echo " scale=4; 3.1415926/2" | bc`
echo $expr1
v1=3.14159265
v2=1.414
v3=1234
v4=0.1234
v5=`bc << EOF
scale = 4
a1 = ($v1 * $v2)
b1 = ($v3 / $v4)
a1 + b1
EOF
`
echo $v5

# 引号将防止通配符扩展, 单引号更严格一些。它可以防止任何变量扩展。
# 双引号可以防止通配符扩展但允许变量扩展。
echo $SHELL
echo "$SHELL"
echo '$SHELL'
echo *.*
echo "*.*"
echo '*.*'
# 还有一种防止这种扩展的方法，那就是使用转义字符——反斜杆
echo \$SHELL
echo \*.\*

# 通常用"[ ]"来表示条件测试。注意这里的空格很重要。要确保方括号里的空格。

# 整数比较
# [ n1 -eq n2 ]：（-eq等于 -ge大于等于 -gt大于 -le小于等于 -lt小于 -ne不等于）
if [ $# -lt 3 ]; then
  echo "Param1~2: $1 $2"
fi

# 字符串比较
# [ s1 = s2 ]：（＝等于 !=不等于 <小于排序 >大于排序 ] ）
# [ -n s1 ] ：判断s1是否有值(n长度>0 z长度=0)
s1=water
s2=boliks
if [ $s1 \> $s2 ]; then
  echo "$s1 is greater than $s2"
else
  echo "$s2 is greater than $s1"
fi
# 文件比较
# [ -d file ] 是file否存在并是目录
# [ -e file ] 是file否存在
# [ -f file ] 是file否存在并是文件
# [ -r file ] 是file否存在并可读
# [ -s file ] 是file否存在并不为空
# [ -w file ] 是file否存在并可写
# [ -x file ] 是file否存在并可执行
# [ -O file ] 是file否存在并被当前用户拥有
# [ -G file ] 是file否存在并默认组为当前用户组
# [ f1 -nt f2 ] 检查f1是否比f2新
# [ f1 -ot f2 ] 检查f1是否比f2旧

# (( expression )) 数学表达式
# val++后增量 val--后减量 ++val前增量 --val前减量 **取幂
# <<逐位左移 >>逐位右移 ~逐位取反 &逐位逻辑与 |逐位逻辑或
# !逻辑否定 &&逻辑与 ||逻辑或
v1=10
if (( $v1 ** 2 > 90 )); then
  (( v2 = $v1 ** 2 ))
  echo "The square of $v1 is $v2"
fi

# [[ expression ]] 高级字符串处理函数
if [[ $USER == B* ]]; then
  echo "Hello $USER !"
else
  echo "Sorry, $USER, I don't know you !"
fi

# case 命令
case $USER in
Bolik | root)
  echo "Welcome, $USER"
  echo "Please enjoy your visit";;
testing)
  echo "Special testing account";;
*)
  echo "Sorry, you're not allowed here";;
esac

# for 命令
# for-loop表达式查看一个字符串列表 (字符串用空格分隔) 然后将其赋给一个变量
for var in A B C; do
  echo "var is ${var}"
done

# 改变字段分隔符
# IFSOLD=${IFS}
# IFS＝$'\n'
for var in "Water Bolik" Root Test; do
  echo "var is ${var}"
done
# IFS=$IFSOLD

# 使用通配符读取目录
for file in ./* /test/test/badtest
do
  if [ -d "$file" ]; then
    echo "$file is a directory"
  elif [ -f "$file" ]; then
    echo "$file is a file"
  else
    echo "$file does't exist"
  fi
done

# for (( varassign; condation ; iter ))
for (( i=1; i <= $#; i++ )) do
  echo "The next number is $i"
done

# while 命令
s=$#
while [ $s -gt 0 ]; do
  s=$[ $s - 1 ]
  i=$[ $# - $s ]
  e=$[ $i ]
  echo "$e"
done

s=0
until [ $s -ge $# ]; do
  s=$[ $s + 1 ]
  echo "$s"
done

# while-loop 将运行直到表达式测试为真


# select 表达式是一种bash的扩展应用，尤其擅长于交互式使用。用户可以从一组不同的值中进行选择。
# echo "What is your favourite OS?"
# select var in "Windows" "Mac OSX" "Cent OS" "Core OS" "Debian" "GNU Linux" "FreeBSD" "Other"; do
#   break
# done
# echo "You have selected $var"

echo $PWD
echo $this

daytime=`date`
today=`date +%Y-%m-%d`
echo "The today(${today}) date and time are: ${daytime}"
dirname this

# git clone https://github.com/svn2github/googletest
# git clone https://github.com/libfann/fann
# git pull https://github.com/svn2github/googletest
# git pull https://github.com/libfann/fann


exit 5
