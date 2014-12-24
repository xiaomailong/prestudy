// Copyright 2012 sgcc xj group

#ifndef SMART_BAG_HPP
#define SMART_BAG_HPP

#include <shared_ptr.hpp>

#include <vector>
#include <algorithm>

namespace sgcc {

template<typename T>
class SmartBag {
  public:
    typedef double (*SmartBagParamFunction)(T* t);

  public:
    SmartBag(double capacity, SmartBagParamFunction function)
        : capacity_(capacity), param_function_(function)
    {
        totle_weight_ = 0.0;
    }

    ~SmartBag() {}

    bool PushMaterial(T* ptr)
    {
        if ((totle_weight_ + param_function_(ptr)) <= capacity_) {
            totle_weight_ += param_function_(ptr);
            ptr_array_.push_back(ptr);
            return true;
        } else {
            return false;
        }
    }

    int Size() { return ptr_array_.size(); }

    T* GetMaterial(int index) { return ptr_array_.at(index); }

    double capacity() const { return capacity_; }

    double totle_weight() const { return totle_weight_; }

    void PushVector(const std::vector<T*> array)
    {
        totle_weight_ = 0.0;
        ptr_array_.clear();
        bool is_not_overflow = true;

        int length = array.size();
        int* elements = new int[length];

        std::vector< sgcc::shared_ptr<SmartBag> > bag_array;

        for (int i = 0; i < length; ++i)
        {
            elements[i] = 1;
            std::vector<int> selectors(elements, elements + length);

            do {
                sgcc::shared_ptr<SmartBag> new_bag(new SmartBag(capacity_, param_function_));
                for (size_t j = 0; j < selectors.size(); ++j) {
                    if (1 == selectors[j]) {
                        is_not_overflow = new_bag->PushMaterial(array[j]);
                    }
                }
                if (new_bag->Size() > 0) {
                    bag_array.push_back(new_bag);
                }
            } while (prev_permutation(selectors.begin(), selectors.end()));

            sort(bag_array.begin(), bag_array.end(), SmartBag::CompareBag);
            while (bag_array.size() > 1) {
                bag_array.pop_back();  // only leave the largest one
            }

            if (!is_not_overflow) {
                break;
            }
        }

        delete[] elements;
        if (bag_array.size() > 0) {
            for (int k = 0; k < bag_array.front()->Size(); ++k) {
                PushMaterial(bag_array.front()->GetMaterial(k));
            }
        }
    }

    static bool CompareBag(sgcc::shared_ptr<SmartBag> b1, sgcc::shared_ptr<SmartBag> b2)
    {
         return (b1->totle_weight()) > (b2->totle_weight());
    }

  private:
    double totle_weight_;
    double capacity_;
    std::vector<T*> ptr_array_;
    SmartBagParamFunction param_function_;
};

}  // namespace xjcc

#endif  // SMART_BAG_HPP
