// JavaScript ArrayBuffer浅析

// ArrayBuffer又称类型化数组。

// 　　javascript数组（Array）长什么样子，相信大家都清楚，那么我说说差别应该就可以了解这究竟是个什么了！

// 数组里面可以放数字、字符串、布尔值以及对象和数组等，ArrayBuffer放0和1组成的二进制数据
// 数组放在堆中，ArrayBuffer则把数据放在栈中（所以取数据时后者快）
// ArrayBuffer初始化后固定大小，数组则可以自由增减。(准确的说，视图才应该跟数组来比较这个特点)

(function() {
  console.log("\n---构造函数：");
  // new ArrayBuffer(Bytelength);
  var arraybuffer = new ArrayBuffer(8);

  //类方法ArrayBuffer.isView() 判断某对象是否为 视图(这是什么？往下看)
  var int8a = new Int8Array(arraybuffer);
  console.log(ArrayBuffer.isView(int8a)); //return true

  //类属性ArrayBuffer.length 默认值1，暂未发现用处
  console.log(ArrayBuffer.length); //return 1

  //返回的对象具有byteLength属性 值为参数Bytelength
  console.log(arraybuffer.byteLength); //return 8

  // 实例化一个对象的时候，仅需要传入一个参数，即字节数。
  // 字节(Byte)：存储空间的基本计量单位。一个字节等于8位(bit)，每一位用0或1表示。
})();

(function() {
  console.log("\n---视图：");
  // ArrayBuffer对象并没有提供任何读写内存的方法，而是允许在其上方建立“视图”，从而插入与读取内存中的数据。
  // 如上：我们在内存中分配了16个格子也就是两个字节，如果我们要划分出A视图与B视图来瓜分这16个格子的话，代码是这样的：
  var arraybuffer = new ArrayBuffer(8);

  var aView = new Int8Array(arraybuffer, 0, 1);
  var bView = new Int8Array(arraybuffer, 1, 1);
  console.log(aView, bView);
  aView[0] = 1; //二进制00000001
  bView[0] = 2; //二进制00000010
  console.log(aView, bView);
})();

