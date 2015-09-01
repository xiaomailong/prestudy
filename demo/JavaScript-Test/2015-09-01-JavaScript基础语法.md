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
