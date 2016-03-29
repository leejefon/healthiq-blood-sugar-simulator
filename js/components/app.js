System.register(['angular2/core', './EventList', './IndexChart', '../models/Chart', '../services/BloodSugarService'], function(exports_1, context_1) {
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
    var core_1, EventList_1, IndexChart_1, Chart_1, BloodSugarService_1;
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
            },
            function (BloodSugarService_1_1) {
                BloodSugarService_1 = BloodSugarService_1_1;
            }],
        execute: function() {
            App = (function () {
                function App(bloodSugar) {
                    var _this = this;
                    this.bloodSugar = bloodSugar;
                    this.chartId = 'index-chart';
                    this.chart = new Chart_1.Chart({
                        id: this.chartId,
                        data: {
                            type: 'line',
                            series: [{
                                    values: bloodSugar.bsLevel
                                }],
                            'scale-y': {
                                label: { text: "Blood Sugar Level" },
                                'min-value': 0,
                                'max-value': 160
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
                        }
                    });
                }
                App.prototype.leftPad = function (num) {
                    return ("00" + num).slice(-2);
                };
                App = __decorate([
                    core_1.Component({
                        selector: 'blood-sugar-simulator',
                        templateUrl: 'templates/app.html',
                        providers: [BloodSugarService_1.BloodSugarService],
                        directives: [EventList_1.EventList, IndexChart_1.IndexChart]
                    }), 
                    __metadata('design:paramtypes', [BloodSugarService_1.BloodSugarService])
                ], App);
                return App;
            }());
            exports_1("App", App);
        }
    }
});
//# sourceMappingURL=app.js.map