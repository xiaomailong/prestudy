TEMPLATE = app
LANGUAGE = C++

CONFIG += warn_on debug console
QMAKE_MAC_SDK = macosx10.9

INCLUDEPATH += . \
    ../../googletest/ \
    ../../googletest/include/ \
    ../../sgcc/include/ \

SOURCES += \
    ../../googletest/src/gtest-all.cc \
    ../../googletest/src/gtest_main.cc \
    ../test/smartptr_test.cc \
#    ../test/noninherited_test.cc \
    ../test/noncopyable_test.cc \
#    ../test/null_ptr_test.cc \
    ../test/converter_test.cc \
    ../test/cpp_test.cc \
#    ../test/stringextensions_test.cc \
    cpptesthelper.cpp \

HEADERS += \
    ../../sgcc/include/boundedpqueue.hpp \
    ../../sgcc/include/checked_delete.hpp \
    ../../sgcc/include/fifoqueue.hpp \
    ../../sgcc/include/minstack.hpp \
    ../../sgcc/include/next_prior.hpp \
    ../../sgcc/include/noncopyable.hpp \
#    ../../sgcc/include/noninherited.hpp \
#    ../../sgcc/include/null_ptr.hpp \
    ../../sgcc/include/scoped_array.hpp \
    ../../sgcc/include/converter.hpp \
    ../../sgcc/include/scoped_ptr.hpp \
    ../../sgcc/include/sgcc.hpp \
    ../../sgcc/include/shared_array.hpp \
    ../../sgcc/include/shared_count.hpp \
    ../../sgcc/include/shared_ptr.hpp \
    ../../sgcc/include/singleton.hpp \
    ../../sgcc/include/smart_bag.hpp \
#    ../../sgcc/include/stringextensions.hpp \
    ../../sgcc/include/weak_ptr.hpp \
    cpptesthelper.h


