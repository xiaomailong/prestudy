TEMPLATE = app
LANGUAGE = C++

#OBJECTS_DIR = debug/
#UI_DIR      = debug/
#MOC_DIR     = debug/

#DESTDIR = ../../sbin

win32:DEFINES += GTEST _CRT_SECURE_NO_WARNINGS
CONFIG -= qt
CONFIG += warn_on debug console

#TARGET = GTEST.lib

INCLUDEPATH += . \
    ../ \
    ../include \

HEADERS += \
    ../include/gtest/gtest.h \
    ../samples/sample4.h \
    ../samples/sample3-inl.h \
    ../samples/sample2.h \
    ../samples/sample1.h \
    ../samples/prime_tables.h
#    ../include/gtest/internal/gtest-internal.h \
#    ../include/gtest/internal/gtest-string.h \
#    ../include/gtest/gtest-death-test.h \
#    ../include/gtest/gtest-message.h \
#    ../include/gtest/gtest-param-test.h \
#    ../include/gtest/gtest-printers.h \
#    ../include/gtest/gtest_prod.h \
#    ../include/gtest/gtest-test-part.h \
#    ../include/gtest/gtest-typed-test.h

SOURCES += \
    ../src/gtest-all.cc \
#    ../samples/sample10_unittest.cc \
#    ../samples/sample9_unittest.cc \
#    ../samples/sample8_unittest.cc \
#    ../samples/sample7_unittest.cc \
#    ../samples/sample6_unittest.cc \
#    ../samples/sample5_unittest.cc \
#    ../samples/sample4_unittest.cc \
    ../samples/sample4.cc \
#    ../samples/sample3_unittest.cc \
#    ../samples/sample2_unittest.cc \
    ../samples/sample2.cc \
    ../samples/sample1_unittest.cc \
    ../samples/sample1.cc \
    ../src/gtest_main.cc
#    ../src/gtest.cc \
#    ../src/gtest-death-test.cc \
#    ../src/gtest-filepath.cc \
#    ../src/gtest-port.cc \
#    ../src/gtest-printers.cc \
#    ../src/gtest-test-part.cc \
#    ../src/gtest-typed-test.cc \

