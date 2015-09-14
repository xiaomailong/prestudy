---  
layout: post  
title:  "Javascript基础语法"  
date:   2015-09-01  
categories: JavaScript  
tagline: JavaScript  
tags : [JavaScript]  
---  


#Javascript基础语法  

##【简介】  
    [1]定义:一种专为与网页交互而设计的脚本语言,也就是解释型编程语言。  

    [2]组成:  
    　　[2.1]ECMAScript由ECMA-262定义，提供核心语言功能（ECMA是欧洲计算机制造商协会）
    　　[2.2]DOM文档对象模型，提供访问和操作网页内容的方法的接口
    　　[2.3]BOM浏览器对象模型，提供与浏览器交互的方法的接口

##【script标签】  
    [1]使用方式:引入外部文件和在页面内嵌入js代码  

    [2]注意:带有src属性的<script>元素不应该在其<script>标签之间再包含额外的js代码，如果包含了嵌入的代码，则只会下载并执行外部脚本，而忽略嵌入的代码

    [3]浏览器在遇到<body>标签时才开始呈现内容。因此，把<script>引用放在<body>元素中页面内容的后面是最佳选择

    [4]<script>中async属性表示应该立即下载脚本，但不应妨碍页面中的其他操作;defert属性表示脚本可以延迟到文档完全被解析和显示之后再执行(这两个属性都只对外部脚本文件有效)  

##【严格模式】
    [1]整个脚本启用严格模式，在顶部执行："use strict"  

    [2]在指定函数中执行严格模式，在函数体第一行："use strict"  

    [3]不支持strict模式的浏览器会把"use strict"当做一个字符串语句执行，支持strict模式的浏览器将开启strict模式运行JavaScript  

    [4]支持严格模式的浏览器包括IE10+、Firefox4+、safari12+、opera12+、chrome  

##【关键字和保留字】  
    [1]关键字  
    Break | do| instanceof| typeof | case | else | new | var | catch | finally | return | void | continue | for | *switch | while | function | this | with | default | if | throw | delete | in | try | debugger*  

    [2]保留字  
    Abstract | enum | int | short | Boolean | export | interface | static | byte | extends | long | super | char | *final | native | synchronized | class | float | package | throws | const | goto | private | transient | *debugger | implements | protected | volatile | double | import | public  

    [3]第5版在非严格模式下的保留字  
    Class | enum | extends | super | const | export | import  

    [4]第5版在严格模式下的保留字  
    Implements | package | public | interface | private | static | let* | protected | yield*  

    [注意1]在js中，class是保留字，不可使用，而应该用className。class->className  

    [注意2]在严格模式下，eval和arguments也不可作为标识符  


#javascript严格模式下的8点规则  
##【作用】  
　　[1]消除js语法的一些不合理、不严谨、不安全问题，减少怪异行为并保证代码运行安全
　　[2]提高编译器效率，增加运行速度

##【使用】  
　　[1]整个脚本启用严格模式，在顶部执行："use strict";
　　[2]在指定函数中执行严格模式，在函数体第一行："use strict"
　　[3]不支持strict模式的浏览器把"use strict"当做一个字符串语句执行，支持strict模式的浏览器将开启strict模式
　　[4]支持严格模式的浏览器包括IE10+、Firefox4+、safari12+、opera12+、chrome

##【规则】  
###【1】【变量】  
　　[a]不允许意外创建全局变量  
        "use strict";
        message = 'hello world!';  

　　[b]不能对变量调用delete操作符  
        "use strict";
        var color = 'red';
        delete color;

###【2】【对象】  
　　[a]不能为只读属性赋值
        "use strict";
        var person = {
            name:'cook'
        };
        Object.defineProperty(person,'name',{
            writable: false
        });
        person.name = 'Nicholas';

　　[b]不能为不可配置的属性使用delete操作
        "use strict";
        var person = {
            name:'cook'
        };
        Object.defineProperty(person,'name',{
            configurable: false
        });
        delete person.name;

###【3】函数  
　　[a]参数必须唯一
        "use strict";
        function sun(num,num){
            //TODO
        }

　　[b]修改形参不会反映到arguments中
        function showValue(value){
            value = "Foo";
            alert(arguments[0]);
            //非严格模式:"Foo"
            //严格模式:"Hi"
        }
        showValue("Hi");

　　[c]不允许使用arguments.callee和arguments.caller
        "use strict";
        function fn(num){
            return arguments.callee(num);
        }
        fn(2);

        "use strict";
        function outer(){
            inner();
        }
        function inner(){
            alert(inner.caller());
        }
        outer();

###【4】不允许eval()在包含上下文中创建变量或函数  
        "use strict";
        function fn(){
            eval("var x=10");
            alert(x);
        }
        fn();

        //允许以下操作
        var result = eval("var x = 10, y = 11; x+y");
        alert(result);//21

###【5】不允许使用eval和arguments作为标识符，也不允许读写他们的值  
        "use strict";
        var eval = 10;
        var arguments = 20;

###【6】不允许this值为null或undefined  
        "use strict";
        var color = "red";
        function fn(){
            alert(this.color);
        }
        fn();

###【7】不允许使用with语句  
        "use strict";
        with(location){
            alert(href);
        }

###【8】不允许使用八进制字面量  
        "use strict";
        var value = 010;
