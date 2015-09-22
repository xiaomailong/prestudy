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
