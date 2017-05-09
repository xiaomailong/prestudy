---

layout: post  
title: HTML5标签传统分类及display详解  
lead: 传统上，HTML标签分为块级、内联级、内联块  
date: 2015-12-31  
categories: Web  
tagline: Css  
tags: Css

---

# 特征

## 块级

-	[1]不设置宽度时，宽度撑满一行
-	[2]独占一行
-	[3]支持宽高

## 内联级

-	[1]内容撑开宽度
-	[2]非独占一行
-	[3]不支持宽高
-	[4]代码换行被解析成空格

## 内联块

-	[1]不设置宽度时，内容撑开宽度
-	[2]非独占一行
-	[3]支持宽高
-	[4]代码换行被解析成空格

# display

## display:block

```html
<address>
<article>
<aside>
<blockquote>
<body>
<dd>
<details>
<div>
<dl>
<dt>
<fieldset>
<figcaption>
<figure>
<footer>
<form>
<h1>
<header>
<hgroup>
<hr>
<html>
<legend>
<menu>(所有浏览器都不支持)
<menuitem>(只有firefox支持)
<nav>
<ol>
<optgroup>
<option>
<p>
<section>
<summary>
<ul>
```


## display:inline

```html
<a>
<abbr>
<area>
<b>
<bdi>
<bdo>
<br>
<cite>
<code>
<del>
<dfn>
<em>
<i>
<ins>
<kbd>
<label>
<map>
<mark>
<output>
<pre>
<q>
<rp>
<rt>
<ruby>
<s>
<smap>
<small>
<span>
<strong>
<sub>
<sup>
<time>
<track>(所有浏览器都不支持)
<u>
<var>
<wbr>
```

## display:inline-block

```html
<audio>
<button>
<canvas>
<embed>
<iframe>
<img>
<input>
<keygen>
<meter>
<object>
<progress>
<select>
<textarea>
<video>
```

## display:none

```html
<base>
<link>
<meta>
<title>
<datalist>
<dialog>
<param>
< script>
<source>
< style>
```


## display:list-item(具有块级元素的3个特征)

`<li>`

### 表格元素的display

```css
table{display: table;}
thead{display: table-header-group;}
tbody{display: table-row-group;}
tfoot{display: table-footer-group;}
tr{display: table-row;}
td,th{display: table-cell;}
col{display: table-column;}
colgroup{display: table-column-group;}
caption{display: table-caption;}
```
