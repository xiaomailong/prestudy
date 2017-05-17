# sed 命令

**Sed**是**Stream Editor**（字符流编辑器）的缩写，简称流编辑器。是非交互式命令行文本编辑器。

`sed`命令是操作，过滤和转换文本内容的强大工具。常用功能有增删改查（增加，删除，修改，查询），其中查询的功能中最常用的两大功能是过滤（过滤指定字符串）和取行（取出指定行）。

sed (stream editor) is a non-interactive command-line text editor.

sed（流编辑器）是非交互式命令行文本编辑器。

sed is commonly used to filter text, i.e., it takes text input, performs some operation (or set of operations) on it, and outputs the modified text. sed is typically used for extracting part of a file using pattern matching or substituting multiple occurrences of a string within a file.

sed通常用于过滤文本，即它需要文本输入，对其执行一些操作（或一组操作），并输出修改的文本。 sed通常用于使用模式匹配提取文件的一部分或替换文件中多次出现的字符串。



## 参考资料

- [linux三剑客之sed命令精讲](http://www.cnblogs.com/chensiqiqi/p/6382080.html)
- [sed manual](http://www.gnu.org/software/sed/manual/sed.html)



## `sed`命令执行流程

**Sed软件从文件或管道中读取一行，处理一行，输出一行；再读取一行，再处理一行，再输出一行....**

> 一次一行的设计使得Sed软件性能很高，`sed`在读取非常庞大的文件时不会出现卡顿的想象。大家都用过`vi`命令，用`vi`命令打开几十M或更大的文件，会发现有卡顿现象，这是因为`vi`命令打开文件是一次性将文件加载到内存，然后再打开，因此卡顿的时间长短就取决于从磁盘到内存的读取速度了。而且如果文件过大的话还会造成内存溢出现象。Sed软件就很好的避免了这种情况，打开速度非常快，执行速度也很快。

**sed是非交互式的编辑器。它不会修改文件，除非使用shell重定向来保存结果**。默认情况下，所有的输出行都被打印到屏幕上。

**sed编辑器逐行处理文件（或输入），并将结果发送到屏幕**。具体过程如下：首先sed把当前正在处理的行保存在一个临时缓存区中（也称为模式空间），然后处理临时缓冲区中的行，完成后把该行发送到屏幕上。sed每处理完一行就将其从临时缓冲区删除，然后将下一行读入，继续进行处理和显示。处理完输入文件的最后一行后，sed便结束运行。sed把每一行都存在临时缓冲区中，对这个副本进行编辑，所以不会修改原文件。 

**Sed软件有两个内置的存储空间：**

- **模式空间**（pattern space）：是Sed软件从文本读取一行文本然后存入的缓冲区（这个缓冲区是在内存中的），然后使用`sed`命令操作模式空间的内容。
- **保持空间**（hold space）：是Sed软件另外一个缓冲区，用来存放临时数据，也是在内存中，但是模式空间和保持空间的用途是不一样的。Sed可以交换保持空间和模式空间的数据，但是**不能在保持空间上执行普通的`sed`命令**，也就是说我们**可以在保持空间存储数据**。



## 语法格式

```sh
sed OPTIONS... [SCRIPT] [INPUTFILE...]
sed 【选项】 【sed命令脚本】 【输入文件】
```

> 说明：
>
> 1.  注意Sed软件以及后面选项，`sed`命令和输入文件，每个元素之间都至少有一个空格。
> 2.  为了避免混淆，本文称呼Sed为Sed软件。`sed -commands`(`sed`命令)是Sed软件内置的一些命令选项，为了和前面的`options`（选项）区分，故称为`sed`命令
> 3.  `sed -commands` 既可以是单个`sed`命令，也可以是多个`sed`命令组合。
> 4.  `input -file` (输入文件)是可选项，`sed`还能够从标准输入如管道获取输入。
> 5.  如果不指定INPUTFILE，或者INPUTFILE为 - ，则sed过滤标准输入的内容。If you do not specify INPUTFILE, or if INPUTFILE is -, `sed` filters the contents of the standard input. 





The following examples are equivalent:

```sh
sed 's/hello/world/' input.txt > output.txt
sed 's/hello/world/' < input.txt > output.txt
cat input.txt | sed 's/hello/world/' - > output.txt

sed -e 's/hello/world/' input.txt > output.txt
sed --expression='s/hello/world/' input.txt > output.txt

echo 's/hello/world/' > myscript.sed
sed -f myscript.sed input.txt > output.txt
sed --file=myscript.sed input.txt > output.txt
```



## 选项说明

## Command-Line Options [选项]

| option      [选项] | 英文解释                               | 解释说明（加粗的为重点）                             |
| :--------------: | :--------------------------------- | :--------------------------------------- |
|                  | `--version`                        | 打印正在运行的sed版本和版权声明，然后退出。Print out the version of sed that is being run and a copyright notice, then exit. |
|                  | `--help`                           | 打印帮助信息，简要说明这些命令行选项和错误报告地址，然后退出。Print a usage message briefly summarizing these command-line options and the bug-reporting address, then exit. |
|       `-n`       | `--quiet`, `--silent`              | **默认情况下，sed通过脚本在每个循环结束时打印出模式空间（请参阅sed的工作原理）。 这些选项禁用此自动打印，并且只有在通过p命令明确告知时，sed才会产生输出。**By default, sed prints out the pattern space at the end of each cycle through the script (see How sed works). These options disable this automatic printing, and sed only produces output when explicitly told to via the p command. |
|   `-e script`    | `--expression=script`              | 以脚本形式添加命令到处理输入要运行的命令集。Add the commands in script to the set of commands to be run while processing the input. |
| `-f script-file` | `--file=script-file`               | 将包含命令的脚本文件添加到处理输入要运行的命令集。Add the commands contained in the file script-file to the set of commands to be run while processing the input. |
|   `-i[SUFFIX]`   | `--in-place[=SUFFIX]`              | **①此选项指定文件是就地进行编辑**。 GNU sed通过创建临时文件并将输出发送到此文件而不是标准输出。①This option specifies that files are to be edited in-place. GNU sed does this by creating a temporary file and sending output to this file rather than to the standard output.②**此选项实现了-s**。②This option implies -s.③**当到达文件结尾时，临时文件将重命名为输出文件的原始名称。 扩展名（如果提供）用于在重命名临时文件之前修改旧文件的名称，从而进行备份**。③ When the end of the file is reached, the temporary file is renamed to the output file’s original name. The extension, if supplied, is used to modify the name of the old file before renaming the temporary file, thereby making a backup copy.④**遵循此规则：如果扩展名不包含_，则作为后缀附加到当前文件名的末尾; 如果扩展名包含一个或多个_字符，则每个星号将替换为当前文件名。 这允许您为备份文件添加前缀，而不是（或除了）后缀，甚至将原始文件的备份副本放置到另一个目录中（如果目录已存在）**。④This rule is followed: if the extension doesn’t contain a _, then it is appended to the end of the current filename as a suffix; if the extension does contain one or more _ characters, then each asterisk is replaced with the current filename. This allows you to add a prefix to the backup file, instead of (or in addition to) a suffix, or even to place backup copies of the original files into another directory (provided the directory already exists).⑤**如果没有提供扩展名，原始文件将被覆盖而不进行备份**。⑤If no extension is supplied, the original file is overwritten without making a backup. |
|      `-l N`      | `--line-length=N`                  | 指定l命令的默认自动换行长度。 长度为0（零）意味着不要自动换行。 如果没有指定，则取为70。Specify the default line-wrap length for the l command. A length of 0 (zero) means to never wrap long lines. If not specified, it is taken to be 70. |
|                  | `--posix`                          | GNU sed包含了POSIX sed的几个扩展。 为了简化脚本编写，此选项将禁用此手册所描述的所有扩展，包括其他命令。大多数扩展都接受了POSIX所规定的语法之外的sed程序，但是其中的一些（例如Reporting Bugs中描述的N命令的行为）实际上违反了标准。 如果要仅禁用后一种扩展，可以将POSIXLY_CORRECT变量设置为非空值。GNU sed includes several extensions to POSIX sed. In order to simplify writing portable scripts, this option disables all the extensions that this manual documents, including additional commands. Most of the extensions accept sedprograms that are outside the syntax mandated by POSIX, but some of them (such as the behavior of the N command described in Reporting Bugs) actually violate the standard. If you want to disable only the latter kind of extension, you can set the POSIXLY_CORRECT variable to a non-empty value. |
|       `-b`       | `--binary`                         | 此选项可在每个平台上使用，但仅在操作系统区分文本文件和二进制文件时才有效。当进行这样的区分时，如MS-DOS，Windows，Cygwin的情况，文本文件由以回车符和换行字符分隔的行组成，而sed找不到结尾的CR。当指定此选项时，sed将以二进制模式打开输入文件，因此不会请求此特殊处理，并将行以换行符结束。This option is available on every platform, but is only effective where the operating system makes a distinction between text files and binary files. When such a distinction is made—as is the case for MS-DOS, Windows, Cygwin—text files are composed of lines separated by a carriage return and a line feed character, and sed does not see the ending CR. When this option is specified, sed will open input files in binary mode, thus not requesting this special processing and considering lines to end at a line feed. |
|                  | `--follow-symlinks`                | 此选项仅在支持符号链接的平台上可用，并且仅在指定了-i选项时才有效。 在这种情况下，如果在命令行中指定的文件是符号链接，则sed将跟随链接并编辑链接的最终目的地。默认行为是中断符号链接，以便链接目标不会被修改。 This option is available only on platforms that support symbolic links and has an effect only if option -i is specified. In this case, if the file that is specified on the command line is a symbolic link, sed will follow the link and edit the ultimate destination of the link. The default behavior is to break the symbolic link, so that the link destination will not be modified. |
|     `-E,-r`      | `--regexp-extended`                | **使用扩展正则表达式而不是基本正则表达式**。扩展的正则表达式是egrep接受的; 它们可以更清晰，因为它们通常具有较少的反斜杠。历史上这是一个GNU扩展，但是-E扩展已经被添加到[POSIX标准](http://austingroupbugs.net/view.php?id=528)中，所以使用-E进行可移植性。GNU sed已经接受-E作为多年的无证选项，并且_ BSD seds已经接受-E多年，但使用-E的脚本可能不会移植到其他旧系统。 请参阅扩展正则表达式。 Use extended regular expressions rather than basic regular expressions. Extended regexps are those that egrepaccepts; they can be clearer because they usually have fewer backslashes. Historically this was a GNU extension, but the -E extension has since been added to the POSIX standard, so use -E for portability. GNU sed has accepted -E as an undocumented option for years, and _BSD seds have accepted -E for years as well, but scripts that use -E might not port to other older systems. See Extended regular expressions. |
|       `-s`       | `--separate`                       | 默认情况下，sed会将命令行上指定的文件视为单个连续的长流。该GNU sed扩展允许用户将它们视为单独的文件：范围地址（例如`/abc/,/def/`）不允许跨越多个文件，行号相对于每个文件的开头，`$`指的是每个文件的最后一行，从R命令调用的文件将在每个文件的开头被倒带。 By default, sed will consider the files specified on the command line as a single continuous long stream. This GNUsed extension allows the user to consider them as separate files: range addresses (such as `/abc/,/def/`) are not allowed to span several files, line numbers are relative to the start of each file, `$` refers to the last line of each file, and files invoked from the `R` commands are rewound at the start of each file. |
|                  | `--sandbox`                        | 在沙箱模式下，`e/w/r`命令被拒绝 - 包含它们的程序将被中止而不运行。 沙箱模式确保sed仅在命令行上指定的输入文件上运行，并且不能运行外部程序。In sandbox mode,`e/w/r` commands are rejected - programs containing them will be aborted without being run. Sandbox mode ensures sed operates only on the input files designated on the command line, and cannot run external programs. |
|       `-u`       | `--unbuffered`                     | 缓冲输入和输出尽可能最低限度。（这是非常有用的，如果输入来自`tail -f`，并希望尽快看到转换后的输出。） Buffer both input and output as minimally as practical. (This is particularly useful if the input is coming from the likes of `tail -f`, and you wish to see the transformed output as soon as possible.) |
|       `-z`       | `--null-data`, `--zero-terminated` | 将输入视为一组行，每行以零字节（ASCII`NUL`字符）终止，而不是换行。 该选项可以与`sort -z`和`find -print0`等命令一起使用来处理任意的文件名。 Treat the input as a set of lines, each terminated by a zero byte (the ASCII ‘`NUL`’ character) instead of a newline. This option can be used with commands like `sort -z` and `find -print0` to process arbitrary file names. |

If no `-e`, `-f`, `--expression`, or `--file` options are given on the command-line, then the first non-option argument on the command line is taken to be the script to be executed.

如果在命令行中未指定-e，-f，--expression或--file选项，则命令行上的第一个非选项参数将被视为要执行的脚本。

If any command-line parameters remain after processing the above, these parameters are interpreted as the names of input files to be processed. A file name of ‘-’ refers to the standard input stream. The standard input will be processed if no file names are specified.

如果在处理上述内容后仍然有任何命令行参数，这些参数将被解释为要处理的输入文件的名称。 文件名“ - ”是指标准输入流。 如果没有指定文件名，将处理标准输入。



## Exit status 退出状态

An exit status of zero indicates success, and a nonzero value indicates failure. GNU `sed` returns the following exit status error values:

退出状态为零表示成功，非零值表示失败。 GNU sed返回以下退出状态错误值：

| 退出状态错误值 | 解释说明                                     |
| :-----: | ---------------------------------------- |
|    0    | 成功完成。Successful completion.              |
|    1    | 无效的命令，无效的语法，无效的正则表达式或与--posix一起使用的GNU sed扩展命令。Invalid command, invalid syntax, invalid regular expression or a GNU `sed` extension command used with --posix. |
|    2    | 无法打开在命令行中指定的一个或多个输入文件（例如，找不到文件或读取权限拒绝）。 继续处理其他文件。One or more of the input file specified on the command line could not be opened (e.g. if a file is not found, or read permission is denied). Processing continued with other files. |
|    4    | I / O错误或运行时严重的处理错误，GNU sed立即中止。An I/O error, or a serious processing error during runtime, GNU `sed` aborted immediately. |
|   自定义   | 此外，命令q和Q可用于使用自定义退出代码值终止sed（这是一个GNU sed 扩展）。Additionally, the commands `q` and `Q` can be used to terminate `sed` with a custom exit code value (this is a GNU `sed`extension) |



## sed script 命令脚本

A `sed` program consists of one or more `sed` commands, passed in by one or more of the `-e`, `-f`, `--expression`, and `--file` options, or the first non-option argument if zero of these options are used. This document will refer to “the” `sed` script; this is understood to mean the in-order concatenation of all of the scripts and script-files passed in. See [Overview](http://www.gnu.org/software/sed/manual/sed.html#Overview).

sed程序由一个或多个sed命令组成，由一个或多个`-e`，`-f`，`--expression`和`--file`选项传递，或第一个非选项参数为零。本文档引用`sed`脚本; 这意味着传递的所有脚本和脚本文件进行顺序连接。请参阅概述。

`sed` 命令格式如下：

`[addr]X[options]`

X is a single-letter `sed` command. `[addr]` is an optional line address. If `[addr]` is specified, the command X will be executed only on the matched lines. `[addr]` can be a single line number, a regular expression, or a range of lines (see [sed addresses](http://www.gnu.org/software/sed/manual/sed.html#sed-addresses)). Additional `[options]` are used for some `sed` commands.

X是一个单字母sed命令。 [addr]是可选的行地址。 如果指定了[addr]，则命令X将仅在匹配的行上执行。 [addr]可以是一个行号，一个正则表达式或一系列行（见sed地址）。 其他[options]用于某些sed命令。



### sed -commands [sed命令]

The following commands are supported in GNU `sed`. Some are standard POSIX commands, while other are GNU extensions. Details and examples for each command are in the following sections. (Mnemonics) are shown in parentheses.

GNU sed支持以下命令。 一些是标准的POSIX命令，而其他是GNU扩展。 每个命令的详细信息和示例如下。 （助记符）显示在括号中。

|     sed -commands [sed命令]      | 助记符             | 解释说明（加粗的为重点）                             |
| :----------------------------: | --------------- | :--------------------------------------- |
|      `a\text`,   `a text`      | apend           | **在行后附加文本。** Append text after a line.   |
|           `b label`            | branch          | 无条件分配标签。 标签会被省略，在这种情况下，下一个周期开始。Branch unconditionally to label. The label may be omitted, in which case the next cycle is started. |
|      `c\text`,   `c text`      | change(replace) | 用文本替换（更改）制定行。 Replace (change) lines with text. |
|              `d`               | delete          | **删除模式空间; 马上开始下一个循环。**Delete the pattern space; immediately start next cycle. |
|              `D`               | Delete          | 与多行模式相关：如果模式空间包含内容，则删除模式空间中直到第一个换行符截止的文本，并重新启动新的模式空间循环，而不会读取新的输入行。；如果模式空间没有内容，则会像发出`d`命令那样启动正常的新循环。①If pattern space contains newlines, delete text in the pattern space up to the first newline, and restart cycle with the resultant pattern space, without reading a new line of input.②If pattern space contains no newline, start a normal new cycle as if the `d` command was issued. |
|              `e`               | execute         | 执行在模式空间中找到的命令，并使用输出替换模式空间; 末尾不加换行符。Executes the command that is found in pattern space and replaces the pattern space with the output; a trailing newline is suppressed. |
|          `e command`           | execute         | 执行命令并将其输出发送到输出流。 该命令可以跨多行运行，末尾会添加一个反斜杠。Executes command and sends its output to the output stream. The command can run across multiple lines, all but the last ending with a back-slash. |
|              `F`               | Filename        | （文件名）打印当前输入文件的文件名（带换行符）。 (filename) Print the file name of the current input file (with a trailing newline). |
|              `g`               |                 | 使用保持空间的内容替换模式空间的内容。Replace the contents of the pattern space with the contents of the hold space. |
|              `G`               |                 | 在模式空间的内容中附加换行符，然后将保持空间的内容附加到模式空间。Append a newline to the contents of the pattern space, and then append the contents of the hold space to that of the pattern space. |
|              `h`               | hold            | （保持）使用模式空间的内容替换保持空间的内容。(hold) Replace the contents of the hold space with the contents of the pattern space. |
|              `H`               | Hold            | 在保持空间的内容中附加换行符，然后将模式空间的内容附加到保持空间。Append a newline to the contents of the hold space, and then append the contents of the pattern space to that of the hold space. |
|      `i\text`,   `i text`      | Insert          | **在行前插入文本**。insert text before a line.   |
|              `l`               |                 | 以明确的方式打印模式空间。Print the pattern space in an unambiguous form. |
|              `n`               | next            | （下一步）如果未禁用自动打印，请打印模式空间，然后，无论如何使用下一行输入替换模式空间。 如果没有更多的输入，则sed退出而不处理任何命令。(next) If auto-print is not disabled, print the pattern space, then, regardless, replace the pattern space with the next line of input. If there is no more input then sed exits without processing any more commands. |
|              `N`               | Next            | **向模式空间添加换行符，然后将下一行输入追加到模式空间。 如果没有更多的输入，则sed退出而不处理任何命令。**。Add a newline to the pattern space, then append the next line of input to the pattern space. If there is no more input then sed exits without processing any more commands. |
|              `p`               | print           | **打印模式空间内容，通常`p`会与选项`-n`一起使用**。Print the pattern space. |
|              `P`               | Print           | 打印模式空间内容，直到第一个换行符结束。Print the pattern space, up to the first <newline>. |
|         `q[exit-code]`         | quit            | （退出）退出sed而不处理任何命令或输入。(quit) Exit sed without processing any more commands or input. |
|         `Q[exit-code]`         | Quit            | （退出）此命令与q相同，但不会打印模式空间的内容。 像q一样，它提供了将退出代码返回给调用者的功能。(quit) This command is the same as q, but will not print the contents of pattern space. Like q, it provides the ability to return an exit code to the caller. |
|          `r filename`          | read            | 读取一个文本文件。Reads text file a file.         |
|          `R filename`          | Read            | 在当前周期结束时或当读取下一个输入行时，将一行文件内容排队读取并插入到输出流中。Queue a line of filename to be read and inserted into the output stream at the end of the current cycle, or when the next input line is read. |
| `s/regexp/replacement/[flags]` | substitute      | **（替换）匹配正则表达式与模式空间的内容。 如果找到，则替换匹配的字符串**。(substitute) Match the regular-expression against the content of the pattern space. If found, replace matched string with replacement. |
|           `t label`            | test            | 如果前面的命令执行成功，那么就跳转到t指定的标签处，继续往下执行后续命令。否则，仍然继续正常的执行流程。(test) Branch to label only if there has been a successful substitution since the last input line was read or conditional branch was taken. The label may be omitted, in which case the next cycle is started. |
|           `T label`            | Test            | (test) Branch to label only if there have been no successful substitutions since the last input line was read or conditional branch was taken. The label may be omitted, in which case the next cycle is started. |
|         `v [version]`          | version         | （版本号）此命令什么也不做，但如果不支持GNU sed扩展，或者请求的版本不可用，则会导致sed失败。(version) This command does nothing, but makes sed fail if GNU sed extensions are not supported, or if the requested version is not available. |
|          `w filename`          | write           | 将模式空间内容写入文件。Write the pattern space to filename. |
|          `W filename`          | Write           | 将模式空间的首行内容写入给定文件。Write to the given filename the portion of the pattern space up to the first newline. |
|              `x`               | exchange        | 交换保持空间和模式空间的内容。Exchange the contents of the hold and pattern spaces. |
|          `y/src/dst/`          |                 | 将模式空间中与源字符集相匹配的字符替换为目标字符集中相应位置的字符。Transliterate any characters in the pattern space which match any of the source-chars with the corresponding character in dest-chars. |
|              `z`               | zap             | （zap）该命令清空模式空间的内容。(zap) This command empties the content of pattern space. |
|              `#`               |                 | 注释，直到换行符结束。A comment, until the next newline. |
|      `{ cmd ; cmd ... }`       |                 | 命令组合。Group several commands together.    |
|              `=`               |                 | 打印当前输入行号（包括换行符）。Print the current input line number (with a trailing newline). |
|           `: label`            |                 | 指定分支命令`(b, t, T)`的标签位置。Specify the location of label for branch commands `(b, t, T)`. |



### The s Command

The s command (as in substitute) is probably the most important in sed and has a lot of different options. The syntax of the s command is ‘s/regexp/replacement/flags’.

s命令（替代）是sed中最重要的命令，有很多不同的选项。 s命令的语法是`s/regexp/replacement/flags`。

Its basic concept is simple: the s command attempts to match the pattern space against the supplied regular expression regexp; if the match is successful, then that portion of the pattern space which was matched is replaced with replacement.

其基本概念很简单：s命令尝试将模式空间与提供的正则表达式regexp匹配; 如果匹配成功，则匹配的模式空间的该部分被替换替换。

For details about regexp syntax see [Regular Expression Addresses](http://www.gnu.org/software/sed/manual/sed.html#Regexp-Addresses).

有关regexp语法的详细信息，请参阅[正则表达式](http://www.gnu.org/software/sed/manual/sed.html#Regexp-Addresses)。

The replacement can contain `\n` (n being a number from 1 to 9, inclusive) references, which refer to the portion of the match which is contained between the nth \( and its matching \). Also, the replacement can contain unescaped `&` characters which reference the whole matched portion of the pattern space.

替换可以包含`\n`（`n`是`1~9`的整数）的引用，其引用包含在第`n`个（与其匹配的）匹配项。 此外，替换可以包含引`&`字符用于指定模式空间的整个匹配项。

The `/` characters may be uniformly replaced by any other single character within any given s command. The `/` character (or whatever other character is used in its stead) can appear in the regexp or replacement only if it is preceded by a `\` character.

在`s`命令中的可以使用任何单个字符替换`/`字符。 `/`字符（或任何其他字符替代使用）只有在前面加上转义符`\`时才会在正则表达式或替换中显示。

Finally, as a GNU `sed` extension, you can include a special sequence made of a backslash and one of the letters `L`, `l`, `U`, `u`, or `E`. The meaning is as follows:

最后，作为GNU sed扩展，您可以包括一个由反斜杠和一个字母L，l，U，u或E组成的特殊序列，用于字符大小写转换。其含义如下：

| 特殊序列 | 解释说明                                     |
| ---- | ---------------------------------------- |
| `\L` | 替换为小写，直到找到`\U`或`\E`。Turn the replacement to lowercase until a `\U` or `\E` is found. |
| `\l` | 将下一个字符转成小写。Turn the next character to lowercase. |
| `\U` | 替换为大写，直到找到`\L`或`\E`。Turn the replacement to uppercase until a `\L` or `\E` is found. |
| `\u` | 将下一个字符转成大写。Turn the next character to uppercase. |
| `\E` | 停止以`\L`或`\U`开始的大小写转换。Stop case conversion started by `\L `or `\U`. |

When the `g` flag is being used, case conversion does not propagate from one occurrence of the regular expression to another. 

当使用g标志时，大小写转换不会从正则表达式的一次出现传播到另一个。

For example, when the following command is executed with ‘a-b-’ in pattern space:

```sh
s/\(b\?\)-/x\u\1/g
```

the output is ‘axxB’. When replacing the first ‘-’, the ‘\u’ sequence only affects the empty replacement of ‘\1’. It does not affect the `x` character that is added to pattern space when replacing `b-` with `xB`.

On the other hand, `\l` and `\u` do affect the remainder of the replacement text if they are followed by an empty substitution. With ‘a-b-’ in pattern space, the following command:

```sh
s/\(b\?\)-/\u\1x/g
```

will replace ‘-’ with ‘X’ (uppercase) and ‘b-’ with ‘Bx’. If this behavior is undesirable, you can prevent it by adding a ‘\E’ sequence—after ‘\1’ in this case.

To include a literal `\`, `&`, or newline in the final replacement, be sure to precede the desired `\`, `&`, or newline in the replacementwith a `\`.





## 特殊符号

| 特殊符号 | 解释说明（加粗的为重点）                          |
| :--: | :------------------------------------ |
| `!`  | **对指定行以外的所有行应用命令**                    |
| `=`  | 打印当前行行号                               |
| `~`  | `First~Step`表示从`First`行开始，以步长`Step`递增 |
| `&`  | 代表被替换的内容                              |
| `:`  | **实现一行命令语句可以执行多条sed命令**               |
| `{}` | 对单个地址或地址范围执行批量操作                      |
| `+`  | 地址范围中用到的符号，做加法运算                      |

* * *
