System.register(['angular2/core', './EventList', './IndexChart', '../models/Chart'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, EventList_1, IndexChart_1, Chart_1;
    var App;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (EventList_1_1) {
                EventList_1 = EventList_1_1;
            },
            function (IndexChart_1_1) {
                IndexChart_1 = IndexChart_1_1;
            },
            function (Chart_1_1) {
                Chart_1 = Chart_1_1;
            }],
        execute: function() {
            App = (function () {
                function App() {
                    var _this = this;
                    this.chartId = 'index-chart';
                    var initialBsLevel = new Array(60 * 24).fill(80);
                    var topBsLevel = new Array(60 * 24).fill(150);
                    var iniialGlycationLevel = new Array(60 * 24).fill(0);
                    this.chart = new Chart_1.Chart({
                        id: this.chartId,
                        data: {
                            type: 'line',
                            series: [
                                { values: initialBsLevel, scales: "scale-x,scale-y" },
                                { values: topBsLevel, scales: "scale-x,scale-y" },
                                { values: iniialGlycationLevel, scales: "scale-x,scale-y-2" }
                            ],
                            'scale-y': {
                                label: { text: "Blood Sugar Level" },
                                'min-value': 0,
                                'step': 20
                            },
                            'scale-y-2': {
                                label: { text: "Glycation Level" },
                                'min-value': 0,
                                'max-value': 300
                            },
                            'scale-x': {
                                label: { text: "Hours of a Day" },
                                'min-value': 0,
                                'max-value': 60 * 24,
                                labels: (function () {
                                    return Array(60 * 24 + 1).fill(0).map(function (elem, i) {
                                        return _this.leftPad(Math.floor(i / 60) % 24) + ":" + _this.leftPad((i % 60));
                                    });
                                })()
                            }
                        },
                        width: 560
                    });
                }
                App.prototype.leftPad = function (num) {
                    return ("00" + num).slice(-2);
                };
                App = __decorate([
                    core_1.Component({
                        selector: 'blood-sugar-simulator',
                        templateUrl: 'templates/app.html',
                        directives: [EventList_1.EventList, IndexChart_1.IndexChart]
                    }), 
                    __metadata('design:paramtypes', [])
                ], App);
                return App;
            }());
            exports_1("App", App);
        }
    }
});
//# sourceMappingURL=app.js.map