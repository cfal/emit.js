var path = require('path');
var chai = require('chai');
var Emitter = require('../src/emit');

chai.should();

var emitter = new Emitter();

// Populate emitters
var counter = 0;
var called = [];
var subscribers = [];

for (var i = 0; i < 100; i++) {
    var f = (function(i) {
        return function() {
            called.push(i);
            counter++;
        }
    })(i);
    subscribers.push(f);
    emitter.on('test', f);
}
emitter.subscribers['test'].should.have.length(100);

// Emit event
emitter.emit('test');
counter.should.equal(100);

// Check that all subscribers were called
for (var i = 0; i < 100; i++) {
    called[0].should.equal(i);
    called.shift();
}
called.should.have.length(0);

// Remove emitters one at a time
for (var i = 1; i <= 100; i++) {
    var f = subscribers[i - 1];
    emitter.off('test', f);

    var remaining = 100 - i;
    if (remaining > 0) {
        emitter.subscribers['test'].should.have.length(remaining);
    } else {
        Object.keys(emitter.subscribers).should.have.length(0);
    }
}

console.log(path.basename(__filename) + ": All tests passed!");

