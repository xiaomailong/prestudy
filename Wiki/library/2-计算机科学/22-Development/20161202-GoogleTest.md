---
layout: post
title: GoogleTest
lead: Google C++单元测试框架
date: 2016-12-02T00:00:00.000Z
categories: Development
tagline: Test
tags:
  - C++
  - Test
  - UnitTest
---

# [Google C++单元测试框架GoogleTest---AdvancedGuide（译文）上](http://www.cnblogs.com/jycboy/p/gtest_AdvancedGuide.html)

本文是gtest高级测试指南的译文，由于文章太长，分上下两部分。

## 一、简介

本文档将向您展示更多的断言，以及如何构造复杂的失败消息，传播致命的故障，重用和加速您的测试夹具，并在您的测试使用各种标志。

## 二、更多断言

  本节包括一些不太常用，但仍然重要的断言。

###  2.1 显式成功和失败

这三个断言实际上不测试值或表达式。 相反，它们直接产生成功或失败。 与实际执行测试的宏类似，您可以将自定义失败消息流入它们。

```c++
SUCCEED();  
FAIL(); 
ADD_FAILURE(); 
ADD_FAILURE_AT("file_path", line_number);
```

生成成功。 这不会使整体测试成功。 只有当测试在其执行期间没有任何断言失败时，测试才被认为是成功的。

注意：SUCCEED（）是纯纪录片，目前不生成任何用户可见的输出。 但是，我们可能会在未来向Google Test的输出中添加SUCCEED（）消息。

FAIL（）产生致命故障，而ADD_FAILURE（）和ADD_FAILURE_AT（）产生非致命故障。 当控制流而不是布尔表达式确定测试的成功或失败时，这些是有用的。 例如，您可能想要写如下：

```c++
switch(expression) {
  case 1: ... some checks ...
  case 2: ... some other checks
  ...
  default: FAIL() << "We shouldn't get here.";
}
```

