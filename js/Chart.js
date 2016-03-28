System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Chart;
    return {
        setters:[],
        execute: function() {
            Chart = (function () {
                function Chart(config) {
                    this.id = config['id'];
                    this.data = config['data'];
                    this.height = config['height'] || 400;
                    this.width = config['width'] || 600;
                }
                return Chart;
            }());
            exports_1("Chart", Chart);
        }
    }
});
//# sourceMappingURL=Chart.js.map