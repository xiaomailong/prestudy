#ifndef STRINGEXTENSIONS_HPP
#define STRINGEXTENSIONS_HPP

#include <string>
#include <stdio.h>
#include <iostream>
#include <stdarg.h>

using namespace std;

template<typename _CharT, typename _Traits, typename _Alloc>
class SString: public basic_string<_CharT, _Traits, _Alloc>
{
  public:
    typedef typename _Alloc::template rebind<_CharT>::other _CharT_alloc_type;

    typedef typename _CharT_alloc_type::size_type size_type;

    static const size_type npos = static_cast<size_type> (-1);

    inline SString()
        : basic_string<_CharT, _Traits, _Alloc> () {
    }

    explicit SString(const _Alloc& __a)
        : basic_string<_CharT, _Traits, _Alloc> () {
    }

    SString(const SString& __str)
        : basic_string<_CharT, _Traits, _Alloc> (__str) {
    }

    SString(const SString& __str, size_type __pos, size_type __n = npos)
        : basic_string<_CharT, _Traits, _Alloc> (__str, __pos, npos) {
    }

    SString(const SString& __str, size_type __pos, size_type __n, const _Alloc& __a)
        : basic_string<_CharT, _Traits, _Alloc> (__str, __pos, __n, __a) {
    }

    SString(const _CharT* __s, size_type __n, const _Alloc& __a = _Alloc())
        : basic_string<_CharT, _Traits, _Alloc> (__s, __n, __a) {
    }

    SString(const _CharT* __s, const _Alloc& __a = _Alloc())
        : basic_string<_CharT, _Traits, _Alloc> (__s, __a) {
    }

    SString(size_type __n, _CharT __c, const _Alloc& __a = _Alloc())
        : basic_string<_CharT, _Traits, _Alloc> (__n, __c, __a) {
    }

    template<class _InputIterator>
    SString(_InputIterator __beg, _InputIterator __end, const _Alloc& __a = _Alloc())
        : basic_string<_CharT, _Traits, _Alloc> (__beg, __end, __a) {
    }

    SString& operator=(const SString& __str) {
        return this->assign(__str);
    }

    SString& operator=(const _CharT* __s) {
        return this->assign(__s);
    }

    SString& operator=(_CharT __c) {
        this->assign(1, __c);
        return *this;
    }

    inline SString &Format(const char *_format, ...) {
        char szBuffer[1000];
        memset(szBuffer, 0x00, sizeof(szBuffer));

        va_list ap;
        va_start(ap, _format);

        try {
            vsnprintf(szBuffer, 1000, _format, ap);
        }
        catch (...) {
            cout << "ERROR: format the string failed..." << endl;
            return *this;
        }

        va_end(ap);
        this->append(szBuffer);
        return *this;
    }

};
typedef SString<char, char_traits<char> , allocator<char> > CString;


#endif // STRINGEXTENSIONS_HPP
