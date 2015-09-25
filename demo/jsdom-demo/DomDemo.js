// DOM 概况
// DOM（文档对象模型）是针对 HTML 和 XML 文档的一个API（应用程序编程接口）。
// DOM 描绘了一个层次化的节点树，允许开发人员添加、移除和修改页面的某一部分。

(function() {
  console.log("\n---Dom 概况");

  var jsdom = require("jsdom").jsdom;
  var document = jsdom("hello world<ul><li>apple</li><li>orange</li><li>pear</li></ul>");
  var window = document.defaultView;

  console.log(window.document.documentElement.outerHTML);
  // <html><head></head><body>hello world</body></html>
  console.log(window.innerWidth, window.innerHeight); // 1024 768
  console.log(typeof window.document.getElementsByClassName); // function

  // 层次节点
  // DOM可以将任何 HTML 或 XML 文档描绘成一个由多层节点构成的结构。
  // 节点分成几种不同的类型，每种类型分别表示文档中不同的信息及（或）标记。
  // 每个节点都拥有各自的特点、属性及方法，另外也与其他节点存在某种关系。
  // 节点之间的关系构成了层次，而所有页面标记则表现为一个以特定节点为根节点的树形结构。

  // 文档节点是每个文档的根节点，在这个例子中，文档节点只有一个子节点，即 <html> 元素，我们称之为 文档元素。
  // 文档元素是文档的最外层元素，文档中的其他所有元素都包含在文档元素中。每个文档只能有一个文档元素。
  // 在 HTML 中，文档元素始终是 <html> 元素；而在 XML 中，没有预定义的元素，因此任何元素都能成为文档元素。

  // 每一段标记都可以通过树中的一个节点来表示：
  // HTML 元素通过元素节点来表示，特性（attribute）通过特性节点来表示，文档类型通过文档类型节点来表示，而注释通过注释节点表示。
  // 总共有 12 种节点类型，这些类型都继承自一个基类型。

  console.log(window.document.head.outerHTML);
  console.log(window.document.body.outerHTML);

  // Node 类型
  // DOM1 级定义了一个 Node 接口，该接口将由 DOM 中的所有节点类型实现。
  // 这个 Node 接口在 Javascript 中是作为 Node 类型实现的；除了 IE 之外，其他所有浏览器中都可以访问到这个类型。
  // Javascript 中所有节点类型都继承自 Node 类型，因此所有节点类型都共享着相同的基本属性和方法。

  // 每个节点都有一个 nodeType 属性，用于表明节点的类型。
  // 节点类型由在 Node 类型中定义的下列 12 个数值常量来表示，任何节点类型必居其一：
  // Node.ELEMENT_NODE(1)
  // Node.ATTRIBUTE_NODE(2)
  // Node.TEXT_NODE(3)
  // Node.CDATA_SECTION_NODE(4)
  // Node.ENTITY_REFERENCE_NODE(5)
  // Node.ENTITY_NODE(6)
  // Node.PROCESSING_INSTRUCTION_NODE(7)
  // Node.COMMENT_NODE(8)
  // Node.DOCUMENT_NODE(9)
  // Node.DOCUMENT_TYPE_NODE(10)
  // Node.DOCUMENT_FRAGMENT_NODE(11)
  // Node.NOTATION_NODE(12)
  // 值得注意的是，并不是所有节点类型都受到 Web 浏览器的支持。 开发人员最常用的就是元素和文本节点。
  // 而且，上面列出的变量，在 IE 中并没有什么卵用。
  console.log(window.document.head.nodeType);
  console.log(window.document.body.nodeType);
  console.log(window.document.documentElement.nodeType);
  console.log(window.Node.ELEMENT_NODE,
    window.Node.ATTRIBUTE_NODE,
    window.Node.TEXT_NODE,
    window.Node.CDATA_SECTION_NODE,
    window.Node.ENTITY_REFERENCE_NODE,
    window.Node.ENTITY_NODE,
    window.Node.PROCESSING_INSTRUCTION_NODE,
    window.Node.COMMENT_NODE,
    window.Node.DOCUMENT_NODE,
    window.Node.DOCUMENT_TYPE_NODE,
    window.Node.DOCUMENT_FRAGMENT_NODE,
    window.Node.NOTATION_NODE); // 1 2 3 4 5 6 7 8 9 10 11 12

  // 操作节点
  var myList = document.querySelector('ul');
  console.log(myList.nodeType == window.Node.ELEMENT_NODE); // true
  // 访问子节点
  var firstNode = myList.childNodes[0];
  console.log(firstNode.outerHTML); // <li>apple</li>
  var secondNode = myList.childNodes.item(1);
  console.log(secondNode.outerHTML); // <li>orange</li>
  var count = myList.childNodes.length; // 能动态变化, childNode并不是快照
  console.log(count); // 3
  var lastNode = myList.childNodes[count - 1];
  console.log(lastNode.outerHTML); // <li>pear</li>
  var firstNode2 = myList.firstChild;
  var lastNode2 = myList.lastChild;
  console.log(firstNode === firstNode2, lastNode === lastNode2); // true true

  // 访问兄弟节点
  var nextNode = firstNode.nextSibling;
  var preNode = lastNode.previousSibling;
  console.log(nextNode === secondNode, preNode === secondNode); // true true

  // 判断有没有子节点
  var hasChild = myList.hasChildNodes();
  var hasChild2 = myList.childNodes.length > 0;
  console.log(hasChild, hasChild2, firstNode.hasChildNodes()); // true true true
  console.log(firstNode.firstChild.nodeType == window.Node.TEXT_NODE); // true
  console.log(firstNode.firstChild.data == 'apple'); // true

  // 访问节点的文档节点
  var documentNode = myList.ownerDocument;
  console.log(documentNode === document, document === firstNode.ownerDocument); // true


  /* 操作节点 */
  // appendChild
  var newNode = window.document.createElement('li');
  console.log(newNode.outerHTML); // <li></li>
  var returnNode = myList.appendChild(newNode);
  console.log(returnNode === newNode); // true
  console.log(myList.lastChild === newNode); // true
  console.log(myList.outerHTML); // <ul><li>apple</li><li>orange</li><li>pear</li><li></li></ul>
  // 如果传入到 appendChild() 中的节点已经是文档的一部分了，那就将该节点从原来的位置移到新的位置
  var returnNode2 = myList.appendChild(myList.firstChild);
  console.log(returnNode2 === myList.firstChild); // false
  console.log(returnNode2 === myList.lastChild); // true
  console.log(myList.outerHTML); // <ul><li>orange</li><li>pear</li><li></li><li>apple</li></ul>

  // insertBefore(a, b) 将a插入b前 a和b互为Sibling
  // 插入后成为最后一个子节点
  var returnNode3 = myList.insertBefore(newNode, null);
  console.log(returnNode3 === myList.lastChild); // true
  console.log(myList.outerHTML); //<ul><li>orange</li><li>pear</li><li>apple</li><li></li></ul>

  // 插入后成为第一个子节点
  var returnNode4 = myList.insertBefore(newNode, myList.firstChild);
  console.log(returnNode4 === myList.firstChild); // true
  console.log(myList.outerHTML); // <ul><li></li><li>orange</li><li>pear</li><li>apple</li></ul>

  // removeChild 移除节点
  var formerFirstChild = myList.removeChild(myList.firstChild);
  console.log(formerFirstChild === newNode); // true
  console.log(myList.outerHTML); // <ul><li>orange</li><li>pear</li><li>apple</li></ul>

  // replaceChild 替换
  // 替换第一个子节点
  var returnNode5 = myList.replaceChild(newNode, myList.firstChild);
  console.log(returnNode5.outerHTML); // <li>orange</li>
  console.log(myList.outerHTML); // <ul><li></li><li>pear</li><li>apple</li></ul>
  myList.replaceChild(returnNode5, myList.firstChild);
  console.log(myList.outerHTML); // <ul><li>orange</li><li>pear</li><li>apple</li></ul>

  // 前面介绍的都是操作节点的子节点，也就是说，要使用这些方法必须先获得父节点。最后介绍的 cloneNode() 方法适合所有节点。

  // 深度复制
  var deepList = myList.cloneNode(true);
  console.log(deepList.childNodes.length); // 3
  console.log(deepList.outerHTML);
  // 浅复制
  var shallowList = myList.cloneNode(false);
  console.log(shallowList.childNodes.length); // 0

})();

