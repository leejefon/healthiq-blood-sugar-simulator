System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Event;
    return {
        setters:[],
        execute: function() {
            Event = (function () {
                function Event(config) {
                    this.type = config.type;
                    this.name = config.name;
                    this.bsLevelChange = config.index;
                    this.time = config.time;
                }
                return Event;
            }());
            exports_1("Event", Event);
        }
    }
});
//# sourceMappingURL=Event.js.map