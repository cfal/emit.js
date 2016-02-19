var path = require('path');
var chai = require('chai');
var Emitter = require('../src/emit');

chai.should();

var DEFAULT_EVENT = '__DefaultEvent__';
var emitter = new Emitter();

// Populate emitters
var counter = 0;
var called = [];
for (var i = 0; i < 100; i++) {
    emitter.on((function(i) {
        return function() {
            called.push(i);
            counter++;
        }
    })(i));
}
emitter.subscribers[DEFAULT_EVENT].should.have.length(100);

// Emit event
emitter.emit();
counter.should.equal(100);

// Check that all subscribers were called
for (var i = 0; i < 100; i++) {
    called[0].should.equal(i);
    called.shift();
}
called.should.have.length(0);

// Remove emitters
emitter.off();

Object.keys(emitter.subscribers).should.have.length(0);

console.log(path.basename(__filename) + ": All tests passed!");


