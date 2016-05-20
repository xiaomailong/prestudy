#!/bin/sh
# 程序必须以上面的行开始（必须放在文件的第一行）
# #! 是一个约定的标记，它告诉系统这个脚本需要什么解释器来执行，即使用哪一种Shell

# 以#开头的行就是注释，会被解释器忽略。sh里没有多行注释，只能每一行加一个#号。

# echo： 是Shell的一个内部指令，用于在屏幕上打印出指定的字符串。
# 注意，echo后单引号和双引号作用是不同的。单引号不能转义里面的字符。双引号可有可无，单引号主要用在原样输出中。

# printf 命令用于格式化输出， 是echo命令的增强版。它是C语言printf()库函数的一个有限的变形，并且在语法上有些不同。
printf "hello\n"
# printf 不像 echo 那样会自动换行，必须显式添加换行符(\n)。
#
# 注意：printf 由 POSIX 标准所定义，移植性要比 echo 好。
# printf 命令的语法：
# printf  format-string  [arguments...]
#
# format-string 为格式控制字符串，arguments 为参数列表。功能和用法与c语言的 printf 命令类似。
# 这里仅说明与C语言printf()函数的不同：
# printf 命令不用加括号
# format-string 可以没有引号，但最好加上，单引号双引号均可。
# 参数比格式控制符(%)多时，格式控制符可以重用，可以将所有参数都转换。
# arguments 使用空格分隔，不用逗号。
# 双引号
printf "%d %s\n" 10 "abc"
# 10 abc
# 单引号与双引号效果一样
printf '%d %s\n' 10 "abc"
# 10 abc
# 没有引号也可以输出
printf %s abc
# abc
# 但是下面的会出错：
# printf %d %s 10 abc
# 因为系统分不清楚哪个是参数，这时候最好加引号了。
#
# 格式只指定了一个参数，但多出的参数仍然会按照该格式输出，format-string 被重用
$ printf %s a b c
# abc
$ printf "%s\n" a b c
# a
# b
# c
#
# 如果没有 arguments，那么 %s 用NULL代替，%d 用 0 代替
$ printf "%s and %d \n"
# and 0
#
# 如果以 %d 的格式来显示字符串，那么会有警告，提示无效的数字，此时默认置为 0
$ printf "The first program always prints'%s,%d\n'" Hello Shell
-bash: printf: Shell: invalid number
# The first program always prints 'Hello,0'

#read： 命令行从输入设备读入内容
echo "What is your name?"
read NAME #输入
echo "Hello, $NAME"

# 子shell进程的PID存储在一个特殊的变量‘$$’中。这个变量只读，你不可以在脚本中修改它
echo "PID of this script: $$"
# PPID存储子shell父进程的ID（也就是主shell）
echo "PPID of this script: $PPID"
# UID存储了执行这个脚本的当前用户ID
echo "UID of this script: $UID"

# 判别SHELL环境 流程控制用if
if [ "$SHELL" = "/bin/bash" ]; then
  echo "your login shell is the bash (bourne again shell)"
elif [ "$SHELL" = "/bin/zsh" ]; then
  echo "your login shell is the bash (zsh)"
else
  echo "your login shell is not bash but ${SHELL}"
fi

# 定义变量
# 在shell编程中，所有的变量都由字符串组成，并且您不需要对变量进行声明。可以使用花括号来区别变量名
# 定义变量时，变量名不加美元符号（$）
# 注意，变量名和等号之间不能有空格，这可能和你熟悉的所有编程语言都不一样。有空格会出错。
# 同时，变量名的命名须遵循如下规则：
# 首个字符必须为字母（a-z，A-Z）。
# 中间不能有空格，可以使用下划线（_）。
# 不能使用标点符号。
# 不能使用bash里的关键字（可用help命令查看保留关键字）。
a="hello world"
# 使用变量
# 使用一个定义过的变量，只要在变量名前面加美元符号（$）即可
# 变量名外面的花括号是可选的，加不加都行，加花括号是为了帮助解释器识别变量的边界
# 推荐给所有变量加上花括号，这是个好的编程习惯。
# 已定义的变量，可以被重新定义。
echo "a is: $a or ${a}1234"
# 在变量前面加readonly 命令可以将变量定义为只读变量，只读变量的值不能被改变。
url="http://www.baidu.com"
readonly url
url="http://www.baidu.com"
# 使用 unset 命令可以删除变量。语法：
# unset variable_name
# 变量被删除后不能再次使用；unset 命令不能删除只读变量。
#
# 变量类型
# 运行shell时，会同时存在三种变量：
# 1) 局部变量
# 局部变量在脚本或命令中定义，仅在当前shell实例中有效，其他shell启动的程序不能访问局部变量。
# 2) 环境变量
# 所有的程序，包括shell启动的程序，都能访问环境变量，有些程序需要环境变量来保证其正常运行。必要的时候shell脚本也可以定义环境变量。
# 3) shell变量
# shell变量是由shell程序设置的特殊变量。shell变量中有一部分是环境变量，有一部分是局部变量，这些变量保证了shell的正常运行。
#
# 特殊变量
# 前面已经讲到，变量名只能包含数字、字母和下划线，因为某些包含其他字符的变量有特殊含义，这样的变量被称为特殊变量。
# 变量	含义
# $0	当前脚本的文件名
# $n	传递给脚本或函数的参数。n 是一个数字，表示第几个参数。例如，第一个参数是$1，第二个参数是$2。
# $#	传递给脚本或函数的参数个数。
# $*	传递给脚本或函数的所有参数。
# $@	传递给脚本或函数的所有参数。被双引号(" ")包含时，与 $* 稍有不同
# $?	上个命令的退出状态，或函数的返回值。
# $$	当前Shell进程ID。对于 Shell 脚本，就是这些脚本所在的进程ID。
echo "File Name: $0"
echo "First Parameter : $1"
echo "First Parameter : $2"
echo "Quoted Values: $@"
echo "Quoted Values: $*"
echo "Total Number of Parameters : $#"
#
# $* 和 $@ 的区别
# $* 和 $@ 都表示传递给函数或脚本的所有参数，不被双引号(" ")包含时，都以"$1" "$2" … "$n" 的形式输出所有参数。
#
# 但是当它们被双引号(" ")包含时，"$*" 会将所有的参数作为一个整体，以"$1 $2 … $n"的形式输出所有参数；
# "$@" 会将各个参数分开，以"$1" "$2" … "$n" 的形式输出所有参数。
echo "\$*=" $*
echo "\"\$*\"=" "$*"
echo "\$@=" $@
echo "\"\$@\"=" "$@"
echo "print each param from \$*"
for var in $*
do
    echo "$var"
done
echo "print each param from \$@"
for var in $@
do
    echo "$var"
done
echo "print each param from \"\$*\""
for var in "$*"
do
    echo "$var"
done
echo "print each param from \"\$@\""
for var in "$@"
do
    echo "$var"
done

# 退出状态
# $? 可以获取上一个命令的退出状态。所谓退出状态，就是上一个命令执行后的返回结果。
if [[ $? != 0 ]];then
  echo "error"
  exit 1;
fi
# 退出状态是一个数字，一般情况下，大部分命令执行成功会返回 0，失败返回 1。
# 不过，也有一些命令返回其他值，表示不同类型的错误。

# 转义字符
# 转义字符    含义
# \\  反斜杠
# \a  警报，响铃
# \b  退格（删除键）
# \f  换页(FF)，将当前位置移到下页开头
# \n  换行
# \r  回车
# \t  水平制表符（tab键）
# \v  垂直制表符
# shell默认是不转义上面的字符的。需要加-e选项。


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
