var Wind = require("wind");

var fib = eval(Wind.compile("async", function () {

    $await(Wind.Async.sleep(100));
    console.log(0);

    $await(Wind.Async.sleep(100));
    console.log(1);

    var a = 0, current = 1, i = 0;
    while (true) {
        ++i;
        var b = a;
        a = current;
        current = a + b;

        $await(Wind.Async.sleep(10));
        console.log(current);
        if (current == Infinity) {
          console.log(--i);
          break;
        }
    }
}));

fib().start();
