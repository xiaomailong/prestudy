---

layout: post  
title: Css Flexbox布局  
date: 2015-12-04  
categories: Web  
tagline: Web  
tags: [Css]

---

# 什么是 Flexbox# 

Flex是Flexible Box的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。

CSS 2.1 定义了四种布局模式 ― 由一个盒与其兄弟、祖先盒的关系决定其尺寸与位置的算法：

-	块布局(block) ― 为了呈现文档而设计出来的布局模式；
-	行内布局(inline) ― 为了呈现文本而设计出来的布局模式；
-	表格布局(table) ― 为了用格子呈现 2D 数据而设计出来的布局模式；
-	定位布局(position) ― 为了非常直接地定位元素而设计出来的布局模式，定位元素基本与其他元素毫无关。

Flexbox（弹性布局）是为了呈现复杂的应用与页面而设计出来的，一种更加方便有效，能够在未知或者动态尺寸的情况下自由分配容器空间的布局方式。

要说明 Flexbox 的布局模型，就必须要放规范上的这张图：

任何一个容器都可以指定为Flex布局。

```css
.box{  
 display: -webkit-flex; /* Safari */  
 display: flex;  
}  
```

行内元素也可以使用Flex布局。

```css
.box{  
  display: -webkit-inline-flex; /* Safari */  
  display: inline-flex;  
}  
```

![Flexbox规范](/img/Flexbox规范.jpg)

### main axis（主轴）和main dimension（主轴方向）### 
- 主轴是伸缩项目在伸缩容器里分布所遵循的主要轴线，在主轴方向上延伸。小心，它不一定是水平的；这主要取决于“justify-content”属性（详细见下文）。

### main-start（主轴起点）和main-end（主轴终点）  
- 伸缩项目从容器的主轴起点开始放置，直到主轴终点。

### main size（主轴尺寸）和main size property（主轴尺寸属性）  
- 伸缩项目在主轴方向的宽度或高度就是主轴的尺寸。伸缩项目主要的大小属性要么是宽度，要么是高度属性，由哪一个对着主轴方向决定。

### cross axis（侧轴）和cross dimension（侧轴方向）  
- 和主轴垂直的轴叫做侧轴，它在侧轴方向上延伸。它的方向主要取决于主轴方向。

### cross-start（侧轴起点）和cross-end（侧轴终点）  
- 伸缩行的配置从容器的侧轴起点边开始，往侧轴终点边结束。

### cross size（侧轴尺寸）和cross size property（侧轴尺寸属性）  
- 伸缩项目的在侧轴方向的宽度或高度就是项目的侧轴长度，伸缩项目的侧轴长度属性是「width」或「height」属性，由哪一个对着侧轴方向决定。

### flex-basis属性

flex-basis属性用来描述伸缩元素(flex-item)的初始主轴尺寸和基准值，也就是在根据伸缩比率计算剩余空间分布之前的尺寸值，如果在flex中省略了这个值，则默认值是0，注意没有单位。它的另一个取值是 auto，这个时候，元素的初始主轴长度和基准值就是它本身的主轴长度，即取决于本身的内容长度。

两个取值的区别如下图：

![flex-basis属性规范](/img/flex-basis属性规范.svg)

看图更容易理解一些：值为 0 时，元素分配的是容器的空间。而当值为 auto 时，它分配的是减去元素内容之后剩余的容器空间。

在值为 auto 时，它的表现跟老版 Flex 规范的伸缩比例表现是一致的，如果盒子内容大小不一致，则每个盒子最后分配的空间大小也不一致。

所以，在处理这个显示异常时，要在元素上加一个 width: 0%; 来使其表现的正常。实际上，flex-basis: 0; 的行为就是为元素加上一个类似 width: 0%; 的属性，来分配容器空间。

### display:flex | inline-flex;(适用于伸缩容器，也就是伸缩项目的父元素)

这个是用来定义伸缩容器，是内联还是块取决于设置的值。这个时候，他的所有子元素将变成flex文档流，称为伸缩项目。

```css
.box{  
  display: other values | flex | inline-flex;  
}  
```

-	CSS的columns在伸缩容器上没有效果。
-	float、clear和vertical-align在伸缩项目上没有效果。

## 容器的属性

以下6个属性设置在容器上。

-	flex-direction  
-	flex-wrap  
-	flex-flow  
-	justify-content  
-	align-items  
-	align-content

### flex-direction（适用于伸缩容器，也就是伸缩项目的父元素）

flex-direction属性决定主轴的方向（即项目的排列方向）。

```css
.box {  
  flex-direction: row | row-reverse | column | column-reverse;  
}  
```

-	row(默认值)：在“ltr”排版方式下从左向右排列；在“rtl”排版方式下从右向左排列。
-	row-reverse：与row排列方向相反，在“ltr”排版方式下从右向左排列；在“rtl”排版方式下从左向右排列。
-	column：类似 于row，不过是从上到下排列
-	column-reverse：类似于row-reverse，不过是从下到上排列。

### lex-wrap(适用于伸缩容器，也就是伸缩项目的父元素)

这个主要用来定义伸缩容器里是单行还是多行显示，侧轴的方向决定了新行堆放的方向。

```css
.box {  
  flex-wrap: nowrap | wrap | wrap-reverse;  
}  
```

-	nowrap(默认值)：不换行。伸缩容器单行显示，“ltr”排版下，伸缩项目从左到右排列；“rtl”排版上伸缩项目从右向左排列。
-	wrap：换行，第一行在上方。伸缩容器多行显示，“ltr”排版下，伸缩项目从左到右排列；“rtl”排版上伸缩项目从右向左排列。
-	wrap-reverse：换行，第一行在下方。伸缩容器多行显示，“ltr”排版下，伸缩项目从右向左排列；“rtl”排版下，伸缩项目从左到右排列。（和wrap相反）

