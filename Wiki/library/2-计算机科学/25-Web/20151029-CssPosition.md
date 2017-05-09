---
layout: post  
title: CSS位置  
lead: 本文主要是学习CSS位置的笔记，总结了一些基本概念，知识点和细节。  
date: 2015-10-29T00:00:00.000Z  
categories: Web  
tagline: Css  
tags: [Css]

---

[浅谈css中的position](http://www.cnblogs.com/bingooo/p/4786909.html)

# 什么是position

根据css 2.1中的描述，position和float的值决定了浏览器要采用那种定位算法来计算元素盒子的具体位置。先避开float不谈，本文主要介绍position属性的不同取值并对相对定位（relative）和绝对定位（absolute）进行一个简单的比较。

# 5种不同的取值

值 |描述
absolute |生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位。元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。  
fixed |生成绝对定位的元素，相对于浏览器窗口进行定位。元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。  
relative |生成相对定位的元素，相对于其正常位置进行定位。因此，"left:20" 会向元素的 LEFT 位置添加 20 像素。  
static |默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right 或者 z-index 声明）。  
inherit |规定应该从父元素继承 position 属性的值。  

-	position的值为absolute、fixed的元素脱离文档流，static、relative没有脱离文档流  
 -父子节点都是没有脱离文档的两种定位（static、relative）的外边距（margin）会合并，显示效果以最大的那个外边距为准。
 -inherit 顾名思义，元素的position属性值从该元素的父元素继承而来，即与父元素相同。  
 -static position属性的默认值。被应用了position:static的元素，会根据文档流中的位置来显示，即原始的html文档结构是什么样子，元素就会显示在什么位置。left、right、top、bottom属性设置的值将不起作用。对margin/padding敏感。  
 -fixed 固定定位，即一旦指定了元素的显示位置，该元素就会一直显示在屏幕上的那个位置，即使滚动屏幕，元素在屏幕中的位置依然不变。  
 -relative 相对定位，下文详述。  
 -absolute 绝对定位，下文详述。  

# 相对定位

相对定位根据文档流中元素的初始位置加上指定的偏移量（offset）来计算元素的最终显示位置。采用相对定位的元素不影响其他相邻盒子的显示效果，即如果元素B采用了相对定位，文档流中元素B后面的元素依然根据元素B的初始位置来计算最终的显示位置，就好像元素B依然占据原来的位置并没有偏移一样。如下图，在给第二列第三行的元素应用了相对定位后，第二列第四行的元素并没有向下移动。

相对定位效果展示  
<img src="http://images2015.cnblogs.com/blog/807194/201509/807194-20150906193401717-919330878.png" title="relative position" alt="相对定位效果展示" />

# 绝对定位

采用绝对定位的元素，其位置由left、right、top、bottom指定的偏移量和元素的包含块（containing block）来确定。什么是包含块，在绝对定位的语境下，采用绝对定位的元素，它的包含块由离他最近的使用绝对/相对/固定定位的父元素确定，具体规则参考CSS规范。采用绝对定位的元素将脱离文档流。如下图，第三行元素应用了绝对定位，脱离的文档流，第四行元素上移占据了第三行元素原来的位置。第三行元素则显示在了左上角位置。

绝对定位效果展示  
<img src="http://images2015.cnblogs.com/blog/807194/201509/807194-20150906193437201-496628392.png" title="absolute position" alt="绝对定位效果展示" />

# 相对定位 VS 绝对定位

从上面的分析可以看出，不管是相对定位还是绝对定位，都是根据left、right、top、bottom这四个属性设置的偏移量来定位元素的，不同的地方在于计算的参考起点不同。相对定位根据元素在文档流中的原始位置来计算最终的显示位置，绝对定位根据元素的包含块的位置来计算最终的显示位置。
