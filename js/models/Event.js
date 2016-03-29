System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Event;
    return {
        setters:[],
        execute: function() {
            Event = (function () {
                function Event(event) {
                    this.id = event.id;
                    this.type = event.type;
                    this.name = event.name;
                    this.bsLevelChange = event.index;
                    this.time = this.getMinuteOfDay(event.time);
                    this.timeReadable = event.time;
                }
                Event.prototype.getMinuteOfDay = function (time) {
                    var randomDate = '2000/01/01 ';
                    var timeObj = moment(randomDate + time);
                    return timeObj.hours() * 60 + timeObj.minutes();
                };
                return Event;
            }());
            exports_1("Event", Event);
        }
    }
});
//# sourceMappingURL=Event.js.map