(function() {
  console.log("\n---视图类型：");
  // 视图类型             数据类型   占用位数  占用字节  有无符号
  // Int8Array           整数       8       1        有
  // Uint8Array          整数       8       1        无
  // Uint8ClampedArray   整数       8       1        无
  // Int16Array          整数       16      2        有
  // Uint16Array         整数       16      2        无
  // Int32Array          整数       32      4        有
  // Uint32Array         整数       32      4        无
  // Float32Array        浮点数     32      4         \
  // Float64Array        浮点数     64      8         \

  // Element   type Bytes  Description                            C type
  // Int8      1    8-bit  signed integer                         signed char
  // Uint8     1    8-bit  unsigned integer                       unsigned char
  // Uint8C    1    8-bit  unsigned integer (clamped conversion)  unsigned char
  // Int16     2    16-bit signed integer                         short
  // Uint16    2    16-bit unsigned integer                       unsigned short
  // Int32     4    32-bit signed integer                         int
  // Uint32    4    32-bit unsigned integer                       unsigned int
  // Float32   4    32-bit floating point                         float
  // Float64   8    64-bit floating point                         double

  // 占用位数就相当于占用了多少“格子”，等同于占用字节数，
  // 可以通过访问视图类型的静态属性：BYTES_PER_ELEMENT来获取这个值
  console.log(Int8Array.BYTES_PER_ELEMENT); // 1
  console.log(Uint8Array.BYTES_PER_ELEMENT); // 1
  console.log(Uint8ClampedArray.BYTES_PER_ELEMENT); // 1
  console.log(Int16Array.BYTES_PER_ELEMENT); // 2
  console.log(Uint16Array.BYTES_PER_ELEMENT); // 2
  console.log(Int32Array.BYTES_PER_ELEMENT); // 4
  console.log(Uint32Array.BYTES_PER_ELEMENT); // 4
  console.log(Float32Array.BYTES_PER_ELEMENT); // 4
  console.log(Float64Array.BYTES_PER_ELEMENT); // 8
  // 有无符号则表示该类数据类型是否包含负数，
  // 如：Int8Array代表8位有符号整数，其范围为 -128~127，而Uint8Array代表8位无符号整数，范围是 0~255。

  // 如果输入的值已经是0~255之间的整数，那么Uint8Array 与 Uint8ClampedArray的最终结果是一致的。
  // Uint8Array 与 Uint8ClampedArray 的区别，就在于处理不在该范围（0~255之间的整数）的输入数值的转换逻辑的差异。
  // Uint8Array采用的转换逻辑是ToUint8.
  //    其中一个关键点是，它将输入数与256取模，将8个比特位转化为正整数，它也不会进行四舍五入。
  //    特别注意，对于负数来说，由于负数的二进制存储形式是补码形式的，其转换后得到的值与输入值的联系就不直观了。
  //    详细规则如下：
  //       Let number be ToNumber(argument).
  //       ReturnIfAbrupt(number).
  //       If number is NaN, +0, −0, +∞, or −∞, return +0.
  //       Let int be sign(number) × floor(abs(number)).
  //       Let int8bit be int modulo 28.
  //       Return int8bit.
  // Uint8ClampedArray 采用的转换逻辑是ToUint8Clamp
  //    它会将负数归入0，大于255的数归入255，所以取模就不用了。
  //    另外，它不是直接取整，而是会处理舍入，但并不是像Math.round()那样的四舍五入，而是采用一种叫做银行家舍入的方法。
  //    详细规则如下：
  //       Let number be ToNumber(argument).
  //       ReturnIfAbrupt(number).
  //       If number is NaN, return +0.
  //       If number ≤ 0, return +0.
  //       If number ≥ 255, return 255.
  //       Let f be floor(number).
  //       If f + 0.5 < number, then return f + 1.
  //       If number < f + 0.5, then return f.
  //       If f is odd, then return f + 1.
  //       Return f.
})();

// 视图构造函数 ---------
(function() {
  console.log("\n---视图构造函数：直接传入特定范围内的数组");
  // 直接传入一定特定范围内的数组
  var view = new Int16Array([1, 653, 700, -90, 88]);
  console.log(view, view.length);
})();

(function() {
  console.log("\n---视图构造函数：传入数组长度");
  // 传入一个数组长度值，占用的字节数 = 长度 X 该类型的BYTES_PER_ELEMENT
  var view2 = new Uint8Array(8);
  view2[0] = 10;
  view2[1] = 58;
  view2[2] = 156;
  view2[7] = 255;
  view2[8] = 256; // can not get it
  console.log(view2[8]); // undefined
  console.log(view2, view2.length);
})();

(function() {
  console.log("\n---视图构造函数：先分配空间再创建视图");
  // 首先分配了32字节的空间，A视图使用Int16Array类型从0开始4个数据，每个数据占2个字节，所以A视图一共占用了8(0-7)个字节，
  // 后面的以此类推，最后留给C视图的空间仅有4字节，然而传入的length为8，所以就超出了所分配内存的范围而报错。
  //new Int8Array(arraybuffer,start,length);
  //参数
  //arraybuffer为ArrayBuffer的实例     必填
  //start表示从第几个字节开始            可选（默认从0开始）
  //length表示数据个数                  可选（默认到分配的内存末尾）
  var arraybuffer = new ArrayBuffer(32);
  var aView = new Int16Array(arraybuffer, 0, 4); // 占用0-7
  var bView = new Float32Array(arraybuffer, 8, 5); // 占用8-27
  console.log(aView, aView.length);
  console.log(bView, bView.length);
  // var cView = new Uint8Array(arraybuffer,28,8)    //仅剩4个,报错Invalid typed array length
})();

