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
  console.log("\n---DOM注释节点COMMENT");

  var jsdom = require("jsdom").jsdom;
  var document = jsdom('hello world!<!--我是注释-->');
  var window = document.defaultView;

  // DOM注释节点COMMENT
  // 定义
  // 　　注释在DOM中是通过Comment类型来表示

  // 特征
  // 　　nodeType:8
  // 　　nodeName:#comment
  // 　　nodeValue:注释的内容
  // 　　parentNode:Document或Element
  // 　　childNode:没有子节点
  var oComment = document.body.firstChild.nextSibling;
  console.log(oComment.nodeName, oComment.nodeType, oComment.nodeValue); // #comment 8 我是注释
  console.log(oComment.parentNode.nodeName, oComment.childNodes.length); // BODY 0
  // 　　[注意1]如果<html>外部上下都有注释，只有firefox可以识别出最下面的注释，其他浏览器都识别不出
  // 　　[注意2]IE8-浏览器将标签名为"!"的元素视作注释节点，所以文档声明也被视作注释节点<!DOCTYPE html>

  // 属性和方法
  // 　　Comment类型与Text类型继承自相同的基类，因此拥有相似的字符串操作方法。与Text类型相似，也可以通过nodeValue或data属性来取得注释的内容
  // 【属性】
  // 　　【data】
  // 　　　　注释节点的data属性与nodeValue属性相同　　
  // 　　【length】
  // 　　　　注释节点的length属性保存着节点字符的数目，而且nodeValue.length、data.length也保存着相同的值
  // 我是注释 我是注释  true
  console.log(oComment.nodeValue, oComment.data, oComment.data == oComment.nodeValue);
  console.log(oComment.length, oComment.nodeValue.length, oComment.data.length); // 4 4 4

  // 【方法】
  // 　　【createComment()】
  // 　　　　createCommente()方法用于创建注释节点，这个方法接收一个参数——要插入节点中的注释文本。
  //       在创建新注释文本的同时，也会为其设置ownerDocument属性
  var oNewComment = document.createComment('hello world!');
  document.body.insertBefore(oNewComment, oComment);
  console.log(document.body.firstChild.nextSibling.data); // hello world!

  // 【appendData()】
  // 　　　　appendData(text)方法将text添加到节点的末尾
  console.log(oComment.appendData('test')); // undefined
  console.log(oComment.data); // 我是注释test

  // 【deleteData()】
  // 　　　　deleteData(offset,count)方法从offset指定的位置开始删除count个字符
  console.log(oComment.deleteData(0, 1)); // undefined
  console.log(oComment.data); // 是注释test

  // 【insertData()】
  // 　　　　insertData(offset,text)方法在offset指定的位置插入text
  console.log(oComment.insertData(1, "test")); // undefined
  console.log(oComment.data); // 是test注释test

  // 【replaceData()】
  // 　　　　replaceData(offset,count,text)方法用text替换从offset指定的位置开始到offset+count处为止处的文本
  console.log(oComment.replaceData(1, 1, "test")); // undefined
  console.log(oComment.data); // 是testest注释test

  // 【substringData()】
  // 　　　　substringData(offset,count)方法提取从offset指定的位置开始到offset+count为止处的字符串
  console.log(oComment.substringData(1, 1)); // t
  console.log(oComment.data); // 是testest注释test

})();

(function() {
  console.log("\n---DocumentFragment类型");

  var jsdom = require("jsdom").jsdom;
  var document = jsdom('<ul class="list" id="list"></ul>');
  var window = document.defaultView;

  // DocumentFragment类型
  // 【定义】
  // 　　在所有节点类型中，只有DocumentFragment在文档中没有对应的标记。
  //    DOM规定文档片段(document fragment)是一种“轻量级”的文档，可以包含和控制节点，但不会像完整的文档那样占用额外的资源。

  // 【特征】
  // 　　nodeType: 11
  // 　　nodeName: #document-fragment
  // 　　nodeValue:null
  // 　　parentNode: null
  // 　　childNode:Element、ProcessingInstruction、Comment、Text、CDATASection、EntityReference

  // 【方法及应用】
  // 　　虽然不能把文档片段直接添加到文档中，但可以将它作为一个“仓库”来使用，即可以在里面保存将来可能会添加到文档中的节点。
  // 要创建文档片段，可以使用document.createDocumentFragment()方法。
  // 文档片段继承了Node的所有方法，通常用于执行那些针对文档的DOM操作。
  // 如果将文档中的节点添加到文档片段中，就会从文档树中移除该节点，也不会从浏览器中再看到该节点。
  // 添加到文档片段中的新节点同样也不属性文档树。可以通过appendChild()或insertBefore()将文档片段中内容添加到文档中。
  // 在将文档片段作为参数传递给这两个方法时，实际上只会将文档片段的所有子节点添加到相应位置上；
  // 文档片段本身永远不会成为文档树的一部分。
  console.time("time");
  var oList = document.getElementById('list');
  var fragment = document.createDocumentFragment();
  var li = null;
  for (var i = 0; i < 3000; i++) {
    li = document.createElement('li');
    li.appendChild(document.createTextNode("Item" + (i + 1)));
    fragment.appendChild(li);
  }
  oList.appendChild(fragment); //409ms
  console.timeEnd('time');

  console.time("time");
  for (var j = 0; j < 3000; j++) {
    var li2 = document.createElement('li');
    li2.appendChild(document.createTextNode("Item" + (j + 1)));
    oList.appendChild(li2);
  }
  console.timeEnd('time'); //206ms
  // 　　　　由以上结果可以看出，向页面加入<li>标签时，使用DocumentFragment的性能更好
})();

(function() {
  console.log("\n---DocumentType类型");

  var jsdom = require("jsdom").jsdom;
  var document = jsdom('<!DOCTYPE html><html lang="en">');
  var window = document.defaultView;

  // DocumentType类型
  // 【定义】
  // 　　DocumentType类型包含着与文档的doctype有关的所有信息

  // 【特征】
  // 　　nodeType: 10
  // 　　nodeName: doctype的名称
  // 　　nodeValue: null
  // 　　parentNode: Document
  // 　　childNode:没有子节点
  //IE8-浏览器不支持document.doctype
  var oDoctype = document.doctype;
  if (oDoctype) {
    console.log(oDoctype.nodeName, oDoctype.nodeType, oDoctype.nodeValue); // html 10 null
    console.log(oDoctype.parentNode.nodeName, oDoctype.childNodes.length); // #document 0
  }

  // 【属性】
  // 　　DocumentType对象有3个属性:name、entities、notations。
  //    通常浏览器中的文档使用的都是HTML或XHTML文档类型，因而entites和notations都是空列表(列表中的项来自行内文档类型声明)
  // 　　name表示文档类型的名称
  // 　　entities表示由文档类型描述的实体的NamedNodeMap对象
  // 　　notations表示由文档类型描述的符号的NamedNodeMap对象
  if (oDoctype) {
    console.log(oDoctype.name, oDoctype.entities, oDoctype.notations); // html undefined undefined
  }
})();

