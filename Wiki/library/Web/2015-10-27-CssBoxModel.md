---

layout: post  
title: CSS盒模型  
lead: 本文主要是学习CSS盒模型的笔记，总结了一些基本概念，知识点和细节。  
date: 2015-10-27T00:00:00.000Z  
categories: Web  
tagline: Css  
tags: [Css]

---

[详解CSS盒模型](http://www.cnblogs.com/lrzw32/p/4912018.html)

# 一些基本概念

HTML的大多数元素都是块级(block)元素或行内(inline)元素

## 块级元素

默认情况下，块级元素会另起一行，并尽可能的充满整个容器。 块级元素可以包含行内元素和其他块级元素，相比于行内元素可以创建更复杂和大型的结构

### 块级元素列表：

#### html5新增的元素：

figcation：图文信息组标题 ， article：文章， figure：图文信息组 output：表单输出， aside：侧栏内容， footer：区段尾或页尾， audio：音频播放 video：视频播放， section：页面区段， canvas：画布、绘制图形， header：区段头或页头 hgroup：标题组，address：联系方式信息， ol：有序列表， p：行， form：表单， pre：预格式化文本， blockqute：块引用 h1-h6：标题， table：表格， dd：列表中条目描述， dl：定义列表， div，hr：水平分割线

## 行内元素

行内元素不会另起一行只占据它对应的标签的边框所包含内容的空间， 只能包含数据和其他行内元素

### 行内元素列表

b，big，i，small，tt，abbr，acronym，cite，code，dfn，em，kbd，strong，samp，var，a，bdo，br，img，map，object，q，script，span，sub，sup，button，input，label，select，textarea

## 块级元素和行内元素的区别

### 块级元素：

1.	块级元素会独占一行，其宽度自动填满其父元素宽度，  
2.	可以设置width，height，margin，padding，border属性  
3.	默认宽度是容器的100%【注意：块级元素即使设置了宽度，仍然是独占一行的】

### 行内元素：

1.	行内元素不会独占一行，相邻的行内元素会排列在同一行里，知道一行排不下，才会换行，其宽度随元素的内容而变化
2.	高度和宽度就是内容的高度和宽度行内元素设置width, height无效  
3.	行内元素的水平方向的padding-left, padding-right, margin-left, margin-right都产生边距效果，但是竖直方向的padding-top, padding-bottom, margin-top, margin-bottom都不会产生边距效果换句话说就是**水平方向有效，竖直方向无效**
4.	border和padding可以设置，但是border-top和padding-top到页面顶部后就不再增加

### 可变元素

四不像的东西，可变元素，怎么判断他到底是什么（可变元素需要根据上下文的语境来决定他到底是块还是行）通俗点讲：  
1. 块级元素一般用来搭建网站架构、布局、承载内容  
2. 内联元素一般用来在网站内容中的某些细节或者部位，用以“强调、区分样式、上标、下标、锚点”等等。

整个HTML页面不就是行级和块级，最主要的是他们可以通过display:inline / block 相互的转换。

## display属性

display属性用于定义建立布局时元素生成的显示框类型，可以用来切换块和行显示模式。但是这里面有问题：对于 HTML 等文档类型，如果使用 display 不谨慎会很危险，因为可能违反 HTML 中已经定义的显示层次结构。他会破坏文档的结构所以请慎用。

"display"属性的取值范围是： inline | block | list-item | inline-block | table | inline-table | table-row-group | table-header-group | table-footer-group | table-row | table-column-group | table-column | table-cell | table-caption | none | inherit

"display"属性的初始值为"inline"。注意，尽管"display"属性的初始值为"inline"，但是UA的默认样式表可能覆盖这个值。

以下是每种取值的具体含义：

-	block 应用该属性值的元素将会产生一个块盒子。  
-	inline-block 应用该属性值的元素将产生一个行级块容器。inline-block的内部被格式化成一个块盒子，元素本身被格式化成一个原子行级盒子。  
-	inline 应用该属性值的元素将会产生一到多个行盒子。  
-	list-item 应用该属性值的元素（比如html中的li）将会产生一个主块级盒子和一个标签盒子。  
-	none 应用该属性值的元素将不会出现在格式化结构（formatting structure）中，也就是说，元素不产生任何盒子，对布局没有任何影响。元素的后代元素也不产生盒子，元素和元素的内容被从格式化结构中完全删除。通过设置后代元素的"display"属性值也不能改变。 请注意，"display"为"none"时不产生任何不可见的盒子，实际上，根本不产生任何盒子。如果想产生既不可见又影响格式化结构的盒子，请参考visibility属性。  
-	table,inline-table,table-row-group, table-column, table-column-group, table-header-group, table-footer-group, table-row, table-cell, and table-caption，应用这些属性值的元素将表现得像一个表格元素。

display这个东西属性太多了，没有办法一个一个说，我们来说说关键的几个none、block、inline、inline-block，其实也是平时我们说的最多的。

### inline元素的特点：  
- 和其他元素都在一行上；  
- 高，行高及顶和底边距不可改变；  
- 宽度就是它的文字或图片的宽度，不可改变。

### block特点  
- 总是在新行上开始；  
- 高度，行高以及顶和底边距都可控制；  
- 宽度缺省是它的容器的100%，除非设定一个宽度

### inline-block

inline-block顾名思义，它既有inline的特性，又有block的特性，大家可以想想一般的button、input是什么样子的。拿button举例子。我们在页面中输入若干个button，发现它们是“流”式排列的（可以对比一下若干个div的排列方式）。但是针对一个button，我们还可以自定义修改它的形状，这样就有“块”的特征。这个就是我们之前讲的四不像。

## 正常流

正常流指：从左到右，从上到下显示。要让一个元素不在正常流中，唯一的办法是让元素浮动或定位

## 非替换元素

如果元素的内容包含在文档中，则称之为非替换元素。比如一个段落的文本都在该元素本身之内，这个段落就是一个非替换元素。

## 替换元素

作为其他内容占位符的一个元素称为替换元素，根据标签和属性的值来显示内容的元素。比如img元素，它只是指向一个图像文件，这个文件插入到文档流中。大多数表单元素（input，根据type属性来显示内容）也是替换元素。

## 根元素

位于文档树的顶端，在html文档中就是html元素

# 盒模型

html文档中的每个元素都被描绘成矩形盒子，这些矩形盒子通过一个模型来描述其占用空间，这个模型称为盒模型。盒模型通过四个边界来描述：  
1. margin（外边距）  
2. border（边框）  
3. padding（内边距）  
4. content（内容区域）  
如图所示：

<a class="fancybox" title="CSS盒模型" href="http://7xnjy3.com1.z0.glb.clouddn.com/box-model.jpg" rel="group">  
 <img title="CSS盒模型" src="http://7xnjy3.com1.z0.glb.clouddn.com/box-model.jpg" alt="CSS盒模型" />  
</a>

## CSS盒模型几点提示

1.	padding，border，margin都是可选的，默认值为0，但是浏览器会自行设置元素的margin和padding，通过在css样式表中设置\*\{ margin:0; padding:0\}来覆盖浏览器样式。注意：这里的*表示所有元素，但是这样性能不好，建议一次列出常用的元素来设置
2.	如果给元素设置背景，并且边框的颜色为透明，背景将应用于内容，内边距和边框组成的区域。
3.	浏览器兼容性  
	一旦为页面设置了恰当的 DTD，大多数浏览器都会按照上面的图示来呈现内容。然而 IE 5 和 6 的呈现却是不正确的。 根据 W3C 的规范，元素内容占据的空间是由 width 属性设置的，而内容周围的 padding 和 border 值是另外计算的。 不幸的是，IE5.X 和 6 在怪异模式中使用自己的非标准模型。这些浏览器的 width 属性不是内容的宽度，而是内容、内边距和边框的宽度的总和。
4.	padding只存在于一个盒子内部，所以通常它不会涉及与其他盒子之间的关系和相互影响的问题。
5.	margin则用于调整不同的盒子之间的位置关系。  
	① 行内元素之间的水平margin。两个块级元素之间的距离为margin-left与margin-right的总和  
	② 块级元素之间的竖直margin。两个块级元素之间的距离不是margin-bottom与margin-top的总和，而是两者中的较大者。 这个现象称为margin的“塌陷”（或称为“合并”）现象，意思是说较小的margin塌陷（合并）到了较大的margin中。

## 水平格式化

### 非替换元素的水平格式化

水平格式化的7大属性是：margin-left，border-left，padding-left，width，padding-right，border-right，margin-right。这7个属性值加起来往往是父级元素的width值。 >其中margin-left，width，margin-right可以设置为auto。

*主要有下面几种情况：*

#### 1. 一个属性设置成auto

如果三个属性中某个属性设置了auto，其余两个为特定的值，那么设置auto的属性为确定所需的元素，从而使得元素框的宽度等于父级元素的width。

```html
<div class="parent1">  
  <span class="block">块级元素</span>
</div>
<style type="text/css">  
  .parent1
  {      
    width: 600px;  
    font-size: 10px;  
  }
  div .parent1
  {
    background: # eeb3b3 none repeat scroll 0 0;
  }
  .parent1 .block
  {
    background: # ffd800 none repeat scroll 0 0;
    display: block;
    margin-left: auto;
    margin-right: 100px;
    border: 0;
    padding: 30px;
    width: 100px;
  }  
</style>
```

<div class="parent1">  
  <span class="block">块级元素</span>
</div>

<style type="text/css">  
.parent1  
{  
 width: 600px;  
 font-size: 10px;  
}  
div .parent1  
{  
 background: # eeb3b3 none repeat scroll 0 0;  
}  
.parent1 .block  
{  
 background: # ffd800 none repeat scroll 0 0;  
 display: block;  
 margin-left: auto;  
 margin-right: 100px;  
 border: 0;  
 padding: 30px;  
 width: 100px;  
}  
.fancybox {  
 display: block;  
 margin: 0;  
 border: 0;  
 padding: 0;  
}  
.fancybox img  
{  
 max-width: 100%;  
}  
</style>

<a class="fancybox" href="http://7xnjy3.com1.z0.glb.clouddn.com/box-model-demo1.1.jpg" rel="group">  
 <img src="http://7xnjy3.com1.z0.glb.clouddn.com/box-model-demo1.1.jpg" alt="" />  
</a>

<a class="fancybox" href="http://7xnjy3.com1.z0.glb.clouddn.com/box-model-demo1.2.jpg" rel="group">  
 <img src="http://7xnjy3.com1.z0.glb.clouddn.com/box-model-demo1.2.jpg" alt="" />  
</a>

被设置为auto的margin-auto属性值为340px，即  
>margin-left + border-left + padding-left + width + padding-right + border-right + margin-right =  
>  
>340 + 0 + 30 + 100 + 30 + 0 + 100 = 600

#### 2. 总和不等于父级元素的width

使用auto可以弥补实际值与所需总和的差距，如果三个属性都设置了特定值，但是总和不等于父级元素的width。

修改上面例子中的margin-left为100px，即

```html
<div class="parent2">  
  <span class="block">块级元素</span>
</div>
<style type="text/css">  
  .parent2
  {  
    width: 600px;  
    font-size: 10px;  
  }  
  div .parent2
  {  
    background: # eeb3b3 none repeat scroll 0 0;  
  }  
  .parent2 .block
  {  
    background: # ffd800 none repeat scroll 0 0;  
    display: block;  
    margin-left: 100px;  
    margin-right: 100px;  
    border: 0;
    padding: 30px;  
    width: 100px;  
  }  
</style>
```

<div class="parent2">  
  <span class="block">块级元素</span>
</div>

<style type="text/css">  
.parent2  
{  
 width: 600px;  
 font-size: 10px;  
}  
div .parent2  
{  
 background: # eeb3b3 none repeat scroll 0 0;  
}  
.parent2 .block  
{  
 background: # ffd800 none repeat scroll 0 0;  
 display: block;  
 margin-left: 100px;  
 margin-right: 100px;  
 border: 0; padding: 30px;  
 width: 100px;  
}  
</style>

<a class="fancybox" href="http://7xnjy3.com1.z0.glb.clouddn.com/box-model-demo2.1.jpg" rel="group">  
 <img src="http://7xnjy3.com1.z0.glb.clouddn.com/box-model-demo2.1.jpg" alt="" />  
</a>

<a class="fancybox" href="http://7xnjy3.com1.z0.glb.clouddn.com/box-model-demo2.2.jpg" rel="group">  
 <img src="http://7xnjy3.com1.z0.glb.clouddn.com/box-model-demo2.2.jpg" alt="" />  
</a>

在上面的CSS中，margin-left，width，margin-right都设置了特定值，但是七大属性总和不等于父级元素的width。这种情况下：  
>在FireFox中，margin-right的值为开发者设定的值  
>  
>在Chrome中，margin-right被强制为auto

#### 3. width设置为auto

如果margin-left和margin-right都设置特定值，width设置为auto，则width将会等于某个特定值以达到父级元素的width。  
如果将width修改为auto，即：

```html
<div class="parent3">  
  <span class="block">块级元素</span>
</div>
<style type="text/css">  
  .parent3
  {  
    width: 600px;  
    font-size: 10px;  
  }  
  div .parent3
  {  
    background: # eeb3b3 none repeat scroll 0 0;  
  }  
  .parent3 .block
  {  
    background: # ffd800 none repeat scroll 0 0;  
    display: block;  
    margin-left: 100px;  
    margin-right: 100px;  
    border: 0;
    padding: 30px;  
    width: auto;  
  }  
</style>
```

<div class="parent3">  
  <span class="block">块级元素</span>
</div>

<style type="text/css">  
.parent3  
{  
 width: 600px;  
 font-size: 10px;  
}  
div .parent3  
{  
 background: # eeb3b3 none repeat scroll 0 0;  
}  
.parent3 .block  
{  
 background: # ffd800 none repeat scroll 0 0;  
 display: block;  
 margin-left: 100px;  
 margin-right: 100px;  
 border: 0; padding: 30px;  
 width: auto;  
}  
</style>

<a class="fancybox" href="http://7xnjy3.com1.z0.glb.clouddn.com/box-model-demo3.1.jpg" rel="group">  
 <img src="http://7xnjy3.com1.z0.glb.clouddn.com/box-model-demo3.1.jpg" alt="" />  
</a>

<a class="fancybox" href="http://7xnjy3.com1.z0.glb.clouddn.com/box-model-demo3.2.jpg" rel="group">  
 <img src="http://7xnjy3.com1.z0.glb.clouddn.com/box-model-demo3.2.jpg" alt="" />  
</a>

元素的width将被被设定为340px来使总和达到父级元素的width

#### 4. margin-left和margin-right设置成auto

如果margin-left和amrgin-right都设置为auto，则它们会设置相等的值，因此元素将在父级元素中居中。这是将块级元素居中的一种方法。  
注意：text-align设置为center只适用于块级元素中的内联内容居中，并不能使块级元素居中。  
设置margin属性为margin:0 auto, 即：

```html
<div class="parent4">  
  <span class="block">块级元素</span>
</div>
<style type="text/css">  
  .parent4
  {  
    width: 600px;  
    font-size: 10px;  
  }  
  div .parent4
  {  
    background: # eeb3b3 none repeat scroll 0 0;  
  }  
  .parent4 .block
  {  
    background: # ffd800 none repeat scroll 0 0;  
    display: block;  
    margin: 0 auto;  
    border: 0;
    padding: 30px;  
    width: 100px;  
  }  
</style>
```

<div class="parent4">  
  <span class="block">块级元素</span>
</div>

<style type="text/css">  
.parent4  
{  
 width: 600px;  
 font-size: 10px;  
}  
div .parent4  
{  
 background: # eeb3b3 none repeat scroll 0 0;  
}  
.parent4 .block  
{  
 background: # ffd800 none repeat scroll 0 0;  
 display: block;  
 margin: 0 auto;  
 border: 0; padding: 30px;  
 width: 100px;  
}  
</style>

<a class="fancybox" href="http://7xnjy3.com1.z0.glb.clouddn.com/box-model-demo4.1.jpg" rel="group">  
 <img src="http://7xnjy3.com1.z0.glb.clouddn.com/box-model-demo4.1.jpg" alt="" />  
</a>

<a class="fancybox" href="http://7xnjy3.com1.z0.glb.clouddn.com/box-model-demo4.2.jpg" rel="group">  
 <img src="http://7xnjy3.com1.z0.glb.clouddn.com/box-model-demo4.2.jpg" alt="" />  
</a>

margin-left和margin-right的值会被设置为相等，使得元素居中

#### 5. 某个外边距和width设置成auto

如果设置某个外边距和width为auto，则设置为auto的外边距会为0，width会设置为所需的值来填充父级元素。

```html
<div class="parent5">  
  <span class="block">块级元素</span>
</div>
<style type="text/css">  
  .parent5
  {  
    width: 600px;  
    font-size: 10px;  
  }  
  div .parent5
  {  
    background: # eeb3b3 none repeat scroll 0 0;  
  }  
 .parent5 .block
 {  
   background: # ffd800 none repeat scroll 0 0;
   display: block;
   margin-left: auto;
   margin-right: 100px;
   padding: 30px;
   width: auto;
  }  
</style>
```

<div class="parent5">  
  <span class="block">块级元素</span>
</div>

<style type="text/css">  
.parent5  
{  
 width: 600px;  
 font-size: 10px;  
}  
div .parent5  
{  
 background: # eeb3b3 none repeat scroll 0 0;  
}  
.parent5 .block  
{  
 background: # ffd800 none repeat scroll 0 0;  
 display: block;  
 margin-left: auto;  
 margin-right: 100px;  
 padding: 30px;  
 width: auto;  
}  
</style>

<a class="fancybox" href="http://7xnjy3.com1.z0.glb.clouddn.com/box-model-demo5.1.jpg" rel="group">  
 <img src="http://7xnjy3.com1.z0.glb.clouddn.com/box-model-demo5.1.jpg" alt="" />  
</a>

<a class="fancybox" href="http://7xnjy3.com1.z0.glb.clouddn.com/box-model-demo5.2.jpg" rel="group">  
 <img src="http://7xnjy3.com1.z0.glb.clouddn.com/box-model-demo5.2.jpg" alt="" />  
</a>

设置margin-left和width为auto，则margin-left将被设置为0，width会被设置为440px来满足父级元素的width

#### 6. 全设置成auto

如果margin和width都设置为auto，则两个外边距会设置为0，width会尽可能宽。

```html
<div class="parent6">  
  <span class="block">块级元素</span>
</div>
<style type="text/css">  
  .parent6
  {  
    width: 600px;  
    font-size: 10px;  
  }  
  div .parent6
  {  
    background: # eeb3b3 none repeat scroll 0 0;  
  }  
  .parent6 .block
  {  
    background: # ffd800 none repeat scroll 0 0;
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding: 30px;
    width: auto;
  }  
</style>
```

<div class="parent6">  
  <span class="block">块级元素</span>
</div>

<style type="text/css">  
.parent6 {  
 width: 600px;  
 font-size: 10px;  
}  
div .parent6  
{  
 background: # eeb3b3 none repeat scroll 0 0;  
}  
.parent6 .block  
{  
 background: # ffd800 none repeat scroll 0 0;  
 display: block;  
 margin-left: auto;  
 margin-right: auto;  
 padding: 30px;  
 width: auto;  
}  
</style>

<a class="fancybox" href="http://7xnjy3.com1.z0.glb.clouddn.com/box-model-demo6.1.jpg" rel="group">  
 <img src="http://7xnjy3.com1.z0.glb.clouddn.com/box-model-demo6.1.jpg" alt="" />  
</a>

<a class="fancybox" href="http://7xnjy3.com1.z0.glb.clouddn.com/box-model-demo6.2.jpg" rel="group">  
 <img src="http://7xnjy3.com1.z0.glb.clouddn.com/box-model-demo6.2.jpg" alt="" />  
</a>

三个值都设置为auto，则两个外边距会设置为0，width会被设置为540px

#### 7. 负外边距

7个属性只要都是大于等于0的值，总和总是等于父级元素的width，不会超过父级元素的区域  
但是可以通过制定负外边距来得到比父级元素width更大的区域

```html
<div class="parent7">  
  <span class="block">块级元素</span>
</div>
<style type="text/css">  
  .parent7
  {  
    width: 600px;  
    font-size: 10px;  
  }  
  div .parent7
  {  
    background: # eeb3b3 none repeat scroll 0 0;  
  }  
  .parent7 .block
  {  
    background: # ffd800 none repeat scroll 0 0;
    display: block;
    margin-left: 100px;
    margin-right: -400px;
    padding: 30px;
    width: auto;
  }  
</style>
```

<div class="parent7">  
  <span class="block">块级元素</span>
</div>

<style type="text/css">  
.parent7  
{  
 width: 600px;  
 font-size: 10px;  
}  
div .parent7  
{  
 background: # eeb3b3 none repeat scroll 0 0;  
}  
.parent7 .block  
{  
 background: # ffd800 none repeat scroll 0 0;  
 display: block;  
 margin-left: 100px;  
 margin-right: -400px;  
 padding: 30px;  
 width: auto;  
}  
</style>

<a class="fancybox" href="http://7xnjy3.com1.z0.glb.clouddn.com/box-model-demo7.1.jpg" rel="group">  
 <img src="http://7xnjy3.com1.z0.glb.clouddn.com/box-model-demo7.1.jpg" alt="" />  
</a>

<a class="fancybox" href="http://7xnjy3.com1.z0.glb.clouddn.com/box-model-demo7.2.jpg" rel="group">  
 <img src="http://7xnjy3.com1.z0.glb.clouddn.com/box-model-demo7.2.jpg" alt="" />  
</a>

设置margin-right为-400px，则元素会大于父级元素width，因为100+0+30+840+30+0-400=600，元素的width为840px

### 替换元素的水平格式化

替换元素的水平格式化规则和非替换元素的规则类似，只有一个width有区别，如果width设置为auto，则元素的宽度是内容的固有宽度。注意：对于img标签，如果width不等于其固有宽度，则height也会等比例增加，除非设置特定值。反过来如果height设置高度，width也会等比例增加

### 垂直格式化

垂直格式化和水平格式化类似，也有7个相关属性：margin-top，border-top，padding-top，height，padding-bottom，border-bottom，margin-bottom，这7个属性的总和必须等于父级元素的height属性。  
其中margin-top，margin-bottom和height可以设置成auto  
一个正常流中的块元素的margin-top和margin-bottom设置为auto后，会被设置为0，即不能将元素垂直居中，实际上元素没有外边距。定位元素如果设置成auto有不同的处理结果。

如果正常流元素的height设置为auto，则其高度将会被设置为其内容元素的高度总和。

### 垂直外边距合并

垂直外边距合并：当两个垂直外边距相遇时，它们将形成一个外边距。合并后的外边距的高度等于两个发生合并的外边距的高度中的较大者。

```html
<div class="p20">外边距20px</div>  
<div class="p10">外边距10px</div>  
<style type="text/css">  
  .parent8
  {  
    background: # eeb3b3 none repeat scroll 0 0;  
  }  
  .parent8 .p20  
  {  
    padding: 20px;  
  }  
  .parent8 .p10  
  {  
    padding: 10px;  
  }  
</style>
```

<div class="parent8">  
  <div class="p20">外边距20px</div>  
  <div class="p10">外边距10px</div>  
</div>

<style type="text/css">  
.parent8  
{  
 background: # eeb3b3 none repeat scroll 0 0;  
}  
.parent8 .p20  
{  
 padding: 20px;  
}  
.parent8 .p10  
{  
 padding: 10px;  
}  
</style>

<a class="fancybox" href="http://7xnjy3.com1.z0.glb.clouddn.com/box-model-demo8.jpg" rel="group">  
 <img src="http://7xnjy3.com1.z0.glb.clouddn.com/box-model-demo8.jpg" alt="" />  
</a>

如图所示，两个div标签的外边距分别是20px，10px，但是最终两个div之间的距离是20px，而不是20+10=30px
