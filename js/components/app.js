System.register(['angular2/core', '../services/BloodSugarService', '../services/ExerciseService', '../services/FoodService', './IndexChart', '../models/Chart', '../models/Event', '../pipes/orderBy', '../pipes/Truncate'], function(exports_1, context_1) {
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
    var core_1, BloodSugarService_1, ExerciseService_1, FoodService_1, IndexChart_1, Chart_1, Event_1, orderBy_1, Truncate_1;
    var App;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (BloodSugarService_1_1) {
                BloodSugarService_1 = BloodSugarService_1_1;
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
            function (Event_1_1) {
                Event_1 = Event_1_1;
            },
            function (orderBy_1_1) {
                orderBy_1 = orderBy_1_1;
            },
            function (Truncate_1_1) {
                Truncate_1 = Truncate_1_1;
            }],
        execute: function() {
            App = (function () {
                function App(bloodSugar, exercise, food) {
                    var _this = this;
                    this.bloodSugar = bloodSugar;
                    this.exercise = exercise;
                    this.food = food;
                    this.events = [];
                    this.newFoodEvent = { id: 0, time: '12:00 AM' };
                    this.newExerciseEvent = { id: 0, time: '12:00 AM' };
                    this.chart = new Chart_1.Chart({
                        id: 'index-chart',
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
                    this.bloodSugar.setChartId(this.chart.id);
                }
                App.prototype.addExerciseEvent = function () {
                    var newEvent = new Event_1.Event({
                        id: this.events.length + 1,
                        type: 'exercise',
                        name: this.exercise.getIndexById(this.newExerciseEvent.id).name,
                        index: this.exercise.getIndexById(this.newExerciseEvent.id).index,
                        time: this.newExerciseEvent.time
                    });
                    this.events.push(newEvent);
                    this.bloodSugar.updateBsLevel(newEvent);
                };
                App.prototype.addFoodEvent = function () {
                    var newEvent = new Event_1.Event({
                        id: this.events.length + 1,
                        type: 'food',
                        name: this.food.getIndexById(this.newFoodEvent.id).name,
                        index: this.food.getIndexById(this.newFoodEvent.id).index,
                        time: this.newFoodEvent.time
                    });
                    this.events.push(newEvent);
                    this.bloodSugar.updateBsLevel(newEvent);
                };
                App.prototype.removeEvent = function (event) {
                    this.events = this.events.filter(function (evt) { return evt.id !== event.id; });
                    this.bloodSugar.updateBsLevel(event, 'remove');
                };
                App.prototype.ngAfterViewInit = function () {
                    var self = this;
                    jQuery('.timepicker').datetimepicker({ format: 'LT', allowInputToggle: true });
                    jQuery('.timepicker').on('dp.change', function (e) {
                        var id = jQuery(this).find('input').attr('id');
                        if (id === 'exerciseTime') {
                            self.newExerciseEvent.time = jQuery('#exerciseTime').val();
                        }
                        else {
                            self.newFoodEvent.time = jQuery('#foodTime').val();
                        }
                    });
                };
                App.prototype.leftPad = function (num) {
                    return ("00" + num).slice(-2);
                };
                App = __decorate([
                    core_1.Component({
                        selector: 'blood-sugar-simulator',
                        templateUrl: 'templates/app.html',
                        providers: [BloodSugarService_1.BloodSugarService, ExerciseService_1.ExerciseService, FoodService_1.FoodService],
                        directives: [IndexChart_1.IndexChart],
                        pipes: [orderBy_1.OrderBy, Truncate_1.Truncate]
                    }), 
                    __metadata('design:paramtypes', [BloodSugarService_1.BloodSugarService, ExerciseService_1.ExerciseService, FoodService_1.FoodService])
                ], App);
                return App;
            }());
            exports_1("App", App);
        }
    }
});
//# sourceMappingURL=app.js.map