(function() {
  console.log("\n---DOM元素节点ELEMENT");

  var jsdom = require("jsdom").jsdom;
  var document = jsdom(
    '<div class="boxClass" id="boxId" title="boxTitle" lang="en" dir="rtl" >123</div>' +
    '<ul class="list" id="list">' +
    '  <li class="in">1</li>' +
    '  <li class="in" id="test">2</li>' +
    '  <li class="in">3</li>' +
    '  <li class="in">4</li>' +
    '  <li class="in">5</li>' +
    '  <li class="in">6</li>' +
    '</ul>');
  var window = document.defaultView;

  // DOM元素节点ELEMENT
  // 定义
  // 　　Element元素用于表现XML或HTML元素，提供了对元素标签名、子节点及特性的访问

  // 特征
  // 　　nodeType:1
  // 　　nodeName:元素的大写标签名
  // 　　nodeValue:null
  // 　　parentNode:Document或Element
  // 　　子节点可能是Element、Text、Comment、ProcessingInstruction、CDATASection、ENtityReference
  // 　　[注意1]要访问元素的标签名可以使用nodeName，也可以使用tagName属性，这两个属性会返回相同的值
  var oList = document.getElementById('list');
  var oTagTest = oList.nodeName;
  var oNodeTest = oList.tagName;
  //1 'UL' null 'BODY' '#text'(在IE8-浏览器下不支持空白文本节点)
  console.log(oList.nodeType, oList.nodeName, oList.nodeValue,
    oList.parentNode.nodeName, oList.childNodes[0].nodeName);
  console.log(oTagTest, oNodeTest, oTagTest == oNodeTest); // UL UL true
  // 　　[注意2]在HTML中，标签名始终以全部大写表示；而在XML(有时候也包括XHTML)中，标签名则始终会与源代码中的保持一致。
  //          假设不确定自己的脚本将会在HTML还是在XML文档中执行，最好是在比较之前将标签名转换为相同的大小写形式

  // HTML元素
  // 　　所有的HTML元素都由HTMLElement类型表示，不是直接通过这个类型，也是通过它的子类型来表示，
  // HTMLElement类型直接继承自Element并添加了以下5个属性，且这些属性是可读可写的。
  // 　　id:元素在文档中的唯一标识符
  // 　　title:有关元素的附加说明信息，一般通过工具提示条显示出来
  // 　　lang:元素内容的语言代码，很少使用
  // 　　dir:语言的方向，ltr(left to right)从左到右 或 rtl(right to left)从右到左，也很少使用
  // 　　className:与元素的class特性对应，即为元素指定的CSS类。
  var oBox = document.getElementById('boxId');
  console.log(oBox.className, oBox.id, oBox.title, oBox.lang, oBox.dir); // boxClass boxId boxTitle en rtl
  //[注意]如果text-align和dir同时设置的话，以text-align设置为值为准
  oBox.dir = "ltr";
  console.log(oBox.dir); // ltr

  // 创建元素
  // 　　【createElement()】
  // 　　使用document.createElement()方法可以创建新元素。 这个方法接受一个参数，即要创建元素的标签名，
  //    这个标签名在HTML文档中不区分大小写，而在XML(包括XHTML)文档中，则是区分大小写的。
  //    在使用createElement()方法创建新元素的同时，也为新元素设置了ownerDocument属性
  var oDiv = document.createElement("div");
  console.log(oDiv.ownerDocument.nodeName); // #document
  // 　　IE8-浏览器可以为这个方法传入完整的元素标签，也可以包含属性。
  // var oDiv2 = document.createElement('<div id="box222"></div>');
  // document.body.appendChild(oDiv2);
  // console.log(oDiv2.outerHTML);
  // 利用这种方法可以避开IE7-浏览器在动态创建元素的某些问题。
  // 　　　　[a]不能设置动态创建的<iframe>元素的name特性
  // 　　　　[b]不能通过表单的reset()方法重设动态创建的<input>元素
  // 　　　　[c]动态创建的type特性值为"reset"的<button>元素重设不了表单
  // 　　　　[d]动态创建的一批name相同的单选按钮彼此毫无关系。name值相同的一组单选按钮本来应该用于表示同一选项的不同值，
  //          但动态创建的一批这种单选按钮之间却没有这种关系。
  // var iframe = document.createElement("<iframe name = 'myframe'></iframe>");
  // var input = document.createElement("<input type='checkbox'>");
  // var button = document.createElement("<button type = 'reset'></button>");
  // var radio1 = document.createElement("<input type='radio' name ='choice' value = '1'>");
  // var radio2 = document.createElement("<input type='radio' name ='choice' value = '2'>");

  // 元素的子节点
  // 　　元素可以有任意数目的子节点和后代节点，因为元素可以是其他元素的子节点。
  // 　　元素的childNodes属性中包含了它的所有子节点，这些子节点可能是元素、文本、注释、处理指令节点。
  // 　　但不同浏览器在处理空白文本节点上有差异。
  //IE8-浏览器返回2,其他浏览器返回5。因为IE8-浏览器子节点中不包含空白文本节点
  console.log(oList.childNodes.length); // 12
  // 　　【解决】只获取元素节点的兼容写法
  var children = oList.childNodes;
  var num = 0;
  for (var i = 0; i < children.length; i++) {
    if (children[i].nodeType == 1) {
      num++;
    }
  }
  console.log(num); // 6
})();

(function() {
  console.log("\n---动态脚本");

  var jsdom = require("jsdom").jsdom;
  var document = jsdom('');
  var window = document.defaultView;

  // 动态脚本
  // 【定义】
  // 　　在页面加载时不存在，但将来的某一时刻通过修改DOM动态添加的脚本。

  // 【方式】
  // 　　【1】插入外部文件方式
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "js.js";
  document.body.appendChild(script);
  // 使用函数封装如下:
  function loadScript(url) {
    script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.body.appendChild(script);
  }
  loadScript("js.js");

  // 【2】直接插入JavaScript代码
  // 　　　　IE8-浏览器下使用appendChild或innerHTML都会报错，
  // 　　　　因为IE8-浏览器将<script>视为一个特殊的元素，不允许DOM访问其子节点。
  var script2 = document.createElement("script");
  script2.type = "text/javascript";
  //script.innerHTML = "alert('hi');";
  //script.appendChild(document.createTextNode("alert('hi');"));
  document.body.appendChild(script2);
  // 【解决】使用<script>元素的text属性来指定Javascript代码
  var script3 = document.createElement("script");
  script3.type = "text/javascript";
  script3.text = "alert('hi');";
  document.body.appendChild(script3);
  // 【完美解决】safari3-浏览器不能正确支持text属性，但却允许使用文本节点，封装兼容函数如下
  function loadScriptString(code) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    try {
      script.appendChild(document.createTextNode(code));
    } catch (ex) {
      script.text = code;
    }
    document.body.appendChild(script);
  }
  loadScriptString("alert('hi!')");
  console.log(document.body.outerHTML);

  console.log("\n---动态样式");
  // 动态样式
  // 【定义】
  // 　　在页面刚加载时不存在，加载完成后动态添加到页面中的样式。

  // 【方式】
  // 　　【1】插入外部文件方式
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = "style.css";
  var head = document.getElementsByTagName('head')[0];
  head.appendChild(link);
  console.log(document.head.outerHTML);
  // 使用函数封装如下：
  function loadStyles(url) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = url;
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(link);
  }
  loadStyles("style.css");
  console.log(document.head.outerHTML);

  // 　　【2】直接插入css嵌入样式
  var style = document.createElement("style");
  style.type = "text/css";
  //style.innerHTML = "body{background-color: red;}";
  //style.appendChild(document.createTextNode("body{background-color: red;}"));
  // var head = document.getElementsByTagName('head')[0];
  head.appendChild(style);
  console.log(document.head.outerHTML);
  // 　　　　如<script>标签类似，IE8-浏览器将<style>标签当作特殊的节点，不允许访问其子节点。
  // 　　　　IE10-浏览器支持使用styleSheet.cssText属性来设置样式。兼容写法如下:
  function loadStyleString(css) {
    var style = document.createElement("style");
    style.type = "text/css";
    try {
      style.appendChild(document.createTextNode(css));
    } catch (ex) {
      style.styleSheet.cssText = css;
    }
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(style);
  }
  loadStyleString("body{background-color: red;}");
  console.log(document.head.outerHTML);
})();