## flex-flow（适用于伸缩容器，也就是伸缩项目的父元素）

这个是“flex-direction”和“flex-wrap”属性的缩写版本。同时定义了伸缩容器的主轴和侧轴。其默认值为“row nowrap”。

```css
.box {  
  flex-flow: <flex-direction> || <flex-wrap>;  
}  
```

## justify-content（适用于伸缩容器，也就是伸缩项目的父元素）

这个是用来定义伸缩项目沿着主轴线的对齐方式。当一行上的所有伸缩项目都不能伸缩或可伸缩但是已经达到其最大长度时，这一属性才会对多余的空间进行分配。当项目溢出某一行时，这一属性也会在项目的对齐上施加一些控制。

```css
.box {  
  justify-content: flex-start | flex-end | center | space-between | space-around;  
}  
```

-	flex-start(默认值)：左对齐。伸缩项目向一行的起始位置靠齐。
-	flex-end：右对齐。伸缩项目向一行的结束位置靠齐。
-	center：居中。伸缩项目向一行的中间位置靠齐。
-	space-between：两端对齐，项目之间的间隔都相等。伸缩项目会平均地分布在行里。第一个伸缩项目一行中的最开始位置，最后一个伸缩项目在一行中最终点位置。
-	space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。伸缩项目会平均地分布在行里，两端保留一半的空间。

## align-item（适用于伸缩容器，也就是伸缩项目的父元素）

这个主要用来定义伸缩项目可以在伸缩容器的当前行的侧轴上对齐方式。可以把他想像成侧轴（垂直于主轴）的“justify-content”。

```css
.box {  
  align-items: flex-start | flex-end | center | baseline | stretch;  
}  
```

-	flex-start：交叉轴的起点对齐。伸缩项目在侧轴起点边的外边距紧靠住该行在侧轴起始的边。
-	flex-end：交叉轴的终点对齐。伸缩项目在侧轴终点边的外边距靠住该行在侧轴终点的边 。
-	center：交叉轴的中点对齐。伸缩项目的外边距盒在该行的侧轴上居中放置。
-	baseline：项目的第一行文字的基线对齐。伸缩项目根据他们的基线对齐。
-	stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。伸缩项目拉伸填充整个伸缩容器。此值会使项目的外边距盒的尺寸在遵照「min/max-width/height」属性的限制下尽可能接近所在行的尺寸。

### align-content(适用于伸缩容器，也就是伸缩项目的父元素)

这个属性主要用来调准伸缩行在伸缩容器里的对齐方式。类似于伸缩项目在主轴上使用“justify-content”一样。

注：请注意本属性在只有一行的伸缩容器上没有效果。

```css
.box {  
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;  
}  
```

-	flex-start：与交叉轴的起点对齐。各行向伸缩容器的起点位置堆叠。
-	flex-end：与交叉轴的终点对齐。各行向伸缩容器的结束位置堆叠。
-	center：与交叉轴的中点对齐。各行向伸缩容器的中间位置堆叠。
-	space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。各行在伸缩容器中平均分布。
-	space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。各行在伸缩容器中平均分布，在两边各有一半的空间。
-	stretch（默认值）：轴线占满整个交叉轴。各行将会伸展以占用剩余的空间。

## 项目的属性

以下6个属性设置在项目上。

-	order  
-	flex-grow  
-	flex-shrink  
-	flex-basis  
-	flex  
-	align-self

### order（适用于伸缩项目，也就是伸缩容器的子元素）

order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。默认情况下，伸缩项目是按照文档流出现先后顺序排列。然而，“order”属性可以控制伸缩项目在他们的伸缩容器出现的顺序。

```css
.item {  
  order: <integer>;  
}  
```

### flex-grow（适用于伸缩项目，也就是伸缩容器的子元素）

flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。根据需要用来定义伸缩项目的扩展能力。它接受一个不带单位的值做为一个比例。主要用来决定伸缩容器剩余空间按比例应扩展多少空间。

如果所有伸缩项目的“flex-grow”设置了“1”，那么每个伸缩项目将设置为一个大小相等的剩余空间。如果你给其中一个伸缩项目设置了“flex-grow”值为“2”，那么这个伸缩项目所占的剩余空间是其他伸缩项目所占剩余空间的两倍。负值同样生效。

```css
.item {  
  flex-grow: <number>; /* default 0 */  
}  
```

### flex-shrink（适用于伸缩项目，也就是伸缩容器的子元素）

flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。

负值对该属性无效。

```css
.item {  
  flex-shrink: <number>; /* default 1 */  
}  
```

### flex-basis(适用于伸缩项目，也就是伸缩容器的子元素)

这个用来设置伸缩基准值，剩余的空间按比率进行伸缩。负值不合法。

flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。

它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。

```css
.item {  
  flex-basis: <length> | auto; /* default auto */  
}  
```

### flex（适用于伸缩项目，也就是伸缩容器的子元素）

这是“flex-grow”、“flex-shrink”和“flex-basis”三个属性的缩写。其中第二个和第三个参数（flex-shrink、flex-basis）是可选参数。默认值为“0 1 auto”。

该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。  
建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

```css
.item {  
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]  
}  
```

### align-self（适用于伸缩项目，也就是伸缩容器的子元素）

align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。

该属性可能取6个值，除了auto，其他都与align-items属性完全一致。

```css
.item {  
  align-self: auto | flex-start | flex-end | center | baseline | stretch;  
}  
```
