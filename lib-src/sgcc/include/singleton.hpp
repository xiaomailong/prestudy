//  Copyright 2012 sgcc xj group

#ifndef SINGLETON_HPP
#define SINGLETON_HPP

#include <stdlib.h>
#include <noncopyable.hpp>
#include <qmutex.h>

namespace sgcc {

template <typename T>
class Singleton: public noncopyable {
  private:
    static void CreateIfNotExist()
    {
        if (!instance_) {
            QMutexLocker locker(&mutex_);
            if (!instance_) {
                instance_ = new T();
                atexit(destroy);
            }
        }
    }

    static void destroy()
    {
//        std::cout << " Singleton destroy: " << instance_ << std::endl;
        delete instance_;
    }

  protected:
    Singleton()
    {
//        std::cout << " Singleton ctor: " << this << std::endl;
    }
    virtual ~Singleton()
    {
//        std::cout << " Singleton dtor: " << this << std::endl;
    }

  public:
    static T& GetInstance()
    {
        CreateIfNotExist();
        return *instance_;
    }

    static T* GetInstancePtr()
    {
        CreateIfNotExist();
        return instance_;
    }

  private:
    static T* instance_;
    static QMutex mutex_;
}; // class Singleton

template<typename T>
T* Singleton<T>::instance_ = NULL;

template<typename T>
QMutex Singleton<T>::mutex_;

}  // namespace sgcc

#endif  // SINGLETON_HPP