(function() {
  console.log("\n---DOM选择器API");

  var jsdom = require("jsdom").jsdom;
  var document = jsdom(
    '<body style="height: 100%;">' +
    '<div class="boxClass" id="boxId" title="boxTitle" lang="en" dir="rtl" >123</div>' +
    '<div class="boxClass" id="boxId" title="boxTitle" lang="en" dir="rtl" >321</div>' +
    '<button name="box">0</button>' +
    '<div class="box" id="box" style="height: 200px;">1</div>' +
    '<div class="box" id="box" style="height: 150px;">2</div>' +
    '<ul class="list" id="list" style="height:100px">' +
    '  <li class="in" style="height: 30px;">1</li>' +
    '  <li class="in ab" id="test" title="test" style="height: 30px;">2</li>' +
    '  <li class="in ab c" style="height: 30px;">3</li>' +
    '  <li class="ab in c" style="height: 30px;">4</li>' +
    '  <li class="ab" style="height: 30px;">5</li>' +
    '  <li class="in" style="height: 30px;">6</li>' +
    '</ul>');
  var window = document.defaultView;

  // DOM选择器API
  // getElementById()
  // 　　getElementById()方法接收一个参数:要取得元素的ID，若找到相应元素则返回该元素，若不存在则返回null
  // 　　【IE7-浏览器bug1】ID属性不区分大小写
  var oBox = document.getElementById('BoxId');
  console.log(oBox); // IE7-可以找到该元素，但其他浏览器都返回null
  oBox = document.getElementById('boxId');
  console.log(oBox.nodeName);
  // 　　　如果页面中多个元素的ID属性相同，则只返回文档中第一次出现的元素
  console.log(oBox.innerHTML); // 123
  // 　　【IE7-浏览器bug2】表单元素的name属性也会被当作ID属性识别出来。
  // 　　因此为了避免这种问题，最好不让表单元素的name属性和其他元素的ID属性相同
  var oBox2 = document.getElementById('box');
  console.log(oBox2.innerHTML); // 1 【IE7-浏览器bug2】0

  // getElementsByTagName()　
  // 　　getElementsByTagName()该方法接收一个参数，即要取得元素的标签名，而返回的是包含0或多个元素的NodeList。
  // 　　在HTML文档中，这个方法会返回一个HTMLCollection对象，作为一个动态集合，该对象与NodeList非常类似。
  // 　　对于HTMLCollection对象而言，我们可以向方括号中传入数值或字符串形式的索引值。
  // 　　在后台，会对数值索引调用item()方法，对字符串索引调用namedItem()方法。
  // 　　HTMLCollection对象还有一个方法是namedItem()，可以通过元素的name特性或者直接用方括号来取得集合中的项。
  // 　　但safari和IE都不支持该方法。
  var oList = document.getElementById('list');
  var aIn = oList.getElementsByTagName('li');
  console.log(aIn.length); // 6
  console.log(aIn[0].innerHTML); //
  console.log(aIn.item(0).innerHTML); // 1
  // console.log(aIn["in3"].innerHTML); // 在safari和IE下报错，在其他浏览器下输出3
  // console.log(aIn.namedItem("in3").innerHTML); // 在safari和IE下报错，在其他浏览器下输出3

  // 　　要想取得所有的元素，可以向getElementsByTagName传入"*"，表示全部
  var aAll = document.getElementsByTagName('*');
  //标准浏览器下结果为[html, head, meta, title, body, script]
  //IE8-浏览器下结果为7个，由于它把<!DOCTYPE html>识别为注释，且把注释识别为元素，所以多1个
  console.log(aAll.length); // 15

  // 　　在HTML中getElementsByTagName()里的元素不需要区分大小写，但在XML包括XHTML页面需要区分大小写
  var aAll2 = document.getElementsByTagName('DIV')[0];
  console.log(aAll2.innerHTML); //所有浏览器都返回 123

  // getElementsByName()
  // 　　getElementsByName()该方法会返回带有给定name特性的所有元素，所有浏览器都支持。
  // 　　最常用的是取得单选按钮。

  // getElementsByClassName()
  // 　　getElementsByClassName()方法接收一个参数，即一个包含一个或多个类名的字符串，返回带有指定类的所有元素的NodeList。
  // 　　传入多个类名时，类名的先后顺序不重要。(IE8-浏览器不支持)
  var oTest = document.getElementsByClassName('in');
  console.log(oTest.length); // 5
  oTest = document.getElementsByClassName('ab');
  console.log(oTest.length); // 4
  oTest = document.getElementsByClassName('ab in');
  console.log(oTest.length); // 0

  // classList
  // 　　在操作类名时，需要通过className属性添加、删除和替换类名。
  // 　　因为className是一个字符串，所以即使只修改字符串一部分，也必须每次都设置整个字符串的值。
  // 　　要从className字符串中删除一个类名，需要把类名拆开，删除不想要的那个，再重新拼成一个新字符串。(IE9-浏览器不支持)
  oTest = document.getElementsByClassName('in')[1];

  function removeClass(obj, str) {
    var classNames = obj.className.split(/\s+/);
    var pos = -1;
    for (var i = 0, len = classNames.length; i < len; i++) {
      if (classNames[i] == str) {
        pos = i;
        break;
      }
    }
    classNames.splice(i, 1);
    obj.className = classNames.join(' ');
  }
  console.log(oTest.className); // in ab
  removeClass(oTest, 'in');
  console.log(oTest.className); // ab

  // HTML5为所有元素添加了classList属性，这个classList属性是新集合类型DOMTokenList的实例，
  // 它有一个表示自己包含多少元素的length属性，而要取得每个元素可以使用item()方法，也可以使用方括号法。
  // 此外，这个新类型还定义如下方法：
  // 　　add(value):将给定的字符串值添加到列表中，如果值已存在，则不添加
  // 　　contains(value):表示列表中是否存在给定的值，如果存在则返回true,否则返回false
  // 　　remove(value):从列表中删除给定的字符串
  // 　　toggle(value):如果列表中已经存在给定的值，删除它；如果列表中没有给定的值，添加它。
  oTest = document.getElementsByTagName('li')[2];
  console.log(oTest.classList); // DOMTokenList { '0': 'in', '1': 'ab', '2': 'c' }
  // IE9-浏览器返回null,其他浏览器返回["in", "ab"]
  // 删除"in"类
  oTest.classList.remove("in");
  console.log(oTest.className); // ab c
  // 添加"x"类
  oTest.classList.add("x");
  console.log(oTest.className); // ab c x
  // 切换"in"类
  oTest.classList.toggle("in"); // ab c x in
  console.log(oTest.className);
  // 切换"in"类
  oTest.classList.toggle("in"); // ab c x
  console.log(oTest.className);
  // 确定是否包含"in"类
  console.log(oTest.classList.contains("in")); // false

  // querySelector()
  // 　　querySelector()方法接收一个CSS选择符，返回与该模式匹配的第一个元素，
  // 　　如果没有找到匹配的元素，返回null(IE7-浏览器不支持)
  //返回null
  var oNull = document.querySelector('.null');
  console.log(oNull); // null
  // 取得body元素
  var body = document.querySelector("body");
  console.log(body.style.height); // 100%
  // 取得ID为"box"的元素
  oBox = document.querySelector('#box');
  console.log(oBox.style.height); // 200px
  // 取得第一个class为"list"的ul元素
  oList = document.querySelector('ul.list');
  console.log(oList.style.height); // 100px
  // 取得第一个class为"in"的元素
  var oIn = document.querySelector('.in');
  console.log(oIn.innerHTML); // 1
  // 取得第一个title属性为test的元素
  oTest = body.querySelector('[title="test"]');
  console.log(oTest.innerHTML); // 2

  // querySelectorAll()
  // 　　querySelectorAll()接收一个CSS选择符，返回一个NodeList的实例。
  // 　　具体来说，返回的值实际上是带有所有属性和方法的NodeList，而其底层实现则类似于一组元素的快照，而非不断对文档进行搜索的动态查询。
  // 　　这样实现可以避免使用NodeList对象通常会引起的大多数性能问题。
  // 　　只要传给querySelectorAll()方法的CSS选择符有效，该方法都会返回一个NodeList对象，而不管找到多少匹配的元素。
  // 　　如果没有找到匹配的元素，NodeList就是空的。(IE7-浏览器不支持)
  // 返回null
  oNull = document.querySelectorAll('.null');
  console.log(oNull); // null NodeList { _length: 0 }
  // 取得body元素
  body = document.querySelectorAll("body")[0];
  console.log(body.style.height); // 100%
  // 取得所有class为"in"的元素
  oIn = document.querySelectorAll('.in');
  for (var i = 0; i < oIn.length; i++) {
    console.log(oIn[i].innerHTML); // 1, 4, 6
  }
  // 取得title属性为test的元素
  oTest = body.querySelectorAll('[title="test"]');
  console.log(oTest.length); // 1 [li.in]

  // matchesSelector()
  // 　　matchesSelector()方法接收一个CSS选择符参数，如果调用元素与该选择符相匹配，返回true；否则返回false(暂无浏览器支持)
  // console.log(document.body.matchesSelector('body')); // true
  // 　但IE9+浏览器支持msMatchesSelector()方法，firefox支持mozMatchesSelector()方法，
  // 　safari和chrome支持webkitMatchesSelector()方法。所以兼容写法为:
  function matchesSelector(element, selector) {
    if (element.matchesSelector) {
      return element.matchesSelector(selector);
    }
    if (element.msMatchesSelector) {
      return element.msMatchesSelector(selector);
    }
    if (element.mozMatchesSelector) {
      return element.mozMatchesSelector(selector);
    }
    if (element.webkitMatchesSelector) {
      return element.webkitMatchesSelector(selector);
    }
    return null;
  }
  console.log(matchesSelector(document.documentElement, 'html')); // true
})();