(function() {
  console.log("\n---DOM Document节点类型详解");
  // 1、概况
  // Javascript 通过 Document 类型表示文档。
  // 在浏览器中， document 对象是 HTMLDocument（继承自 Document 类型）的一个实例，表示整个 HTML 页面。
  // 而且， document 对象是 window 对象的一个属性，因此可以将其作为全局对象来访问。
  // Document 节点具有如下特性：
  //   1. nodeType 的值为 9
  //   2. nodeName 的值为 '#document'
  //   3. nodeValue 的值为 null
  //   4. parentNode 的值为 null
  //   5. ownerDocument 的值为 null
  //   6. 其子节点可能是一个 DocumentType（最多一个）、Element(最多一个）、
  //      ProcessingInstruction 或者 Comment
  // Document 类型可以表示 HTML 页面或者其他基于 XML 的文档。
  // 不过最常见的应用还是作为 HTMLDocument 实例的 document 对象。
  // 通过这个文档对象，不仅可以取得与页面有关的信息，而且还能操作页面的外观及其底层结构。
  var jsdom = require("jsdom").jsdom;
  var document = jsdom('<!DOCTYPE html>' +
    '<!-- a -->' +
    'hello world' +
    '<ul><li>apple</li><li>orange</li><li>pear</li></ul>'
  );
  var window = document.defaultView;
  console.log(document.nodeType == window.Node.DOCUMENT_NODE); // true
  console.log(document.nodeType); // 9
  console.log(document.nodeName); // #document
  console.log(document.nodeValue); // null
  console.log(document.parentNode); // null
  console.log(document.ownerDocument); // null

  // 2、文档的子节点
  // 虽然 DOM 标准规定 Document 节点的子节点可以是 DocumentType（最多一个）、Element(最多一个）、
  // ProcessingInstruction 或者 Comment，但还是有两个内置的访问其子节点的快捷方式。
  // 第一个就是 documentElement 属性，该属性始终指向 HTML 页面中的 <html> 元素，
  // 另一个就是通过 childNodes 列表访问文档元素：（假设没有指定文档类型）
  var html = document.documentElement;
  console.log(html.nodeType == window.Node.ELEMENT_NODE); // true
  console.log(html === document.childNodes[2]); // true

  // 作为 HTMLDocument 的实例，document 对象还有一个 body 属性，直接指向 <body> 元素。
  var body = document.body;
  console.log(body.nodeType == window.Node.ELEMENT_NODE); // true
  // 所有的浏览器都支持 document.documentElement 和 document.body 属性

  // Document 另一个可能的子节点是 DocumentType。
  // 通常将 <!DOCTYPE> 标签看成一个和文档其他部分不同的实体，可以通过 doctype 属性来访问它的信息：
  var doctype = document.doctype; // 取得对 <!DOCTYPE> 的引用
  console.log(doctype.nodeType == window.Node.DOCUMENT_TYPE_NODE); // true
  console.log(doctype._localName === '!doctype');
  console.log(document.firstChild === doctype); // true
  console.log(document.childNodes.length); // 3 (doctype 以及 documentElement、注释a)
  // 但是浏览器对 document.doctype 的支持差别很大，使得这个属性的用处很有限。

  // 文档的子节点还能是注释节点：
  var comment = document.childNodes[1];
  console.log(comment.nodeType == window.Node.COMMENT_NODE); // true
  // 但是，现实中的浏览器在处理位于 <html> 外部的注释方面存在差异，比如 chrome 下就直接忽视上面的第二个注释节点。

  // 3、文档信息
  // 作为 HTMLDocument 的一个实例，document 对象还有一些标准的 Document 对象所没有的属性。
  // 取得文档标题
  var title = document.title;
  console.log(title);
  // 设置文档标题
  document.title = 'New Page Title';
  console.log(document.title);
  // 取得完整的 url
  var url = document.url;
  console.log(url);
  // 取得域名
  var domain = document.domain;
  console.log(domain);
  // 取得来源页面的 url
  var referrer = document.referrer;
  console.log(referrer);

  // domain 属性是可以设置的，这点在跨域通信中应用甚广。由于安全方面的考虑，也并非可以给 domain 设置任何值。
  // 假设页面来自 p2p.wrox.com
  document.domain = 'wrox.com'; // 成功
  console.log(domain);
  document.domain = 'cnblogs.com'; // 出错
  console.log(domain);
  // 浏览器对 domain 属性还有一个限制，即如果域名一开始是 “松散的”，那么不能再将它设置为 “紧绷的”：
  // 假设页面来自 p2p.wrox.com
  document.domain = 'wrox.com';
  console.log(domain);
  document.domain = 'p2p.wrox.com'; // 出错
  console.log(domain);

  // 4、查找元素
  var a = document.getElementById('id');
  var b = document.getElementsByTagName('tagname');

  // HTMLCollection
  var images1 = document.getElementsByTagName('img');
  console.log(images1.length);
  // console.log(images1[0].src);
  // console.log(images1.item(0).src);
  // 通过元素的name特性取得集合中的项
  // var myImage1 = images1.namedItem('nameOfMyImage');
  // 也可以
  var myImage2 = images1['nameOfMyImage']; // .. 为name值
  // 对于HTMLCollection而言，我们可以向方括号中传入数字或者字符串（name值）
  // 在后台，对数字调用item()，对字符串索引调用namedItem()
  var myImage3 = images1[0];
  var myImage4 = images1['nameOfMyImage'];

  // 取得文档中的所有元素
  var allElements = document.getElementsByTagName('*');

  // document.getElementsByName
  var radios = document.getElementsByName('color');

  // 5、特殊集合
  // 除了属性和方法，document 对象还有一些特殊的集合，这些集合都是 HTMLCollection 对象，为访问文档常用的部分提供了快捷方式：
  var anchors = document.anchors; // 包含所有带name特性的<a>元素
  var forms = document.forms; // 包含文档中所有的<form>元素
  var images = document.images; // 包含文档中所有的<img>元素
  var links = document.links; // 包含文档中所有带href的<a>元素
})();

