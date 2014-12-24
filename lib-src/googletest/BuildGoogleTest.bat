set path=%path%;C:\MinGW\bin
gcc -I B:\Work\OpenSource\Cpp\googletest\include -I B:\Work\OpenSource\Cpp\googletest -c B:\Work\OpenSource\Cpp\googletest\src\gtest-all.cc
ar -rv gtest.lib gtest-all.o

@echo off
echo    Press any key to exit ...
Pause>nul
echo on
exit