(function() {
  console.log("\n---DOM操作表格实例");

  var jsdom = require("jsdom").jsdom;
  var document = jsdom('');
  var window = document.defaultView;
  // DOMcore方法
  //创建表格
  var table = document.createElement("table");
  table.border = "1";
  table.width = "100%";
  //创建tbody
  var tbody = document.createElement("tbody");
  table.appendChild(tbody);
  //创建第一行
  var row1 = document.createElement("tr");
  tbody.appendChild(row1);
  var cell1_1 = document.createElement("td");
  cell1_1.appendChild(document.createTextNode("Cell 1,1"));
  row1.appendChild(cell1_1);
  var cell2_1 = document.createElement("td");
  cell2_1.appendChild(document.createTextNode("Cell 2,1"));
  row1.appendChild(cell2_1);
  //创建第二行
  var row2 = document.createElement("tr");
  tbody.appendChild(row2);
  var cell1_2 = document.createElement("td");
  cell1_2.appendChild(document.createTextNode("Cell 1,2"));
  row2.appendChild(cell1_2);
  var cell2_2 = document.createElement("td");
  cell2_2.appendChild(document.createTextNode("Cell 2,2"));
  row2.appendChild(cell2_2);
  //将表格添加到文档主体中
  document.body.appendChild(table);
  console.log(document.body.outerHTML);

  // 属性和方法
  // 　　显然DOM代码很长，为了方便构建表格，HTML DOM为<table>、<tbody>、<tr>元素添加了属性和方法。
  // 　　【1】为<table>元素添加的属性和方法
  // caption:保存着对<caption>元素的指针
  // tBodies:是一个<tbody>元素的HTMLCollection
  // tFoot:保存着对<tfoot>元素的指针
  // tHead:保存着对<thead>元素的指针
  // createTHead():创建<thead>元素，将其放到表格中，返回引用
  // createTFoot():创建<tfoot>元素，将其放到表格中，返回引用
  // createCaption():创建<caption>元素，将其放到表格中，返回引用
  // deleteTHead():删除<thead>元素
  // deleteTFoot():删除<tfoot>元素
  // deleteCaption():删除<caption>元素
  //    【2】为<tbody>元素添加的属性和方法
  // rows:保存着<tbody>元素中行的HTMLCollection
  // deleteRow(pos):删除指定位置的行
  // insertRow(pos):向rows集合中的指定位置插入一行，返回对新插入行的引用
  // 　　【3】为<tr>元素添加的属性和方法
  // cells:保存着<tr>元素中单元格的HTMLCollection
  // deleteCell(pos):删除指定位置的单元格
  // insertCell(pos):向cells集合中的指定位置插入一个单元格，返回对新插入单元格的引用

  // // 代码重写
  // //创建表格
  // var table2 = document.createElement("table");
  // table2.border = "1";
  // table2.width = "100%";
  // //创建tbody
  // var tbody2 = document.createElement("tbody");
  // table2.appendChild(tbody2);
  // //创建第一行
  // tbody2.insertRow(0);
  // tbody2.rows[0].insertCell(0);
  // tbody2.rows[0].cells[0].appendChild(document.createTextNode("Cell 1,1"));
  // tbody2.rows[0].insertCell(1);
  // tbody2.rows[0].cells[1].appendChild(document.createTextNode("Cell 2,1"));
  // //创建第二行
  // tbody2.insertRow(1);
  // tbody2.rows[1].insertCell(0);
  // tbody2.rows[1].cells[0].appendChild(document.createTextNode("Cell 1,2"));
  // tbody2.rows[1].insertCell(1);
  // tbody2.rows[1].cells[1].appendChild(document.createTextNode("Cell 2,2"));
  // //将表格添加到文档主体中
  // document.body.appendChild(table2);
  // console.log(document.body.outerHTML);
})();

