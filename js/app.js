System.register(['angular2/core', './ExerciseService', './FoodService', './IndexChart', './Chart', 'zingchart'], function(exports_1, context_1) {
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
    var core_1, ExerciseService_1, FoodService_1, IndexChart_1, Chart_1, zingchart_1;
    var App;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ExerciseService_1_1) {
                ExerciseService_1 = ExerciseService_1_1;
            },
            function (FoodService_1_1) {
                FoodService_1 = FoodService_1_1;
            },
            function (IndexChart_1_1) {
                IndexChart_1 = IndexChart_1_1;
            },
            function (Chart_1_1) {
                Chart_1 = Chart_1_1;
            },
            function (zingchart_1_1) {
                zingchart_1 = zingchart_1_1;
            }],
        execute: function() {
            App = (function () {
                function App(exercise, food) {
                    var _this = this;
                    this.exercise = exercise;
                    this.food = food;
                    this.bsLevel = Array(60 * 24).fill(80);
                    this.chart = new Chart_1.Chart({
                        id: 'index-chart',
                        data: {
                            type: 'line',
                            series: [{
                                    values: this.bsLevel
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
                                    var result = [];
                                    for (var i = 0; i <= 60 * 24; i++) {
                                        result[i] = _this.leftPad(Math.floor(i / 60)) + ":" + _this.leftPad((i % 60));
                                    }
                                    return result;
                                })()
                            }
                        }
                    });
                }
                App.prototype.test = function () {
                    this.bsLevel = this.bsLevel.map(function (bslevel, index) {
                        if (index > 120 && index < 600)
                            return 100;
                        else
                            return bslevel;
                    });
                    this.updateData(this.bsLevel);
                };
                App.prototype.updateData = function (data) {
                    zingchart_1.zingchart.exec(this.chart.id, 'modify', {
                        data: {
                            series: [{ values: data }]
                        }
                    });
                };
                App.prototype.leftPad = function (number) {
                    return ("00" + number).slice(-2);
                };
                App = __decorate([
                    core_1.Component({
                        selector: 'blood-sugar-simulator',
                        templateUrl: 'app.html',
                        providers: [ExerciseService_1.ExerciseService, FoodService_1.FoodService],
                        directives: [IndexChart_1.IndexChart]
                    }), 
                    __metadata('design:paramtypes', [ExerciseService_1.ExerciseService, FoodService_1.FoodService])
                ], App);
                return App;
            }());
            exports_1("App", App);
        }
    }
});
//# sourceMappingURL=app.js.map