(function() {
  console.log("\n---DOM Element节点类型详解");

  var jsdom = require("jsdom").jsdom;
  var document = jsdom("<div id='myDiv' title='Water'>Hello World!</div>" +
    "<ul id='myUl'>" +
    "<li> Item 1 </li>" +
    "<li> Item 2 </li>" +
    "<li> Item 3 </li>" +
    "</ul>");
  var window = document.defaultView;

  // 1、概况
  // Element 类型用于表现 HTML 或 XML 元素，提供了对元素标签名、子节点及特性的访问。
  // Element 节点具有以下特征：
  //   1. nodeType 的值为 1
  //   2. nodeName 的值为元素的标签名
  //   3. nodeValue 的值为null
  //   4. parentNode 可能是 Document 或者 Element
  //   5. 其子节点可能是 Element、Text、Comment、ProcessingInstruction、CDATASection 或者 EntityReference
  // 要访问元素的标签名，可以用 nodeName 属性，也可以用 tagName 属性；这两个属性会返回相同的值。
  // 在 HTML 中，标签名始终都以全部大写表示，而在 XML(有时候也包括 XHTML）中，标签名始终和源代码中保持一致。
  // 假如你不确定自己的脚本将会在 HTML 还是 XML 文档中执行，最好还是在比较之前将标签名转换成相同的大小写形式：
  var myDiv = document.querySelector('div');
  console.log(myDiv.nodeType == window.Node.ELEMENT_NODE);
  console.log(myDiv.tagName); // DIV
  console.log(myDiv.nodeName); // DIV
  if (myDiv.tagName.toUpperCase() === 'DIV') { // 这样最好，适用于任何文档
    console.log(myDiv.outerHTML);
  }

  // 2、HTML 元素
  // 所有 HTML 元素都由 HTMLElement 类型表示，不是直接通过这个类型，也是通过它的子类型来表示。
  // HTMLElement 类型直接继承自 Element 并添加了一些属性。
  // 每个 HTML 元素中都存在下列标准属性：
  //   1. id 元素在文档中的唯一标识符
  //   2. title 有关元素的附加说明信息，一般通过工具提示条显示出来
  //   3. lang 元素内容的语言代码，很少使用
  //   4. dir 语言的方向，值为 ltr 或者 rtl，也很少使用
  //   5. className 与元素的 class 特性对应

  // 3、特性的获取和设置
  // 每个元素都有一个或多个特性，这些特性的用途是给出相应元素或其内容的附加信息。
  // 操作特性的 DOM 方法主要有三个,分别是 getAttribute() setAttribute() removeAttribute()。
  // 注意，传递给 getAttribute() 的特性名与实际的特性名相同，
  // 因此要想得到 class 特性值，应该传入 class 而不是 className，后者只有在通过对象属性（property）访问特性时才用。
  // 如果给定名称的特性不存在，getAttribute() 返回 null。
  // var myDiv = document.querySelector('div');
  // attribute
  console.log(myDiv.getAttribute('id')); // myDiv
  console.log(myDiv.getAttribute('class')); // null
  console.log(myDiv.getAttribute('title')); // Water
  console.log(myDiv.getAttribute('lang')); // null
  console.log(myDiv.getAttribute('dir')); // null

  // property
  console.log(myDiv.id); // myDiv
  console.log(myDiv.className); // ''
  console.log(myDiv.title); // Water
  console.log(myDiv.lang); // ''
  console.log(myDiv.dir); // ''
  // 通过 getAttribute() 方法也可以取得自定义特性。

  // 在实际开发中，开发人员不常用 getAttribute()，而是只使用对象的属性（property）。
  // 只有在取得自定义特性值的情况下，才使用 getAttribute() 方法。
  // 为什么呢？比如说 style，在通过 getAttribute() 访问时，
  // 返回的 style 特性值包含的是 css 文本，而通过属性来访问会返回一个对象。
  // 再比如 onclick 这样的事件处理程序，当在元素上使用时，onclick 特性包含的是 Javascript 代码，
  // 如果通过 getAttribute() 访问，将会返回相应代码的字符串，
  // 而在访问 onclick 属性时，则会返回 Javascript 函数。

  // 与 getAttribute() 对应的是 setAttribute()，这个方法接受两个参数：要设置的特性名和值。
  // 如果特性已经存在，setAttribute() 会以指定的值替换现有的值；
  // 如果特性不存在，setAttribute() 则创建该属性并设置相应的值。

  // 而 removeAttitude() 方法用于彻底删除元素的特性。调用这个方法不仅会清除特性的值，而且也会从元素中完全删除特性。
  myDiv.setAttribute('id', 'someOtherId');
  myDiv.setAttribute('title', 'some other text');
  myDiv.setAttribute('class', 'someclass');
  console.log(myDiv.id); // someOtherId
  console.log(myDiv.title); // some other text
  console.log(myDiv.className); // someclass
  console.log(myDiv.outerHTML);
  // <div id="someOtherId" title="some other text" class="someclass">Hello World!</div>
  myDiv.removeAttribute('class');
  console.log(myDiv.className); // ''
  console.log(myDiv.outerHTML);
  // <div id="someOtherId" title="some other text">Hello World!</div>

  // 4、attributes 属性
  // Element 类型是使用 attributes 属性的唯一一个 DOM 节点类型。
  // attributes 属性中包含一个 NamedNodeMap，与 NodeList 类似，也是一个“动态”的集合。
  // 元素的每一个特性都由一个 Attr 节点表示，每个节点都保存在 NamedNodeMap 对象中。
  // NamedNodeMap 对象拥有下列方法：
  //   1. getNamedItem(name): 返回 nodeName 属性等于 name 的节点
  //   2. removeNamedItem(name): 从列表移除 nodeName 属性等于 name 的节点
  //   3. setNamedItem(node): 向列表中添加节点，以节点的 nodeName 属性为索引
  //   4. item(pos): 返回位于数字 pos 位置处的节点
  // attributes 属性中包含一系列的节点，每个节点的 nodeName 就是特性的名称，而节点的 nodeValue 就是特性的值。
  // 取得元素的特性值
  var id1 = myDiv.attributes.getNamedItem('id').nodeValue;
  var id2 = myDiv.attributes['id'].nodeValue;
  // getAttribute() 也能实现一样功能
  var id3 = myDiv.getAttribute('id');
  console.log(id1, id2, id3); // someOtherId someOtherId someOtherId
  // 与removeAttribute() 方法相比，唯一的区别是能返回表示被删除特性的节点
  var oldAttr = myDiv.attributes.removeNamedItem('id');
  console.log(myDiv.outerHTML);
  // <div title="some other text">Hello World!</div>
  // 添加新特性
  // 需要传入一个特性节点
  myDiv.attributes.setNamedItem(oldAttr);
  console.log(myDiv.outerHTML);
  // <div title="some other text" id="someOtherId">Hello World!</div>

  // 一般来说，由于前面介绍的 attributes 方法不够方便，
  // 因此开发人员更多的会使用 getAttribute() removeAttribute() 以及 setAttribute() 方法。
  // 不过如果想要遍历元素的特性，attributes 属性倒是可以派上用场：
  for (var i = 0, len = myDiv.attributes.length; i < len; i++) {
    var attrName = myDiv.attributes[i].nodeName;
    var attrValue = myDiv.attributes[i].nodeValue;
    console.log(attrName, ':', attrValue);
    // title : some other text
    // id : someOtherId
  }

  // 5、元素的子节点
  var myUl = document.getElementById('myUl');
  console.log(myUl.childNodes.length); // IE: 3   其他浏览器: 7
  // 以上代码，如果是 IE 来解析，那么 <ul> 元素会有 3 个子节点，分别是 3 个 <li> 元素；
  // 而如果是其他浏览器解析，则会有 7 个子节点，包括 3 个 <li> 元素 和 4 个文本节点。
  // 如果像下面这样将元素之间的空白符删除，那么所有浏览器都会返回相同数目的子节点：

})();

