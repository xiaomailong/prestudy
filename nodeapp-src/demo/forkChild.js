function fibo (n) {
  return n > 1 ? fibo(n - 1) + fibo(n - 2) : 1;
}

process.on('message', function(m) {
  process.send({ result: fibo(m.v) });
});
