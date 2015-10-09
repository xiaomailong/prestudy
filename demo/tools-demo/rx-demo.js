var fs = require('fs');
var EventEmitter = require('events').EventEmitter;
var Rx = require('rx');
var RxNode = require('rx-node');

// RxNode.toEventEmitter(observable, eventName)
var source = Rx.Observable.return(42);

var emitter = RxNode.toEventEmitter(source, 'data');

emitter.on('data', function(data) {
  console.log('Data: ' + data);
});

emitter.on('end', function() {
  console.log('End');
});

// Ensure to call publish to fire events from the observable
emitter.publish();

// => Data: 42
// => End


// RxNode.fromStream(stream, finishEventName)
var subscription = RxNode.fromStream(process.stdin, 'end')
  .subscribe(function(x) {
    console.log(x);
  });