(function() {
  console.log("\n---DOM节点关系");

  var jsdom = require("jsdom").jsdom;
  var document = jsdom('hello world' +
    '<div class="box" id="box" style ="background-color: red; height: 100px; width: 100px">' +
    '  <ul class="list" id="list">' +
    '    <li class="in">1</li>' +
    '    <li class="in" id="test">2</li>' +
    '    <li class="in">3</li>' +
    '  </ul>' +
    '</div>');
  var window = document.defaultView;

  // 定义
  // 　　节点中的各种关系可以用传统的家族关系来描述，相当于把文档树比喻成家谱。

  // 属性　　
  // 【nodeType、nodeName、nodeValue】
  // 　　每个节点都有这三个属性，且节点类型不同，这三个属性的值不同。
  //    对于元素节点来说，nodeType的值为1，nodeName保存的始终都是元素的全大小标签名，而nodeValue的值则始终是null
  var oBox = document.getElementById('box');
  console.log(oBox.nodeType, oBox.nodeName, oBox.nodeValue); // 1 'DIV' null
  // 【parentNode】
  // 　　每个节点都有一个parentNode属性，该属性指向文档树中的父节点
  console.log(oBox.parentNode.nodeName); // BODY
  // childNodes】(只计算第一层子节点)
  // 　　每个节点都有一个childNodes属性，其中保存着一个NodeList对象。
  // 　　【补充】NodeList  　　　　
  //         【1】NodeList是一种类数组对象，用于保存一组有序的节点，可以通过位置来访问这些节点。
  //          NodeList对象的独特之处在于它实际上是基于DOM结构动态执行查询的结果，因此DOM结构的变化能够自动反映在NodeList对象中，
  //          可以通过方括号[]，也可以通过item()方法来访问保存在NodeList中的节点
  console.log(oBox.childNodes.length); // 2,在IE8-浏览器返回1，因为不包含空白文本节点
  oBox.removeChild(oBox.childNodes.item(0));
  console.log(oBox.childNodes.length); // 1,在IE8-浏览器返回0，因为不包含空白文本节点
  // 　　　　【2】可以使用Array.prototype.slice.call()方法将NodeList对象转换为数组对象
  var arrayOfNodes = Array.prototype.slice.call(oBox.childNodes);
  console.log(oBox.childNodes.constructor); // [Function: NodeList]
  console.log(arrayOfNodes.constructor); // [Function: Array]
  // 　　　　　　[注意]但在IE8-下报错，因为IE8-将NodeList实现为一个COM对象，不能使用Array.prototype.slice()方法。
  // 下面是兼容写法：
  function convertToArray(nodes) {
    var array = null;
    try {
      array = Array.prototype.slice.call(oBox.childNodes);
    } catch (ex) {
      array = [];
      var len = nodes.length;
      for (var i = 0; i < len; i++) {
        array.push(nodes[i]);
      }
    }
    return array;
  }
  console.log(convertToArray(oBox.childNodes)); // []

  //   【children】(全兼容，只计算第一层子节点)
  // 　　这个属性是HTMLCollection的实例，只包含元素中同样还是元素的子节点
  console.log(oBox.children.length); // 1，在IE8-浏览器下为2，因为还会包括注释节点

  // 【previousSibling、previousElementSibling】
  // 　　previousSibling:同一节点列表中的前一个节点
  // 　　previousElementSibling:同一节点列表中的前一个元素节点(IE8-浏览器不支持)

  // 【nextSibling、nextElementSibling】
  // 　　nextSibling:同一节点列表中的后一个节点
  // 　　nextElementSibling:同一节点列表中的后一个元素节点(IE8-浏览器不支持)

  // 【firstChild、firstElementChild】
  // 　　firstChild:节点列表中的第一个子节点
  // 　　firstElementChild:节点列表中的第一个元素子节点

  // 【lastChild、lastElementChild】
  // 　　lastChild:节点列表中的最后一个子节点
  // 　　lastElementChild:节点列表中的最后一个元素子节点
  var oTest = document.getElementById('test');
  console.log(oTest.previousSibling.nodeName); // #text,但在IE8-浏览器下返回LI,因为不包含空白文本节点
  console.log(oTest.previousElementSibling.nodeName); // LI，但在IE8-浏览器下报错
  console.log(oTest.nextSibling.nodeName); // #text,但在IE8-浏览器下返回LI,因为不包含空白文本节点
  console.log(oTest.nextElementSibling.nodeName); // LI，但在IE8-浏览器下报错

  var oList = document.getElementById('list');
  console.log(oList.firstChild.nodeName); // #text,但在IE8-浏览器下返回LI,因为不包含空白文本节点
  console.log(oList.firstElementChild.nodeName); // LI，但在IE8-浏览器下报错
  console.log(oList.lastChild.nodeName); // #text,但在IE8-浏览器下返回LI,因为不包含空白文本节点
  console.log(oList.lastElementChild.nodeName); // LI，但在IE8-浏览器下报错

  //   【childElementCount】(IE8-浏览器不支持)(只包含第一层子元素)
  // 　　childElementCount返回子元素(不包括文本节点和注释)的个数
  console.log(oBox.childElementCount); // 1

  // 【ownerDocument】
  // 　　所有节点都有一个ownerDocument的属性，指向表示整个文档的文档节点
  console.log(oBox.ownerDocument.nodeName); // #document

  // 方法
  // 【hasChildNodes()】(全兼容)
  // 　　hasChildNodes()方法在包含一个或多个节点时返回true，比查询childNodes列表的length属性更简单
  console.log(oBox.hasChildNodes()); // true

  // 【contains()】(只要是后代即可，不一定是第一级子元素)
  // 　　contains()方法接收一个参数，即要检测的后代节点，如果是则返回true，如果不是则返回false
  // 　　　　[注意]IE和safari不支持document.contains()方法，只支持元素节点的contains()方法
  console.log(document.contains(document.getElementById("box"))); // 在IE和safari中报错，在其他浏览器中返回true

  // 【compareDocumentPostion()】(IE8-浏览器不支持)
  // 　　compareDocumentPostion()方法能够确定节点间的关系，返回一个表示该关系的位掩码
  // 掩码    节点关系
  // 1    无关（给定的节点不在当前文档中）
  // 2    居前（给定的节点在DOM树中位于参考节点之前）
  // 4    居后（给定的节点在DOM树中位于参考节点之后）
  // 8    包含（给定的节点是参考节点的父节点）
  // 16   被包含（给定的节点是参考节点的子节点）
  //因为document包含box，所以为16；而又在box之前,所以为4，两者相加为20
  var result = document.compareDocumentPosition(document.getElementById("box"));
  console.log(result); // 20
  //通过按位与，说明20是由16+4组成的，所以box被包含在document中
  console.log(result & 16); // 16 box被包含在document中
  console.log(result & 4); // 4 box在document之后
})();

