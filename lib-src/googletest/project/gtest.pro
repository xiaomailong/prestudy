TEMPLATE = lib
LANGUAGE = C++

#OBJECTS_DIR = debug/
#UI_DIR      = debug/
#MOC_DIR     = debug/

#DESTDIR = ../../sbin

win32:DEFINES += GTEST _CRT_SECURE_NO_WARNINGS
CONFIG -= qt
CONFIG += warn_on debug staticlib

#TARGET = GTEST.lib

INCLUDEPATH += . \
    ../ \
    ../include \

HEADERS += \
    ../include/gtest/gtest.h
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
    ../src/gtest-all.cc
#    ../src/gtest.cc \
#    ../src/gtest-death-test.cc \
#    ../src/gtest-filepath.cc \
#    ../src/gtest-port.cc \
#    ../src/gtest-printers.cc \
#    ../src/gtest-test-part.cc \
#    ../src/gtest-typed-test.cc \

