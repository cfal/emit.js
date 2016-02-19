# emitjs

An event emitter replacement with no dependencies.
Can be plugged in anywhere a node-like EventEmitter or flux-like Dispatcher is required.

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

## API (Multi Event)

### .on(event, subscriber [, subscriber, subscriber, ..])
### .subscribe(event, subscriber [, subscriber, subscriber, ..])
### .addListener(event, subscriber [, subscriber, subscriber, ..])
### .register(event, subscriber [, subscriber, subscriber, ..])

Add subscriber(s) for event.
Returns a function that will remove the added subscriber(s) when called.

### .one(event, subscriber [, subscriber, subscriber, ..])
### .once(event, subscriber [, subscriber, subscriber, ..])

Add subscriber(s) for event, firing only once.
Returns a function that will remove the added subscriber(s) when called.

### .emit(event [, arg, arg, ..])
### .dispatch(event[, arg, arg, ..])

Emit event with the provided arguments.

### .off(event, subscriber [, subscriber, subscriber, ..])
### .unsubscribe(event, subscriber [, subscriber, subscriber, ..])
### .unregister(event, subscriber [, subscriber, subscriber, ..])
### .removeListener(event, subscriber [, subscriber, subscriber, ..])

Remove the provided subscribers for event.

### .off(event)

Remove all subscribers for event.


## API (Single Event)

### .on(subscriber [, subscriber, subscriber, ..])
### .subscribe(subscriber [, subscriber, subscriber, ..])
### .addListener(subscriber [, subscriber, subscriber, ..])
### .register(subscriber [, subscriber, subscriber, ..])

Add subscriber(s).
Returns a function that will remove the added subscriber(s) when called.

### .one(subscriber [, subscriber, subscriber, ..])
### .once(subscriber [, subscriber, subscriber, ..])

Add subscriber(s), firing only once.
Returns a function that will remove the added subscriber(s) when called.

### .emit([arg, arg, ..])
### .dispatch([arg, arg, ..])

Emit event with the provided arguments.

### .off(subscriber [, subscriber, subscriber, ..])
### .unsubscribe(subscriber [, subscriber, subscriber, ..])
### .unregister(subscriber [, subscriber, subscriber, ..])
### .removeListener(subscriber [, subscriber, subscriber, ..])

Remove the provided subscribers.

### .off()

Remove all subscribers.