(function() {
  console.log("\n---DOM节点操作方法");

  var jsdom = require("jsdom").jsdom;
  var document = jsdom('hello world' +
    '<div class="box" id="box" style ="background-color: red; height: 100px; width: 100px">' +
    '  <ul class="list" id="list">' +
    '    <li class="in">1</li>' +
    '    <li class="in" id="test">2</li>' +
    '    <li class="in">3</li>' +
    '    <li class="in">4</li>' +
    '    <li class="in">5</li>' +
    '    <li class="in">6</li>' +
    '  </ul>' +
    '</div>');
  var window = document.defaultView;

  // 只读的关系指针
  // 　　DOM中的关系指针都是只读的
  var oBox = document.getElementById('box');
  console.log(oBox.parentNode.nodeName); //BODY
  // 在IE8-浏览器下会报错，在其他浏览器下忽略此条语句
  oBox.parentNode = document;
  console.log(oBox.parentNode.nodeName); //BODY

  // 操作方法
  // 【appendChild()】
  // 　　appendChild()方法用于向childNodes列表的末尾添加一个节点，并返回新增节点。
  //    添加节点后，childNodes中的新增节点、父节点和以前的最后一个子节点的关系指针都会相应地得到更新。
  var newNode = document.createElement('ul');
  var returnedNode = oBox.appendChild(newNode);
  console.log(returnedNode.nodeName); // UL
  console.log(returnedNode == newNode); // true
  console.log(returnedNode == oBox.lastChild); // true

  // 【insertBefore()】
  // insertBefore()方法接收两个参数：要插入的节点和作为参照的节点。
  // 插入节点后，被插入的节点会变成参照节点的前一个兄弟节点(previousSibling)，同时被方法返回。
  // 如果参照节点是null，则insertBefore()与appendChild()方法执行相同的操作。
  var oList = document.getElementById('list');
  //新增一个li元素
  var oAdd = document.createElement('li');
  //设置新增元素的css样式
  oAdd.className = "in";
  oAdd.style.cssText = 'background-color:red;border-radius:50%';
  //添加到oList中
  oList.insertBefore(oAdd, null);
  var num = -1;
  var max = oList.children.length;

  // function incrementNumber() {
  //   num++;
  //   //oList.getElementsByTagName('li')[max]相当于null，所以不报错
  //   oList.insertBefore(oAdd, oList.getElementsByTagName('li')[num]);
  //   if (num == max) {
  //     num = -1;
  //   }
  //   if (num === 0) {
  //     num = 1;
  //   }
  //   setTimeout(incrementNumber, 1000);
  // }
  // setTimeout(incrementNumber, 1000);

  // 【insertAfter()封装】
  // 　　原生JavaScript中并没有insertAfter()方法，但是可以用insertBefore()和appendChild()封装方法
  function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
      parent.appendChild(newElement);
    } else {
      parent.insertBefore(newElement, targetElement.nextSibling);
    }
  }
  var oLi2 = oList.getElementsByTagName("li")[1];
  var newElement = document.createElement("li");
  insertAfter(newElement, oLi2);
  console.log(oList.childNodes.length);
  // 在标准浏览器下返回[text, li.in, text, li.in, li, text],在IE8-浏览器下不包含空白文本节点

  // 【replaceChild()】
  // 　　replaceChild()接收的两个参数是要插入的节点和要替换的节点，
  //    要替换的节点将由这个方法返回并从文档树中移除，同时由要插入的节点占据其位置
  // function incrementNumber() {
  //   //获取oList中子元素的个数
  //   var len = oList.getElementsByTagName('li').length;
  //   //如果长度不为0
  //   if (len) {
  //     //删除最后一个子元素
  //     oList.removeChild(oList.getElementsByTagName('li')[len - 1]);
  //     //再次调用计时器
  //     setTimeout(incrementNumber, 1000);
  //   }
  // }
  // //1s后执行函数incrementNumber
  // setTimeout(incrementNumber, 1000);

  // 【removeChild()】
  // 　　removeChild()方法接收一个参数，即要移除的节点，被移除的节点成为方法的返回值。
  // function incrementNumber() {
  //   //获取oList中子元素的个数
  //   var len = oList.getElementsByTagName('li').length;
  //   //如果长度不为0
  //   if (len) {
  //     //删除最后一个子元素
  //     oList.removeChild(oList.getElementsByTagName('li')[len - 1]);
  //     //再次调用计时器
  //     setTimeout(incrementNumber, 1000);
  //   }
  // }
  // //1s后执行函数incrementNumber
  // setTimeout(incrementNumber, 1000);

  //   【cloneNode()】
  // 　　cloneNode方法用于创建调用这个方法的节点的一个完全相同的副本，该方法接收一个布尔值参数，表示是否执行深复制。
  // 在参数为true时，执行深复制，也就是复制节点及整个子节点树。在参数为false的情况下，执行浅复制，即复制节点本身。
  // 复制后返回的节点副本属于文档所有，但并没有为它指定父节点。若参数为空，也相当于false
  //   　　[注意]cloneNode()方法不会复制添加到DOM节点中的JavaScript属性，例如事件处理程序等。
  //      这个方法只复制特性、(在明确指定的情况下复制)子节点，其他一切都不会复制。
  var deepList = oList.cloneNode(true);
  /*IE8-与其他浏览器在处理空白字符的方式不一样，IE8-不会为空白符创建节点*/
  console.log(deepList.childNodes.length); //IE8-为6，其他浏览器为11
  // document.body.insertBefore(deepList, oList);
  var shallowList = oList.cloneNode();
  console.log(shallowList.childNodes.length); //0

  // 【insertAdjacentHTML()】
  // 　　insertAdjacentHTML()方法接收两个参数:插入的位置和要插入的HTML文本。
  // 　　第一个参数必须是下列值之一，且这些值都必须是小写形式:
  // 　　"beforebegin",在当前元素之前插入一个紧邻的同辈元素
  // 　　"afterbegin",在当前元素之下插入一个新的子元素或在第一个子元素之前再插入新的子元素
  // 　　"beforeend",在当前元素之下插入一个新的子元素或在最后一个子元素之后再插入新的子元素
  // 　　"afterend",在当前元素之后插入一个紧邻的同辈元素
  // 　　第二个参数是一个HTML字符串，如果浏览器无法解析字符串，就会抛出错误
  // oBox.insertAdjacentHTML("beforebegin", "<p>我是新的前兄弟元素</p>");
  // oBox.insertAdjacentHTML("afterbegin", "<p>我是新的前子元素</p>");
  // oBox.insertAdjacentHTML("beforeend", "<p>我是新的后子元素</p>");
  // oBox.insertAdjacentHTML("afterend", "<p>我是新的后兄弟元素</p>");
  // console.log(oBox.outerHTML);

  // 注意事项
  // 【注意事项1】如果传入到appendChild()、replaceChild()、insertBefore()中的节点已经是文档的一部分了，
  //            则将该节点从原来的位置转移到新位置
  // 【注意事项2】动态性的注意事项
  // 　　【1】存变量的情况
  //oIn0指向的是第0个对象，而并不是第0个位置
  var oIn0 = oList.getElementsByTagName("li")[0];
  console.log(oIn0.innerHTML); //1
  //oIn0指向的是原来的第0个对象，只不过从第0个位置变化到第2个位置，
  oList.appendChild(oIn0);
  console.log(oIn0.innerHTML); //1

  // 　　【2】不存变量的情况
  //获取第0个位置的对象
  console.log(oList.getElementsByTagName("li")[0].innerHTML); //1
  //将第0个位置的对象变化到第2个位置
  oList.appendChild(oList.getElementsByTagName("li")[0]);
  //重新获取第0个位置的对象
  console.log(oList.getElementsByTagName("li")[0].innerHTML); //2
})();