(function() {
  console.log("\n---DOM中文本和标记的插入");

  var jsdom = require("jsdom").jsdom;
  var document = jsdom(
    '<div class="box" id="box"></div>' +
    '<ul class="list" id="list" style="height:100px">' +
    '  <li class="in" style="height: 30px;">1</li>' +
    '  <li class="in ab" id="test" title="test" style="height: 30px;">2</li>' +
    '  <li class="in ab c" style="height: 30px;">3</li>' +
    '  <li class="ab in c" style="height: 30px;">4</li>' +
    '  <li class="ab" style="height: 30px;">5</li>' +
    '  <li class="in" style="height: 30px;">6</li>' +
    '</ul>');
  var window = document.defaultView;

  // innerHTML
  // 　　innerHTML在读模式下，返回与调用元素的所有子节点(包括元素、注释和文本节点)对应的HTML标记。
  // 　　在写模式下，innerHTML会根据指定的值创建新的DOM树，然后用这个DOM树完全替换调用元素原先的所有子节点。
  　　
  // 　　[注意]并不是所有元素都支持innerHTML属性，不支持innerHTML的属性有:
  // 　　<col>、<colgroup>、<frameset>、<head>、<html>、<style>、<table>、<tbody>、<thead>、<tfoot>、<tr>。
  // 　　在IE8-浏览器中<title>元素也没有该属性

  // IE8-浏览器会将所有标签转换成大写形式，且不包含空白文本节点；而其他浏览器则原样返回
  var oList = document.getElementById("list");
  console.log(oList.innerHTML);

  // 　　[a]如果设置的值只是文本，则结果就是设置纯文本
  var oBox = document.getElementById("box");
  oBox.innerHTML = "hello world!"; // 页面显示hello world!

  // 　　[b]如果设置的值包含HTML标签，则浏览器会将这个字符串解析成相应的DOM树
  oBox.innerHTML = "Hello & welcome, <b>'reader'</b>"; //页面显示Hello & welcome, 'reader'

  // 　　无论什么时候，只要使用innerHTML从外部插入HTML，都应该首先以可靠的方式处理HTML。
  // 　　IE浏览器提供了window.toStaticHTML()方法，这个方法接收一个参数，即一个HTML字符串；
  // 　　返回一个经过无害处理后的版本——从源HTML中删除所有脚本节点和事件处理程序属性。
  var text = "<a href='#' onclick = 'alert(\"hi\");'>Click Me</a>";
  // var sanitized = window.toStaticHTML(text);  // 只有IE支持
  // console.log(sanitized); // <a href="#">Click Me</a>

  // 【限制】
  // 　　　　【<script>】
  // 　　　　大多数浏览器中，通过innerHTML插入<script>元素并不会执行其中的脚本。
  // 　　　　IE9-浏览器在满足一定条件下可以执行脚本，一是为<script>元素设置defer属性，二是<script>元素必须位于“有作用域的元素”之后。
  // 　　　　如果通过innerHTML插入的字符串开头就是一个“无作用域的元素”，那么IE会在解析这个字符串前先删除该元素。
  //innerHTML字符串一开始就是一个无作用域的元素，所以这个字符串会变成空字符串。
  oBox.innerHTML = "<script defer>alert('hi');<\/script>";
  console.log(oBox.outerHTML);
  //     如果想插入这段脚本，必须在前面添加一个有作用域的元素，可以是一个文本节点，也可以是一个没有结束标签的元素如<input>。
  //     以下这三种方法都可以让页面弹出"hi";
  oBox.innerHTML = "&nbsp;<script defer>alert('hi');<\/script>";
  console.log(oBox.outerHTML);
  oBox.innerHTML = "<div>&nbsp;</div><script defer>alert('hi');<\/script>";
  console.log(oBox.outerHTML);
  oBox.innerHTML = "<input type='hidden'><script defer>alert('hi');<\/script>";
  console.log(oBox.outerHTML);
  // 　　　　【<style>】
  // 　　　　　大多数浏览器都支持以直观的方式通过innerHTML插入<script>标签
  // IE8-浏览器无变化，其他浏览器背景变成红色
  oBox.innerHTML = "<style type='text\/css'>body{background-color: red;}</style>";
  //             由于IE8-浏览器中，<style>是一个没有作用域的元素，所以必须设置一个前置的作用域元素
  oBox.innerHTML = "_<style type='text\/css'>body{background-color: red;}</style>";
  console.log(oBox.outerHTML);
  oBox.removeChild(oBox.firstChild);

  // outerHTML
  // 　　在读模式下outerHTML返回调用它的元素及所有子节点的HTML标签。
  // 　　在写模式下，outerHTML会根据指定的HTML字符串创建新的DOM子树，然后用这个DOM子树完全替换调用元素。
  console.log(oList.outerHTML); // IE8-浏览器会将所有标签转换成大写形式，且不包含空白文本节点
  // 　　写模式下新创建的元素将取代本身
  oBox.outerHTML = "<div></div>";
  console.log(document.getElementById('box')); // null

  // innerText
  // 　　通过innerText属性可以操作元素中包含的所有文本内容，包括子文档树中的文本。
  // 　　在通过innerText读取值时，它会按照由浅入深地顺序，将子文档树中的所有文本拼接起来。
  // 　　在通过innerText写入值时，结果会删除元素的所有子节点，插入包含相应文本值的文本节点。(firefox不支持)
  console.log(oList.innerHTML);
  console.log(oList.innerText); // 除了firefox，其他浏览器都输出1 2
  oList.innerText = "hello & welcome <b>reader</b>"; // 页面上显示hello & welcome <b>reader</b>
  console.log(oList.innerText); // 除了firefox，其他浏览器都输出1 2

  // outerText
  // 　　除了作用范围扩大到了包含调用它的节点之外，outerText与innerText基本上没有多大区别，
  // 　　在读取文本值时，outerText与innerText的结果完全一样，但在写模式下，outerText就完全不同了：
  // 　　outerText不只是替换调用它的元素的子节点，而是会替换整个元素。(firefox不支持)
  console.log(oList.outerText); //1 2
  oList.outerText = "hello & welcome <b>reader</b>"; // 页面上显示hello & welcome <b>reader</b>
  console.log(document.getElementById('list').nodeName); // null

  // textContent
  // 　　textContent属性与innerText属性类似。但实际上innerText与textContent返回的内容并不完全一样。
  // 　　innerText会忽略行内的样式和脚本，而textContent则会像返回其他文本一样，返回行内的样式和脚本。
  // 　　避免跨浏览器兼容的问题的最佳途径，就是从不包含行内样式或行内脚本的DOM子树副本或DOM片段中读取文本(IE8-浏览器不支持)
  console.log(oList.textContent); //除了IE8-浏览器，其他浏览器都输出   1  2  3  4  5  6
  oList.textContent = "hello & welcome <b>reader</b>"; // 页面上显示hello & welcome <b>reader</b>
  console.log(oList.textContent); // hello & welcome <b>reader</b>

  // 　　所以，innerText与textContent的兼容写法为：
  // var oList = document.getElementById('list');

  function getInnerText(element) {
    return (typeof element.textContent == "string") ? element.textContent : element.innerText;
  }

  function setInnerText(element, text) {
    if (typeof element.textContent == "string") {
      element.textContent = text;
    } else {
      element.innerText = text;
    }
  }
  console.log(getInnerText(oList)); //1 2
  setInnerText(oList, "hello & welcome <b>reader</b>"); //页面上显示hello & welcome <b>reader</b>

  // 内存与性能
  // 　　当某个元素有一个事件处理程序，在使用某个属性将该元素从文档树中删除后，
  // 　　元素与事件处理程序之间的绑定关系在内存中并没有一并删除，如果这种情况频繁出现，页面占用的内在数量就会明显增加。
  // 　　因此，使用innerHTML、outerHTML属性时，最好先手工删除要被替换元素的所有事件处理程序和JavaScript对象属性。
  // 最好将设置innerHTML或outerHTML的次数控制在合理的范围内。
  // for (var i = 0, len = values.length; i < len; i++) {
  //   //要避免这种频繁操作
  //   ul.innerHTML += "<li>" + values[i] + "</li>";
  // }
  // 　　这种每次循环都设置一次innerHTML的做法效率很低，而且，每次循环还要从innerHTML中读取一次信息，
  // 　　就意味着每次循环要访问两次innerHTML。最好的做法是单独构建字符串，然后再一次性地将字符串赋值给innerHTML。
  // var itemsHtml = "";
  // for (var i = 0, len = values.length; i < len; i++) {
  //   itemsHtml += "<li>" + values[i] + "</li>";
  // }
  // //这种效率要高得多，因为它只对innerHTML执行了一次赋值操作。
  // ul.innerHTML = itemsHtml;
})();


