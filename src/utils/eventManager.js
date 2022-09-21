const eventManager = {
    events: {},

    on: function(eventName, fn) {
        // subscribes events
        if (eventName in this.events) {
            this.events[eventName].push(fn)
        } else {
            this.events[eventName] = [];
            this.events[eventName].push(fn);
        }
    },

    off: function(eventName, fn) {
        // unsubscribe events
        if (eventName in this.events) {
            for (let i = 0; i < this.events[eventName].length; i++) {
                if (this.events[eventName][i] === fn) {
                    this.events[eventName].splice(i, 1);
                    return;
                }
            }
        }
    },

    emit: function(eventName, data) {
        // emits event
        if (eventName in this.events) {
            for (let fn of this.events[eventName]) {
                fn(data);
            }
        }
    }
}

export { eventManager };