(function() {
  console.log("\n---视图构造函数：视图空间重合以最后写入为准");
  // 万一在分配视图空间的时候，两个试图空间重叠了会发生什么呢？
  // 两个相互重叠的视图所占据的内存空间，存在其中的值以最后一次写进去的为主。
  var arraybuffer = new ArrayBuffer(4);
  var aView = new Int8Array(arraybuffer); //从0开始到内存末尾
  var bView = new Int8Array(arraybuffer, 2); //从2开始到末尾
  aView[0] = 1;
  aView[1] = 2;
  aView[2] = 3;
  aView[3] = 4;
  console.log(aView); // return 1 2 3 4
  console.log(bView); // return 3 4
  bView[0] = 9;
  bView[1] = 8;
  console.log(aView); // return 1 2 9 8
  console.log(bView); // return 9 8
})();

(function() {
  console.log("\n---视图构造函数：视图空间重合类型不同需要注意字节顺序");
  var arraybuffer = new ArrayBuffer(4);
  var aView = new Int8Array(arraybuffer); //从0开始到内存末尾
  var bView = new Int16Array(arraybuffer, 2); //从2开始到末尾
  aView[0] = 1;
  aView[1] = 2;
  aView[2] = 3;
  aView[3] = 4;
  console.log(aView); // return { '0': 1, '1': 2, '2': 3, '3': 4 }
  console.log(bView); // return { '0': 1027 }
  bView[0] = 500;
  bView[1] = 8; // 越界并没有报错。说明在实例化视图时超出内存空间不允许，而对内存读写时超出则没有问题。
  console.log(bView[1]); // 不过bView[1]并没有值，返回undefined。
  console.log(aView); // return { '0': 1, '1': 2, '2': -12, '3': 1 }
  // 把500的16位分成两个8位就是1和-12。但是为什么-12在前面的呢？
  // 通过实验(在chrome44里)，我总结了如下几种情况会得到的结果：
  //    1.如果在A类型中设置了超过A类型范围的值，则将该值二进制后，取得对应范围类型的结果作为最终值；
  //    2.设置某个字节的值为String字符串，则该值为0；
  //    3.设置字节的值为boolean值，则true为1，false为0；
  //    4.如果在整型中设置了浮点型，则将浮点型取整(没有四舍五入)后二进制转化再取对应范围的值；
  // 其中第1点和第4点在设置最终值的时候都跟字节序有关，
  // 而为了解决这个问题javascript引入了可以设置字节序的新类型DataView，详细情况后面再说。
  console.log(bView); // return { '0': 500 }
})();

(function() {
  console.log("\n---视图的方法与属性");
  var arraybuffer = new ArrayBuffer(8);
  var view = new Int8Array(arraybuffer);
  console.log(view.buffer.toString()); // return  arraybuffer      readonly
  console.log(view.byteLength); // return   8               readonly
  console.log(view.byteOffset); // return   0               readonly
  console.log(view.length); // return   8               readonly
  console.log(view.entries().toString()); // return Array Iterator object  包含键值对
  console.log(view.keys().toString()); // return Array Iterator object  只包含键
  view.set([1, 2, 3], 3);
  console.log(view); // return { '0': 0, '1': 0, '2': 0, '3': 1, '4': 2, '5': 3, '6': 0, '7': 0 }
  console.log(view.subarray(1, 4)); // return  { '0': 0, '1': 0, '2': 1 }
  // 根据上面set后的值 从位置1开始到4但不包括第4位

  // 前四个属性都是只读的：
  // 　　buffer　　　  返回ArrayBuffer的引用
  // 　　byteLength　　返回字节长度
  // 　　byteOffse　 　返回视图在该ArrayBuffer中占用内存区域的起点位置
  // 　　length　　　  返回视图数据的个数
  // 　　set()　　　　 第一个参数为已有的视图或者数组，第二个参数代表从第几个字节开始设置值
  // 　　subarray　　 返回一个新的视图，如果第二个参数省略，则取剩余的全部
  //    entries和keys两个方法目前仅在chrome和FireFox上面支持，返回一个数组迭代对象，
  //    你可以通过该对象的next()方法依次取得相应的值，或者使用for...of循环进行迭代。
  // 在写这篇随便的时候，我查看了 Mozilla开发者网络 实际上这几种视图类型的原型TypedArray还有很多方法，
  // 诸如join、indexOf、forEach、map等，但可惜其他浏览器并不支持，或许将来会有所改善。
})();