(function() {
  console.log("\n---DOM特性节点ATTRIBUTE");

  var jsdom = require("jsdom").jsdom;
  var document = jsdom('hello world' +
    '<div class="box" id="box" name="abc" index="123" title="test" lang="en" dir="rtl" data-name="a" style="height: 100px; width: 100px;" onclick = "alert(1)">' +
    '  <ul class="list" id="list">' +
    '    <li class="in">1</li>' +
    '    <li class="in" id="test">2</li>' +
    '    <li class="in">3</li>' +
    '    <li class="in">4</li>' +
    '    <li class="in">5</li>' +
    '    <li class="in">6</li>' +
    '  </ul>' +
    '</div>');
  var window = document.defaultView;

  //   DOM特性节点ATTRIBUTE
  //   定义
  //   　　每个元素都有一个或多个特性，这些特性的用途是给出相应元素或内容的附加信息。
  //      实质上，特性节点就是存在于元素的attributes属性中的节点。

  //   特征　　
  //   　　nodeType:2
  //   　　nodeName:特性的名称
  //   　　nodeValue:特性的值
  //   　　parentNode:null
  //   　　childNode:chrome、firefox下为undefined，safari下为Text，IE9+下为子元素的特性名，IE8-下报错
  //   　　　　[注意]尽管Attribute也是节点，但却不被认为是DOM文档树的一部分，
  //               开发人员常用getAttribute()、setAttribute()、removeAttribute()，很少直接引用特性节点
  var oBox = document.getElementById('box');
  var oAttr = oBox.attributes;
  // (chrome\safari\IE9+\firefox) 2 id box null
  // (IE7-) 2 onmsanimationiteration null null
  console.log(oAttr[0].nodeType, oAttr[0].nodeName, oAttr[0].value, oAttr[0].parentNode);
  // (chrome\firefox) undefined
  // (safari) Text
  // (IE9+) box
  // (IE8-) 报错
  console.log(oAttr[0].childNodes[0].nodeType);

  // 特性节点属性
  // 　　Attr对象有3个属性:name、value和specified
  // 　　　　【1】name是特性名称(与nodeName的值相同)
  // 　　　　【2】value是特性的值(与nodeValue的值相同)
  // 　　　　【3】specified是一个布尔值，用以区别特性是在代码中指定的，还是默认的。
  //           这个属性的值如果为true，则意味着要么是在HTML中指定了相应特性，要么是通过setAttribute()方法设置了该属性。
  //           在IE中，所有未设置过的特性的该属性值都为false，而在其他浏览器中根本不会为这类特性生成对应的特性节点
  // (chrome\safari\IE8+)class class true
  // (firefox)id id true
  // (IE7-)onmsanimationiteration onmsanimationiteration true
  console.log(oAttr[0].name, oAttr[0].nodeName, oAttr[0].name == oAttr[0].nodeName);
  // IE7- "null" null false
  // 其他浏览器 box box true
  console.log(oAttr[0].value, oAttr[0].nodeValue, oAttr[0].value == oAttr[0].nodeValue);
  // IE7- false
  // 其他浏览器 true
  console.log(oAttr[0].specified); // true
  console.log(oBox.attributes.id.specified); // true
  // console.log(oBox.attributes.onclick.specified); // 在IE7-浏览器下会返回false，在其他浏览器下会报错

  // 特性属性attributes
  // 　　Element类型是使用attributes属性的唯一一个DOM节点类型。
  //    attributes属性中包含一个NamedNodeMap，与NodeList类似，也是一个动态的集合。
  //    元素的每一个特性都由一个Attr节点表示，每个节点都保存在NamedNodeMap对象中。
  // 　　【attributes属性的四个方法】
  // 　　　　[a]getNamedItem(name):返回nodeName属性等于name的节点
  // 　　　　[b]removeNamedItem(name):从列表中移除nodeName属性等于name的节点
  // 　　　　[c]setNamedItem(node):向列表中添加节点，以节点的nodeName属性为索引
  // 　　　　[d]item(pos):返回位于数字pos位置处的节点，也可以用方括号法[]简写
  console.log(oBox.attributes.length); // NamedNodeMap {0: class, 1: id, 2: name, 3: index, 4: title}
  var getTest = oBox.attributes.getNamedItem("index");
  console.log(getTest.value); // index = "123"
  var removeTest = oBox.attributes.removeNamedItem("class");
  console.log(removeTest.value); // class = "box"
  console.log(oBox.attributes.getNamedItem("class")); // null
  console.log(oBox.attributes.setNamedItem(removeTest)); // null
  console.log(oBox.attributes.setNamedItem(getTest).value); // index = "123"
  console.log(oBox.attributes.item(0).nodeType); // id="box"(每个浏览器获取的不一样)
  console.log(oBox.attributes.item[1]); // id="box"(每个浏览器获取的不一样)
  // 　　attributes属性中包含一系列节点，每个节点的nodeName就是特性的名称，节点的nodeValue就是特性的值
  // console.log(oBox.attributes);// NamedNodeMap {0: class, 1: id, 2: name, 3: index, 4: title}
  console.log(oBox.attributes.id.nodeName); // "id"
  console.log(oBox.attributes.id.nodeValue); // "box"

  // 【特性遍历】
  // 　　　　attributes属性主要用于特性遍历。在需要将DOM结构序列化为XML或HTML字符串时，多数都会涉及遍历元素特性
  function outputAttributes(element) {
    var pairs = new Array(),
      attrName, attrValue, i, len;
    for (i = 0, len = element.attributes.length; i < len; i++) {
      attrName = element.attributes[i].nodeName;
      attrValue = element.attributes[i].nodeValue;
      pairs.push(attrName + "=\"" + attrValue + "\"");
    }
    return pairs.join(" ");
  }
  // 　　　　[注意1]针对attributes对象中的特性，不同浏览器返回的顺序不同
  // (chrome\safari)class="box" id="box" name="abc" index="123" title="test"
  // (firefox)title="test" index="123" name="abc" id="box" class="box"
  // (IE8+)title="test" class="box" id="box" index="123" name="abc"
  // (IE7-)输出所有的特性
  console.log(outputAttributes(oBox));
  //       [注意2]IE7-浏览器会返回HTML元素中所有可能的特性，包括没有指定的特性
  // 　　　　【解决】利用特性节点的specified属性
  function outputAttributes2(element) {
    var pairs = new Array(),
      attrName, attrValue, i, len;
    for (i = 0, len = element.attributes.length; i < len; i++) {
      attrName = element.attributes[i].nodeName;
      attrValue = element.attributes[i].nodeValue;
      if (element.attributes[i].specified) {
        pairs.push(attrName + "=\"" + attrValue + "\"");
      }
    }
    return pairs.join(" ");
  }
  //所有浏览器下都返回title="test" class="box" id="box" index="123" name="abc"(顺序不一样)
  console.log(outputAttributes(document.getElementById("box")));

  // 特性节点方法
  // 　　【1】createAttribute()方法传入特性名称并创建新的特性节点
  // 　　【2】setAttributeNode()方法传入特性节点并将特性添加到元素上
  // 　　【3】getAttributeNode()方法传入特性名并返回特性节点
  // 　　【4】removeAttributeNode()方法传入特性名删除并返回删除的特性节点，但IE7-浏览器下无法删除
  var attr = document.createAttribute('title2');
  attr.value = "test2";
  oBox.setAttributeNode(attr);
  console.log(oBox.getAttributeNode("title2").name, attr.name); // title2 title2
  console.log(oBox.getAttributeNode("title2").value, attr.value); // test2 test2
  //返回删除的节点
  console.log(oBox.removeAttributeNode(attr).name); // title2
  //IE7-浏览器下无法删除，其他浏览器返回null
  console.log(oBox.getAttributeNode("title2")); // null

  // 特性方法
  // 　　操作特性的DOM方法主要有getAttribute()、setAttribute()、removeAttribute()三个，
  //    可以针对任何特性使用，包括那些以HTMLElement类型属性的形式定义的特性
  // 　　【1】getAttribute()方法
  // 　　　　getAttribute()方法用于取得特性的值
  console.log(oBox.getAttribute("class")); // box
  console.log(oBox.getAttribute("id")); // box
  console.log(oBox.getAttribute("title")); // test
  console.log(oBox.getAttribute("lang")); // en
  console.log(oBox.getAttribute("dir")); // rtl
  // 　　　　[注意1]如果给定名称的特性不存在或无参数则返回null
  console.log(oBox.getAttribute("abc")); // null
  console.log(oBox.getAttribute("")); // null
  // 　　　　[注意2]传递给getAttribute()的特性名与实际的特性名相同，因此要得到class特性值，应该传入"class"而不是"className"。但IE7-浏览器却正好相反
  console.log(oBox.getAttribute("class")); // box,在IE7-浏览器下显示null
  console.log(oBox.getAttribute("className")); // 在IE7-浏览器下显示box,在其他浏览器下null
  // 　　　　[注意3]通过getAttribute()可以取得自定义特性，但根据HTML5规范自定义特性应加上data-前缀以便验证
  console.log(oBox.getAttribute("index")); // 123
  console.log(oBox.getAttribute("data-name")); // a
  console.log(oBox.index); // IE7-显示123，其他浏览器显示undefined
  // console.log(oBox.dataset.name); // IE10-不支持dataset,出错，其他浏览器显示a
  // 　　　　[注意4]IE8-浏览器不区分对象属性和元素特性。用对象属性的点方法可以获得自定义元素的特性。
  //             但对于元素特性中间存在中划线的情况，只能用中括号法来取得
  oBox.index = 2;
  console.log(oBox.dataName); //在IE8-浏览器下 undefined
  console.log(oBox["data-name"]); //在IE8-浏览器下 a
  console.log(oBox.index); // 2
  console.log(oBox.getAttribute("data-name")); // a
  // 　　　　[注意5]有两类特殊的特性，它们虽然有对应的属性名，但属性的值与通过getAttribute()返回的值并不相同。
  //             由于以下这些差别，只有在取得自定义特性值的情况下，才会使用getAttribute()
  // 　　　　　　[a]第一类特性是style，用于通过CSS为元素指定样式。在通过getAttribute()访问时，返回的style特性值中包含的是CSS文本，
  //              而通过属性来访问它则会返回一个对象。由于style属性是用于以编程方式访问元素样式的，因此并没有直接映射到style特性。
  console.log(oBox.style); // CSS2Properties { height: "100px", width: "100px"}
  // 在IE7-浏览器下返回的是oBox.style所取得的对象值。
  // [注意]属性的顺序与所写的顺序可以不一致，每个浏览器显示的顺序不一样
  console.log(oBox.getAttribute("style")); // "height: 100px; width: 100px;"
  // 　　　　　　[b]第二类特性是onclick这样的事件处理程序。当在元素上使用时，onclick特性中包含的是Javascript代码，
  //              如果通过getAttribute()访问，则会返回相应代码的字符串。
  //             而在访问onclick属性时，则会返回一个JavaScript函数(如果未在元素中指定相应特性，则返回null)
  console.log(oBox.onclick); // function onclick(event){alert(1)}
  console.log(oBox.getAttribute("onclick")); // "alert(1)"
  // 　　【2】setAttribute()
  // 　　　　这个方法接受两个参数:要设置的特性名和值，如果已经存在，则替换现有的值。
  //        如果特性不存在，setAttribute()则创建该属性并设置相应的值
  oBox.setAttribute("id", "test");
  /*注意获取oBox.id时并不会报错，因为oBox保存的是当时id为box的对象，也就是现在id为test的对象*/
  console.log(oBox.id); // test
  oBox.setAttribute("id", "box");
  // 　　　　[注意1]通过setAttrbute()方法设置的特性名会统一转换成小写形式
  oBox.setAttribute("ABC", "test123");
  console.log(oBox.getAttribute("ABC")); // test123
  console.log(oBox.getAttribute("abc")); // test123
  // 　　　　[注意2]为DOM元素添加一个自定义属性，该属性不会自动成为元素的特性
  oBox.color = "red";
  console.log(oBox.getAttribute("color")); // IE8-浏览器返回red，其他浏览器返回null
  // 　　　　[注意3]IE7-浏览器设置class、style、for、cellspacing、cellpadding、tabindex、readonly、
  //             maxlength、rowspan、colspan、usemap、frameborder、contnenteditable这13个特性没有任何效果
  // 　　　　　　【解决】可以利用IE8-浏览器下对象属性和元素特性混淆的bug来设置
  // 　　【3】removeAttribute()
  // 　　　　该方法用于彻底删除元素的特性，这个方法不仅会彻底删除元素的特性值，还会删除元素特性
  console.log(oBox.getAttribute("id")); //box
  oBox.removeAttribute("id");
  console.log(oBox.getAttribute("id")); //null
})();

