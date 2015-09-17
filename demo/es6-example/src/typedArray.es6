import 'core-js/shim';

// Typed Arrays (Uint8Array, Int16Array, Float32Array, etc.)
// interpret the ArrayBuffer as an indexed sequence of elements of a single type.
// http://www.2ality.com/2015/09/typed-arrays.html

// Instances of DataView let you access data as elements of several types
// (Uint8, Int16, Float32, Float64 etc.),
// at any byte offset inside an ArrayBuffer.

// The following browser APIs support Typed Arrays (details are mentioned later):
// * File API
// * XMLHttpRequest
// * Fetch API
// * Canvas
// * WebSockets

// The following element types are supported by the API:
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

// The element type Uint8C is special:
// it is not supported by DataView and only exists to enable Uint8ClampedArray.
// This Typed Array is used by the canvas element (where it replaces CanvasPixelArray).
// The only difference between Uint8C and Uint8 is how overflow and underflow are handled
// (as explained in the next section).
// It is recommended to avoid the former – quoting Brendan Eich:
//    Just to be super-clear (and I was around when it was born),
//    Uint8ClampedArray is totally a historical artifact (of the HTML5 canvas element).
//    Avoid unless you really are doing canvas-y things.

// Handling overflow and underflow
// Normally, when a value is out of the range of the element type,
// modulo arithmetic is used to convert it to a value within range.
// For signed and unsigned integers that means that:
//    The highest value plus one is converted to the lowest value (0 for unsigned integers).
//    The lowest value minus one is converted to the highest value.

// Modulo conversion for unsigned 8-bit integers:
let uint8 = new Uint8Array(1);
uint8[0] = 255;
console.log(uint8[0]); // highest value within range 255
uint8[0] = 256;
console.log(uint8[0]); // overflow 0
uint8[0] = 257;
console.log(uint8[0]); // overflow 1
uint8[0] = 0;
console.log(uint8[0]); // lowest value within range 0
uint8[0] = -1;
console.log(uint8[0]); // underflow 255

// Modulo conversion for signed 8-bit integers:
let int8 = new Int8Array(1);
int8[0] = 127;
console.log(int8[0]); // highest value within range 127
int8[0] = 128;
console.log(int8[0]); // overflow  - 128
int8[0] = -128;
console.log(int8[0]); // lowest value within range  - 128
int8[0] = -129;
console.log(int8[0]); // underflow 127

// Clamped conversion is different:
//    All underflowing values are converted to the lowest value.
//    All overflowing values are converted to the highest value.
let uint8c = new Uint8ClampedArray(1);
uint8c[0] = 255;
console.log(uint8c[0]); // highest value within range  255
uint8c[0] = 256;
console.log(uint8c[0]); // overflow  255
uint8c[0] = 0;
console.log(uint8c[0]); // lowest value within range  0
uint8c[0] = -1;
console.log(uint8c[0]); // underflow  0

// let ui8 = Uint8Array.of(0, 1, 2);
// for (let byte of ui8) {
//   console.log(byte);
// }
// ui8.slice(-1);
// console.log(ui8);
// DataView.prototype.getInt8(byteOffset);

// Endianness
// Whenever a type (such as Uint16) is stored as multiple bytes, endianness matters:
// Big endian: the most significant byte comes first.
// For example, the Uint16 value 0xABCD is stored as two bytes – first 0xAB, then 0xCD.
// Little endian: the least significant byte comes first.
// For example, the Uint16 value 0xABCD is stored as two bytes – first 0xCD, then 0xAB.
const BIG_ENDIAN = Symbol('BIG_ENDIAN');
const LITTLE_ENDIAN = Symbol('LITTLE_ENDIAN');

function getPlatformEndianness() {
  let arr32 = Uint32Array.of(0x12345678);
  // let arr32 = new Uint32Array(0x12345678);
  let arr8 = new Uint8Array(arr32.buffer);
  switch ((arr8[0] * 0x1000000) + (arr8[1] * 0x10000) + (arr8[2] * 0x100) + (arr8[3])) {
    case 0x12345678:
      return BIG_ENDIAN;
    case 0x78563412:
      return LITTLE_ENDIAN;
    default:
      throw new Error('Unknown endianness');
  }
}
console.log(getPlatformEndianness()); //

// Typed Arrays
// The various kinds of Typed Array are only different w.r.t. to the type of their elements:

// Typed Arrays whose elements are integers:
//     Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array
// Typed Arrays whose elements are floats:
//     Float32Array, Float64Array




















// let typedArray = new Uint8Array([0, 1, 2]);
// console.log(typedArray.length); // 3
// typedArray[0] = 5;
// let normalArray = [...typedArray]; // [5,1,2]
//
// // The elements are stored in typedArray.buffer.
// // Get a different view on the same data:
// let dataView = new DataView(typedArray.buffer);
// console.log(dataView.getUint8(0)); // 5
