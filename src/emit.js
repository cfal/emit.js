var DEFAULT_EVENT = '__DefaultEvent__';

function Emitter() {
    this.subscribers = {};
    this.on = this.subscribe = this.register = this.addListener = this.on.bind(this);
    this.off = this.unsubscribe = this.unregister = this.removeListener = this.removeAllListeners = this.off.bind(this);
    this.emit = this.dispatch = this.emit.bind(this);
    this.one = this.once = this.one.bind(this);
}

Emitter.prototype.on = function(event) {
    if (typeof event === 'function') {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(DEFAULT_EVENT);
        return this.on.apply(this, args);
    }
    var newSubs = Array.prototype.slice.call(arguments, 1);
    if (!(event in this.subscribers)) {
        this.subscribers[event] = newSubs;
    } else {
        var s = this.subscribers[event];
        s.push.apply(s, newSubs);
    }
    return function() { this.off(event, newSubs) }.bind(this);
};

Emitter.prototype.one = function(event) {
    if (typeof event === 'function') {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(DEFAULT_EVENT);
        return this.one.apply(this, args);
    }

    var _this = this;
    var newSubs = Array.prototype.slice.call(arguments, 1).map(function(fn) {
        var f = function() {
            fn.apply(null, arguments);
            _this.off(this);
        }.bind(f);
        return f;
    });

    if (!(event in this.subscribers)) {
        this.subscribers[event] = newSubs;
    } else {
        var s = this.subscribers[event];
        s.push.apply(s, newSubs);
    }
    return function() { this.off(event, newSubs) }.bind(this);
};

Emitter.prototype.off = function(event) {
    var args = Array.prototype.slice.call(arguments);
    if (this.subscribers[DEFAULT_EVENT]) {
        event = DEFAULT_EVENT;
    } else if (typeof event !== 'undefined') {
        args = args.slice(1);
    } else {
        this.subscribers = {};
        return;
    }
    var subs = this.subscribers[event];
    if (!subs) return;
    if (args.length) {
        args.forEach(function(s) {
            var i = subs.indexOf(s);
            if (i < 0) return;
            subs.splice(i, 1);
        });
        if (!subs.length) delete this.subscribers[event];
    } else {
        delete this.subscribers[event];
    }
};

Emitter.prototype.emit = function(event) {
    if (this.subscribers[DEFAULT_EVENT]) {
        var args = Array.prototype.slice.call(arguments);
        return this.subscribers[DEFAULT_EVENT].forEach(function(f) { f.apply(null, args) });
    }
    var args = Array.prototype.slice.call(arguments, 1), subs = this.subscribers[event];
    if (!subs) return;
    subs.forEach(function(f) { f.apply(null, args) });
};

module.exports = Emitter;