// DataView视图
// 为了解决各种硬件设备、数据传输等对默认字节序的设定不一而导致解码时候会发生的混乱问题，
// javascript提供了DataView类型的视图来让开发者在对内存进行读写时手动设定字节序的类型。
(function() {
  console.log("\n---DataView构造函数");

  //new DataView(arraybuffer,byteOffset [, byteLength])
  var arraybuffer = new ArrayBuffer(8);
  var dv1 = new DataView(arraybuffer); //0-7
  var dv2 = new DataView(arraybuffer, 2); //2-7
  var dv3 = new DataView(arraybuffer, 3, 2); //3-4
  // console.log(dv1, dv2, dv3);
})();

(function() {
  console.log("\n---DataView判断大小端");

  // DataView实例化后的对象所具有的功能
  // Read          Write
  // getInt8()     setInt8()
  // getUint8()    setUint8()
  // getInt16()    setInt16()
  // getUint16()   setUint16()
  // getInt32()    setInt32()
  // getUint32()   setUint32()
  // getFloat32()  setFloat32()
  // getFloat64()  setFloat64()
  // 以上这些方法均遵循如下的语法
  // 读取数据
  // var num = dataview.getUint32(byteOffset[, littleEndian]);
  // 写入数据
  // dataview.setUint32(byteOffset, value[, littleEndian]);
  // 参数
  // byteOffset    表示从内存的哪个字节开始
  // value         该对应字节将被设置的值
  // littleEndian  字节序，true为小端字节序，false或者不填为大端字节序

  // 值得注意的是，在DataView视图中，读写超出其实例化时的范围的值时，都会发生错误，
  // 这跟之前的固定类型的视图不一样，在使用时更加谨慎。

  // 你可以通过如下的方式来判断运行当前javascript的机器使用哪一种字节序
  var littleEndian = (function() {
    var buffer = new ArrayBuffer(2);
    new DataView(buffer).setInt16(0, 256, true);
    return new Int16Array(buffer)[0] === 256;
  })();
  console.log(littleEndian); // true ---->littleEndian false ---->BigEndian
})();

(function() {
  console.log("\n---ArrayBuffer与字符串");

  // javascript的字符串使用UTF-16编码的方式，所以我们可以这样来做：
  function Uint162Str(arraybuffer) {
    return String.fromCharCode.apply(null, new Uint16Array(arraybuffer));
  }

  function Str2Uint16(str) {
    //假设字符串”abc“ length=3,使用16位，则每一个字母占据2字节，总字节为length乘以2
    var arraybuffer = new ArrayBuffer(str.length * 2);
    var view = new Uint16Array(arraybuffer);
    for (var i = 0, l = str.length; i < l; i++) {
      view[i] = str.charCodeAt(i);
    }
    return view;
  }

  // 在实际开发中，我们可能会遇到从服务器端拿来的二进制数据的字符串使用的是UTF-8编码的，
  // 这时我们就需要先将UTF-8的二进制编码还原成为unicode对应的二进制，
  // 目前在有意义的unicode范围内，已经可以刚好用两个字节来容纳这个二进制值了，
  // 相当于UTF-8三个字节来表示的字符，当然也包括了我们最关心的中文字符。
  // 然而关于unicode的那些事也比较繁琐，就不在此讨论了，
  // 你可以参考这个：Decode UTF-8 with Javascript
  // http://stackoverflow.com/questions/13356493/decode-utf-8-with-javascript/22373061
})();