(function() {
  console.log("\n---DOM样式操作");

  var jsdom = require("jsdom").jsdom;
  var document = jsdom(
    '<link rel="stylesheet" href="sheet1.css" media = "all" title="sheet1">' +
    '<style>@import url(sheet2.css); body{height: 100px; border: 10px solid black;}</style>' +
    '<style>.box{font: 12px/20px "宋体";height: 20px !important;}' +
    'a{display: inline-block; height: 100px; width: 100px; background: blue; color: white; border: 1px solid black;}' +
    'a:after{content:"伪元素"; color: orange;}' +
    '</style>' +
    '<div class="box" id="box" style="background-color: red;height: 100px; width: 100px;">123</div>' +
    '<a class="link" id="link">link</a>');
  var window = document.defaultView;

  // 元素style属性的定义
  // 　　任何支持style特性的HTML元素在JavaScript中都有一个对应的style属性。
  // 　　这个style对象是cssStyleDeclaration的实例，包含着通过HTML的style特性指定的所有样式信息，
  // 　　但不包含与外部样式表或嵌入样式表经层叠而来的样式。
  // 　　在style特性中指定的任何 CSS属性都将表现为这个style对象的相应属性。
  // 　　对于使用中划线的CSS属性名，必须将其转换成驼峰大小写形式，才能通过JavaScript访问。
  // 　　多数情况下都可以通过简单地转换属性名的格式来实现，但其中一个不能直接转换的CSS属性是float。
  // 　　因为，float是JavaScript中的保留字，不能用作属性名。
  // 　　[注意]IE8-浏览器不支持属性名cssFloat,IE浏览器支持属性styleFloat,所有浏览器都支持float属性
  var oBox = document.getElementById('box');
  // IE8-浏览器不支持该属性
  oBox.style.cssFloat = 'right';
  console.log(oBox.outerHTML);
  // 所有浏览器都兼容
  oBox.style.float = 'left';
  console.log(oBox.outerHTML);
  // IE浏览器支持该属性 jsDom不支持
  oBox.style.styleFloat = 'right';
  console.log(oBox.outerHTML);

  // 元素style属性的属性和方法
  // 　　【cssText】
  // 　　cssText:通过它能够访问到style特性中的CSS代码。
  // 　　在读模式下，cssText返回浏览器对style特性中CSS代码的内部表示；在写模式中，赋给cssText的值会重写整个style特性的值。
  // 　　设置cssText是为元素应用多项变化最快捷的方法，因为可以一次性应用所有变化。(可读写)
  console.log(oBox.style.cssText); // background-color: red; height: 100px; width: 100px; float: left;
  document.onclick = function() {
    oBox.style.cssText = "height:40px; width:40px; background-color:blue;";
  };

  //     【item()】
  // 　　　　item():返回给定位置的CSS属性的名称，也可以使用方括号语法。
  // 　　【length】
  // 　　　　length:应用给元素的CSS属性的数量。设计length属性的目的是将其与item()方法配套使用，以便迭代在元素中定义的CSS属性。
  // 　　　　在使用length和item()时，style对象实际上就相当于一个集合(IE8-不支持)
  // 　　【getPropertyValue】
  // 　　　　getPropertyValue():返回给定属性的字符串值(IE8-不支持)
  // 　　【getPropertyPriority()】
  // 　　　　getPropertyPriority():如果给定的属性使用了!important设置，则返回"important";否则返回空字符串(IE8-不支持)
  // IE8-浏览器输出undefined,其他浏览器输出3
  console.log(oBox.style.length); //3
  // IE9+浏览器输出width，IE8-浏览器输出大写的WIDTH，其他浏览器输出height
  console.log(oBox.style[0]);
  // IE8-浏览器不支持，其他浏览器输出100px
  console.log(oBox.style.getPropertyValue(oBox.style[0]));
  // IE8-浏览器不支持，其他浏览器输出空字符串
  console.log(oBox.style.getPropertyPriority('height'));
  // IE8-浏览器不支持，其他浏览器输出important
  console.log(oBox.style.getPropertyPriority('width'));

  //     【getPropertyCSSValue()】
  // 　　　　getPropertyCSSValue():返回包含两个属性的CSSRule类型，这两个属性分别是cssText和cssValueType。
  // 　　　　其中cssText属性的值与getPropertyValue()返回的值相同，而cssValueType属性则是一个数值常量，
  // 　　　　表示值的类型：0表示继承的值，1表示基本的值，2表示值列表，3表示自定义的值。(只有safari支持)
  // 　　【parentRule】
  // 　　　　parentRule:表示CSS信息的CSSRule对象(IE不支持)
  //只有safari支持，返回一个CSSValue对象，firefox返回null，其他浏览器报错
  if (typeof oBox.style.getPropertyCSSValue == "function" && oBox.style.getPropertyCSSValue(oBox.style[0]) != null) {
    console.log(oBox.style.getPropertyCSSValue(oBox.style[0]));
    for (var i = 0, len = oBox.style.length; i < len; i++) {
      var prop = oBox.style[i];
      var value = oBox.style.getPropertyCSSValue(prop);
      //height:100px(1) background-color:red(1) width:100px(1)
      console.log(prop + ":" + value.cssText + "(" + value.cssValueType + ")");
    }
  }
  //IE浏览器返回undefined，其他浏览器返回null
  console.log(oBox.style.parentRule);

  //    【removeProperty()】
  // 　　　　removeProperty():从样式中删除给定属性，并返回被删除属性的属性值(IE8-不支持)
  // 　　【setProperty()】
  // 　　　　setProperty(propertyName,value,priority):将给定属性设置为相应的值，
  // 　　　　并加上优先权标志("important"或一个空字符串)(IE8-不支持)
  console.log(oBox.style.cssText); //width: 100px !important; height: 100px; background-color: red;
  //IE8-浏览器不支持，其他浏览器返回100px
  console.log(oBox.style.removeProperty('height'));
  console.log(oBox.style.cssText); //width: 100px !important; background-color: red;
  //IE8-浏览器不支持，其他浏览器返回undefined
  console.log(oBox.style.setProperty('width', '20px', ''));
  console.log(oBox.style.cssText); //width: 20px; background-color: red;
  //IE8-浏览器不支持，其他浏览器返回undefined
  console.log(oBox.style.setProperty('background-color', 'blue', 'important'));
  console.log(oBox.style.cssText); //background-color: blue ! important; width: 20px;

  // 计算的样式
  // 　　【getComputedStyle()】
  // 　　　　getComputedStyle()方法接收两个参数：要取得计算样式的元素和一个伪元素字符串。
  // 　　　　如果不需要伪元素信息，第二个参数可以是null。getComputedStyle()方法返回一个CSSStyleDeclaration对象，
  // 　　　　其中包含当前元素的所有计算的样式(IE8-浏览器不支持)
  // 　　　　[注意1]对于font/background/border等复合样式，各浏览器处理不一样。
  // 　　　　      chrome和opera会返回整个复合样式，而IE9+、firefox和safari则什么都不输出
  // 　　　　[注意2]不论以什么格式设置颜色，浏览器都以rgb()或rgba()的形式输出
  // 　　　　[注意3]所有计算的样式都是只读的，不能修改计算后样式对象中的CSS属性
  // 　　　　[注意4]若不需要伪元素信息，该方法有多种省略写法，以获取div的width信息为例
  // 　　　　　　[a]document.defaultView.getComputedStyle(div,null).width
  // 　　　　　　[b]document.defaultView.getComputedStyle(div).width
  // 　　　　　　[c]window.getComputedStyle(div).width
  // 　　　　　　[d]getComputedStyle(div).width(这种写法最简单)
  var oLink = document.getElementById("link");
  //IE8-浏览器不支持
  console.log(window.getComputedStyle(oBox, null).height); //20px
  //(chrome/opera)normal normal normal normal 12px / 20px 宋体
  //(IE9+/safari/firefox)什么都没输出
  console.log(document.defaultView.getComputedStyle(oBox, null).font);
  //(chrome/opera)1px solid rgb(0, 0, 0)
  //(IE9+/safari/firefox)什么都没输出
  console.log(window.getComputedStyle(oLink).border);
  //(chrome/opera)rgb(0, 0, 255) none repeat scroll 0% 0% / auto padding-box border-box
  //(IE9+/safari/firefox)什么都没输出
  console.log(window.getComputedStyle(oLink).background);
  //所有浏览器都输出rgb(255, 165, 0)
  console.log(window.getComputedStyle(oLink, ":after").color);
  //所有浏览器都输出visible
  console.log(window.getComputedStyle(oLink, ":after").visibility);
  //该方法只读不可写，如强行写值会报错
  //getComputedStyle(oLink,":after").visibility = "hidden";

  // 【currentStyle】
  // 　　　　虽然IE8-浏览器不支持getComputedStyle()方法，但在IE中每个具有style属性的元素还有一个currentStyle属性，
  // 　　　　这个属性是CSSStyleDeclaration的实例，包含当前元素全部计算后的样式。
  // console.log(oBox.currentStyle.height); // 20px
  //IE8-浏览器输出undefined，而IE9+浏览器什么都不输出
  // console.log(oBox.currentStyle.font);
  // console.log(oBox.currentStyle.position); // static
  // 　　兼容写法如下：
  function getCSS(obj, style) {
    if (window.getComputedStyle) {
      return window.getComputedStyle(obj)[style];
    }
    return obj.currentStyle[style];
  }
  console.log(getCSS(oBox, "height")); // 20px

  // 操作样式表CSSStyleSheet　　　
  // 　　CSSStyleSheet类型表示的是样式表，包括通过<link>元素包含的样式表和在<style>元素中定义的样式表。
  // 　　CSSStyleSheet对象是只读的(属性disabled例外)。
  // 【继承属性】
  // 　　【length】
  // 　　　　表示有多少样式表，外部样式表中一个<link>算一个，内部样式表中一个<style></style>算一个。
  // 　　【item()】
  // 　　　　表示第几个样式表，也可以使用方括号法。item()方法中序号的顺序与在解析页面的顺序一致
  // 　　【href】
  // 　　　　如果样式表是通过<link>包含的外部样式表，则表示样式表的URL,否则为null
  // 　　【disabled】
  // 　　　　表示样式表是否被禁用的布尔值。这个属性值可读写，将这个值设置为true则可以禁用样式表
  // 　　【media】
  // 　　　　表示当前样式表支持的所有媒体类型的集合,在IE8-浏览器中输出media特性值的字符串
  // 　　【ownerNode】(IE8-不支持)
  // 　　　　表示拥有当前样式表的指针，返回<link>或<style>元素对象
  // 　　【parentStyleSheet】
  // 　　　　在当前样式表是通过@import导入的情况下，这个属性是一个指向导入它的样式表的指针，否则为null
  // 　　【title】
  // 　　　　ownerNode中title属性的值
  // 　　【type】(IE8-不支持)
  // 　　　　表示样式表类型的字符串，对于CSS样式表而言，这个字符串是"text/css"
  //因为有外部和内部样式表各1个，所以结果为2
  console.log(document.styleSheets.length); // 2
  //因为<link>标签在<style>标签上面，所以外部样式表为第0个
  var oOut = document.styleSheets.item(0);
  //内部样式表为第1个
  var oIn = document.styleSheets[1];
  //disabled属性默认为false
  console.log(oOut.disabled); //false
  //若设置disabled为true,则禁用样式表
  console.log(oOut.disabled = true); //true
  //外部样式表显示URL
  console.log(oOut.href); //sheet1.css
  //IE8-浏览器什么都不输出，其他浏览器输出null
  console.log(oIn.href); //null
  //IE8-浏览器输出字符串"all"，其他浏览器输出一个MediaList对象，第0项为all
  console.log(oOut.media);
  //IE8-浏览器什么都不输出，其他浏览器输出一个MediaList对象，第0项为undifined
  console.log(oIn.media);
  //IE8-返回undefined，其他浏览器输出<link>
  console.log(oOut.ownerNode);
  //IE8-返回undefined，其他浏览器输出<style>
  console.log(oIn.ownerNode);
  //null
  console.log(oOut.parentStyleSheet);
  //null
  console.log(oIn.parentStyleSheet);
  //sheet1
  console.log(oOut.title);
  //IE浏览器什么都不输出，其他浏览器输出null
  console.log(oIn.title);
  //text/css,IE8-浏览器下什么都不输出
  console.log(oOut.type);
  //text/css,IE8-浏览器下什么都不输出
  console.log(oIn.type);

  // 【自有属性和方法】
  // 　　【cssRules】(IE8-浏览器不支持)
  // 　　　　表示样式表中包含的样式规则的集合
  // 　　【rules】(firefox不支持)
  // 　　　　表示样式表中包含折样式规则的集合
  // 　　　　[注意]对于rules属性IE8-浏览器不识别@import
  // 　　兼容写法如下:
  function rules(sheet) {
    return sheet.cssRules || sheet.rules;
  }
  // 【ownerRule】(IE8-浏览器不支持)
  // 　　　　如果样式表是通过@import导入的，这个属性就是一个指针，指向表示导入的规则；否则为null
  // 　　【deleteRule()】(IE8-浏览器不支持)
  // 　　　　deleteRule(index)方法删除cssRules集合中指定位置的规则,无返回值
  // 　　【removeRule()】(firefox不支持)
  // 　　　　removeRule(index)方法删除cssRules集合中指定位置的规则,无返回值
  // 　　兼容写法如下:
  function deleteRule(sheet, index) {
    return (typeof sheet.deleteRule == "function") ? sheet.deleteRule(index) : sheet.removeRule(index);
  }
  // 【insertRule()】(IE8-浏览器不支持)
  // 　　　　insertRule(rule,index)方法表示向cssRules集合中指定的位置插入rule字符串，并返回当前样式表的索引值
  // 　　【addRule()】(firefox不支持)
  // 　　　　addRule(ruleKey,ruleValue,index)方法表示向cssRules集合中指定的位置插入rule字符串，并返回-1
  // 　　兼容写法如下:
  function insertRule(sheet, ruleKey, ruleValue, index) {
    return sheet.insertRule ? sheet.insertRule(ruleKey + '{' + ruleValue + '}', index) : sheet.addRule(ruleKey, ruleValue, index);
  }
  // //因为有外部和内部样式表各1个，所以结果为2
  // console.log(document.styleSheets.length);//2
  // //因为<link>标签在<style>标签上面，所以外部样式表为第0个
  // oOut = document.styleSheets.item(0);
  // //内部样式表为第1个
  // oIn = document.styleSheets[1];
  // //null
  // console.log(oOut.cssRules);
  // //返回一个CSSRuleList对象
  // console.log(oIn.cssRules);
  // //null
  // console.log(oOut.rules);
  // //返回一个CSSRuleList对象
  // console.log(oIn.rules);
  // //null
  // console.log(oOut.ownerRule);
  // //null
  // console.log(oIn.ownerRule);
  // //undefined
  // //console.log(oOut.deleteRule(0));
  // //undefined
  // //console.log(oIn.deleteRule(1));
  // //undefined
  // //console.log(oOut.removeRule(0));
  // //undefined
  // //console.log(oIn.removeRule(0));
  // //0
  // console.log(oOut.insertRule("body{margin: 20px}",0));
  // //1
  // console.log(oIn.insertRule("body{margin: 20px}",1));
  // //-1
  // console.log(oOut.addRule('body',"margin: 30px"));
  // //-1
  // console.log(oIn.addRule('body','margin: 30px'));

  // CSSStyleSheet对象
  // 　　【sheet】(IE8-不支持)
  // 　　　　<link>元素对象和<style>元素对象都有一个sheet属性，保存着与document.styleSheets集合中的样式表相同的对象
  // 　　【styleSheet】(IE10-支持)
  // 　　　　<link>元素对象和<style>元素对象都有一个styleSheet属性，保存着与document.styleSheets集合中的样式表相同的对象
  // 　　兼容写法为:
  function getSheet(element) {
    return element.sheet || element.styleSheet;
  }
  oOut = document.styleSheets[0];
  oIn = document.styleSheets[1];
  oLink = document.getElementsByTagName('link')[0];
  var oStyle = document.getElementsByTagName('style')[0];

  function getSheet2(element) {
    return element.sheet || element.styleSheet;
  }
  //CSSStyleSheet {} true
  console.log(getSheet2(oLink), getSheet2(oLink) == oOut);
  //CSSStyleSheet {} true
  console.log(getSheet2(oStyle), getSheet2(oStyle) == oIn);

  // CSSStyleRule对象
  // 　　CSSRule对象表示样式表中的每一条规则。实际上，CSSRule是一个供其他多种类型继承的基类型，
  // 　　其中最常见的就是CSSStyleRule类型，表示样式信息。CSSStyleRule对象包含下列属性。
  // 　　【selectorText】
  // 　　　　返回当前规则的选择符文本
  // 　　【style】
  // 　　　　一个CSSStyleDeclaration对象，通过它设置和取得规则中特定的样式值
  // 　　【cssText】(IE8-不支持)
  // 　　　　返回整条规则对应的文本。该cssText属性与style.cssText属性相似，但不相同。
  // 　　　　前者包含选择符文本和围绕样式信息的花括号，而后者只包含样式信息，类似于元素的style.cssText
  // 　　【parentRule】(IE8-不支持)
  // 　　　　如果当前规则是导入的规则，这个属性引用的就是导入规则；否则，这个值为null
  // 　　【parentStyleSheet】(IE8-不支持)
  // 　　　　当前规则所属的样式表
  // 　　【type】(IE8-不支持)
  // 　　　　表示规则类型的常量值，对于样式规则，这个值是1。
  oOut = document.styleSheets[0];
  oIn = document.styleSheets[1];
  oLink = document.getElementsByTagName('link')[0];
  oStyle = document.getElementsByTagName('style')[0];

  function rules2(sheet) {
    return sheet.cssRules || sheet.rules;
  }
  //取得内部样式表CSSStyleRule对象
  var oInRule = rules2(oIn)[1] || rules2(oIn)[0];
  //body
  console.log(oInRule.selectorText);
  //body { height: 100px; border: 10px solid black; },IE8-浏览器返回undefined
  console.log(oInRule.cssText);
  //height: 100px; border: 10px solid black;IE8-浏览器输出的样式名为大写，且复合属性被拆分。
  console.log(oInRule.style.cssText);
  //null,IE8-浏览器返回undefined
  console.log(oInRule.parentRule);
  //CSSStyleSheet对象,IE8-浏览器返回undefined
  console.log(oInRule.parentStyleSheet);
  //1,IE8-浏览器返回undefined
  console.log(oInRule.type);
  //CSSStyleDeclaration对象
  console.log(oInRule.style);
  console.log(oInRule.style.border); //10px solid black
  console.log(oInRule.style.height); //100px
  oInRule.style.height = "200px";

})();

