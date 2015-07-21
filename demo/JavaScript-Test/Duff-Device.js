
// 在《高性能JavaScript》一书的第四章算法和流程控制中，提到了减少迭代次数加速程序的策略—达夫设备（Duff's device）。
// 达夫设备本身很好理解，但是其效果是否真的像书中所说“如果迭代次数超过1000，那么达夫设备的执行效率将明显提升”？
// 还是随着浏览器性能的逐渐增强，这种以牺牲代码阅读性而获取的性能提升已经微不足道？
{
  var a = [];
  var times = 100000;
  // init array
  for(var i = 1; i <= times; i++) {
    a[i] = i;
  }

  // ordinary way
  console.time('1');
  var sum = 0;
  for(var i = 1; i <= times; i++) {
    sum += 1 / a[i];
  }
  console.log(sum);
  console.timeEnd('1');

  // Duff's device
  console.time('2');
  var sum = 0;
  while(times) {
    sum += 1 / a[times--];
    sum += 1 / a[times--];
    sum += 1 / a[times--];
    sum += 1 / a[times--];
    sum += 1 / a[times--];
    sum += 1 / a[times--];
    sum += 1 / a[times--];
    sum += 1 / a[times--];
  }
  console.log(sum);
  console.timeEnd('2');
  // 经过测试，我觉得在迭代次数少的情况下，完全没有必要用达夫设备进行优化，且不说代码可读性差，有时甚至会适得其反，
  // 而多大的迭代次数算多，多大算少，也不好说，特定的浏览器特定的版本都有其一定的取值。
  // 老版本的浏览器运用达夫设备优化性能能得到大幅度的提升，而新版的浏览器引擎肯定对循环迭代语句进行了更强的优化，
  // 所以达夫设备能实现的优化效果日趋减弱甚至于没有。
  // 而在查阅资料的过程中，有人提出while循环的效果和达夫设备不相上下，接下去也会针对不同的循环方式作进一步的探索。
}
