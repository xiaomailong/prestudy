#!/usr/bin/env node

// 命令行的选项是用.option()方法来定义的，同时其也作为文档的选项。
// 下面的例子从process.argv剖析了参数和选项，留下剩余的参数作为没有被使用的program.args数组。
var program = require('commander');

// program
//   .version('0.0.1')
//   .option('-p, --peppers', 'Add peppers')
//   .option('-P, --pineapple', 'Add pineapple')
//   .option('-b, --bbq', 'Add bbq sauce')
//   .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
//   .parse(process.argv);
//
// console.log('you ordered a pizza with:');
// if (program.peppers) {
//   console.log('  - peppers');
// }
// if (program.pineapple) {
//   console.log('  - pineapple');
// }
// if (program.bbq) {
//   console.log('  - bbq');
// }
// console.log('  - %s cheese', program.cheese);
// 短的横线可能作为一个单独的参数被传入，比如-abc等价于-a-b-c。
// 多个单词的选项比如–template-engine被转变为驼峰式，变成program.templateEngine等等。

// 自动化 –help
// 帮助信息是基于命令行代码信息来自动生成的，所以下面的–help信息是自动生成的：
// $ ./examples/pizza --help
//    Usage: pizza [options]
//    Options:
//      -V, --version        output the version number
//      -p, --peppers        Add peppers
//      -P, --pineapple      Add pineapple
//      -b, --bbq            Add bbq sauce
//      -c, --cheese <type>  Add the specified type of cheese [marble]
//      -h, --help           output usage information
function range(val) {
  return val.split('..').map(Number);
}

function list(val) {
  return val.split(',');
}

function collect(val, memo) {
  memo.push(val);
  return memo;
}

function increaseVerbosity(v, total) {
  return total + 1;
}

program
  .version('0.0.1')
  .usage('[options] <file ...>')
  .option('-i, --integer <n>', 'An integer argument', parseInt)
  .option('-f, --float <n>', 'A float argument', parseFloat)
  .option('-r, --range <a>..<b>', 'A range', range)
  .option('-l, --list <items>', 'A list', list)
  .option('-o, --optional [value]', 'An optional value')
  .option('-c, --collect [value]', 'A repeatable value', collect, [])
  .option('-v, --verbose', 'A value that can be increased', increaseVerbosity, 0)
  .parse(process.argv);

console.log(' int: %j', program.integer);
console.log(' float: %j', program.float);
console.log(' optional: %j', program.optional);
program.range = program.range || [];
console.log(' range: %j..%j', program.range[0], program.range[1]);
console.log(' list: %j', program.list);
console.log(' collect: %j', program.collect);
console.log(' verbosity: %j', program.verbose);
console.log(' args: %j', program.args);

// 定制帮助
// 你可以通过监听“–help”命令行来显示任意的-h, –help信息。
// 一旦你这样做命令行会自动退出一次，因为命令行程序不会执行会引起未预期的行为的操作。
// 比如在下面的一段代码里，当–help被使用的时候，可执行的’stuff’不会被输出：
// #!/usr/bin/env node
// var program = require('commander');
//
// function list(val) {
//   return val.split(',').map(Number);
// }
//
// program
//   .version('0.0.1')
//   .option('-f, --foo', 'enable some foo')
//   .option('-b, --bar', 'enable some bar')
//   .option('-B, --baz', 'enable some baz');
//
// // must be before .parse() since
// // node's emit() is immediate
//
// program.on('--help', function(){
//   console.log('  Examples:');
//   console.log('');
//   console.log('    $ custom-help --help');
//   console.log('    $ custom-help -h');
//   console.log('');
// });
//
// program.parse(process.argv);
//
// console.log('stuff');