(function() {
  console.log("\n---DOM文本节点TEXT");

  var jsdom = require("jsdom").jsdom;
  var document = jsdom('hello world' +
    '<div class="box" id="box" name="box">' +
    'test' +
    '</div>');
  var window = document.defaultView;

  // DOM文本节点TEXT
  // 定义
  // 　　文本节点由Text类型表示，包含的是纯文本内容，纯文本内容中的HTML字符会被转义。

  // 特征　
  // 　　nodeType:3
  // 　　nodeName:#text
  // 　　nodeValue:节点所包含的文本
  // 　　parentNode:Element节点
  // 　　childNode:没有子节点
  var oBox = document.getElementById('box');
  var oTest = oBox.firstChild;
  console.log(oTest.nodeType, oTest.nodeName, oTest.nodeValue); // 3 #text test
  console.log(oTest.parentNode.nodeName, oTest.childNodes); // DIV NodeList {}
  // [注意]每个可以包含内容的元素最多只能有一个文本节点，而且必须确实有内容存在
  // 　　　　[a]<div></div>(没有内容，也就没有文本节点)
  // IE8-浏览器为null,因为其不识别空白文本节点；其他浏览器为" "
  //       [b]<div> </div>(有空格，因此有一个文本节点)

  // 属性
  // 【data】
  // 　　文本节点的data属性与nodeValue属性相同
  console.log(oTest.nodeValue, oTest.data, oTest.data == oTest.nodeValue); // test test true

  // 【length】
  // 　　文本节点的length属性保存着节点字符的数目，而且nodeValue.length、data.length也保存着相同的值
  console.log(oTest.length, oTest.nodeValue.length, oTest.data.length); // 4 4 4

  // 方法
  // 【createTextNode()】
  // 　　createTextNode()方法用于创建文本节点，这个方法接收一个参数——要插入节点中的文本。
  //    在创建新文本的同时，也会为其设置ownerDocument属性
  var oText = document.createTextNode(' hello world!');
  oBox.appendChild(oText);
  console.log(oBox.innerHTML); // test hello world!

  // 　　　　[注意]一般情况下，每个元素只有一个文本节点，但在某些情况下也可能包含多个文本子节点。
  //             如果两个文本节点是相邻的同胞节点，那么这两个节点中的文本就会连起来显示，中间不会有空格。
  var oText2 = document.createTextNode(' <text2>');
  oBox.appendChild(oText2);
  console.log(oBox.innerHTML); // 123hello world! &lt;text2&gt;
  console.log(oBox.childNodes.length); // 3

  // 【normalize()】
  // 　　normalize()方法将包含两个或多个文本节点的父元素中的文本节点合并成一个。
  // 　　[注意]IE9+浏览器无法正常使用该方法，返回的结果是所有的文本节点减1
  var oText3 = document.createTextNode('3');
  oBox.appendChild(oText3);
  console.log(oBox.childNodes.length); // 4
  oBox.normalize();
  console.log(oBox.innerHTML); // test hello world! &lt;text2&gt;3
  //IE9+浏览器返回3,使用该方法时只能将所有的文本节点减1；其他浏览器正常，返回1
  console.log(oBox.childNodes.length); // 1

  // 【splitText()】
  // 　　splitText()方法将一个文本节点分成两个文本节点，即按照指定的位置分割nodeValue值。
  //    原来的文本节点将包含从开始到指定位置之前的内容，新文本节点将包含剩下的文本。
  //    这个方法会返回一个新文本节点，该节点与原节点的parentNode相同。分割文本节点是从文本节点中提取数据的常用DOM解析技术。
  var newNode = oBox.firstChild.splitText(1);
  console.log(newNode.nodeValue); // est hello world! <text2>3
  console.log(oBox.firstChild.nodeValue); // t
  console.log(oBox.lastChild.nodeValue); // est hello world! <text2>3

  // 【appendData()】
  // 　　appendData(text)方法将text添加到节点的末尾
  console.log(oText.appendData('4')); // undefined
  console.log(oText.data); //  hello world!4
  console.log(oBox.childNodes.length); // 2

  // 【deleteData()】
  // 　　deleteData(offset,count)方法从offset指定的位置开始删除count个字符
  console.log(oText.deleteData(0, 2)); // undefined
  console.log(oText.data); // ello world!4
  console.log(oBox.childNodes.length); // 2

  // 【insertData()】
  // 　　insertData(offset,text)方法在offset指定的位置插入text
  console.log(oText.insertData(1, 'test')); // undefined
  console.log(oText.data); // etestllo world!4
  console.log(oBox.childNodes.length); // 2

  // 【replaceData()】
  // 　　replaceData(offset,count,text)方法用text替换从offset指定的位置开始到offset+count处为止处的文本
  console.log(oText.replaceData(1, 1, "test")); // undefined
  console.log(oText.data); // etestestllo world!4
  console.log(oBox.childNodes.length); // 2

  // 【substringData()】
  // 　　substringData(offset,count)方法提取从offset指定的位置开始到offset+count为止处的字符串
  console.log(oText.substringData(1, 1)); // t
})();

(function() {
  console.log("\n---");

})();

(function() {
  console.log("\n---");

})();
