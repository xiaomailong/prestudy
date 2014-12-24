//  Copyright 2012 sgcc xj group

#include <iostream>
#include <vector>

//#include <boost/noncopyable.hpp>
//#include <boost/shared_ptr.hpp>
//#include <boost/weak_ptr.hpp>

#include <sgcc.hpp>
//#include <vc6test.hpp>

#include "cpptesthelper.h"

using namespace std;
//using namespace boost;
using namespace sgcc;

// Parent Child test -------------------------------------------------------------------
class Parent;
typedef shared_ptr <Parent> ParentPtr;

class Child : noncopyable
{
  public:
    explicit Child(const ParentPtr& myMom_, const ParentPtr& myDad_)
                 : myMom(myMom_), myDad(myDad_)
    {
        cout << " Child ctor: " << this << endl;
    }

    ~Child(){
        cout << " Child dtor: " << this << endl;
    }

  private:
    weak_ptr<Parent> myMom;
    weak_ptr<Parent> myDad;
};

typedef shared_ptr<Child> ChildPtr;

class Parent : noncopyable
{
  public:
    Parent(){
        cout << " Parent ctor: " << this << endl;
    }

    ~Parent(){
        cout << " Parent dtor: " << this << endl;
    }

    void setSpouser(const ParentPtr& spouser){
        mySpouser = spouser;
    }

    void addChild(const ChildPtr& child){
        myChildren.push_back(child);
    }

  private:
    weak_ptr<Parent> mySpouser;
    vector<ChildPtr> myChildren;
};

class Logger : public Singleton <Logger>
{
    friend class Singleton<Logger> ;    // 这里再设置友元函数
  private:
    Logger(){
        m_Value = 0;
        cout << " Logger ctor: " << this << endl;
    }
    ~Logger(){
        cout << " Logger dtor: " << this << endl;
    }

  public:
    int getValue()
    {
        return ++m_Value;
    }
  private:
    int m_Value;
};

class Logger2 : public Singleton <Logger2>
{
    friend class Singleton<Logger2> ;    // 这里再设置友元函数
  private:
    Logger2(){
        m_Value = 0;
        cout << " Logger2 ctor: " << this << endl;
    }
    ~Logger2(){
        cout << " Logger2 dtor: " << this << endl;
    }

  public:
    int getValue()
    {
        return ++m_Value;
    }
  private:
    int m_Value;
};

int main( int argc, char * argv[] )
{
    ObjectTestHelper * object1 = new ObjectTestHelper();
    scoped_ptr<ObjectTestHelper> sop1(object1);
    //EXPECT_EQ( object1, sop1.get() );
    sop1->Value = 100;
    //EXPECT_EQ( sop1->Value, 100 );
    //EXPECT_EQ( object1->Value, 100 );
    sop1.reset(new ObjectTestHelper());
//    cout << "reset; sop1: " << *sop1 << "\tobject1: " << *object1 << endl;
    //EXPECT_EQ( sop1->Value, 0 );
    //EXPECT_NE( object1->Value, 100 );
    //EXPECT_NE( object1, sop1.get() );

    shared_ptr<Parent> mom(new Parent);
//    EXPECT_EQ( mom.use_count(), 1 );
    shared_ptr<Parent> dad(new Parent);
//    EXPECT_EQ( dad.use_count(), 1 );
    mom->setSpouser(dad);
//    EXPECT_EQ( dad.use_count(), 1 );
    dad->setSpouser(mom);
//    EXPECT_EQ( mom.use_count(), 1 );
    for (int i = 0; i < 5; ++i)
    {
        shared_ptr<Child> child(new Child(mom, dad));
//        EXPECT_EQ( mom.use_count(), 1 );
//        EXPECT_EQ( dad.use_count(), 1 );
//        EXPECT_EQ( child.use_count(), 1 );
        mom->addChild(child);
//        EXPECT_EQ( child.use_count(), 2 );
        dad->addChild(child);
//        EXPECT_EQ( child.use_count(), 3 );
    }
//    EXPECT_EQ( mom.use_count(), 1 );
//    EXPECT_EQ( dad.use_count(), 1 );

//    MinQueue<int> queue;
//    queue.enqueue(1);
//    queue.enqueue(3);
//    queue.enqueue(2);
//    queue.enqueue(5);
//    queue.enqueue(4);
////    EXPECT_EQ(queue.front(), 1);
//    queue.dequeue();
////    EXPECT_EQ(queue.front(), 3);
//    queue.dequeue();
////    EXPECT_EQ(queue.front(), 2);
//    queue.dequeue();
//    queue.enqueue(12);
////    EXPECT_EQ(queue.front(), 5);
//    queue.dequeue();
////    EXPECT_EQ(queue.front(), 4);
//    queue.dequeue();
////    EXPECT_EQ(queue.front(), 12);
////    EXPECT_EQ(queue.empty(), false);
//    queue.dequeue();
////    EXPECT_EQ(queue.empty(), true);

    Logger& log1 = Logger::GetInstance();
    Logger& log2 = Logger::GetInstance();
    Logger2& log3 = Logger2::GetInstance();
//    EXPECT_EQ(1, log1.getValue());
//    EXPECT_EQ(2, log2.getValue());
//    EXPECT_EQ(3, log1.getValue());
//    EXPECT_EQ(4, log2.getValue());
    return 0;
}