注意：你只能在返回void的函数中使用FAIL（）。 有关详细信息，请参阅 [Assertion Placement section](https://github.com/google/googletest/blob/master/googletest/docs/AdvancedGuide.md#assertion-placement) 部分。

### 2.2 异常断言

这些用于验证一段代码抛出（或不抛出）给定类型的异常：

| Fatal assertion                          | Nonfatal assertion                       | Verifies                                 |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| `ASSERT_THROW(`*statement*, *exception_type*`);` | `EXPECT_THROW(`*statement*, *exception_type*`);` | *statement* throws an exception of the given type |
| `ASSERT_ANY_THROW(`*statement*`);`       | `EXPECT_ANY_THROW(`*statement*`);`       | *statement* throws an exception of any type |
| `ASSERT_NO_THROW(`*statement*`);`        | `EXPECT_NO_THROW(`*statement*`);`        | *statement* doesn't throw any exception  |

Examples:

```c++
ASSERT_THROW(Foo(5), bar_exception);
 
EXPECT_NO_THROW({
  int n = 5;
  Bar(&n);
});　　
```

## 三、更好的错误消息的谓词断言

虽然Google测试有一套丰富的断言，但它们永远不可能完整，因为它不可能（也不是一个好主意）预测用户可能遇到的所有情况。 因此，有时用户必须使用EXPECT_TRUE（）来检查复杂表达式，因为缺少更好的宏。 这有一个问题，没有显示你的表达式的部分的值，使得很难理解什么错误。 作为解决方法，一些用户选择自己构造失败消息，将其流式传输到EXPECT_TRUE（）。 然而，这是尴尬，特别是当表达式有副作用或评价昂贵。

Google测试提供三种不同的选项来解决这个问题：

###  3.1使用现有的布尔函数

如果你已经有一个函数或函数返回bool（或一个可以隐式转换为bool的类型），你可以在谓词断言中使用它来获得免费打印的函数参数：

| Fatal assertion                        | Nonfatal assertion                     | Verifies                         |
| -------------------------------------- | -------------------------------------- | -------------------------------- |
| `ASSERT_PRED1(`*pred1, val1*`);`       | `EXPECT_PRED1(`*pred1, val1*`);`       | *pred1(val1)* returns true       |
| `ASSERT_PRED2(`*pred2, val1, val2*`);` | `EXPECT_PRED2(`*pred2, val1, val2*`);` | *pred2(val1, val2)* returns true |
| ...                                    | ...                                    | ...                              |

在上面，predn是一个n元谓词函数或函子，其中val1，val2，...和valn是它的参数。 如果谓词在应用于给定参数时返回true，则断言成功，否则失败。 当断言失败时，它打印每个参数的值。 在任何一种情况下，参数只计算一次。

Here's an example：

```c++
// Returns true iff m and n have no common divisors except 1.
bool MutuallyPrime(int m, int n) { ... }
const int a = 3;
const int b = 4;
const int c = 10;
```

断言EXPECT_PRED2（Mutual Prime，a，b）; 将成功，而断言EXPECT_PRED2（MutuallyPrime，b，c）; 将失败。

```c++
!MutuallyPrime(b, c) is false, where
 
b is 4
 
c is 10　
```

**注意：**

 1. 如果在使用ASSERT_PRED *或EXPECT_PRED *时看到编译器错误“**no matching function to call**(无匹配函数调用)”，请参阅此常见问题解答 [this FAQ](https://github.com/google/googletest/blob/master/googletest/docs/FAQ.md#the-compiler-complains-no-matching-function-to-call-when-i-use-assert_predn-how-do-i-fix-it) 以了解如何解决它。
 2. 目前我们只提供arity <= 5的谓词断言。如果你需要更高级的断言，让我们知道。

### 3.2 使用返回AssertionResult的函数

虽然EXPECT_PRED *（）和friends对快速工作很方便，但是语法不令人满意：你必须使用不同的宏不同的arities，它感觉更像Lisp而不是C ++。 :: testing :: AssertionResult类解决了这个问题。

AssertionResult对象表示断言的结果（无论它是成功还是失败，以及相关联的消息）。 您可以使用以下工厂函数之一创建AssertionResult：

```c++
namespace testing {
 
// Returns an AssertionResult object to indicate that an assertion has succeeded.
AssertionResult AssertionSuccess();
 
// Returns an AssertionResult object to indicate that an assertion has failed.
AssertionResult AssertionFailure();
 
}
```

然后，您可以使用<<运算符将消息流式传输到AssertionResult对象。

要在布尔断言（例如EXPECT_TRUE（））中提供更多可读消息，请编写一个返回AssertionResult而不是bool的谓词函数。 例如，如果您将IsEven（）定义为：

```c++
::testing::AssertionResult IsEven(int n) {
  if ((n % 2) == 0)
    return ::testing::AssertionSuccess();
  else
    return ::testing::AssertionFailure() << n << " is odd";
}
```

而不是：

```c++
bool IsEven(int n) {
  return (n % 2) == 0;
}
```

　　the failed assertion `EXPECT_TRUE(IsEven(Fib(4)))` will print:

```c++
Value of: IsEven(Fib(4))
 
Actual: false (*3 is odd*)
 
Expected: true
```

　　instead of a more opaque：

```c++
Value of: IsEven(Fib(4))
 
Actual: false
 
Expected: true
```

　　如果您希望在EXPECT FALSE和ASSERT_FALSE中看到提供信息的消息，并且在成功的情况下使谓词变慢，您可以提供一个成功消息：

```c++
::testing::AssertionResult IsEven(int n) {
  if ((n % 2) == 0)
    return ::testing::AssertionSuccess() << n << " is even";
  else
    return ::testing::AssertionFailure() << n << " is odd";
}
```

　　Then the statement `EXPECT_FALSE(IsEven(Fib(6)))` will print

```c++
Value of: IsEven(Fib(6))
 
Actual: true (8 is even)
 
Expected: false
```

### 3.3 使用谓词格式化

   如果你发现由（ASSERT | EXPECT）_PRED *和（ASSERT | EXPECT）_（TRUE | FALSE）生成的默认消息不令人满意，或者您的谓词的某些参数不支持流到ostream，您可以使用以下谓词 - 格式化程序断言 以完全自定义消息的格式化：

| Fatal assertion                          | Nonfatal assertion                       | Verifies                                 |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| `ASSERT_PRED_FORMAT1(`*pred_format1, val1*`);` | `EXPECT_PRED_FORMAT1(`*pred_format1, val1*`);` | *pred_format1(val1)* is successful       |
| `ASSERT_PRED_FORMAT2(`*pred_format2, val1, val2*`);` | `EXPECT_PRED_FORMAT2(`*pred_format2, val1, val2*`);` | *pred_format2(val1, val2)* is successful |
| `...`                                    | `...`                                    | `...`                                    |

这和前两组宏的区别是，不是一个谓词，（ASSERT | EXPECT）_PRED_FORMAT *采用谓词格式化器（pred_formatn），它是一个函数或函数签名：

```c++
::testing::AssertionResult PredicateFormattern(const char*expr1, const char*expr2, ... const char*exprn, T1val1, T2val2, ... Tnvaln);
```

## 四、浮点比较

比较浮点数是棘手的。 由于舍入误差，两个浮点不太可能完全匹配。 因此，ASSERT_EQ的幼稚比较通常不起作用。 并且由于浮点可以具有宽的值范围，没有单个固定误差界限工作。 最好通过固定的相对误差界限进行比较，除了接近0的值由于精度的损失。

一般来说，对于浮点比较有意义，用户需要仔细选择误差界限。 如果他们不想要或关心，根据最后地点（ULP）中的单位进行比较是一个很好的默认值，Google测试提供了断言来做到这一点。 关于ULP的完整详细信息相当长; 如果你想了解更多，请参阅这篇关于浮动比较的文章 [this article on float comparison](http://www.cygnus-software.com/papers/comparingfloats/comparingfloats.htm).。

### Floating-Point Macros

| Fatal assertion                     | Nonfatal assertion                  | Verifies                                 |
| ----------------------------------- | ----------------------------------- | ---------------------------------------- |
| `ASSERT_FLOAT_EQ(`*val1, val2*`);`  | `EXPECT_FLOAT_EQ(`*val1, val2*`);`  | the two `float` values are almost equal  |
| `ASSERT_DOUBLE_EQ(`*val1, val2*`);` | `EXPECT_DOUBLE_EQ(`*val1, val2*`);` | the two `double` values are almost equal |

“几乎相等”是指两个值彼此在4个ULP内。

以下断言允许您选择可接受的误差界限：

| Fatal assertion                          | Nonfatal assertion                       | Verifies                                 |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| `ASSERT_NEAR(`*val1, val2, abs_error*`);` | `EXPECT_NEAR`*(val1, val2, abs_error*`);` | the difference between *val1* and *val2* doesn't exceed the given absolute error |

。。。。太多，需要时再去看。

## 五、Windows HRESULT断言

这些断言测试HRESULT成功或失败。

| Fatal assertion                          | Nonfatal assertion                       | Verifies                            |
| ---------------------------------------- | ---------------------------------------- | ----------------------------------- |
| `ASSERT_HRESULT_SUCCEEDED(`*expression*`);` | `EXPECT_HRESULT_SUCCEEDED(`*expression*`);` | *expression* is a success `HRESULT` |
| `ASSERT_HRESULT_FAILED(`*expression*`);` | `EXPECT_HRESULT_FAILED(`*expression*`);` | *expression* is a failure `HRESULT` |

生成的输出包含与expression返回的HRESULT代码相关联的人工可读错误消息。

You might use them like this:

```c++
CComPtr shell;
ASSERT_HRESULT_SUCCEEDED(shell.CoCreateInstance(L"Shell.Application"));
CComVariant empty;
ASSERT_HRESULT_SUCCEEDED(shell->ShellExecute(CComBSTR(url), empty, empty, empty, empty));
```

## 六、类型断言

```c++
::testing::StaticAssertTypeEq<T1, T2>();
```

您可以调用该函数，来声称断言类型T1和T2是相同的。 如果满足断言，该函数不执行任何操作。 如果类型不同，函数调用将无法编译，编译器错误消息（取决于编译器）将显示T1和T2的实际值。 这主要在**模板代码**中有用。

注意：当在类模板或函数模板的成员函数中使用时，StaticAssertTypeEq <T1，T2>（）仅在函数实例化时有效。 例如，给定：

```c++
template <typename T> class Foo {
 public:
  void Bar() { ::testing::StaticAssertTypeEq<int, T>(); }
};
```

the code:

```c++
void Test1() { Foo<bool> foo; }
```

将不会生成编译器错误，因为Foo <bool> :: Bar（）永远不会实际实例化。 相反，您需要：

```c++
void Test2() { Foo<bool> foo; foo.Bar(); }
```

导致编译器错误。

## 七、Assertion Placement（断言放置）

你可以在任何C ++函数中使用断言。 特别地，它不必是测试夹具类的方法。 一个约束是**生成致命故障（FAIL \*和ASSERT_ *）的断言只能在void返回函数中使用**。 这是Google测试不使用exceptions的后果。 如果将它放在一个非void函数中，你会得到一个令人困惑的编译错误，如“error: void value not ignored as it ought to be”。

如果需要在返回非void的函数中使用断言，一个选项是使函数返回out参数中的值。 例如，您可以将T2 Foo（T1 x）重写为void Foo（T1 x，T2 * result）。 你需要确保* result包含一些合理的值，即使该函数过早返回。 由于函数现在返回void，你可以在它里面使用任何断言。

如果更改函数的类型不是一个选项，则应该使用生成非致命失败的断言，例如ADD_FAILURE *和EXPECT_ *。

**注意：**根据C ++语言规范，构造函数和析构函数不被视为void返回函数，因此您不能在其中使用致命断言。 如果你尝试，你会得到一个编译错误。 一个简单的解决方法是将构造函数或析构函数的整个体转移到私有void返回方法。 然而，你应该意识到，构造函数中的致命断言失败并不会终止当前的测试，正如你的直觉所暗示的那样; 它只是从构造函数早期返回，可能使您的对象处于部分构造状态。 同样，析构函数中的致命断言失败可能使您的对象处于部分破坏状态。 在这些情况下仔细使用断言！

## 八、教学Google测试如何打印您的值

当测试声明（如EXPECT_EQ）失败时，Google Test会打印参数值以帮助您调试。 它使用用户可扩展值打印机。

此打印机知道如何打印内置的C ++类型，native数组，STL容器和任何支持<<运算符的类型。 对于其他类型，它打印值中的原始字节，并希望用户可以计算出来。

如前所述，打印机是可扩展的。 这意味着你可以教它做一个更好的工作，打印你的特定类型，而不是转储字节。 要做到这一点，定义<<您的类型：

```c++
#include <iostream>
 
namespace foo {
 
class Bar { ... };  // We want Google Test to be able to print instances of this.
 
// It's important that the << operator is defined in the SAME
// namespace that defines Bar.  C++'s look-up rules rely on that.
::std::ostream& operator<<(::std::ostream& os, const Bar& bar) {
  return os << bar.DebugString();  // whatever needed to print bar to os
}
 
}  // namespace foo
```

有时，这可能不是一个选项：你的团队可能认为它的坏风格有一个<<运算符的Bar，或者Bar可能已经有一个<<运算符，不做你想要的（你不能改变它）。 如果是这样，您可以定义一个PrintTo（）函数，如下所示：

```c++
#include <iostream>
 
namespace foo {
 
class Bar { ... };
 
// It's important that PrintTo() is defined in the SAME
// namespace that defines Bar.  C++'s look-up rules rely on that.
void PrintTo(const Bar& bar, ::std::ostream* os) {
  *os << bar.DebugString();  // whatever needed to print bar to os
}
 
}  // namespace foo　
```

如果您定义了<<和PrintTo（），后者将在Google测试时使用。 这允许您自定义值如何显示在Google测试的输出中，而不影响依赖于其<<运算符的行为的代码。

如果你想使用Google Test的值打印机自己打印一个值x，只需调用:: testing :: PrintToString（x），它返回一个std :: string：

```c++
vector<pair<Bar, int> > bar_ints = GetBarIntVector();
 
EXPECT_TRUE(IsCorrectBarIntVector(bar_ints))
    << "bar_ints = " << ::testing::PrintToString(bar_ints);
```

## Extending Google Test by Handling Test Events

这个挺复杂，写在单独的文档中: [http://www.cnblogs.com/jycboy/p/gtest_handlingEvent.html](http://www.cnblogs.com/jycboy/p/gtest_handlingEvent.html)

# [Google C++单元测试框架GoogleTest---AdvancedGuide（译文）下](http://www.cnblogs.com/jycboy/p/AdvancedGuide2.html)

## 一、在子程序中使用断言(Using Assertions in Sub-routines)

### 1.1 将跟踪添加到断言

如果从几个地方调用测试子程序，当其中的断言失败时，可能很难判断失败来自哪个子程序的调用。 您可以使用额外的日志或自定义失败消息缓解这个问题，但通常会堵塞您的测试。 更好的解决方案是使用SCOPED_TRACE宏：

```c++
SCOPED_TRACE(message);
```

messsage可以是任何可以流入std::ostream的东西。此宏会将当前文件名、行号和给定消息添加到每个失败消息中。 当控件离开当前词法作用域时，效果将被撤消。

For example,

```c++
 void Sub1(int n) {
   EXPECT_EQ(1, Bar(n));
   EXPECT_EQ(2, Bar(n + 1));
 }

 TEST(FooTest, Bar) {
   {
     SCOPED_TRACE("A");  // This trace point will be included in
                         // every failure in this scope.
     Sub1(1);
   } //到这SCOPED_TRACE的作用域就结束。
   // Now it won't.
   Sub1(9); //都调用了子程序Sub1
 }
```

可能会导致这样的消息：

```
path/to/foo_test.cc:11: Failure
Value of: Bar(n)
Expected: 1
  Actual: 2
   Trace:
path/to/foo_test.cc:17: A

path/to/foo_test.cc:12: Failure
Value of: Bar(n + 1)
Expected: 2
  Actual: 3
```

没有跟踪，很难知道两个失败分别来自哪个Sub1（）的调用。 （你可以在Sub1（）中为每个断言添加一个额外的消息，以指示n的值，但这很乏味。）

关于使用SCOPED_TRACE的一些提示：

没有跟踪，很难知道两个失败分别来自哪个Sub1（）的调用。 （你可以在Sub1（）中为每个断言添加一个额外的消息，以指示n的值，但这很乏味。）

关于使用SCOPED_TRACE的一些提示：

- 使用合适的消息，通常足以在子例程的开头使用SCOPED_TRACE，而不是在每个调用站点。
- 当调用循环内的子例程时，使循环迭代器成为SCOPED_TRACE中的消息的一部分，以便您可以知道失败来自哪个迭代。
- 有时，跟踪点的行号足以识别子例程的特定调用。在这种情况下，您不必为SCOPED_TRACE选择唯一的消息。你可以简单地使用“”。
- 当外部作用域中有一个SCOPED_TRACE时，可以在内部作用域中使用SCOPED_TRACE。在这种情况下，所有活动跟踪点将按照遇到的相反顺序包含在失败消息中。
- 跟踪转储是可以在Emacs的编译缓冲区中点击 - 命中返回行号，你会被带到源文件中的那一行！

### 1.2 传播致命失败

使用ASSERT_ *和FAIL *时的**常见陷阱**认为当它们失败时，它们会中止整个测试。 例如，以下测试将会导致错误：

```c++
void Subroutine() {
  // Generates a fatal failure and aborts the current function.
  ASSERT_EQ(1, 2);//失败时只是终止当前函数
  // The following won't be executed.
  ...
}

TEST(FooTest, Bar) {
  Subroutine();
  // The intended behavior is for the fatal failure
  // in Subroutine() to abort the entire test.
  // The actual behavior: the function goes on after Subroutine() returns.
  //  实际行为：函数在Subroutine（）返回后继续。
  int* p = NULL;
  *p = 3; // Segfault!产生一个错误
}　
```

由于我们不使用异常，因此在技术上不可能在这里实现预期的行为。 为了减轻这种情况，Google测试提供了两种解决方案。 您可以使用（ASSERT | EXPECT）_NO_FATAL_FAILURE断言或HasFatalFailure（）函数。 它们在以下两个小节中描述。

### 1.3在子程序中的断言（Asserting on Subroutines）

如上所示，如果你的测试调用了一个有ASSERT_ *失败的子程序，测试将在子程序返回后继续。 这可能不是你想要的。

通常人们希望致命的失败传播像异常一样。 为此，Google测试提供以下宏：

| Fatal assertion                          | Nonfatal assertion                       | Verifies                                 |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| `ASSERT_NO_FATAL_FAILURE(`*statement*`);` | `EXPECT_NO_FATAL_FAILURE(`*statement*`);` | *statement* doesn't generate any new fatal failures in the current thread. |

仅检查执行断言的线程中的失败，以确定这种类型的断言的结果。 如果语句创建新线程，这些线程中的失败将被忽略。

例如:

```c++
ASSERT_NO_FATAL_FAILURE(Foo());

int i;
EXPECT_NO_FATAL_FAILURE({
  i = Bar();
});　
```

### 1.4检查当前测试中的故障

  :: test :: Test类中的HasFatalFailure（）: 如果当前测试中的断言遭遇致命故障，则返回true。 这允许函数捕获子例程中的致命故障并及早返回。

```c++
class Test {
 public:
  ...
  static bool HasFatalFailure();
};
```

典型的用法，基本上模拟抛出的异常的行为是：

```c++
TEST(FooTest, Bar) {  
    Subroutine();  // Aborts if Subroutine() had a fatal failure. 
   if (HasFatalFailure())    
     return;  
   // The following won't be executed. 
   ...
}
```

HasFatalFailure如果在TEST（），TEST_F（）或测试夹具之外使用，则必须添加:: testing :: Test ::前缀，如：　

```c++
if (::testing::Test::HasFatalFailure())
  return;
```

类似的，HasNonfatalFailure()：如果当前测试至少有一个非致命失败，返回true。

`HasFailure()` ：如果当前测试至少有一个失败，返回true。

## 二、记录其他信息Logging Additional Information

在测试代码中，可以调用RecordProperty（“key”，value）来记录附加信息，其中value可以是字符串或int。 如果指定一个键，则为键记录的最后一个值将发送到XML输出。

例如

```c++
TEST_F(WidgetUsageTest, MinAndMaxWidgets) {
  RecordProperty("MaximumWidgets", ComputeMaxUsage());
  RecordProperty("MinimumWidgets", ComputeMinUsage());
}
```

will output XML like this:

```
...
  <testcase name="MinAndMaxWidgets" status="run" time="6" classname="WidgetUsageTest"
            MaximumWidgets="12"
            MinimumWidgets="9" />
...
```

注意：

- RecordProperty（）是Test类的静态成员。 因此，**如果在TEST体和测试夹具类之外使用，则需要使用前缀:: testing :: Test ::**。
- 键必须是有效的XML属性名称，且不能与Google Test（名称，状态，时间，类名，类型_参数和值_参数）已使用的键冲突。
- 允许在测试的生命周期之外调用RecordProperty（）。 如果它在测试之外调用，但在测试用例的SetUpTestCase（）和TearDownTestCase（）方法之间调用，它将被归因于测试用例的XML元素。 如果在所有测试用例之外调用（例如在测试环境中），它将被归因于顶级XML元素。

## 三、在同一测试用例中的测试之间共享资源

Google Test为每个测试创建一个新的测试夹具对象，以使测试独立，更容易调试。 然而，有时测试使用昂贵的资源设置，使得单拷贝测试模型过于昂贵。

如果测试不更改资源，则它们在共享单个资源副本中没有任何危害。 因此，除了每次测试的set-up/tear-down，Google测试还支持每个**测试用例**的set-up/tear-down。 使用它：

- 在你的测试夹具类（比如FooTest）中，定义一些成员变量来保存共享资源。
- 在同一个测试夹具类中，定义一个静态void SetUpTestCase（）函数（**记住不要拼写它作为一个小u的SetupTestCase**）来设置共享资源和静态void TearDownTestCase（）函数来删除它们。

OK！ 在运行FooTest测试用例中的第一个测试（即在创建第一个FooTest对象之前）之前，Google Test自动调用SetUpTestCase（），并在运行最后一个测试之后（即删除最后一个FooTest对象后）调用TearDownTestCase（）。 在其间，测试可以使用共享资源。

记住测试顺序是未定义的，所以你的代码不能依赖于另一个之前或之后的测试。 此外，**测试必须不能修改任何共享资源的状态，或者，如果它们修改状态，则它们必须在将控制传递给下一个测试之前将状态恢复到其原始值。**

Here's an example of per-test-case set-up and tear-down:

```c++
class FooTest : public ::testing::Test {
 protected:
  // Per-test-case set-up.
  // Called before the first test in this test case.
  // Can be omitted if not needed.
  static void SetUpTestCase() {
    shared_resource_ = new ...;
  }

  // Per-test-case tear-down.
  // Called after the last test in this test case.
  // Can be omitted if not needed.
  static void TearDownTestCase() {
    delete shared_resource_;
    shared_resource_ = NULL;
  }

  // You can define per-test set-up and tear-down logic as usual.
  virtual void SetUp() { ... }
  virtual void TearDown() { ... }

  // Some expensive resource shared by all tests.
  static T* shared_resource_;
};

T* FooTest::shared_resource_ = NULL;

TEST_F(FooTest, Test1) {
  ... you can refer to shared_resource here ...
}
TEST_F(FooTest, Test2) {
  ... you can refer to shared_resource here ...
}
```

## 四、Global Set-Up and Tear-Down

正如你可以在测试级别和测试用例级别设置和拆卸，您也可以在测试程序级别执行。

首先，你要继承:: testing :: Environment类来定义一个测试环境：

```c++
class Environment {
 public:
  virtual ~Environment() {}
  // Override this to define how to set up the environment.
  virtual void SetUp() {}
  // Override this to define how to tear down the environment.
  virtual void TearDown() {}
};
```

然后，通过调用:: testing :: Add Global Test Environment（）函数，注册我们的环境类的实例：

```c++
Environment* AddGlobalTestEnvironment(Environment* env);
```

现在，当调用RUN_ALL_TESTS（）时，它首先调用环境对象的SetUp（）方法，然后如果没有致命失败则运行测试，最后调用环境对象的TearDown（）。

注册多个环境对象是可以的。 在这种情况下，他们的SetUp（）将按照它们注册的顺序被调用，并且它们的TearDown（）将以相反的顺序被调用。

请注意，Google测试会对注册的环境对象拥有所有权。 因此，**不要自己删除它们。**

您应该在调用RUN_ALL_TESTS（）之前调用AddGlobalTestEnvironment（），可能在main（）中调用。 如果你使用gtest_main，你需要在main（）启动之前调用它才能生效。 一种方法是定义一个全局变量，如下所示：

```c++
::testing::Environment* const foo_env = ::testing::AddGlobalTestEnvironment(new FooEnvironment);　
```

但是，我们强烈建议您编写自己的main（）并调用AddGlobalTestEnvironment（），因为依赖于全局变量的初始化使代码更难读取，并且可能会导致问题，当您从不同的转换单元注册多个环境， 它们之间的依赖性（记住编译器不保证来自不同转换单元的全局变量的初始化顺序）。

##  五、值参数化测试

//这个功能挺复杂，专门写在一个单独的文档解析：

[ http://www.cnblogs.com/jycboy/p/6118073.html](http://www.cnblogs.com/jycboy/p/6118073.html)

值参数化测试允许您使用不同的参数测试代码，而无需编写同一测试的多个副本。

假设您为代码编写测试，然后意识到您的代码受到布尔参数的影响。

```c++
TEST(MyCodeTest, TestFoo) {
  // A code to test foo().
}
```

通常人们在这种情况下将他们的测试代码考虑为具有布尔参数的函数。 该函数设置标志，然后执行测试代码:

```c++
void TestFooHelper(bool flag_value) {
  flag = flag_value;
  // A code to test foo().
}

TEST(MyCodeTest, TestFoo) {
  TestFooHelper(false);
  TestFooHelper(true);
}
```

但这种设置有严重的缺点。 首先，当测试断言在测试中失败时，不清楚参数的什么值导致它失败。 您可以将澄清消息流式传输到EXPECT / ASSERT语句中，但是您必须对所有这些语句进行。 第二，你必须为每个测试添加一个这样的帮助函数。 如果你有十个测试怎么办？ 二十？ 一百？

值参数化测试将允许您只写一次测试，然后轻松实例化并使用任意数量的参数值运行它。

## 一、如何写值参数化测试

1. 要写值参数化测试，首先应该定义一个fixture类。 它必须继承:: testing :: Test和:: testing :: WithParamInterface <T>（后者是纯粹的接口），其中T是参数值的类型。

   为了方便，你可以从:: testing :: TestWithParam <T>派生fixture类，它本身是从:: testing :: Test和:: testing :: WithParamInterface <T>派生的。 T可以是任何可复制类型。 如果它是一个原始指针，你负责管理指向的值的生命周期。

```c++
class FooTest : public ::testing::TestWithParam<const char*> {
  // You can implement all the usual fixture class members here.
  // To access the test parameter, call GetParam() from class
  // TestWithParam<T>.
};

// Or, when you want to add parameters to a pre-existing fixture class:
class BaseTest : public ::testing::Test {
  ...
};
class BarTest : public BaseTest,
                public ::testing::WithParamInterface<const char*> {
  ...
};
```

2. 告诉gtest你拿到参数的值后，具体做些什么样的测试

   这里，我们要使用一个新的宏（嗯，挺兴奋的）：TEST_P，关于这个"P"的含义，Google给出的答案非常幽默，就是说你可以理解为”parameterized" 或者 "pattern"。我更倾向于 ”parameterized"的解释，呵呵。在TEST_P宏里，使用GetParam()获取当前的参数的具体值。

```c++
TEST_P(FooTest, DoesBlah) {
  // Inside a test, access the test parameter with the GetParam() method
  // of the TestWithParam<T> class:
  //在测试中，使用TestWithParam <T>类的GetParam（）方法访问测试参数：
  int n =  GetParam(); 
  EXPECT_TRUE(IsPrime(n));
  ...
}

TEST_P(FooTest, HasBlahBlah) {
  ...
}
```

3. 您可以使用INSTANTIATE_TEST_CASE_P来实例化具有任何您想要的参数的测试用例。 Google Test定义了一些用于生成测试参数的函数。 它们返回我们所谓的参数生成器（surprise！）。 这里是它们的摘要，它们都在testing命名空间中：

| `Range(begin, end[, step])`              | Yields values `{begin, begin+step, begin+step+step, ...}`. The values do not include `end`. `step` defaults to 1. |
| ---------------------------------------- | ---------------------------------------- |
| `Values(v1, v2, ..., vN)`                | Yields values `{v1, v2, ..., vN}`.       |
| `ValuesIn(container)`and `ValuesIn(begin, end)` | Yields values from a C-style array, an STL-style container, or an iterator range `[begin, end)`. `container`, `begin`, and `end` can be expressions whose values are determined at run time. |
| `Bool()`                                 | Yields sequence `{false, true}`.         |
| `Combine(g1, g2, ..., gN)`               | 这个比较强悍，它将g1,g2,...gN进行排列组合，g1,g2,...gN本身是一个参数生成器，每次分别从g1,g2,..gN中各取出一个值，组合成一个元组(Tuple)作为一个参数。说明：这个功能只在提供了<tr1/tuple>头的系统中有效。gtest会自动去判断是否支持tr/tuple，如果你的系统确实支持，而gtest判断错误的话，你可以重新定义宏GTEST_HAS_TR1_TUPLE=1。See comments in [include/gtest/internal/gtest-port.h](https://github.com/google/googletest/blob/master/googletest/include/gtest/internal/gtest-port.h) for more information. |

有关更多详细信息，请参阅源代码中这些函数的定义中的注释。

以下语句将从FooTest测试用例中实例化测试，每个测试用参数值“meeny”，“miny”和“moe”。

```c++
INSTANTIATE_TEST_CASE_P(InstantiationName,
                        FooTest,
                        ::testing::Values("meeny", "miny", "moe"));
```

为了区分模式的不同实例（是的，您可以多次实例化），

INSTANTIATE_TEST_CASE_P的第一个参数是测试案例的前缀，可以任意取。 

第二个参数是测试案例的名称，需要和之前定义的参数化的类的名称相同，如：IsPrimeParamTest 

第三个参数是可以理解为参数生成器，上面的例子使用test::Values表示使用括号内的参数。Google提供了一系列的参数生成的函数：

请记住为不同的实例化选择唯一的前缀。 从上面的实例化的测试将有这些名称：

- InstantiationName / FooTest.DoesBlah / 0 for“meeny”
- InstantiationName / FooTest.DoesBlah / 1 for“miny”
- InstantiationName / FooTest.DoesBlah / 2 for“moe”
- InstantiationName / FooTest.HasBlahBlah / 0 for“meeny”
- InstantiationName / FooTest.HasBlahBlah / 1 for“miny”
- InstantiationName / FooTest.HasBlahBlah / 2 for“moe”

您可以在[--gtest_filter](https://github.com/google/googletest/blob/master/googletest/docs/AdvancedGuide.md#running-a-subset-of-the-tests).中使用这些名称。

**请注意**，INSTANTIATE_TEST_CASE_P将实例化给定测试用例中的所有测试，无论它们的定义是在INSTANTIATE_TEST_CASE_P语句之前还是之后。

You can see [these](https://github.com/google/googletest/blob/master/googletest/samples/sample7_unittest.cc) [files](https://github.com/google/googletest/blob/master/googletest/samples/sample8_unittest.cc) for more examples. 

## 二、创建值参数化抽象测试

 在上面，我们在同一个源文件中定义和实例化FooTest。有时您可能想在库中定义值参数化测试，并让其他人稍后实例化它们---这种模式称为抽象测试。

作为其应用程序的一个例子，当你设计一个接口时，你可以编写一个标准的抽象测试套件（也许使用一个工厂函数作为测试参数），该接口的所有实现都应该通过。当有人实现该接口时，他可以实例化您的套件以免费获得所有的接口一致性测试。

要定义抽象测试，你应该这样组织你的代码：

1. 将参数化测试夹具类（例如FooTest）的定义放在头文件中，例如foo_param_test.h。这是你抽象测试的声明。
2. 将TEST_P定义放在foo_param_test.cc中，其中include foo_param_test.h。这是你抽象测试的实现。

一旦定义它们，您可以通过包括foo_param_test.h，调用INSTANTIATE_TEST_CASE_P（）和链接foo_param_test.cc来实例化它们。您可以多次实例化相同的抽象测试用例，可能在不同的源文件中。

## 三、一个简单的代码示例

```c++
//被测函数

  bool IsPrime(int n) {
  // Trivial case 1: small numbers
  if (n <= 1) return false;

  // Trivial case 2: even numbers
  if (n % 2 == 0) return n == 2;

  // Now, we have that n is odd and n >= 3.

  // Try to divide n by every odd number i, starting from 3
  for (int i = 3; ; i += 2) {
  // We only have to try i up to the squre root of n
  if (i > n / i) break;

  // Now, we have i <= n/i < n.
  // If n is divisible by i, n is not prime.
  if (n % i == 0) return false;
 }

  // n has no integer factor in the range (1, n), and thus is prime.
  return true;
}
```

```c++
//第一步
class FooTest : public ::testing::TestWithParam<int> {
	// You can implement all the usual fixture class members here.
	// To access the test parameter, call GetParam() from class
	// TestWithParam<T>.
	//在这里面可以实现fixture类的所有成员

};
//第二步
TEST_P(FooTest, DoesBlah) {
	// Inside a test, access the test parameter with the GetParam() method
	// of the TestWithParam<T> class:
	//在测试中，使用TestWithParam <T>类的GetParam（）方法访问测试参数：
	int n = GetParam();
	EXPECT_TRUE(IsPrime(n));
	//...
}

//第三步
//第一个参数是前缀；第二个是类名；第三个是参数生成器
INSTANTIATE_TEST_CASE_P(MyPrimeParamTest,
	FooTest,
	::testing::Values(-5,0, 3, 5, 11));

int main(int argc, char** argv)
{
	testing::InitGoogleTest(&argc, argv);

	return RUN_ALL_TESTS();
}
```

运行结果：

![img](http://images2015.cnblogs.com/blog/747969/201611/747969-20161130153910443-39273321.png)

从上面的框框中的案例名称大概能够看出案例的命名规则，对于需要了解每个案例的名称的我来说，这非常重要。 命名规则大概为：

 prefix/test_case_name.testname/index 

##  六、类型测试

假设您有一个接口的多个实现，并希望确保所有这些都满足一些常见的要求。 或者，您可能定义了几个类型，它们应该符合相同的“概念”，并且您想要验证它。 在这两种情况下，您都希望为不同类型重复相同的测试逻辑。 

 虽然你可以为你想测试的每个类型写一个TEST或TEST_F（你甚至可以把测试逻辑放入你从TEST调用的函数模板），它是乏味的，不缩放：如果你想要m个测试 n类型，你最终会写m * n TESTs。

类型测试允许您在类型列表上重复相同的测试逻辑。 你只需要写一次测试逻辑，虽然在写类型测试时你必须知道类型列表。 以下是您的操作方法：

1. 定义一个fixture类模板。 它应该由一个类型参数化。 记住继承:: testing :: Test：

```c++
template <typename T>
class FooTest : public ::testing::Test {
 public:
  ...
  typedef std::list<T> List;
  static T shared_;
  T value_;
};
```

2. 将类型列表与测试用例相关联，这将针对列表中的每个类型重复：

```c++
typedef ::testing::Types<char, int, unsigned int> MyTypes;
TYPED_TEST_CASE(FooTest, MyTypes);
```

typedef对于TYPED_TEST_CASE宏正确解析是必要的。 否则编译器会认为类型列表中的每个逗号引入一个新的宏参数。

3. 使用**TYPED_TEST（）**而不是TEST_F（）为此测试用例定义一个类型测试。 您可以根据需要重复此操作次数：

```c++
TYPED_TEST(FooTest, DoesBlah) {
  // Inside a test, refer to the special name TypeParam to get the type
  // parameter.  Since we are inside a derived class template, C++ requires
  // us to visit the members of FooTest via 'this'.
  TypeParam n = this->value_;

  // To visit static members of the fixture, add the 'TestFixture::'
  // prefix.
  n += TestFixture::shared_;

  // To refer to typedefs in the fixture, add the 'typename TestFixture::'
  // prefix.  The 'typename' is required to satisfy the compiler.
  typename TestFixture::List values;
  values.push_back(n);
  ...
}

TYPED_TEST(FooTest, HasPropertyA) { ... }
```

You can see `samples/sample6_unittest.cc` for a complete example.

## 七、类型参数化测试

在不知道类型参数的情况下编写测试--- 这就是“类型参数化测试”。

类型参数化测试类似于类型测试，除了它们不需要预知类型列表。 相反，您可以首先定义测试逻辑，然后使用不同类型列表实例化它。 你甚至可以在同一个程序中多次实例化它。

如果您正在设计一个接口或概念，则可以定义一组类型参数化测试，以验证接口/概念的任何有效实现应具有的属性。 然后，每个实现的作者可以使用他的类型来实例化测试套件，以验证它符合需求，而不必重复地编写类似的测试。 这里有一个例子：

1. 定义一个fixture类模板，就像我们用类型测试一样：

```c++
First, define a fixture class template, as we did with typed tests:

template <typename T>
class FooTest : public ::testing::Test {
  ...
};
```

2. 声明你要定义的类型参数化测试用例：

```c++
TYPED_TEST_CASE_P(FooTest);
```

这个后缀P代表参数化或模式，随你怎么想。

3. 使用TYPED_TEST_P()来定义类型参数化测试。您可以根据需要重复多次：

```c++
TYPED_TEST_P(FooTest, DoesBlah) {
  // Inside a test, refer to TypeParam to get the type parameter.
  TypeParam n = 0;
  ...
}

TYPED_TEST_P(FooTest, HasPropertyA) { ... }
```

现在棘手的部分：您需要使用REGISTER_TYPED_TEST_CASE_P宏注册所有测试模式，然后才能实例化它们。

宏的第一个参数是测试用例名称; 其余的是在这个测试用例中的**测试的名称**：

```c++
REGISTER_TYPED_TEST_CASE_P(FooTest,
                           DoesBlah, HasPropertyA);
```

最后，你可以用你想要的类型来实例化模式。 如果你把上面的代码放在头文件中，你可以在多个C ++源文件#include它，并实例化多次。

```c++
typedef ::testing::Types<char, int, unsigned int> MyTypes;
INSTANTIATE_TYPED_TEST_CASE_P(My, FooTest, MyTypes);
```

为了区分模式的不同实例，INSTANTIATE_TYPED_TEST_CASE_P宏的第一个参数是将添加到实际测试用例名称中的前缀。 **请记住为不同实例选择唯一前缀**。

在类型列表只包含一个类型的特殊情况下，您可以直接编写该类型，而不使用:: testing :: Types <...>，如下所示：

```c++
INSTANTIATE_TYPED_TEST_CASE_P(My, FooTest, int);
```

ou can see `samples/sample6_unittest.cc` for a complete example.

***\*类型测试与类型参数化的区别：**

1.  类型测试是你知道所有的类型，把所有类型注册，实例化测试。
2.  类型参数化是你是接口的定义者，知道每个接口函数的基本功能，而它的具体实现可以在将来被   人实现，你可以提前定义好测试用例，然后把所有的测试注册。

## 八、测试private修饰的代码

如果您更改软件的内部实现，只要用户不能观察到这种变化，您的测试就不会中断。 因此，根据黑盒测试原则，大多数时候你应该通过其公共接口测试你的代码。

如果你仍然发现自己需要测试内部实现代码，考虑是否有一个更好的设计，不需要你这样做。 如果你必须测试非公共接口代码。 有两种情况需要考虑：

-  静态函数（不同于静态成员函数！）或未命名的命名空间
-  私人或受保护的类成员

###  1. 静态函数

未命名的命名空间中的静态函数和定义/声明仅在同一转变单元中可见。要测试它们，您可以在你的* _test.cc文件中include 要测试的整个.cc文件。 （#include .cc文件不是重用代码的好方法 - 你不应该在生产代码中这样做！）

然而，更好的方法是将私有代码移动到foo :: internal命名空间中，其中foo是你项目通常使用的命名空间，并将私有声明放在* -internal.h文件中。允许您的生产.cc文件和测试包括此内部标头，但是您的客户端不包括。这样，您可以完全测试您的内部实现，而不会泄漏到您的客户端。

### 2. 私有类成员

私人class成员只能从班class或友元类那里接触。要访问类的私有成员，可以将测试夹具声明为类的朋友，并在夹具中定义访问器。使用夹具的测试，可以通过夹具中的访问器访问您的生产类的私有成员。注意，即使你的夹具是你的生产类的朋友，你的测试不是它的友元类，因为他们技术上是定义在夹具的子类中。

另一种测试私有成员的方法是将它们重构为一个实现类，然后在* -internal.h文件中声明它。您的客户端不允许包括此标题，但您的测试可以。这种称为Pimpl（私有实现）习语。

或者，您可以通过在类主体中添加以下行，将个别测试声明为class的友元类：

```c++
FRIEND_TEST(TestCaseName, TestName);
```

　　For example,

```c++
// foo.h
#include "gtest/gtest_prod.h"

// Defines FRIEND_TEST.
class Foo {
  ...
 private:
  FRIEND_TEST(FooTest, BarReturnsZeroOnNull);
  int Bar(void* x);
};

// foo_test.cc
...
TEST(FooTest, BarReturnsZeroOnNull) {
  Foo foo;
  EXPECT_EQ(0, foo.Bar(NULL));
  // Uses Foo's private member Bar().
}
```

当你的类在命名空间中定义时，需要特别注意，因为你应该在**同一个命名空间中定义你的测试夹具和测试**，如果你想他们是你的class的友元。 例如，如果要测试的代码如下所示：

```c++
namespace my_namespace {

class Foo {
  friend class FooTest;
  FRIEND_TEST(FooTest, Bar);
  FRIEND_TEST(FooTest, Baz);
  ...
  definition of the class Foo
  ...
};

}  // namespace my_namespace
```

Your test code should be something like:

```c++
namespace my_namespace {
class FooTest : public ::testing::Test {
 protected:
  ...
};

TEST_F(FooTest, Bar) { ... }
TEST_F(FooTest, Baz) { ... }

}  // namespace my_namespace
```

## 九、Catching Failures

如果您要在Google测试之上构建测试实用程序，则需要测试您的实用程序。 你将使用什么框架来测试它？ Google测试，当然。

挑战是验证您的测试实用程序是否正确报告故障。 在框架中通过抛出异常报告失败，您可以捕获异常并断言。 但是Google Test不会使用异常，那么我们如何测试一段代码是否会产生预期的失败呢？

“gtest / gtest-spi.h”包含一些构造来做到这一点。 #include 它，然后可以使用

```c++
EXPECT_FATAL_FAILURE(statement, substring);
```

to assert that *statement* generates a fatal (e.g. `ASSERT_*`) failure whose message contains the given *substring*, or use

```c++
EXPECT_NONFATAL_FAILURE(statement, substring);
```

if you are expecting a non-fatal (e.g. `EXPECT_*`) failure.

。。。。。//需要时再看

## 十、Getting the Current Test's Name

   有时一个函数可能需要知道当前运行的测试的名称。 例如，您可以使用测试夹具的SetUp（）方法根据正在运行的测试设置黄金文件名。 :: testing :: TestInfo类具有以下信息：

```c++
namespace testing {

class TestInfo {
 public:
  // Returns the test case name and the test name, respectively.
  //
  // Do NOT delete or free the return value - it's managed by the
  // TestInfo class.
  const char* test_case_name() const;
  const char* name() const;
};

}  // namespace testing
```

To obtain a `TestInfo` object for the currently running test, call `current_test_info()` on the `UnitTest` singleton object:

```c++
// Gets information about the currently running test.
// Do NOT delete the returned object - it's managed by the UnitTest class.
const ::testing::TestInfo* const test_info =
  ::testing::UnitTest::GetInstance()->current_test_info();
printf("We are in test %s of test case %s.\n",
       test_info->name(), test_info->test_case_name());
```

如果没有运行测试，current_test_info（）返回一个空指针。 特别是，你不能在TestCaseSetUp（），TestCaseTearDown（）中找到测试用例名称（在那里你知道测试用例名称），或者从它们调用的函数。

## 十 一、运行测试程序：高级选项

Google Test测试程序是普通的可执行文件。 一旦构建，您可以直接运行它们，并通过以下**环境变量 **或**命令行标志**影响其行为。 要使标志工作，您的程序必须在调用RUN_ALL_TESTS（）之前调用:: testing :: InitGoogleTest（）。
要查看支持的标志及其用法的列表，请使用--help标志运行测试程序。 您也可以使用-h， - ？或/？ 简称。 此功能在版本1.3.0中添加。
设置标志的三种方式：以--gtest_filter 为例

       1）命令行运行程序时直接加上参数：./foo_test --gtest_filter=QueueTest.*；

      2）在代码中设置：:: testing :: GTEST_FLAG(filter)= "QueueTest.*" **注意没有前边的--gtest_。

      3）testing::FLAGS_gtest_filter = "QueueTest.*";

如果选项由环境变量和标志指定，则后者优先。 大多数选项也可以在代码中设置/读取：访问命令行标志的值--gtest_foo，write** :: testing :: GTEST_FLAG（foo）**。 

**注意标志是：--gtest_foo ； 在代码中调用是**:: testing :: GTEST_FLAG（foo）；没有前边的****--gtest_。**

一个常见的模式是在调用:: testing :: InitGoogleTest（）之前设置标志的值：

```c++
int main(int argc, char** argv) {
  // Disables elapsed time by default.
  ::testing::GTEST_FLAG(print_time) = false;

  // This allows the user to override the flag on the command line.
  ::testing::InitGoogleTest(&argc, argv);

  return RUN_ALL_TESTS();
}  
```

### 1. 选择测试

   此部分显示用于选择哪些测试运行的各种选项。

####  1.1 列出测试名称

  有时，在运行程序之前，必须列出程序中的可用测试，以便在需要时应用过滤器。 包括标志--gtest_list_tests覆盖所有其他标志，并列出以下格式的测试：

```
TestCase1.
  TestName1
  TestName2
TestCase2.
  TestName
```

如果提供了标志，则列出的所有测试都不会真正运行。 此标志没有相应的环境变量。

####   1.2 运行测试的子集

默认情况下，Google测试程序运行用户定义的所有测试。 有时，您只想运行测试的一个子集（例如，用于调试或快速验证更改）。 如果将GTEST_FILTER环境变量或--gtest_filter标志设置为过滤器字符串，则Google Test将仅运行其全名（以TestCaseName.TestName的形式）与过滤器匹配的测试。

过滤器的格式是通配符模式（称为正模式）的'：'分隔的列表，可选地后跟一个“ - ”和另一个“：”分隔的模式列表（称为负模式）。 测试匹配过滤器当且仅当它与任何正模式匹配但不匹配任何负模式时。

模式可能包含“*”（匹配任何字符串）或'？' （匹配任何单个字符）。 为了方便，过滤器'* -NegativePatterns'也可以写为'-NegativePatterns'。

For example:

- `./foo_test` Has no flag, and thus runs all its tests.
- `./foo_test --gtest_filter=*` Also runs everything, due to the single match-everything `*` value.
- `./foo_test --gtest_filter=FooTest.*` Runs everything in test case `FooTest`.
- `./foo_test --gtest_filter=*Null*:*Constructor*` Runs any test whose full name contains either `"Null"` or `"Constructor"`.
- `./foo_test --gtest_filter=-*DeathTest.*` Runs all non-death tests.
- `./foo_test --gtest_filter=FooTest.*-FooTest.Bar` Runs everything in test case `FooTest` except `FooTest.Bar`.

![img](http://images2015.cnblogs.com/blog/747969/201612/747969-20161202165140443-555324044.png)

####  1.3 暂时禁用测试

如果你有一个失败的测试，无法立即修复，可以在其名称中添加DISABLED_前缀。 将排除它执行。 这比注释掉代码或使用#if 0更好，因为禁用的测试仍然编译（因此不会rot）。

如果你需要禁用测试用例中的所有测试，可以在每个测试名称的前面添加DISABLED_，或者将其添加到测试用例名称的前面。

例如，以下测试不会由Google Test运行，即使它们仍然将被编译：

```c++
// Tests that Foo does Abc.
TEST(FooTest, DISABLED_DoesAbc) { ... }

class DISABLED_BarTest : public ::testing::Test { ... };

// Tests that Bar does Xyz.
TEST_F(DISABLED_BarTest, DoesXyz) { ... }　
```

注意：此功能只能用于临时缓解。 您仍然必须在以后修复已禁用的测试。 提醒您，如果测试计划包含任何已停用的测试，Google测试会打印一条横幅警告您。

提示：您可以轻松计算已使用grep禁用的测试的数量。 此数字可用作提高测试质量的指标。

#### 1.4 暂时启用禁用测试

要在测试执行中包括禁用的测试，只需使用--gtest_also_run_disabled_tests标志调用测试程序或将GTEST_ALSO_RUN_DISABLED_TESTS环境变量设置为0以外的值。您可以将此与--gtest_filter标志结合，以进一步选择要运行哪些已禁用的测试 。

代码中设置如下：前边加FLAGS_ （好坑啊，文档里也没说，我查出来的）。

```c++
testing::FLAGS_gtest_also_run_disabled_tests = 2;
```

### 2. 重复测试

有一段时间，你会碰到一个测试，它的结果是命中或错过。 也许它只会失败1％的时间，使它很难重现调试器下的错误。 这可能是挫折的主要根源。

--gtest_repeat标志允许您在程序中重复所有（或选定的）测试方法多次。 希望，一个脆弱的测试最终会失败，并给你一个机会进行调试。 以下是使用方法：

| `$ foo_test --gtest_repeat=1000`         | Repeat foo_test 1000 times and don't stop at failures. |
| ---------------------------------------- | ---------------------------------------- |
| `$ foo_test --gtest_repeat=-1`           | A negative count means repeating forever. |
| `$ foo_test --gtest_repeat=1000 --gtest_break_on_failure` | Repeat foo_test 1000 times, stopping at the first failure. This is especially useful when running under a debugger: when the testfails, it will drop into the debugger and you can then inspect variables and stacks. |
| `$ foo_test --gtest_repeat=1000 --gtest_filter=FooBar` | Repeat the tests whose name matches the filter 1000 times. |

 如果您的测试程序包含使用AddGlobalTestEnvironment（）注册的全局set-up/tear-down代码，则在每次迭代中都会重复该测试程序，因为其中可能存在薄片。 您还可以通过设置GTEST_REPEAT环境变量来指定重复计数。

###  3.Shuffling the Tests洗牌测试

您可以指定--gtest_shuffle标志（或将GTEST_SHUFFLE环境变量设置为1），以便以随机顺序在程序中运行测试。 这有助于揭示测试之间的依赖关系。

默认情况下，Google测试使用根据当前时间计算的随机种子。 因此，你每次都会得到不同的顺序。 控制台输出包括随机种子值，以便以后可以重现与顺序相关的测试失败。 要明确指定随机种子，请使用--gtest_random_seed = SEED标志（或设置GTEST_RANDOM_SEED环境变量），其中SEED是介于0和99999之间的整数。种子值0是特殊的：它告诉Google Test执行默认行为 从当前时间计算种子。

如果将此与--gtest_repeat = N结合使用，Google测试会选择不同的随机种子，并在每次迭代中重新洗牌测试。

###  4.控制测试输出

本节教导如何调整测试结果的报告方式。

####   4.1彩色终端输出

Google测试可以在其终端输出中使用颜色，以便更容易地发现测试之间的分离，以及测试是否通过。

您可以设置GTEST_COLOR环境变量，或将--gtest_color命令行标志设置为yes，no或auto（默认值）以启用颜色，禁用颜色或让Google测试决定。 当值为auto时，如果且仅当输出发送到终端，并且（在非Windows平台上）TERM环境变量设置为xterm或xterm-color，Google Test将使用颜色。

####  4.2 抑制所用时间

默认情况下，Google测试会打印运行每个测试所需的时间。为了抑制这种情况，使用--gtest_print_time = 0命令行标志运行测试程序。将GTEST_PRINT_TIME环境变量设置为0具有相同的效果。

可用性：Linux，Windows，Mac。 （在Google Test 1.3.0及更低版本中，默认行为是不打印已用时间。）

####  4.3 生成XML报告

除了正常的文本输出之外，Google Test还可以向文件发送详细的XML报告。报告包含每个测试的持续时间，因此可以帮助您识别慢速测试。

要生成XML报告，请将GTEST_OUTPUT环境变量或--gtest_output标志设置为字符串“xml：_path_to_output_file_”，这将在给定位置创建文件。您也可以只使用字符串“xml”，在这种情况下，输出可以在当前目录中的test_detail.xml文件中找到。

如果指定目录（例如，Linux上的“xml：output / directory /”或Windows上的“xml：output \ directory \”），Google Test将在该目录中创建一个XML文件（测试程序foo_test或foo_test.exe的foo_test.xml）。如果文件已存在（可能是上次运行时遗留的文件），Google测试会选择不同的名称（例如foo_test_1.xml），以避免覆盖它。

报告使用此处描述的格式。它基于junitreport Ant任务，可以通过流行的连续构建系统（如Hudson）进行解析。由于该格式最初是用于Java，需要稍作解释才能将其应用于Google Test测试，如下所示：

```
<testsuites name="AllTests" ...>
  <testsuite name="test_case_name" ...>
    <testcase name="test_name" ...>
      <failure message="..."/>
      <failure message="..."/>
      <failure message="..."/>
    </testcase>
  </testsuite>
</testsuites>
```

- <testsuites>根元素对应于整个测试程序。
- `` 元素对应与test case.
- `` 元素对应于Google Test测试函数。

For instance, the following program

```c++
TEST(MathTest, Addition) { ... }
TEST(MathTest, Subtraction) { ... }
TEST(LogicTest, NonContradiction) { ... }
```

could generate this report:

```
<?xml version="1.0" encoding="UTF-8"?>
<testsuites tests="3" failures="1" errors="0" time="35" name="AllTests">
  <testsuite name="MathTest" tests="2" failures="1" errors="0" time="15">
    <testcase name="Addition" status="run" time="7" classname="">
      <failure message="Value of: add(1, 1)
 Actual: 3
Expected: 2" type=""/>
      <failure message="Value of: add(1, -1)
 Actual: 1
Expected: 0" type=""/>
    </testcase>
    <testcase name="Subtraction" status="run" time="5" classname="">
    </testcase>
  </testsuite>
  <testsuite name="LogicTest" tests="1" failures="0" errors="0" time="5">
    <testcase name="NonContradiction" status="run" time="5" classname="">
    </testcase>
  </testsuite>
</testsuites>
```

**注意事项：**

-  <testuites>元素的tests属性包含多少个测试，而failures属性告诉它们有多少个失败。
    <testcase>元素的属性：该测试用例中包含多少个测试；
-  time属性以毫秒表示测试、测试用例或整个测试程序的持续时间。
-  每个<failure>元素对应于单个失败的Google Test断言。
-  某些JUnit概念不适用于Google测试，但我们必须符合DTD。 因此，您将在报告中看到一些虚拟元素和属性。 您可以安全地忽略这些部分。

### 5.控制如何报告失败

###  5.1 将断言失败转换为断点

  当在调试器下运行测试程序时，如果调试器可以捕获断言故障并自动进入交互模式，则非常方便。 Google测试的*break-on-failure* 模式支持此行为。

  要启用它，请将GTEST_BREAK_ON_FAILURE环境变量设置为0以外的值。或者，您可以使用--gtest_break_on_failure命令行标志。

可用性：Linux，Windows，Mac。

###  5.2 禁用捕获测试 - 抛出异常Disabling Catching Test-Thrown Exceptions

   Google测试可以在启用或不启用exception的情况下使用。如果测试抛出C ++异常或（在Windows上）结构化异常（SEH），默认情况下Google测试会捕获它，将其报告为测试失败，并继续执行下一个测试方法。这将最大化测试运行的覆盖率。此外，在Windows上，未捕获的异常将导致弹出窗口，因此捕获异常允许您自动运行测试。

  然而，当调试测试失败时，您可能希望异常由调试器处理，以便您可以在抛出异常时检查调用堆栈。要实现此目的，请在运行测试时将GTEST_CATCH_EXCEPTIONS环境变量设置为0，或使用--gtest_catch_exceptions = 0标志。

###  5.3 让另一个测试框架驱动

    如果您使用的项目已经使用了另一个测试框架，但尚未准备好完全切换到Google测试，则可以通过在现有测试中使用其断言来获得Google测试的许多优势。 只是改变你的main（）函数看起来像：

```c++
#include "gtest/gtest.h"

int main(int argc, char** argv) {
  ::testing::GTEST_FLAG(throw_on_failure) = true;
  // Important: Google Test must be initialized.
  ::testing::InitGoogleTest(&argc, argv);

  ... whatever your existing testing framework requires ...
}
```

 这样，除了你的框架提供的断言之外，您还可以使用Google Test断言，例如：

```c++
void TestFooDoesBar() {
  Foo foo;
  EXPECT_LE(foo.Bar(1), 100);     // A Google Test assertion.
  CPPUNIT_ASSERT(foo.IsEmpty());  // A native assertion.
}
```

。。。。。后边的省略了，这个应该需要不到

## 6. 将测试功能分发到多台机器

如果您有多个机器可以用来运行测试程序，您可能希望并行运行测试功能并更快地获得结果。我们称之为技术分片，其中每台机器被称为分片。

Google测试与测试分片兼容。要利用此功能，您的测试运行器（不是Google测试的一部分）需要执行以下操作：

1. 分配多个计算机（分片）以运行测试。
2. 在每个分片上，将GTEST_TOTAL_SHARDS环境变量设置为分片的总数。它对所有分片必须相同。
3. 在每个分片上，将GTEST_SHARD_INDEX环境变量设置为分片的索引。不同的分片必须分配不同的索引，这些索引必须在[0，GTEST_TOTAL_SHARDS - 1]的范围内。
4. 在所有分片上运行相同的测试程序。当Google测试看到上述两个环境变量时，它将选择要运行的测试函数的子集。在所有分片中，程序中的每个测试函数将只运行一次。
5. 等待所有分片完成，然后收集并报告结果。

您的项目可能有没有Google Test的测试，因此不了解此协议。为了让测试运行器确定哪个测试支持分片，它可以将环境变量GTEST_SHARD_STATUS_FILE设置为不存在的文件路径。如果测试程序支持分片，它将创建此文件以确认事实（文件的实际内容此时不重要;虽然我们将来可能会在其中粘贴一些有用的信息。否则它不会创建它。

这里有一个例子来说明。假设您有一个包含以下5个测试函数的测试程序foo_test：

```c++
TEST(A, V)
TEST(A, W)
TEST(B, X)
TEST(B, Y)
TEST(B, Z)
```

你有3台机器在您的处置。 要并行运行测试功能，您需要在所有机器上将GTEST_TOTAL_SHARDS设置为3，并将GTEST_SHARD_INDEX分别设置为0,1和2。 然后你将在每台机器上运行相同的foo_test。

Google测试有权更改工作在分片上的分布情况，但这里有一种可能的情况：

- Machine #0 runs `A.V` and `B.X`.
- Machine #1 runs `A.W` and `B.Y`.
- Machine #2 runs `B.Z`.

## 十二、融合Google测试源文件

  Google测试的实现包括〜30个文件（不包括自己的测试）。 有时你可能希望它们被打包在两个文件（.h和.cc），以便你可以轻松地将它们复制到一个新的机器，并开始黑客。 为此，我们在scripts /目录中提供了一个实验性Python脚本fuse_gtest_files.py（自1.3.0版本开始）。 假设你在你的机器上安装了Python 2.4或更高版本，只需去那个目录并运行

   python fuse_gtest_files.py OUTPUT_DIR
  并且您应该看到一个OUTPUT_DIR目录正在创建文件gtest / gtest.h和gtest / gtest-all.cc。 这些文件包含您使用Google测试所需的一切。 只需将它们复制到任何你想要的，你准备好写测试。 您可以使用scripts / test / Makefile文件作为如何编译针对它们的测试的示例。

---

# [Google Mock简介--概念及基础语法](http://www.cnblogs.com/jycboy/p/gmock_summary.html)

这篇是GoogleMock的简介文档，会在后边附带一个自己的例子。

## 一、什么是Google C ++ Mocking Framework？

   当你写一个原型或测试，往往不能完全的依赖真实对象。一个mock对象实现与一个真实对象相同的接口，但让你在运行时指定它时，如何使用?它应该做什么?（哪些方法将被称为？什么顺序？多少次？有什么参数？他们会返回什么？等）

注意：很容易混淆伪造对象和模拟对象。fakes和mock在测试驱动开发（TDD）社区中实际上意味着非常不同的东西：

- Fake（伪对象）有工作实现，但通常采取一些捷径（可能使操作更便宜），这使得它们不适合生产。内存中的文件系统将是一个fake的例子。
- Mock（模拟器）是预期编程的对象，它们形成它们期望接收的调用的规范。

如果所有这些对你来说太抽象了，不要担心 - 最重要的事情要记住是一个模拟允许你检查它自己和调用者之间的交互。一旦你开始使用mock，fake和mock之间的差异将变得更加清晰。

Google C ++ Mocking框架（或简称为Google Mock）是一个库（有时我们称之为“框架”，以使其声音很酷）用于创建模拟类和使用它们。 它之对于对C ++，就像jMock和EasyMock对于Java。

使用Google Mock涉及三个基本步骤：

1. 使用一些简单的宏描述你想要模拟的接口，他们将扩展到你的mock类的实现;
2. 创建一些模拟对象，并使用直观的语法指定其期望和行为;
3. 练习使用模拟对象的代码。 Google Mock会在出现任何违反期望的情况时立即处理。

## 二、为什么选择Google Mock？

  虽然模拟对象可以帮助你删除测试中不必要的依赖，并使它们快速可靠，在C ++中手动使用mock是很难的：

- 有人必须实现Mock。这个工作通常很乏味，容易出错。难怪人们走很远的距离，避免它。
- 这些手动写的Mock的质量有点，呃，不可预测。你可能会看到一些真正抛光的，但你也可能看到一些被匆忙的入侵，并有各种各样的临时限制。
- 你从使用一个模拟获得的知识不会转移到下一个。

相比之下，Java和Python程序员有一些精细的模拟框架，自动创建mock。因此，Mock是一种被证明是有效的技术，并在这些社区广泛采用的做法。拥有正确的工具绝对有所不同。

Google Mock旨在帮助C ++程序员。它的灵感来自jMock和EasyMock，但是设计时考虑了C ++的细节。如果下列任何问题困扰你会很有帮助：

- 您的测试很慢，因为它们依赖于太多的库或使用昂贵的资源（例如数据库）。
- 你的测试是脆弱的，因为他们使用的一些资源是不可靠的（例如网络）。
- 您想要测试代码如何处理失败（例如，文件校验和错误），但不容易造成。
- 您需要确保您的模块以正确的方式与其他模块交互，但是很难观察到交互;因此你诉诸于观察行动结束时的副作用，这是最尴尬的。
- 你想“模拟出”你的依赖，除了他们没有模拟实现;坦白地说，你对那些手写的嘲笑并不感到兴奋。

我们建议您使用Google Mock：

一个设计工具，它可以让你早日经常尝试你的界面设计。更多的迭代导致更好的设计！

一个测试工具，用于剪切测试的出站依赖关系，并探测模块与其协作者之间的交互。

## 三、入门

使用Google Mock很容易！ 在你的C ++源文件中，只要#include“gtest / gtest.h”和“gmock / gmock.h”，你已经准备好了。

## 四、一个Mock Turtles的案例

让我们看一个例子。 假设您正在开发一个基于LOGO的API来绘图的图形程序。 你将如何测试它做正确的事情？ 好吧，你可以运行它，并将屏幕与金色屏幕快照，比较屏幕，但让我们承认：这样的测试运行和脆弱昂贵（如果你刚刚升级到一个闪亮的新显卡有更好的抗锯齿？突然 你必须更新所有的黄金图像。）。 如果所有的测试都是这样的，这将是太痛苦了。 幸运的是，你学习了依赖注入，并且知道正确的事情：不是让应用程序直接与绘图API交互，而是将API封装在一个接口（例如，Turtle）中，并用代码编译该接口：

```c++
class Turtle {
  ...
  virtual ~Turtle() {}
  virtual void PenUp() = 0;
  virtual void PenDown() = 0;
  virtual void Forward(int distance) = 0;
  virtual void Turn(int degrees) = 0;
  virtual void GoTo(int x, int y) = 0;
  virtual int GetX() const = 0;
  virtual int GetY() const = 0;
};
```

（注意，Turtle的析构函数必须是虚拟的，就像你打算继承的所有类的情况一样 - 否则当通过基本指针删除一个对象时，派生类的析构函数不会被调用，你会得到损坏的程序状态，如内存泄漏。）

您可以使用PenUp（）和PenDown（）控制turtle的运动是否留下轨迹，并使用Forward（），Turn（）和GoTo（）控制其运动。最后，GetX（）和GetY（）告诉你当前位置的turtle。

你的程序通常会使用这个接口的实际实现。在测试中，您可以使用模拟实现。这允许您轻松地检查您的程序正在调用什么绘图基元，有什么参数，以及顺序。以这种方式编写的测试更强大，更容易读取和维护（测试的意图表示在代码中，而不是在一些二进制图像中）运行得多，快得多。

## 五、编写模拟类

如果你幸运，你需要使用的mock已经被一些好的人实现。但是，你发现自己在写一个模拟class，放松- Google Mock将这个任务变成一个有趣的游戏！ （嗯，差不多。）

### 1. 如何定义它

使用Turtle界面作为示例，以下是您需要遵循的简单步骤：

1. 从Turtle派生一个类MockTurtle。
2. 使用Turtle的虚函数（虽然可以使用模板来模拟非虚方法，但是它更多的涉及）。计算它有多少参数。
3. 在子类的public：部分，写MOCK_METHODn（）; （或MOCK_CONST_METHODn（）;如果你是一个const方法），其中n是参数的数量;如果你计数错误，产生一个一个编译器错误：shame on you 。
4. 现在来到有趣的部分：你采取函数签名，剪切和粘贴函数名作为宏的第一个参数，并留下左边的第二个参数（如果你好奇，这是类型的功能）。
5. 重复，直到您要模拟的所有虚拟功能完成。

After the process, you should have something like:

```c++
#include "gmock/gmock.h"  // Brings in Google Mock.
class MockTurtle : public Turtle {
 public:
  ...
  MOCK_METHOD0(PenUp, void());
  MOCK_METHOD0(PenDown, void());
  MOCK_METHOD1(Forward, void(int distance));
  MOCK_METHOD1(Turn, void(int degrees));
  MOCK_METHOD2(GoTo, void(int x, int y));
  MOCK_CONST_METHOD0(GetX, int());
  MOCK_CONST_METHOD0(GetY, int());
};
```

您不需要在其他地方定义这些模拟方法 - MOCK_METHOD *宏将为您生成定义。 就是这么简单！ Once you get the hang of it, you can pump out mock classes faster than your source-control system can handle your check-ins。

提示：即使这样做对你来说太多了，你会发现Google Mock的scripts / generator /目录（由cppclean项目提供）中的gmock_gen.py工具很有用。 这个命令行工具需要你安装Python 2.4。 你给它一个C ++文件和它定义的抽象类的名称，它将为你打印模拟类的定义。 由于C ++语言的复杂性，这个脚本可能不总是工作，但它可以很方便。 有关更多详细信息，请阅读 [user documentation](https://github.com/google/googletest/blob/master/googlemock/scripts/generator/README)。 

### 2. 在哪里放

当你定义一个mock类，你需要决定在哪里放置它的定义。有些人把它放在一个* _test.cc。当被mock的接口（例如，Foo）由同一个人或团队拥有时，这是很好的。否则，当Foo的所有者改变它，你的测试可能会中断。 （你不能真正期望Foo的维护者修复使用Foo的每个测试，你能吗？）

所以，经验法则是：如果你需要模拟Foo并且它由其他人拥有，在Foo的包中定义模拟类（更好的是，在一个测试子包中，你可以清楚地分离生产代码和测试实用程序），并且把它放在mock_foo.h。然后每个人都可以从它们的测试引用mock_foo.h。如果Foo变化，只有一个MockFoo的副本要更改，只有依赖于更改的方法的测试需要修复。

另一种方式：你可以在Foo的顶部引入一个薄层FooAdaptor，并将代码引入这个新的接口。由于你拥有FooAdaptor，你可以更容易地吸收Foo的变化。虽然这是最初的工作，仔细选择适配器接口可以使您的代码更容易编写和更加可读性，因为你可以选择FooAdaptor适合你的特定领域比Foo更好。

## 六、在测试中使用模拟器

一旦你有一个模拟类，使用它很容易。 典型的工作流程是：

1. 从测试命名空间导入Google Mock名称，以便您可以使用它们（每个文件只需执行一次。请记住，命名空间是一个好主意，有利于您的健康。）
2. 创建一些模拟对象。
3. 指定你对它们的期望（一个方法被调用多少次？有什么参数？它应该做什么等等）。
4. 练习一些使用mock的代码; 可以使用Google Test断言检查结果。如果一个mock方法被调用超过预期或错误的参数，你会立即得到一个错误。
5. 当模拟遭到破坏时，Google Mock将自动检查是否满足了对其的所有期望。

这里有一个例子：

```c++
#include "path/to/mock-turtle.h"
#include "gmock/gmock.h"
#include "gtest/gtest.h"
using ::testing::AtLeast;                     // #1
 
TEST(PainterTest, CanDrawSomething) {
  MockTurtle turtle;                          // #2
  EXPECT_CALL(turtle, PenDown())              // #3
      .Times(AtLeast(1));
 
  Painter painter(&turtle);                   // #4
 
  EXPECT_TRUE(painter.DrawCircle(0, 0, 10));
}                                             // #5
 
int main(int argc, char** argv) {
  // The following line must be executed to initialize Google Mock
  // (and Google Test) before running the tests.
  ::testing::InitGoogleMock(&argc, argv);
  return RUN_ALL_TESTS();
}
```

正如你可能已经猜到的，这个测试检查PenDown（）被调用至少一次。 如果painter对象没有调用此方法，您的测试将失败，并显示如下消息：

path/to/my_test.cc:119: Failure

Actual function call count doesn't match this expectation:

Actually: never called;

Expected: called at least once.

提示1：如果从Emacs缓冲区运行测试，您可以在错误消息中显示的行号上按<Enter>，直接跳到失败的预期。

提示2：如果你的模拟对象从来没有被删除，最终的验证不会发生。因此，当您在堆上分配mock时，在测试中使用堆泄漏检查器是个好主意。

重要提示：Google Mock需要在调用mock函数之前设置期望值，否则行为是未定义的。特别是，你不能交错EXPECT_CALL（）和调用mock函数。

这意味着EXPECT_CALL（）应该被读取为期望call将在未来发生，而不是call已经发生。为什么Google Mock会这样工作？好的，事先指定期望允许Google Mock在上下文（堆栈跟踪等）仍然可用时立即报告违例。这使得调试更容易。

诚然，这个测试是设计的，没有做太多。您可以轻松实现相同的效果，而无需使用Google Mock。然而，正如我们将很快揭示的，谷歌模拟允许你做更多的mock。

### 使用Google Mock与任何测试框架

如果您要使用除Google测试（例如CppUnit或CxxTest）之外的其他测试框架作为测试框架，只需将上一节中的main（）函数更改为：

```c++
int main(int argc, char** argv) {
  // The following line causes Google Mock to throw an exception on failure,
  // which will be interpreted by your testing framework as a test failure.
  ::testing::GTEST_FLAG(throw_on_failure) = true;
  ::testing::InitGoogleMock(&argc, argv);
  ... whatever your testing framework requires ...
}
```

这种方法有一个catch：它有时使Google Mock从一个模拟对象的析构器中抛出异常。对于某些编译器，这有时会导致测试程序崩溃。 你仍然可以注意到测试失败了，但它不是一个优雅的失败。

更好的解决方案是使用Google Test的事件侦听器API来正确地向测试框架报告测试失败。 您需要实现事件侦听器接口的OnTestPartResult（）方法，但它应该是直接的。

如果这证明是太多的工作，我们建议您坚持使用Google测试，它与Google Mock无缝地工作（实际上，它在技术上是Google Mock的一部分）。 如果您有某个原因无法使用Google测试，请告诉我们。

**七、设置期望**

成功使用模拟对象的关键是对它设置正确的期望。 如果你设置的期望太严格，你的测试将失败作为无关的更改的结果。 如果你把它们设置得太松，错误可以通过。 你想做的只是正确的，使你的测试可以捕获到你想要捕获的那种错误。 Google Mock为您提供了必要的方法“恰到好处”。

**1. 通用语法**

在Google Mock中，我们使用EXPECT_CALL（）宏来设置模拟方法的期望值。 一般的语法是：

```c++
EXPECT_CALL(mock_object, method(matchers))
    .Times(cardinality)
    .WillOnce(action)
    .WillRepeatedly(action);
```

宏有两个参数：首先是mock对象，然后是方法及其参数。 请注意，两者之间用逗号（，）分隔，而不是句点（.）。 （为什么要使用逗号？答案是，这是必要的技术原因。）

宏之后可以是一些可选的子句，提供有关期望的更多信息。 我们将在下面的章节中讨论每个子句是如何工作的。

此语法旨在使期望读取如英语。 例如，你可能猜到

```c++
using ::testing::Return;...
EXPECT_CALL(turtle, GetX())
    .Times(5)
    .WillOnce(Return(100))
    .WillOnce(Return(150))
    .WillRepeatedly(Return(200));
```

 turtle对象的GetX（）方法将被调用五次，它将第一次返回100，第二次返回150，然后每次返回200。 有些人喜欢将这种语法风格称为域特定语言（DSL）。

**注意：**为什么我们使用宏来做到这一点？ 它有两个目的：第一，它使预期容易识别（通过grep或由人类读者），其次它允许Google Mock在消息中包括失败的期望的源文件位置，使调试更容易。

### 2. Matchers：我们期待什么参数？

当一个mock函数接受参数时，我们必须指定我们期望什么参数; 例如：

// Expects the turtle to move forward by 100 units.

EXPECT_CALL(turtle, Forward(100));

 

有时你可能不想太具体（记住，谈论测试太僵硬，超过规范导致脆弱的测试和模糊测试的意图，因此，我们鼓励你只指定必要的 - ）。 如果你想检查Forward（）将被调用，但对它的实际参数不感兴趣，写 _ 作为参数，这意味着“任何东西”：

```c++
using ::testing::_;
...
// Expects the turtle to move forward.
EXPECT_CALL(turtle, Forward(_));
```

_ 是我们称为匹配器的实例。 匹配器就像一个谓词，可以测试一个参数是否是我们期望的。 你可以在EXPECT_CALL（）里面使用一个匹配器，只要有一个函数参数。

内置匹配器的列表可以在[CheatSheet](https://github.com/google/googletest/blob/master/googlemock/docs/CheatSheet.md)中找到。 例如，这里是Ge（大于或等于）匹配器：

```c++
using ::testing::Ge;...
EXPECT_CALL(turtle, Forward(Ge(100))); 
```

这检查，turtle将被告知前进至少100单位。

### 3. cardinality：它会被调用多少次？

我们可以在EXPECT_CALL（）之后指定的第一个子句是Times（）。我们把它的参数称为基数，因为它告诉调用应该发生多少次。它允许我们重复一个期望多次，而不实际写多次。更重要的是，一个基数可以是“模糊的”，就像一个匹配器。这允许用户准确地表达测试的意图。

一个有趣的特殊情况是当我们说Times（0）。你可能已经猜到了 - 这意味着函数不应该使用给定的参数，而且Google Mock会在函数被（错误地）调用时报告一个Google测试失败。

我们已经看到AtLeast（n）作为模糊基数的一个例子。有关您可以使用的内置基数列表，请参见[CheatSheet](https://github.com/google/googletest/blob/master/googlemock/docs/CheatSheet.md)。

Times（）子句可以省略。如果你省略Times（），Google Mock会推断出你的基数。规则很容易记住：

- 如果WillOnce（）和WillRepeatedly（）都不在EXPECT_CALL（）中，则推断的基数是Times（1）。
- 如果有n个WillOnce（），但没有WillRepeatedly（），其中n> = 1，基数是Times（n）
- 如果有n个WillOnce（）和一个WillRepeatedly（），其中n> = 0，基数是Times（AtLeast（n））。

快速测验：如果一个函数被调用两次，但实际上调用了四次，你认为会发生什么？

### 4. Action：应该怎么办？

记住，一个模拟对象实际上没有工作实现？ 我们作为用户必须告诉它当一个方法被调用时该做什么。 这在Google Mock中很容易。

首先，如果一个模拟函数的返回类型是内置类型或指针，该函数有一个默认动作（一个void函数将返回，一个bool函数将返回false，其他函数将返回0）。此外，在C ++ 11及以上版本中，返回类型为默认可构造（即具有默认构造函数）的模拟函数具有返回默认构造值的默认动作。 如果你不说什么，这个行为将被使用。

第二，如果模拟函数没有默认动作，或者默认动作不适合你，你可以使用一系列WillOnce（）子句指定每次期望匹配时要采取的动作，后跟一个可选的WillRepeatedly （）。例如，

```c++
using ::testing::Return;...
EXPECT_CALL(turtle, GetX())
    .WillOnce(Return(100))
    .WillOnce(Return(200))
    .WillOnce(Return(300));
```

这说明turtle.GetX（）将被调用三次（Google Mock从我们写的WillOnce（）子句中推断出了这一点，因为我们没有明确写入Times（）），并且会返回100,200， 和300。

```c++
using ::testing::Return;...
EXPECT_CALL(turtle, GetY())
    .WillOnce(Return(100))
    .WillOnce(Return(200))
    .WillRepeatedly(Return(300));
```

 turtle.GetY（）将被调用至少两次（Google Mock知道这一点，因为我们写了两个WillOnce（）子句和一个WillRepeatedly（），没有明确的Times（）），将第一次返回100，200 第二次，300从第三次开始。

当然，如果你明确写一个Times（），Google Mock不会试图推断cardinality（基数）本身。 如果您指定的数字大于WillOnce（）子句，该怎么办？ 好了，毕竟WillOnce（）已用完，Google Mock每次都会为函数执行**默认操作**（除非你有WillRepeatedly（）。）。

除了Return（）之外，我们可以在WillOnce（）中做什么？ 您可以使用ReturnRef（variable）返回引用，或调用预定义函数等。

**重要说明**：EXPECT_CALL（）语句只**评估一次**操作子句，即使操作可能执行多次。 因此，您必须小心副作用。 以下可能不会做你想要的：

```c++
int n = 100;
EXPECT_CALL(turtle, GetX())
.Times(4)
.WillRepeatedly(Return(n++));
```

不是连续返回100，101，102，...，这个mock函数将总是返回100，因为**n ++只被计算一次**。 类似地，当执行EXPECT_CALL（）时，Return（new Foo）将创建一个新的Foo对象，并且每次都返回相同的指针。 如果你想要每次都发生副作用，你需要定义一个自定义动作，我们将在 [CookBook](https://github.com/google/googletest/blob/master/googlemock/docs/CookBook.md)中教授。

时间另一个测验！ 你认为以下是什么意思？

```c++
using ::testing::Return;...
EXPECT_CALL(turtle, GetY())
.Times(4)
.WillOnce(Return(100));
```

显然turtle.GetY（）被期望调用四次。但如果你认为它会每次返回100，三思而后行！请记住，每次调用函数时都将使用一个WillOnce（）子句，然后执行默认操作。所以正确的答案是turtle.GetY（）将第一次返回100，但从第二次返回0，因为**返回0是int函数的默认操作**。

### 5. 使用多个期望

到目前为止，我们只列出了你有一个期望的例子。更现实地，你要指定对多个模拟方法的期望，这可能来自多个模拟对象。

默认情况下，当调用模拟方法时，Google Mock将按照它们定义的**相反顺序**搜索期望值，并在找到与参数匹配的活动期望时停止（您可以将其视为“新规则覆盖旧的规则“）。如果匹配期望不能再接受任何调用，您将得到一个上限违反的失败。这里有一个例子：

```c++
using ::testing::_;...
EXPECT_CALL(turtle, Forward(_));  // #1
EXPECT_CALL(turtle, Forward(10))  // #2
    .Times(2);
```

如果Forward（**10**）在一行中被调用三次，第三次它将是一个错误，因为最后的匹配期望（＃2）已经饱和。然而，如果第三个Forward（10）被Forward（20）替换，则它将是OK，因为现在＃1将是匹配期望。

附注：Google Mock为什么要以与预期相反的顺序搜寻匹配？原因是，这允许用户在模拟对象的构造函数中设置默认期望，或测试夹具的设置阶段中设置默认期望，然后通过在测试体中写入更具体的期望来定制模拟。所以，如果你对同一个方法有两个期望，你想把一个具有更多的特定的匹配器放在另一个之后，或更具体的规则将被更为一般的规则所覆盖。

**6.有序和无序呼叫**

默认情况下，即使未满足较早的期望，期望也可以匹配调用。换句话说，**调用不必按照期望被指定的顺序发生**。

有时，您可能希望所有预期的调用以严格的顺序发生。在Google Mock中说这很容易：

```c++
using ::testing::InSequence;...
TEST(FooTest, DrawsLineSegment) {
  ...
  {
    InSequence dummy;
 
    EXPECT_CALL(turtle, PenDown());
    EXPECT_CALL(turtle, Forward(100));
    EXPECT_CALL(turtle, PenUp());
  }
  Foo();
}
```

通过创建类型为InSequence的对象，其范围中的所有期望都被放入序列中，并且必须按顺序发生。因为我们只是依靠这个对象的构造函数和析构函数做实际的工作，它的名字真的无关紧要。

在这个例子中，我们测试Foo（）按照书写的顺序调用三个期望函数。如果调用是无序的，它将是一个错误。

（如果你关心一些呼叫的相对顺序，但不是所有的呼叫，你能指定一个任意的部分顺序吗？答案是...是的！如果你不耐烦，细节可以在CookBook中找到。）

**7. 所有期望都是粘滞的(Sticky)（除非另有说明）**

现在，让我们做一个快速测验，看看你可以多好地使用这个模拟的东西。你会如何测试，turtle被要求去原点两次（你想忽略任何其他指令）？

在你提出了你的答案，看看我们的比较的笔记（自己先解决 - 不要欺骗！）：

```c++
using ::testing::_;...
EXPECT_CALL(turtle, GoTo(_, _))  // #1
    .Times(AnyNumber());
EXPECT_CALL(turtle, GoTo(0, 0))  // #2
    .Times(2);
```

假设turtle.GoTo（0，0）被调用了三次。 第三次，Google Mock将看到参数匹配期望＃2（记住，我们总是选择最后一个匹配期望）。 现在，由于我们说应该只有两个这样的调用，Google Mock会立即报告错误。 这基本上是我们在上面“使用多个期望”部分中告诉你的。

这个例子表明，Google Mock的期望在**默认情况下是“粘性”**，即使在我们达到其调用上界之后，它们仍然保持活动。 这是一个重要的规则要记住，因为它影响规范的意义，并且不同于它在许多其他Mock框架中做的（为什么我们这样做？因为我们认为我们的规则使常见的情况更容易表达和 理解。）。

简单？ 让我们看看你是否真的理解它：下面的代码说什么？

```c++
using ::testing::Return;
...
for (int i = n; i > 0; i--) {
  EXPECT_CALL(turtle, GetX())
      .WillOnce(Return(10*i));
}
```

如果你认为它说，turtle.GetX（）将被调用n次，并将返回10，20，30，...，连续，三思而后行！ 问题是，正如我们所说，期望是粘性的。 所以，第二次turtle.GetX（）被调用，最后（最新）EXPECT_CALL（）语句将匹配，并将立即导致“上限超过(upper bound exceeded)”错误 - 这段代码不是很有用！

一个正确的说法是turtle.GetX（）将返回10，20，30，...，是明确说，期望是不粘的。 换句话说，他们应该在饱和后尽快退休：

```c++
using ::testing::Return;
...
for (int i = n; i > 0; i--) {
  EXPECT_CALL(turtle, GetX())
    .WillOnce(Return(10*i))
    .RetiresOnSaturation();
}
```

而且，有一个更好的方法：在这种情况下，我们期望调用发生在一个特定的顺序，我们排列动作来匹配顺序。 由于顺序在这里很重要，我们应该显示的使用一个顺序：

```c++
using ::testing::InSequence;
using ::testing::Return;
...
{
  InSequence s;
 
  for (int i = 1; i <= n; i++) {
    EXPECT_CALL(turtle, GetX())
        .WillOnce(Return(10*i))
        .RetiresOnSaturation();
  }
}
```

顺便说一下，期望可能不粘的其他情况是当它在一个序列 --- 一旦序列中的在他之后的期望已经使用，它自动退休（并且永远不会用于匹配任何调用）。

### 8.  无趣呼叫

模拟对象可能有很多方法，并不是所有的都是那么有趣。例如，在一些测试中，我们可能不关心GetX（）和GetY（）被调用多少次。

在Google Mock中，如果你对一个方法不感兴趣，只是不要说什么。如果调用此方法，您将在测试输出中看到一个警告，但它不会失败。

## 八、现在怎么办？

恭喜！您已经学会了足够的Google Mock开始使用它。现在，您可能想要加入googlemock讨论组，并且实际上使用Google Mock编写一些测试 - 这很有趣。嘿，它甚至可以上瘾 - 你已经被警告。

然后，如果你想增加你的Mock商，你应该移动到 [CookBook](https://github.com/google/googletest/blob/master/googlemock/docs/CookBook.md)。您可以了解Google Mock的许多高级功能，并提高您的享受和测试幸福的水平。

## 九、一个小例子

这是我写的一个小例子，很简单的例子：

```c++
//定义需要模拟的接口类
    class FooInterface {
    public:
        virtual ~FooInterface() {}
        virtual std::string getArbitraryString() = 0;
 
        virtual int getPosition() = 0;
    };

/模拟类
class MockFoo : public FooInterface {
    public:
        MOCK_METHOD0(getArbitraryString, std::string());
        MOCK_METHOD0(getPosition, int());
    };
    
#include "stdafx.h"
 
using namespace seamless;
using namespace std;
 
using ::testing::Return;
 
int main(int argc, char** argv) {
    //Since Google Mock depends on Google Test, InitGoogleMock() is also responsible for initializing Google Test.
    //Therefore there's no need for calling testing::InitGoogleTest() separately.
    ::testing::InitGoogleMock(&argc, argv);
    int n = 100;
    string value = "Hello World!";
    MockFoo mockFoo;
    EXPECT_CALL(mockFoo, getArbitraryString())
        .Times(1)
        .WillOnce(Return(value));
    string returnValue = mockFoo.getArbitraryString();
    cout << "Returned Value: " << returnValue << endl;
    //在这里Times(2)意思是调用两次，但是下边只调用了一次，所以会报出异常
    EXPECT_CALL(mockFoo, getPosition())
        .Times(2)     
        .WillRepeatedly(Return(n++));
    int val = mockFoo.getPosition();  //100
    cout << "Returned Value: " << val << endl;
    //getPosition指定了调用两次，这里只调用了一次，所以运行结果显示出错
    return EXIT_SUCCESS;
}
```

　　运行结果：

　可以看到上边都输出了，最后有个错误，这个错误是因为：getPosition指定了调用两次，这里只调用了一次，所以运行结果显示出错。

# [**Google C++单元测试框架GoogleTest---CheatSheet文档**](http://www.cnblogs.com/jycboy/p/gmock_cheatsheet.html)

本文翻译自：[https://github.com/google/googletest/blob/master/googlemock/docs/CheatSheet.md](https://github.com/google/googletest/blob/master/googlemock/docs/CheatSheet.md)

**一、定义一个模拟类**

**1. 模拟一个正常的类，就是接口类**

  给：

```c++
class Foo {
  ...
  virtual ~Foo();
  virtual int GetSize() const = 0;
  virtual string Describe(const char* name) = 0;
  virtual string Describe(int type) = 0;
  virtual bool Process(Bar elem, int count) = 0;
};
```

(note that ~Foo() must be virtual) we can define its mock as，定义模拟类。

```c++
#include "gmock/gmock.h"
 
class MockFoo : public Foo {
  MOCK_CONST_METHOD0(GetSize, int());
  MOCK_METHOD1(Describe, string(const char* name));
  MOCK_METHOD1(Describe, string(int type));
  MOCK_METHOD2(Process, bool(Bar elem, int count));
};
```

创建一个“nice”模拟对象忽略所有无趣的调用，或一个“strict”模拟对象，将它们视为失败：

```
NiceMock<MockFoo> nice_foo;     // The type is a subclass of MockFoo.
StrictMock<MockFoo> strict_foo; // The type is a subclass of MockFoo.
```

**2. 模拟一个类模板**

To mock：

```c++
template <typename Elem>
class StackInterface {
 public:
  ...
  virtual ~StackInterface();
  virtual int GetSize() const = 0;
  virtual void Push(const Elem& x) = 0;
};
```

(note that ~StackInterface() must be virtual) just append _T to the MOCK_* macros:

```c++
template <typename Elem>
class MockStack : public StackInterface<Elem> {
 public:
  ...
  MOCK_CONST_METHOD0_T(GetSize, int());
  MOCK_METHOD1_T(Push, void(const Elem& x));
};
```

**3. 指定模拟函数的调用约定**

如果您的mock函数**不使用默认调用约定**，您可以通过将_WITH_CALLTYPE附加到前两个部分中描述的任何宏并指定调用约定作为宏的第一个参数来指定它。例如，

```c++
MOCK_METHOD_1_WITH_CALLTYPE（STDMETHODCALLTYPE，Foo，bool（int n））;
MOCK_CONST_METHOD2_WITH_CALLTYPE（STDMETHODCALLTYPE，Bar，int（double x，double y））;
```

其中STDMETHODCALLTYPE由Windows上的<objbase.h>定义。

**二、在测试中使用模拟器**

典型的流程是：

1. 导入您需要使用的Google Mock名称。所有Google Mock名称都位于测试命名空间中，除非它们是宏或其他注释。
2. 创建模拟对象。
3. （可选）设置模拟对象的默认操作。
4. 设置你对模拟对象的期望（他们怎么叫？他们做什么？）。
5. 使用模拟对象的练习代码;如有必要，请使用Google Test断言检查结果。
6. 当模拟对象被破坏时，Google Mock会自动验证所有对其的期望是否满足。

这里是一个例子：

```c++
using ::testing::Return;                            // #1
 
TEST(BarTest, DoesThis) {
  MockFoo foo;                                    // #2
 
  ON_CALL(foo, GetSize())                         // #3
      .WillByDefault(Return(1));
  // ... other default actions ...
 
  EXPECT_CALL(foo, Describe(5))                   // #4
      .Times(3)
      .WillRepeatedly(Return("Category 5"));
  // ... other expectations ...
 
  EXPECT_EQ("good", MyProductionFunction(&foo));  // #5
}                                   
```

**三、设置默认操作**

Google Mock对任何返回**void，bool，数值或指针**的函数都有一个内置的默认动作。

要为全局返回类型T的函数自定义默认操作：

```c++
using ::testing::DefaultValue;
 
// Sets the default value to be returned. T must be CopyConstructible.
DefaultValue<T>::Set(value);
// Sets a factory. Will be invoked on demand. T must be MoveConstructible.
//   T MakeT();
DefaultValue<T>::SetFactory(&MakeT);
// ... use the mocks ...
// Resets the default value.
DefaultValue<T>::Clear();
```

要自定义特定方法的默认操作，请使用ON_CALL（）：

```c++
ON_CALL(mock_object, method(matchers))
    .With(multi_argument_matcher)  ?
    .WillByDefault(action);
```

**四、设置期望**

**EXPECT_CALL（）**在模拟方法上设置期望（如何调用它？它会做什么？）：

```c++
EXPECT_CALL(mock_object, method(matchers))
    .With(multi_argument_matcher)  ?
    .Times(cardinality)            ?
    .InSequence(sequences)         *
    .After(expectations)           *
    .WillOnce(action)              *
    .WillRepeatedly(action)        ?
    .RetiresOnSaturation();        ?
```

如果省略Times（），则基数假定为：

- Times（1）当没有WillOnce（）和WillRepeatedly（）;
- 当有n个WillOnce（）但没有WillRepeatedly（）时，Times（n），其中n> = 1; 要么
- 当有n个WillOnce（）和WillRepeatedly（），其中n> = 0时,Times（AtLeast（n））。

没有EXPECT_CALL（）的方法可以被任意调用多次，并且每次都将采取默认操作。

**五、匹配**

匹配器匹配单个参数。 您可以在ON_CALL（）或EXPECT_CALL（）中使用它，或使用它直接验证值：

| **EXPECT_THAT(value, matcher)** | **Asserts that ****value**** matches ****matcher****.** |
| ------------------------------- | ---------------------------------------- |
| ASSERT_THAT(value, matcher)     | The same as EXPECT_THAT(value, matcher), except that it generates a fatal failure. |

内置的匹配（其中参数是函数参数）分为几类：

**1. 通配符**

| **_**                   | **argument**** can be any value of the correct type可以代表任意类型.** |
| ----------------------- | ---------------------------------------- |
| A<type>() or An<type>() | argument can be any value of type可以是type类型的任意值. |

**2. 一般比较**

| Eq(value) 或者 value   | argument == value，method中的形参必须是value     |
| -------------------- | ---------------------------------------- |
| Ge(value)            | argument >= value，method中的形参必须大于等于value  |
| Gt(value)            | argument > value                         |
| Le(value)            | argument <= value                        |
| Lt(value)            | argument < value                         |
| Ne(value)            | argument != value                        |
| IsNull()             | method的形参必须是NULL指针                       |
| NotNull()            | argument is a non-null pointer           |
| Ref(variable)        | 形参是variable的引用                           |
| TypedEq<type>(value) | 形参的类型必须是type类型，而且值必须是value。当模拟函数被重载你可能需要它而不是Eq(vlaue) |

**注意\**** 除了Ref（）之外，这些匹配器会创建一个值的副本，以备日后修改或销毁。 如果编译器抱怨该值没有公共副本构造函数，请尝试将其包装在ByRef（）中，例如。 Eq（ByRef（non_copyable_value））。 如果你这样做，请确保non_copyable_value之后不改变，否则你的匹配器的含义将被改变。

**3. 浮点数的比较**

| DoubleEq(a_double)             | 形参是一个double类型，比如值近似于a_double，两个NaN是不相等的  |
| ------------------------------ | ---------------------------------------- |
| FloatEq(a_float)               | 同上，只不过类型是float                           |
| NanSensitiveDoubleEq(a_double) | 形参是一个double类型，比如值近似于a_double，两个NaN是相等的，这个是用户所希望的方式 |
| NanSensitiveFloatEq(a_float)   | 同上，只不过形参是float                           |

上述匹配器使用基于ULP的比较（与Google Test中使用的比较相同）。 它们根据期望值的绝对值自动选择合理的误差界限。 DoubleEq（）和FloatEq（）符合IEEE标准，这需要比较两个NaNs的相等性返回false。 NanSensitive *版本将两个NaNs相等，这通常是用户想要的。

| **DoubleNear(a_double, max_abs_error)**  | **argument**** is a ****double**** value close to ****a_double**** (absolute error <= ****max_abs_error****), treating two NaNs as unequal.** |
| ---------------------------------------- | ---------------------------------------- |
| FloatNear(a_float, max_abs_error)        | argument is a float value close to a_float (absolute error <= max_abs_error), treating two NaNs as unequal. |
| NanSensitiveDoubleNear(a_double, max_abs_error) | argument is a double value close to a_double (absolute error <= max_abs_error), treating two NaNs as equal. |
| NanSensitiveFloatNear(a_float, max_abs_error) | argument is a float value close to a_float (absolute error <= max_abs_error), treating two NaNs as equal. |

**4. String Matchers**

这里的字符串即可以是C风格的字符串，也可以是C++风格的。

| ContainsRegex(string) | 形参匹配给定的正则表达式                |
| --------------------- | --------------------------- |
| EndsWith(suffix)      | 形参以suffix截尾                 |
| HasSubstr(string)     | 形参有string这个子串               |
| MatchesRegex(string)  | 从第一个字符到最后一个字符都完全匹配给定的正则表达式. |
| StartsWith(prefix)    | 形参以prefix开始                 |
| StrCaseEq(string)     | 参数等于string，并且忽略大小写          |
| StrCaseNe(string)     | 参数不是string，并且忽略大小写          |
| StrEq(string)         | 参数等于string                  |
| StrNe(string)         | 参数不等于string                 |

**5. 容器的匹配**

很多STL的容器的比较都支持==这样的操作，对于这样的容器可以使用上述的Eq（expected_container）来比较或者只是expect_container来完全匹配容器。但如果你想写得更为灵活，可以使用下面的这些容器匹配方法：

| **ContainerEq(container)**               | **The same as ****Eq(container)**** except that the failure message also includes which elements are in one container but not the other.** |
| ---------------------------------------- | ---------------------------------------- |
| Contains(e)                              | argument contains an element that matches e, which can be either a value or a matcher. |
| Each(e)                                  | argument is a container where *every* element matches e, which can be either a value or a matcher. |
| ElementsAre(e0, e1, ..., en)             | argument has n + 1 elements, where the i-th element matches ei, which can be a value or a matcher. 0 to 10 arguments are allowed. |
| ElementsAreArray({ e0, e1, ..., en }), ElementsAreArray(array), or ElementsAreArray(array, count) | The same as ElementsAre() except that the expected element values/matchers come from an initializer list, STL-style container, or C-style array. |
| IsEmpty()                                | argument is an empty container (container.empty()). |
| Pointwise(m, container)                  | argument contains the same number of elements as in container, and for all i, (the i-th element in argument, the i-th element in container) match m, which is a matcher on 2-tuples. E.g. Pointwise(Le(), upper_bounds) verifies that each element in argument doesn't exceed the corresponding element in upper_bounds. See more detail below. |
| SizeIs(m)                                | argument is a container whose size matches m. E.g. SizeIs(2) or SizeIs(Lt(2)). |
| UnorderedElementsAre(e0, e1, ..., en)    | argument has n + 1 elements, and under some permutation each element matches an ei (for a different i), which can be a value or a matcher. 0 to 10 arguments are allowed. |
| UnorderedElementsAreArray({ e0, e1, ..., en }), UnorderedElementsAreArray(array), or UnorderedElementsAreArray(array, count) | The same as UnorderedElementsAre() except that the expected element values/matchers come from an initializer list, STL-style container, or C-style array. |
| WhenSorted(m)                            | When argument is sorted using the < operator, it matches container matcher m. E.g. WhenSorted(UnorderedElementsAre(1, 2, 3)) verifies that argument contains elements 1, 2, and 3, ignoring order. |
| WhenSortedBy(comparator, m)              | The same as WhenSorted(m), except that the given comparator instead of < is used to sort argument. E.g. WhenSortedBy(std::greater<int>(), ElementsAre(3, 2, 1)). |

注意：

- 这些匹配器也可以匹配：
   i. 通过引用传递的本地数组（例如在Foo（const int（＆a）[5]）中）和
   ii. 作为指针和计数传递的数组（例如，在Bar（const T * buffer，int len） - 参见 [Multi-argument Matchers](https://github.com/google/googletest/blob/master/googlemock/docs/CheatSheet.md#Multiargument_Matchers.md)）。
- 匹配的数组可以是多维的（即其元素可以是数组）。
- 在Pointwise（m，...）中的m应该是:: testing :: tuple <T，U>的匹配器，其中T和U分别是实际容器和预期容器的元素类型。 例如，要比较两个Foo容器，其中Foo不支持operator ==但是有一个Equals（）方法，可以写：

```c++
using ::testing::get;
MATCHER(FooEq, "") {
  return get<0>(arg).Equals(get<1>(arg));
}
...
EXPECT_THAT(actual_foos, Pointwise(FooEq(), expected_foos));
```

**6. 成员匹配器**

| **Field(&class::field, m)**   | **argument.field**** (or ****argument->field**** when ****argument**** is a plain pointer) matches matcher ****m****, where ****argument**** is an object of type class.** |
| ----------------------------- | ---------------------------------------- |
| Key(e)                        | argument.first matches e, which can be either a value or a matcher. E.g. Contains(Key(Le(5))) can verify that a map contains a key <= 5. |
| Pair(m1, m2)                  | argument is an std::pair whose first field matches m1 and second field matches m2. |
| Property(&class::property, m) | argument.property() (or argument->property() when argument is a plain pointer) matches matcher m, where argument is an object of type *class*. |

**7. 匹配函数或函数的结果**

| **ResultOf(f, m)** | **f(argument)**** matches matcher ****m****, where ****f**** is a function or functor.** |
| ------------------ | ---------------------------------------- |
|                    |                                          |

** 8. 指针匹配**

| **Pointee(m)**          | **argument**** (either a smart pointer or a raw pointer) points to a value that matches matcher ****m****.** |
| ----------------------- | ---------------------------------------- |
| WhenDynamicCastTo<T>(m) | when argument is passed through dynamic_cast<T>(), it matches matcher m. |

** 9. 多参数匹配器**

从技术上讲，完全匹配器匹配单个值。 “多参数”匹配器只是匹配元组的匹配器。 以下匹配器可用于匹配元组（x，y）：

| **Eq()** | **x == y** |
| -------- | ---------- |
| Ge()     | x >= y     |
| Gt()     | x > y      |
| Le()     | x <= y     |
| Lt()     | x < y      |
| Ne()     | x != y     |

您可以使用以下选择器来选择参数的子集（或对其重新排序）以参与匹配：

| **AllArgs(m)**           | **Equivalent to ****m****. Useful as syntactic sugar in ****.With(AllArgs(m))****.** |
| ------------------------ | ---------------------------------------- |
| Args<N1, N2, ..., Nk>(m) | The tuple of the k selected (using 0-based indices) arguments matches m, e.g. Args<1, 2>(Eq()). |

**10. 复合匹配**

你可以从一个或多个其他匹配器做一个匹配器：

| **AllOf(m1, m2, ..., mn)** | **argument**** matches all of the matchers ****m1**** to ****mn****.** |
| -------------------------- | ---------------------------------------- |
| AnyOf(m1, m2, ..., mn)     | argument matches at least one of the matchers m1 to mn. |
| Not(m)                     | argument doesn't match matcher m.        |

**11. Adapters for Matchers**

| **MatcherCast(m)**    | **casts matcher ****m**** to type ****Matcher****.** |
| --------------------- | ---------------------------------------- |
| SafeMatcherCast<T>(m) | [safely casts](https://github.com/google/googletest/blob/master/googlemock/docs/CookBook.md#casting-matchers) matcher m to type Matcher<T>. |
| Truly(predicate)      | predicate(argument) returns something considered by C++ to be true, where predicate is a function or functor. |

**12 .匹配作为谓词(Matchers as Predicates)**

| **Matches(m)(value)**                    | **evaluates to ****true**** if ****value**** matches ****m****. You can use ****Matches(m)**** alone as a unary functor.** |
| ---------------------------------------- | ---------------------------------------- |
| ExplainMatchResult(m, value, result_listener) | evaluates to true if value matches m, explaining the result to result_listener. |
| Value(value, m)                          | evaluates to true if value matches m.    |

**13. 定义匹配**

| **MATCHER(IsEven, "") { return (arg % 2) == 0; }** | **Defines a matcher ****IsEven()**** to match an even number.** |
| ---------------------------------------- | ---------------------------------------- |
| MATCHER_P(IsDivisibleBy, n, "") { *result_listener << "where the remainder is " << (arg % n); return (arg % n) == 0; } | Defines a macher IsDivisibleBy(n) to match a number divisible by n. |
| MATCHER_P2(IsBetween, a, b, std::string(negation ? "isn't" : "is") + " between " + PrintToString(a) + " and " + PrintToString(b)) { return a <= arg && arg <= b; } | Defines a matcher IsBetween(a, b) to match a value in the range [a, b]. |

笔记：

1. MATCHER *宏不能在函数或类中使用。
2. 匹配器主体必须是纯功能性的（即它不能有任何副作用，并且结果必须不依赖于被匹配的值和匹配器参数之外的任何东西）。
3. 您可以使用PrintToString（x）将任何类型的值x转换为字符串。

**14. 匹配作为测试断言**

| **ASSERT_THAT(expression, m)** | **Generates a **[**fatal failure**](https://github.com/google/googletest/blob/master/googletest/docs/Primer.md#assertions)** if the value of ****expression**** doesn't match matcher ****m****.** |
| ------------------------------ | ---------------------------------------- |
| EXPECT_THAT(expression, m)     | Generates a non-fatal failure if the value of expression doesn't match matcher m. |

**六、动作Actions**

操作指定了mock函数在调用时应该执行的操作。

**1. 返回值**

| **Return()**              | **Return from a ****void**** mock function.** |
| ------------------------- | ---------------------------------------- |
| Return(value)             | Return value. If the type of value is different to the mock function's return type, value is converted to the latter type *at the time the expectation is set*, not when the action is executed. |
| ReturnArg<N>()            | Return the N-th (0-based) argument.      |
| ReturnNew<T>(a1, ..., ak) | Return new T(a1, ..., ak); a different object is created each time. |
| ReturnNull()              | Return a null pointer.                   |
| ReturnPointee(ptr)        | Return the value pointed to by ptr.      |
| ReturnRef(variable)       | Return a reference to variable.          |
| ReturnRefOfCopy(value)    | Return a reference to a copy of value; the copy lives as long as the action. |

**2. 副作用（Side Effects）**

| **Assign(&variable, value)**     | **Assign ****value**** to variable.**    |
| -------------------------------- | ---------------------------------------- |
| DeleteArg<N>()                   | Delete the N-th (0-based) argument, which must be a pointer. |
| SaveArg<N>(pointer)              | Save the N-th (0-based) argument to *pointer. |
| SaveArgPointee<N>(pointer)       | Save the value pointed to by the N-th (0-based) argument to *pointer. |
| SetArgReferee<N>(value)          | Assign value to the variable referenced by the N-th (0-based) argument. |
| SetArgPointee<N>(value)          | Assign value to the variable pointed by the N-th (0-based) argument. |
| SetArgumentPointee<N>(value)     | Same as SetArgPointee<N>(value). Deprecated. Will be removed in v1.7.0. |
| SetArrayArgument<N>(first, last) | Copies the elements in source range [first, last) to the array pointed to by the N-th (0-based) argument, which can be either a pointer or an iterator. The action does not take ownership of the elements in the source range. |
| SetErrnoAndReturn(error, value)  | Set errno to error and return value.     |
| Throw(exception)                 | Throws the given exception, which can be any copyable value. Available since v1.1.0. |

**3. 使用函数或函子作为动作Using a Function or a Functor as an Action**

| **Invoke(f)**                            | **Invoke ****f**** with the arguments passed to the mock function, where ****f**** can be a global/static function or a functor.** |
| ---------------------------------------- | ---------------------------------------- |
| Invoke(object_pointer, &class::method)   | Invoke the {method on the object with the arguments passed to the mock function. |
| InvokeWithoutArgs(f)                     | Invoke f, which can be a global/static function or a functor. f must take no arguments. |
| InvokeWithoutArgs(object_pointer, &class::method) | Invoke the method on the object, which takes no arguments. |
| InvokeArgument<N>(arg1, arg2, ..., argk) | Invoke the mock function's N-th (0-based) argument, which must be a function or a functor, with the k arguments. |

被调用函数的返回值被用作动作的返回值。

定义要与Invoke *（）一起使用的函数或函数时，可以将任何未使用的参数声明为未使用：

```c++
double Distance(Unused, double x, double y) { return sqrt(x*x + y*y); }
  ...
EXPECT_CALL(mock, Foo("Hi", _, _)).WillOnce(Invoke(Distance));
```

在Invoke Argument <N>（...）中，如果一个参数需要通过引用传递，则将其包装在ByRef（）中。 例如，

```c++
InvokeArgument<2>(5, string("Hi"), ByRef(foo))
```

调用模拟函数＃2参数，通过值传递给它5和字符串（“Hi”），并通过引用传递foo。

**Default Action**

| **DoDefault()** | **Do the default action (specified by ****ON_CALL()**** or the built-in one).** |
| --------------- | ---------------------------------------- |
|                 |                                          |

Note: due to technical reasons, DoDefault() cannot be used inside a composite action - trying to do so will result in a run-time error.

**Composite Actions**

| **DoAll(a1, a2, ..., an)**   | **Do all actions ****a1**** to ****an**** and return the result of ****an**** in each invocation. The first ****n - 1****sub-actions must return void.** |
| ---------------------------- | ---------------------------------------- |
| IgnoreResult(a)              | Perform action a and ignore its result. a must not return void. |
| WithArg<N>(a)                | Pass the N-th (0-based) argument of the mock function to action a and perform it. |
| WithArgs<N1, N2, ..., Nk>(a) | Pass the selected (0-based) arguments of the mock function to action a and perform it. |
| WithoutArgs(a)               | Perform action a without any arguments.  |

**Defining Actions**

| **ACTION(Sum) { return arg0 + arg1; }**  | **Defines an action ****Sum()**** to return the sum of the mock function's argument #0 and #1.** |
| ---------------------------------------- | ---------------------------------------- |
| ACTION_P(Plus, n) { return arg0 + n; }   | Defines an action Plus(n) to return the sum of the mock function's argument #0 and n. |
| ACTION_Pk(Foo, p1, ..., pk) { statements; } | Defines a parameterized action Foo(p1, ..., pk) to execute the given statements. |

The ACTION* macros cannot be used inside a function or class.

**七、Cardinalities基数**

这些在Times（）中用于指定将调用模拟函数的次数：

| **AnyNumber()** | **The function can be called any number of times.** |
| --------------- | ---------------------------------------- |
| AtLeast(n)      | The call is expected at least n times.   |
| AtMost(n)       | The call is expected at most n times.    |
| Between(m, n)   | The call is expected between m and n (inclusive) times. |
| Exactly(n) or n | The call is expected exactly n times. In particular, the call should never happen when n is 0. |

**八、期望顺序（Expectation Order）**

默认情况下，期望可以按任何顺序匹配。如果一些或所有期望必须在给定的顺序中匹配，则有两种方式来指定它们。 它们可以单独使用或一起使用。

**1.The After Clause**

| 123456 | using ::testing::Expectation;...Expectation init_x = EXPECT_CALL(foo, InitX());Expectation init_y = EXPECT_CALL(foo, InitY());EXPECT_CALL(foo, Bar())    .After(init_x, init_y); |
| ------ | ---------------------------------------- |
|        |                                          |

上边说，只有在InitX（）和InitY（）被调用之后才能调用Bar（）。

如果你不知道你写的期望有多少个前提条件，你可以使用ExpectationSet来收集它们：

| 12345678 | using ::testing::ExpectationSet;...ExpectationSet all_inits;for (**int** i = 0; i < element_count; i++) {  all_inits += EXPECT_CALL(foo, InitElement(i));}EXPECT_CALL(foo, Bar())    .After(all_inits); |
| -------- | ---------------------------------------- |
|          |                                          |

上面说，只有在所有元素都被初始化之后才能调用Bar（）。（但我们不关心哪些元素在其他元素之前被初始化）。

在 .After(all_inits) 中使用ExpectationSet之后再修改ExpectationSet不会影响.After（）的含义。

**2. 序列**

当你有一个长链的顺序期望，使用序列指定顺序更容易，这不需要给链中的每个期望一个不同的名称。同一序列中的所有预期调用必须按其指定的顺序发生。

| 123456789101112 | using ::testing::Sequence;Sequence s1, s2;...EXPECT_CALL(foo, Reset())    .InSequence(s1, s2)    .WillOnce(Return(true));EXPECT_CALL(foo, GetSize())    .InSequence(s1)    .WillOnce(Return(1));EXPECT_CALL(foo, Describe(A<const **char***>()))    .InSequence(s2)    .WillOnce(Return("dummy")); |
| --------------- | ---------------------------------------- |
|                 |                                          |

上边说，Reset()必须在GetSize（）和Describe（）之前调用，后两个可以以任何顺序发生。

在一个序列中方便地提出许多期望：

| 123456789 | using ::testing::InSequence;{  InSequence dummy;   EXPECT_CALL(...)...;  EXPECT_CALL(...)...;  ...  EXPECT_CALL(...)...;} |
| --------- | ---------------------------------------- |
|           |                                          |

上边说，在dummy范围内的所有预期调用必须以严格的顺序发生。 名称dummy是不相关的。）

**九、验证和重置模拟**

Google Mock会在模拟对象被破坏时验证对模拟对象的期望，或者您可以更早地执行：

| 12345678910 | using ::testing::Mock;...// Verifies and removes the expectations on mock_obj;// returns true iff successful.Mock::VerifyAndClearExpectations(&mock_obj);...// Verifies and removes the expectations on mock_obj;// also removes the default actions set by ON_CALL();// returns true iff successful.Mock::VerifyAndClear(&mock_obj); |
| ----------- | ---------------------------------------- |
|             |                                          |

您还可以告诉Google Mock模拟对象可以泄漏，无需进行验证：

| 1    | Mock::AllowLeak(&mock_obj); |
| ---- | --------------------------- |
|      |                             |

**十、模拟类**

Google Mock定义了一个方便的模拟类模板

| 1234 | class MockFunction<R(A1, ..., An)> { public:  MOCK_METHODn(Call, R(A1, ..., An));}; |
| ---- | ---------------------------------------- |
|      |                                          |

 

 

 

---恢复内容结束---

CheatSheet文档中包含了GMock所有常用的东西，看了这个基本上就可以用它了，本文翻译自：[https://github.com/google/googletest/blob/master/googlemock/docs/CheatSheet.md](https://github.com/google/googletest/blob/master/googlemock/docs/CheatSheet.md)

**一、定义一个模拟类**

**1. 模拟一个正常的类，就是接口类**

  给：

| 12345678 | class Foo {  ...  virtual ~Foo();  virtual **int** GetSize() const = 0;  virtual string Describe(const **char*** name) = 0;  virtual string Describe(**int** type) = 0;  virtual **bool** Process(Bar elem, **int** count) = 0;}; |
| -------- | ---------------------------------------- |
|          |                                          |

(note that ~Foo() must be virtual) we can define its mock as，定义模拟类。

| 12345678 | #include "gmock/gmock.h" class MockFoo : public Foo {  MOCK_CONST_METHOD0(GetSize, **int**());  MOCK_METHOD1(Describe, string(const **char*** name));  MOCK_METHOD1(Describe, string(**int** type));  MOCK_METHOD2(Process, **bool**(Bar elem, **int** count));}; |
| -------- | ---------------------------------------- |
|          |                                          |

创建一个“nice”模拟对象忽略所有无趣的调用，或一个“strict”模拟对象，将它们视为失败：

| 12   | NiceMock<MockFoo> nice_foo;     // The type is a subclass of MockFoo.StrictMock<MockFoo> strict_foo; // The type is a subclass of MockFoo. |
| ---- | ---------------------------------------- |
|      |                                          |

**2. 模拟一个类模板**

To mock：

| 12345678 | template <typename Elem>class StackInterface { public:  ...  virtual ~StackInterface();  virtual **int** GetSize() const = 0;  virtual void Push(const Elem& x) = 0;}; |
| -------- | ---------------------------------------- |
|          |                                          |

(note that ~StackInterface() must be virtual) just append _T to the MOCK_* macros:

| 1234567 | template <typename Elem>class MockStack : public StackInterface<Elem> { public:  ...  MOCK_CONST_METHOD0_T(GetSize, **int**());  MOCK_METHOD1_T(Push, void(const Elem& x));}; |
| ------- | ---------------------------------------- |
|         |                                          |

**3. 指定模拟函数的调用约定**

如果您的mock函数**不使用默认调用约定**，您可以通过将_WITH_CALLTYPE附加到前两个部分中描述的任何宏并指定调用约定作为宏的第一个参数来指定它。例如，

| 12   | MOCK_METHOD_1_WITH_CALLTYPE（STDMETHODCALLTYPE，Foo，**bool**（**int** n））;MOCK_CONST_METHOD2_WITH_CALLTYPE（STDMETHODCALLTYPE，Bar，**int**（**double** x，**double** y））; |
| ---- | ---------------------------------------- |
|      |                                          |

其中STDMETHODCALLTYPE由Windows上的<objbase.h>定义。

**二、在测试中使用模拟器**

典型的流程是：

1. 导入您需要使用的Google Mock名称。所有Google Mock名称都位于测试命名空间中，除非它们是宏或其他注释。
2. 创建模拟对象。
3. （可选）设置模拟对象的默认操作。
4. 设置你对模拟对象的期望（他们怎么叫？他们做什么？）。
5. 使用模拟对象的练习代码;如有必要，请使用Google Test断言检查结果。
6. 当模拟对象被破坏时，Google Mock会自动验证所有对其的期望是否满足。

这里是一个例子：

| 12345678910111213141516 | using ::testing::Return;                            // #1 TEST(BarTest, DoesThis) {  MockFoo foo;                                    // #2   ON_CALL(foo, GetSize())                         // #3      .WillByDefault(Return(1));  // ... other default actions ...   EXPECT_CALL(foo, Describe(5))                   // #4      .Times(3)      .WillRepeatedly(Return("Category 5"));  // ... other expectations ...   EXPECT_EQ("good", MyProductionFunction(&foo));  // #5}                                                 // #6 |
| ----------------------- | ---------------------------------------- |
|                         |                                          |

**三、设置默认操作**

Google Mock对任何返回**void，bool，数值或指针**的函数都有一个内置的默认动作。

要为全局返回类型T的函数自定义默认操作：

| 12345678910 | using ::testing::DefaultValue; // Sets the default value to be returned. T must be CopyConstructible.DefaultValue<T>::Set(value);// Sets a factory. Will be invoked on demand. T must be MoveConstructible.//   T MakeT();DefaultValue<T>::SetFactory(&MakeT);// ... use the mocks ...// Resets the default value.DefaultValue<T>::Clear(); |
| ----------- | ---------------------------------------- |
|             |                                          |

要自定义特定方法的默认操作，请使用ON_CALL（）：

| 123  | ON_CALL(mock_object, method(matchers))    .With(multi_argument_matcher)  ?    .WillByDefault(action); |
| ---- | ---------------------------------------- |
|      |                                          |

**四、设置期望**

**EXPECT_CALL（）**在模拟方法上设置期望（如何调用它？它会做什么？）：

| 12345678 | EXPECT_CALL(mock_object, method(matchers))    .With(multi_argument_matcher)  ?    .Times(cardinality)            ?    .InSequence(sequences)         *    .After(expectations)           *    .WillOnce(action)              *    .WillRepeatedly(action)        ?    .RetiresOnSaturation();        ? |
| -------- | ---------------------------------------- |
|          |                                          |

如果省略Times（），则基数假定为：

- Times（1）当没有WillOnce（）和WillRepeatedly（）;
- 当有n个WillOnce（）但没有WillRepeatedly（）时，Times（n），其中n> = 1; 要么
- 当有n个WillOnce（）和WillRepeatedly（），其中n> = 0时,Times（AtLeast（n））。

没有EXPECT_CALL（）的方法可以被任意调用多次，并且每次都将采取默认操作。

**五、匹配**

匹配器匹配单个参数。 您可以在ON_CALL（）或EXPECT_CALL（）中使用它，或使用它直接验证值：

| **EXPECT_THAT(value, matcher)** | **Asserts that ****value**** matches ****matcher****.** |
| ------------------------------- | ---------------------------------------- |
| ASSERT_THAT(value, matcher)     | The same as EXPECT_THAT(value, matcher), except that it generates a fatal failure. |

内置的匹配（其中参数是函数参数）分为几类：

**1. 通配符**

| **_**                   | **argument**** can be any value of the correct type可以代表任意类型.** |
| ----------------------- | ---------------------------------------- |
| A<type>() or An<type>() | argument can be any value of type可以是type类型的任意值. |

**2. 一般比较**

| Eq(value) 或者 value   | argument == value，method中的形参必须是value     |
| -------------------- | ---------------------------------------- |
| Ge(value)            | argument >= value，method中的形参必须大于等于value  |
| Gt(value)            | argument > value                         |
| Le(value)            | argument <= value                        |
| Lt(value)            | argument < value                         |
| Ne(value)            | argument != value                        |
| IsNull()             | method的形参必须是NULL指针                       |
| NotNull()            | argument is a non-null pointer           |
| Ref(variable)        | 形参是variable的引用                           |
| TypedEq<type>(value) | 形参的类型必须是type类型，而且值必须是value。当模拟函数被重载你可能需要它而不是Eq(vlaue) |

**注意\**** 除了Ref（）之外，这些匹配器会创建一个值的副本，以备日后修改或销毁。 如果编译器抱怨该值没有公共副本构造函数，请尝试将其包装在ByRef（）中，例如。 Eq（ByRef（non_copyable_value））。 如果你这样做，请确保non_copyable_value之后不改变，否则你的匹配器的含义将被改变。

**3. 浮点数的比较**

| DoubleEq(a_double)             | 形参是一个double类型，比如值近似于a_double，两个NaN是不相等的  |
| ------------------------------ | ---------------------------------------- |
| FloatEq(a_float)               | 同上，只不过类型是float                           |
| NanSensitiveDoubleEq(a_double) | 形参是一个double类型，比如值近似于a_double，两个NaN是相等的，这个是用户所希望的方式 |
| NanSensitiveFloatEq(a_float)   | 同上，只不过形参是float                           |

上述匹配器使用基于ULP的比较（与Google Test中使用的比较相同）。 它们根据期望值的绝对值自动选择合理的误差界限。 DoubleEq（）和FloatEq（）符合IEEE标准，这需要比较两个NaNs的相等性返回false。 NanSensitive *版本将两个NaNs相等，这通常是用户想要的。

| **DoubleNear(a_double, max_abs_error)**  | **argument**** is a ****double**** value close to ****a_double**** (absolute error <= ****max_abs_error****), treating two NaNs as unequal.** |
| ---------------------------------------- | ---------------------------------------- |
| FloatNear(a_float, max_abs_error)        | argument is a float value close to a_float (absolute error <= max_abs_error), treating two NaNs as unequal. |
| NanSensitiveDoubleNear(a_double, max_abs_error) | argument is a double value close to a_double (absolute error <= max_abs_error), treating two NaNs as equal. |
| NanSensitiveFloatNear(a_float, max_abs_error) | argument is a float value close to a_float (absolute error <= max_abs_error), treating two NaNs as equal. |

**4. String Matchers**

这里的字符串即可以是C风格的字符串，也可以是C++风格的。

| ContainsRegex(string) | 形参匹配给定的正则表达式                |
| --------------------- | --------------------------- |
| EndsWith(suffix)      | 形参以suffix截尾                 |
| HasSubstr(string)     | 形参有string这个子串               |
| MatchesRegex(string)  | 从第一个字符到最后一个字符都完全匹配给定的正则表达式. |
| StartsWith(prefix)    | 形参以prefix开始                 |
| StrCaseEq(string)     | 参数等于string，并且忽略大小写          |
| StrCaseNe(string)     | 参数不是string，并且忽略大小写          |
| StrEq(string)         | 参数等于string                  |
| StrNe(string)         | 参数不等于string                 |

**5. 容器的匹配**

很多STL的容器的比较都支持==这样的操作，对于这样的容器可以使用上述的Eq（expected_container）来比较或者只是expect_container来完全匹配容器。但如果你想写得更为灵活，可以使用下面的这些容器匹配方法：

| **ContainerEq(container)**               | **The same as ****Eq(container)**** except that the failure message also includes which elements are in one container but not the other.** |
| ---------------------------------------- | ---------------------------------------- |
| Contains(e)                              | argument contains an element that matches e, which can be either a value or a matcher. |
| Each(e)                                  | argument is a container where *every* element matches e, which can be either a value or a matcher. |
| ElementsAre(e0, e1, ..., en)             | argument has n + 1 elements, where the i-th element matches ei, which can be a value or a matcher. 0 to 10 arguments are allowed. |
| ElementsAreArray({ e0, e1, ..., en }), ElementsAreArray(array), or ElementsAreArray(array, count) | The same as ElementsAre() except that the expected element values/matchers come from an initializer list, STL-style container, or C-style array. |
| IsEmpty()                                | argument is an empty container (container.empty()). |
| Pointwise(m, container)                  | argument contains the same number of elements as in container, and for all i, (the i-th element in argument, the i-th element in container) match m, which is a matcher on 2-tuples. E.g. Pointwise(Le(), upper_bounds) verifies that each element in argument doesn't exceed the corresponding element in upper_bounds. See more detail below. |
| SizeIs(m)                                | argument is a container whose size matches m. E.g. SizeIs(2) or SizeIs(Lt(2)). |
| UnorderedElementsAre(e0, e1, ..., en)    | argument has n + 1 elements, and under some permutation each element matches an ei (for a different i), which can be a value or a matcher. 0 to 10 arguments are allowed. |
| UnorderedElementsAreArray({ e0, e1, ..., en }), UnorderedElementsAreArray(array), or UnorderedElementsAreArray(array, count) | The same as UnorderedElementsAre() except that the expected element values/matchers come from an initializer list, STL-style container, or C-style array. |
| WhenSorted(m)                            | When argument is sorted using the < operator, it matches container matcher m. E.g. WhenSorted(UnorderedElementsAre(1, 2, 3)) verifies that argument contains elements 1, 2, and 3, ignoring order. |
| WhenSortedBy(comparator, m)              | The same as WhenSorted(m), except that the given comparator instead of < is used to sort argument. E.g. WhenSortedBy(std::greater<int>(), ElementsAre(3, 2, 1)). |

注意：

- 这些匹配器也可以匹配：
   i. 通过引用传递的本地数组（例如在Foo（const int（＆a）[5]）中）和
   ii. 作为指针和计数传递的数组（例如，在Bar（const T * buffer，int len） - 参见 [Multi-argument Matchers](https://github.com/google/googletest/blob/master/googlemock/docs/CheatSheet.md#Multiargument_Matchers.md)）。
- 匹配的数组可以是多维的（即其元素可以是数组）。
- 在Pointwise（m，...）中的m应该是:: testing :: tuple <T，U>的匹配器，其中T和U分别是实际容器和预期容器的元素类型。 例如，要比较两个Foo容器，其中Foo不支持operator ==但是有一个Equals（）方法，可以写：

| 123456 | using ::testing::get;MATCHER(FooEq, "") {  return get<0>(arg).Equals(get<1>(arg));}...EXPECT_THAT(actual_foos, Pointwise(FooEq(), expected_foos)); |
| ------ | ---------------------------------------- |
|        |                                          |

**6. 成员匹配器**

| **Field(&class::field, m)**   | **argument.field**** (or ****argument->field**** when ****argument**** is a plain pointer) matches matcher ****m****, where ****argument**** is an object of type class.** |
| ----------------------------- | ---------------------------------------- |
| Key(e)                        | argument.first matches e, which can be either a value or a matcher. E.g. Contains(Key(Le(5))) can verify that a map contains a key <= 5. |
| Pair(m1, m2)                  | argument is an std::pair whose first field matches m1 and second field matches m2. |
| Property(&class::property, m) | argument.property() (or argument->property() when argument is a plain pointer) matches matcher m, where argument is an object of type *class*. |

**7. 匹配函数或函数的结果**

| **ResultOf(f, m)** | **f(argument)**** matches matcher ****m****, where ****f**** is a function or functor.** |
| ------------------ | ---------------------------------------- |
|                    |                                          |

** 8. 指针匹配**

| **Pointee(m)**          | **argument**** (either a smart pointer or a raw pointer) points to a value that matches matcher ****m****.** |
| ----------------------- | ---------------------------------------- |
| WhenDynamicCastTo<T>(m) | when argument is passed through dynamic_cast<T>(), it matches matcher m. |

** 9. 多参数匹配器**

从技术上讲，完全匹配器匹配单个值。 “多参数”匹配器只是匹配元组的匹配器。 以下匹配器可用于匹配元组（x，y）：

| **Eq()** | **x == y** |
| -------- | ---------- |
| Ge()     | x >= y     |
| Gt()     | x > y      |
| Le()     | x <= y     |
| Lt()     | x < y      |
| Ne()     | x != y     |

您可以使用以下选择器来选择参数的子集（或对其重新排序）以参与匹配：

| **AllArgs(m)**           | **Equivalent to ****m****. Useful as syntactic sugar in ****.With(AllArgs(m))****.** |
| ------------------------ | ---------------------------------------- |
| Args<N1, N2, ..., Nk>(m) | The tuple of the k selected (using 0-based indices) arguments matches m, e.g. Args<1, 2>(Eq()). |

**10. 复合匹配**

你可以从一个或多个其他匹配器做一个匹配器：

| **AllOf(m1, m2, ..., mn)** | **argument**** matches all of the matchers ****m1**** to ****mn****.** |
| -------------------------- | ---------------------------------------- |
| AnyOf(m1, m2, ..., mn)     | argument matches at least one of the matchers m1 to mn. |
| Not(m)                     | argument doesn't match matcher m.        |

**11. Adapters for Matchers**

| **MatcherCast(m)**    | **casts matcher ****m**** to type ****Matcher****.** |
| --------------------- | ---------------------------------------- |
| SafeMatcherCast<T>(m) | [safely casts](https://github.com/google/googletest/blob/master/googlemock/docs/CookBook.md#casting-matchers) matcher m to type Matcher<T>. |
| Truly(predicate)      | predicate(argument) returns something considered by C++ to be true, where predicate is a function or functor. |

**12 .匹配作为谓词(Matchers as Predicates)**

| **Matches(m)(value)**                    | **evaluates to ****true**** if ****value**** matches ****m****. You can use ****Matches(m)**** alone as a unary functor.** |
| ---------------------------------------- | ---------------------------------------- |
| ExplainMatchResult(m, value, result_listener) | evaluates to true if value matches m, explaining the result to result_listener. |
| Value(value, m)                          | evaluates to true if value matches m.    |

**13. 定义匹配**

| **MATCHER(IsEven, "") { return (arg % 2) == 0; }** | **Defines a matcher ****IsEven()**** to match an even number.** |
| ---------------------------------------- | ---------------------------------------- |
| MATCHER_P(IsDivisibleBy, n, "") { *result_listener << "where the remainder is " << (arg % n); return (arg % n) == 0; } | Defines a macher IsDivisibleBy(n) to match a number divisible by n. |
| MATCHER_P2(IsBetween, a, b, std::string(negation ? "isn't" : "is") + " between " + PrintToString(a) + " and " + PrintToString(b)) { return a <= arg && arg <= b; } | Defines a matcher IsBetween(a, b) to match a value in the range [a, b]. |

笔记：

1. MATCHER *宏不能在函数或类中使用。
2. 匹配器主体必须是纯功能性的（即它不能有任何副作用，并且结果必须不依赖于被匹配的值和匹配器参数之外的任何东西）。
3. 您可以使用PrintToString（x）将任何类型的值x转换为字符串。

**14. 匹配作为测试断言**

| **ASSERT_THAT(expression, m)** | **Generates a **[**fatal failure**](https://github.com/google/googletest/blob/master/googletest/docs/Primer.md#assertions)** if the value of ****expression**** doesn't match matcher ****m****.** |
| ------------------------------ | ---------------------------------------- |
| EXPECT_THAT(expression, m)     | Generates a non-fatal failure if the value of expression doesn't match matcher m. |

**六、动作Actions**

操作指定了mock函数在调用时应该执行的操作。

**1. 返回值**

| **Return()**              | **Return from a ****void**** mock function.** |
| ------------------------- | ---------------------------------------- |
| Return(value)             | Return value. If the type of value is different to the mock function's return type, value is converted to the latter type *at the time the expectation is set*, not when the action is executed. |
| ReturnArg<N>()            | Return the N-th (0-based) argument.      |
| ReturnNew<T>(a1, ..., ak) | Return new T(a1, ..., ak); a different object is created each time. |
| ReturnNull()              | Return a null pointer.                   |
| ReturnPointee(ptr)        | Return the value pointed to by ptr.      |
| ReturnRef(variable)       | Return a reference to variable.          |
| ReturnRefOfCopy(value)    | Return a reference to a copy of value; the copy lives as long as the action. |

**2. 副作用（Side Effects）**

| **Assign(&variable, value)**     | **Assign ****value**** to variable.**    |
| -------------------------------- | ---------------------------------------- |
| DeleteArg<N>()                   | Delete the N-th (0-based) argument, which must be a pointer. |
| SaveArg<N>(pointer)              | Save the N-th (0-based) argument to *pointer. |
| SaveArgPointee<N>(pointer)       | Save the value pointed to by the N-th (0-based) argument to *pointer. |
| SetArgReferee<N>(value)          | Assign value to the variable referenced by the N-th (0-based) argument. |
| SetArgPointee<N>(value)          | Assign value to the variable pointed by the N-th (0-based) argument. |
| SetArgumentPointee<N>(value)     | Same as SetArgPointee<N>(value). Deprecated. Will be removed in v1.7.0. |
| SetArrayArgument<N>(first, last) | Copies the elements in source range [first, last) to the array pointed to by the N-th (0-based) argument, which can be either a pointer or an iterator. The action does not take ownership of the elements in the source range. |
| SetErrnoAndReturn(error, value)  | Set errno to error and return value.     |
| Throw(exception)                 | Throws the given exception, which can be any copyable value. Available since v1.1.0. |

**3. 使用函数或函子作为动作Using a Function or a Functor as an Action**

| **Invoke(f)**                            | **Invoke ****f**** with the arguments passed to the mock function, where ****f**** can be a global/static function or a functor.** |
| ---------------------------------------- | ---------------------------------------- |
| Invoke(object_pointer, &class::method)   | Invoke the {method on the object with the arguments passed to the mock function. |
| InvokeWithoutArgs(f)                     | Invoke f, which can be a global/static function or a functor. f must take no arguments. |
| InvokeWithoutArgs(object_pointer, &class::method) | Invoke the method on the object, which takes no arguments. |
| InvokeArgument<N>(arg1, arg2, ..., argk) | Invoke the mock function's N-th (0-based) argument, which must be a function or a functor, with the k arguments. |

被调用函数的返回值被用作动作的返回值。

定义要与Invoke *（）一起使用的函数或函数时，可以将任何未使用的参数声明为未使用：

```c++
double Distance(Unused, double x, double y) { return sqrt(x*x + y*y); }
  ...
EXPECT_CALL(mock, Foo("Hi", _, _)).WillOnce(Invoke(Distance));
```

在Invoke Argument <N>（...）中，如果一个参数需要通过引用传递，则将其包装在ByRef（）中。 例如，

```c++
InvokeArgument<2>(5, string("Hi"), ByRef(foo))
```

调用模拟函数＃2参数，通过值传递给它5和字符串（“Hi”），并通过引用传递foo。

**Default Action**

| **DoDefault()** | **Do the default action (specified by ****ON_CALL()**** or the built-in one).** |
| --------------- | ---------------------------------------- |
|                 |                                          |

Note: due to technical reasons, DoDefault() cannot be used inside a composite action - trying to do so will result in a run-time error.

**Composite Actions**

| **DoAll(a1, a2, ..., an)**   | **Do all actions ****a1**** to ****an**** and return the result of ****an**** in each invocation. The first ****n - 1****sub-actions must return void.** |
| ---------------------------- | ---------------------------------------- |
| IgnoreResult(a)              | Perform action a and ignore its result. a must not return void. |
| WithArg<N>(a)                | Pass the N-th (0-based) argument of the mock function to action a and perform it. |
| WithArgs<N1, N2, ..., Nk>(a) | Pass the selected (0-based) arguments of the mock function to action a and perform it. |
| WithoutArgs(a)               | Perform action a without any arguments.  |

**Defining Actions**

| **ACTION(Sum) { return arg0 + arg1; }**  | **Defines an action ****Sum()**** to return the sum of the mock function's argument #0 and #1.** |
| ---------------------------------------- | ---------------------------------------- |
| ACTION_P(Plus, n) { return arg0 + n; }   | Defines an action Plus(n) to return the sum of the mock function's argument #0 and n. |
| ACTION_Pk(Foo, p1, ..., pk) { statements; } | Defines a parameterized action Foo(p1, ..., pk) to execute the given statements. |

The ACTION* macros cannot be used inside a function or class.

**七、Cardinalities基数**

这些在Times（）中用于指定将调用模拟函数的次数：

| **AnyNumber()** | **The function can be called any number of times.** |
| --------------- | ---------------------------------------- |
| AtLeast(n)      | The call is expected at least n times.   |
| AtMost(n)       | The call is expected at most n times.    |
| Between(m, n)   | The call is expected between m and n (inclusive) times. |
| Exactly(n) or n | The call is expected exactly n times. In particular, the call should never happen when n is 0. |

**八、期望顺序（Expectation Order）**

默认情况下，期望可以按任何顺序匹配。如果一些或所有期望必须在给定的顺序中匹配，则有两种方式来指定它们。 它们可以单独使用或一起使用。

**1.The After Clause**

```c++
using ::testing::Expectation;
...
Expectation init_x = EXPECT_CALL(foo, InitX());
Expectation init_y = EXPECT_CALL(foo, InitY());
EXPECT_CALL(foo, Bar())
    .After(init_x, init_y);
```

上边说，只有在InitX（）和InitY（）被调用之后才能调用Bar（）。

如果你不知道你写的期望有多少个前提条件，你可以使用ExpectationSet来收集它们：

```c++
using ::testing::ExpectationSet;
...
ExpectationSet all_inits;
for (int i = 0; i < element_count; i++) {
  all_inits += EXPECT_CALL(foo, InitElement(i));
}
EXPECT_CALL(foo, Bar())
    .After(all_inits);
```

上面说，只有在所有元素都被初始化之后才能调用Bar（）。（但我们不关心哪些元素在其他元素之前被初始化）。

在 .After(all_inits) 中使用ExpectationSet之后再修改ExpectationSet不会影响.After（）的含义。

**2. 序列**

当你有一个长链的顺序期望，使用序列指定顺序更容易，这不需要给链中的每个期望一个不同的名称。同一序列中的所有预期调用必须按其指定的顺序发生。

```c++
using ::testing::Sequence;
Sequence s1, s2;
...
EXPECT_CALL(foo, Reset())
    .InSequence(s1, s2)
    .WillOnce(Return(true));
EXPECT_CALL(foo, GetSize())
    .InSequence(s1)
    .WillOnce(Return(1));
EXPECT_CALL(foo, Describe(A<const char*>()))
    .InSequence(s2)
    .WillOnce(Return("dummy"));
```

上边说，Reset()必须在GetSize（）和Describe（）之前调用，后两个可以以任何顺序发生。

在一个序列中方便地提出许多期望：

```c++
using ::testing::InSequence;
{
  InSequence dummy;
 
  EXPECT_CALL(...)...;
  EXPECT_CALL(...)...;
  ...
  EXPECT_CALL(...)...;
}
```

上边说，在dummy范围内的所有预期调用必须以严格的顺序发生。 名称dummy是不相关的。）

**九、验证和重置模拟**

Google Mock会在模拟对象被破坏时验证对模拟对象的期望，或者您可以更早地执行：

```c++
using ::testing::Mock;
...
// Verifies and removes the expectations on mock_obj;
// returns true iff successful.
Mock::VerifyAndClearExpectations(&mock_obj);
...
// Verifies and removes the expectations on mock_obj;
// also removes the default actions set by ON_CALL();
// returns true iff successful.
Mock::VerifyAndClear(&mock_obj);
```

您还可以告诉Google Mock模拟对象可以泄漏，无需进行验证：

```c++
Mock::AllowLeak(&mock_obj);
```

**十、模拟类**

Google Mock定义了一个方便的模拟类模板

```c++
class MockFunction<R(A1, ..., An)> {
 public:
  MOCK_METHODn(Call, R(A1, ..., An));
};
```

 See this [recipe](https://github.com/google/googletest/blob/master/googlemock/docs/CookBook.md#using-check-points) for one application of it.

**十 一、Flags**

| **--gmock_catch_leaked_mocks=0** | **Don't report leaked mock objects as failures.** |
| -------------------------------- | ---------------------------------------- |
| --gmock_verbose=LEVEL            | Sets the default verbosity level (info, warning, or error) of Google Mock messages. |

**十二、一个关于匹配器的例子**

举一个测试重载函数的匹配器的例子吧，感觉这个挺麻烦的，另外google提供了很多例子，不知道怎么写的时候，可以去里边找。

```c++
//接口类
class Foo {
public:
   virtual bool Transform() = 0;
   // Overloaded on the types and/or numbers of arguments.
   virtual int Add(char x) = 0;
   virtual int Add(int x,int y) = 0;
   virtual int Add(int times, char x) = 0;
   
protected:
    virtual void Resume() = 0;
 
private:
    virtual int GetTimeOut() = 0;
};

#include "Foo.h"
#include "gmock\gmock.h"
//模拟类
//子类修改父类的访问权限
class MockFoo : public Foo {
public:
 
    MOCK_METHOD0(Transform, bool());
 
    // The following must be in the public section, even though the
    // methods are protected or private in the base class.
    MOCK_METHOD0(Resume, void());
    MOCK_METHOD0(GetTimeOut, int());
    //virtual int Add(char x);
    //virtual int Add(int times, char x);
    // virtual int Add(int x);
    MOCK_METHOD1(Add, int(char x));
    //MOCK_METHOD1(Add, int(int x));
    MOCK_METHOD2(Add, int(int times, char x));
    // virtual int Add(int x,int y) = 0;
    MOCK_METHOD2(Add, int(int x, int y));
};
```

测试用例：

```c++
#include "stdafx.h"
using namespace std;
using ::testing::Return;
using ::testing::_;
using ::testing::An;
using ::testing::Matcher;
using ::testing::Lt;
using ::testing::TypedEq;
using ::testing::Matches;
using ::testing::Le;
using ::testing::Ne;
using ::testing::AllOf;
 
 
//测试模拟private、protected方法：
TEST(TestMockPrivate, TestPrivate) {
   
    MockFoo foo;
    //GetTimeOut是private修饰的
    EXPECT_CALL(foo, GetTimeOut())
        .WillOnce(Return(1));
 
    cout << "test private GetTimeOut:" << foo.GetTimeOut() << endl; //1
}
//测试重载方法
TEST(TestMockOverload, TestOverload) {
    MockFoo foo;
 
    EXPECT_CALL(foo, Add(_))
        .Times(1)
        .WillOnce(Return(1));
 
    cout << "test TestOverload Add:" << foo.Add('c') << endl; //1
}
//测试数量相同，类型不同的情况。
// virtual int Add(int x,int y) = 0;
// virtual int Add(int times, char x) = 0;
TEST(TestMockOverload, TestSameNumArg) {
    MockFoo foo;
    //两个都是int
    EXPECT_CALL(foo, Add(An<int>(), An<int>()))
        .Times(1)
        .WillOnce(Return(8));
    int c = foo.Add(3, 5);
    cout << "test TestOverload Add:" <<c<< endl; //8
 
     
    EXPECT_CALL(foo, Add(Matcher<int>(Lt(10)), TypedEq<char>('c')))
        .Times(1)
        .WillOnce(Return(7));
    c = foo.Add(2, 'c');
    cout << "test TestOverload Add:" << c << endl; //7
}
//测试数量相同，类型不同的情况。
TEST(TestMockOverload, TestSameNumArg2) {
   MockFoo foo;
   EXPECT_CALL(foo, Add(Matcher<int>(Lt(5)), An<int>()))
        .Times(1)
        .WillOnce(Return(7));
    int c = foo.Add(2, 5);
    cout << "test TestOverload Add:" << c << endl; //7
    //第一个参数小于5，,第二个参数是'd'
    EXPECT_CALL(foo, Add(Matcher<int>(Lt(5)), Matcher<char>('d')))
        .Times(1)
        .WillOnce(Return(10));
    c = foo.Add(2, 'd'); //10
    cout << "test TestOverload Add:" << c << endl; //10
}
int main(int argc, char** argv) {
    ::testing::InitGoogleMock(&argc, argv);
 
    return RUN_ALL_TESTS();
}
```

运行结果：可以看到都成功啦。

 















