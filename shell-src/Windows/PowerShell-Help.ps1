
# 管道 ----------
# 把上一条命令的输出作为下一条命令的输入。
# 例如通过ls获取当前目录的所有文件信息，然后通过Sort -Descending对文件信息按照Name降序排列，
# 最后将排序好的文件的Name和Mode格式化成Table输出。
ls | sort -Descending Name | Format-Table Name,Mode

# 我们可以把powershell当成一个计算器。----------
# 象键入命令行那样输入数学表达式，回车，powershell会自动计算并把结果输出。
# 常用的加减乘除模（+,-,*,/,%）运算和小括号表达式都支持。
1+3-(2.4-5)*(7.899-4.444)
# PowerShell也能自动识别计算机容量单位，包括KB，MB，GB，TB，PB
# 假如一个网站每个页面大小为80kb，统计显示每天的PV操作为800，1个月下来占用的带宽：
80kb*800*30/1gb

# Powershell 能够像CMD一样很好的执行外部命令。--------
# 通过netstat查看网络端口状态
netstat
# 通过IPConfig查看自己的网络配置
ipconfig
# route print查看路由信息
route print
# 启动CMD控制台
cmd
# 查找可用的Cmd控制台命令
# Cmd.exe 通过 /c 来接收命令参数
cmd /c help
# 启动外部程序
# 为什么可以通过notpad打开记事本，不能通过wordpad打开写字板？
# 因为notepad.exe位于C:Windows\system32 这个目录，
# 而这个目录已经默认被包含在Powershell的环境变量$env:Path中。
# 而wordpad.exe 所在的“%ProgramFiles%\Windows NT\Accessories\wordpad.exe“目录却没有包含，
# 可以先进入这个目录，再运行wordpad，或者将wordpad所在的目录加入到环境变量中。
$env:Path=$env:Path+”%ProgramFiles%\Windows NT\Accessories”。
# 默认键入一个字符串，powershell会将它原样输出，
# 如果该字符串是一个命令或者启动程序，在字符串前加‘&’可以执行命令，或者启动程序。

# PowerShell 别名 ------------------------------
# cmdlet 的名称由一个动词和一个名词组成，其功能对用户来讲一目了然。
# 但是对于一个经常使用powershell命令的人每天敲那么多命令也很麻烦啊。
# 能不能把命令缩短一点呢？于是“别名”就应运而生了。
# Powershell内部也实现了很多常用命令的别名。
# 例如Get-ChildItem，列出当前的子文件或目录。
# 它有两个别名：ls 和 dir，这两个别名来源于unix 的shell和windows的cmd。
# 因此别名有两个作用：
# 继承：继承unix-shell和windows-cmd。
# 方便：方便用户使用。
# 处理别名：
# 查询别名所指的真实cmdlet命令。
# 查看可用的别名，可以通过” ls alias:” 或者 ”Get-Alias“
# 如何查看所有以Remove打头的cmdlet的命令的别名呢？
dir alias: | where {$_.Definition.Startswith("Remove")}
# 说明：
# dir alias:获取的是别名的数组，通过where对数组元素进行遍历，
# $_代表当前元素，alias的Definition为String类型，
# 因为powershell支持.net，.net中的string类有一个方法Startswith。
# 通过where过滤集合在powershell中使用非常广泛。
# 有的cmdlet命令可能有2-3个别名，我们可以通过下面的命令查看所有别名和指向cmdlet的别名的个数。
ls alias: | Group-Object definition | sort -Descending Count
# 创建自己的别名
# 给记事本创建一个别名，并查看该别名；
Set-Alias -Name Edit -Value notepad
Edit
$alias:Edit
# 删除自己的别名
# 别名不用删除，自定义的别名在powershell退出时会自动清除。
# 但是请放心，powershell内置别名（诸如ls,dir,fl等）不会清除。
# 如果你非得手工删除别名。请使用
del alias:Edit
# 保存自己的别名
# 可以使用Export-Alias将别名导出到文件，需要时再通过Import-Alias导入。
# 但是导入时可能会有异常，提示别名已经存在无法导入：
Import-Alias alias.ps1
# 这时可以使用Force强制导入。
Export-Alias alias.ps1
Import-Alias -Force alias.ps1
# Powershell 通过函数扩展别名 ---
# 在Powershell中设置别名的确方便快捷，但是在设置别名的过程中并设置参数的相关信息。
# 尽管别名会自动识别参数，但是如何把经常使用的参数默认设定在别名里面呢？
# 例如Test-Connection -Count 2 -ComputerName，让-“-Count 2” 固化在别名中。
# 这时简单的别名无法完成上述需求，可以通过函数来完成它，并且一旦把函数拉过来，定义别名会变得更加灵活。
function test-conn { Test-Connection  -Count 2 -ComputerName $args}
Set-Alias tc test-conn
tc localhost
# 有了函数牵线，别名可以完成更高级更强大的功能，其中$args为参数的占位符。

# 象运行可执行文件一样，Powershell运行文件和脚本，也必须使用绝对路径或者相对路径，或者要运行的文件必须定义在可受信任的环境变量中。
# 
