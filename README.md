# emitjs

An event emitter replacement, can be plugged in anywhere a node-like EventEmitter or flux-like Dispatcher is required

## Usage

```
// Import emit.js
var Emitter = require('emitjs');

// Create and use as a multi-event emitter
var obj = new Emitter();

var callback = function() {
  // Do things!
};

// Register callback for 'event' using on().
// The function call returns an optional unsubscribe function.
offCallback = obj.on('event', callback);

// Trigger 'event'
obj.emit('event');

// Remove using .off()
obj.off('event', callback);

// .. or remove using the callback from .on()
offCallback()

// Create and use as a single-event emitter
var single = new Emitter();

// Register callback
singleOffCallback = single.on(callback);

// Emit an event and trigger the callback
single.emit();

// Remove the callback like above
single.off(callback) //..or singleOffCallback()

```

