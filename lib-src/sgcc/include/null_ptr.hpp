#ifndef NULL_PTR_HPP
#define NULL_PTR_HPP

const class nullptr_t_t
{
  public:
    template<class T>
    operator T*() const {
        return 0;
    }

    template<class C, class T>
    operator T C::*() const {
        return 0;
    }

  private:
    void operator& () const;

} nullptr_t = {};

#undef NULL
#define NULL nullptr_t

#endif // NULL_PTR_HPP