(function() {
  console.log("\n---引入CSS");

  var jsdom = require("jsdom").jsdom;
  var document = jsdom(
    '<link rel="stylesheet" href="sheet1.css">' +
    '<link rel="alternate stylesheet" type="text/css" href="sheet2.css" title="sheet2"/>');
  var window = document.defaultView;

  // 引入CSS
  // 前面的话
  // 　　Web早期，HTML是一种很有限的语言，这种语言不关心外观，它只是一种简洁的小型标记机制。
  // 　　随着Mosaic网页浏览器的出现，网站开始到处涌现。对于页面改变外观的需求增加，于是增加了类似<font>和<big>之类的标记元素。
  // 　　几年之后，大多数网站标记几乎完全由表格和font元素组成，且对于所要表现的内容不能传达任何实际含义，使文档可用性降低，且不易于维护。
  // 　　于是1995年，W3C发布了CSS，试图解决结构与样式混杂的问题。

  // 外部样式表
  // 　　【使用link标记】
  // 　　　　在link标记中rel和href属性是必须的，type属性和media属性可省略
  // 　　　　<link rel="stylesheet" type="text/css" href="sheet1.css" media="all" />
  　　　　
  // 　　　　[注意]样式表中不能包含HTML标记语言，只能有CSS规则和CSS注释
  /*若CSS文件中存在除了CSS样式和CSS注释的其他标记，则会导致在该标记后面的CSS样式将无法被识别*/

  // 【多个样式表】
  // 　　　　一个文档可能关联多个样式表，如果是这样，文档最初显示时只会使用rel为stylesheet的link标记　　
  // 　　　　　　<link rel="stylesheet" href="sheet1.css" />
  // 　　　　　　<link rel="stylesheet" href="sheet2.css" />

  // 【候选样式表】　　
  // 　　　　将rel属性的设置为alternate stylesheet可以定义候选样式表，只有在用户选择这个样式表时才会用于文档表现。
  // 　　　　如果浏览器能使用候选样式表，它会使用link元素的title属性值生成一个候选样式列表，
  // 　　　　可在菜单栏中查看->样式中进行选择。(IE和firefox支持)
  // 　　　　[注意]若一个候选样式表没有设置title，那么它将无法在候选样式列表中出现，则无法被引用　
  // 　　　　<link rel="stylesheet" type="text/css" href="sheet1.css" />
  // 　　　　<link rel="alternate stylesheet" type="text/css" href="sheet2.css" title="sheet2"/>

  // 内部样式表
  // 　　【使用style元素】
  // 　　　　内部样式表需要使用<style>元素包含样式表，它在文档中单独出现。

  // 【多个style标签】
  // 　　　　文档中可出现多个style标签，且样式规则与层叠样式规则一致

  // 【使用@import指令】
  // 　　　　与link类似，@import指令用于指示Web浏览器加载一个外部样式表，并在表现HTML文档时使用其样式。
  // 　　　　唯一的区别在于命令的具体语法和位置。@import指令常用于样式表需要使用另一个样式表中的样式的情况。

  // 　　　[注意]@import必须出现在style元素中，且要放在其他CSS规则之前，否则将根本不起作用。

  // 【多个@import指令】
  // 　　　　可以使用@import指令导入多个CSS样式表，且可以使用media来限制应用场景。

  // 行间样式(内联样式)
  // 　　如果只是想为单个元素指定一些样式，而不需要嵌套或外部样式表，可以使用HTML的style属性来设置一个行间样式。

  // 　　[注意]行间样式若存在多个style属性，只能识别第一个

})();

(function() {
  console.log("\n---");


})();


(function() {
  console.log("\n---");


})();

(function() {
  console.log("\n---");


})();

(function() {
  console.log("\n---");


})();
