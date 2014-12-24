// Copyright 2012 sgcc Bolik

#ifndef CPPTESTHELPER_H
#define CPPTESTHELPER_H

#include <iostream>
#include <vector>

class ObjectTestHelper {
  public:
    ObjectTestHelper() {
        this->iCreatedType = 0;
        this->Value = 0;
        std::cout << " Default ctor: " << this << std::endl;
    }

    ObjectTestHelper(const ObjectTestHelper & copyObject) {
        this->iCreatedType = 1;
        this->Value = copyObject.Value;
        std::cout << " Copy    ctor: " << this << "\t(Copy by (&" << &copyObject
                  << " v: " << copyObject.Value << ")" << std::endl;
    }

    ObjectTestHelper& operator = (const ObjectTestHelper & copyObject) {
        this->iCreatedType = 2;
        this->Value = copyObject.Value;
        std::cout << " ==      ctor: " << this << "\t(Copy by " << &copyObject
                  << " v: " << copyObject.Value << ")" << std::endl;
        return *this;
    }

    ~ObjectTestHelper() {
        switch (iCreatedType) {
            case 0:  std::cout << " Default dtor: " << this << std::endl; break;
            case 1:  std::cout << " Copy    dtor: " << this << std::endl; break;
            case 2:  std::cout << " ==      dtor: " << this << std::endl; break;
            default: std::cout << " Can not be here. " << this << std::endl;
                break;
        }
    }

  public:
    void writeTo(std::ostream& os) const {
        os << "(&" << this << " v: " << this->Value << ")";
    }

  public:
    int Value;

  private:
    int iCreatedType;
};
std::ostream& operator<<(std::ostream& os, const ObjectTestHelper& objHelper);

#define PrintExpression(Expression) std::cout << #Expression << ": " \
                                              << Expression << std::endl;

#endif  // CPPTESTHELPER_H
