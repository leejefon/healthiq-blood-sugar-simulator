System.register(['angular2/core', '../services/BloodSugarService', '../services/ExerciseService', '../services/FoodService', '../pipes/orderBy', '../pipes/truncate', '../models/Event'], function(exports_1, context_1) {
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
    var core_1, BloodSugarService_1, ExerciseService_1, FoodService_1, orderBy_1, truncate_1, Event_1;
    var EventList;
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
            function (orderBy_1_1) {
                orderBy_1 = orderBy_1_1;
            },
            function (truncate_1_1) {
                truncate_1 = truncate_1_1;
            },
            function (Event_1_1) {
                Event_1 = Event_1_1;
            }],
        execute: function() {
            EventList = (function () {
                function EventList(bloodSugar, exercise, food) {
                    this.bloodSugar = bloodSugar;
                    this.exercise = exercise;
                    this.food = food;
                    this.events = [];
                    this.newFoodEvent = { id: 0, time: '12:00 AM' };
                    this.newExerciseEvent = { id: 0, time: '12:00 AM' };
                }
                EventList.prototype.addExerciseEvent = function () {
                    var newEvent = new Event_1.Event({
                        id: this.events.length + 1,
                        type: 'exercise',
                        name: this.exercise.getIndexById(this.newExerciseEvent.id).name,
                        index: 0 - this.exercise.getIndexById(this.newExerciseEvent.id).index,
                        time: this.newExerciseEvent.time
                    });
                    this.events.push(newEvent);
                    this.bloodSugar.update(this.events);
                };
                EventList.prototype.addFoodEvent = function () {
                    var newEvent = new Event_1.Event({
                        id: this.events.length + 1,
                        type: 'food',
                        name: this.food.getIndexById(this.newFoodEvent.id).name,
                        index: this.food.getIndexById(this.newFoodEvent.id).index,
                        time: this.newFoodEvent.time
                    });
                    this.events.push(newEvent);
                    this.bloodSugar.update(this.events);
                };
                EventList.prototype.removeEvent = function (event) {
                    this.events = this.events.filter(function (evt) { return evt.id !== event.id; });
                    this.bloodSugar.update(this.events);
                };
                EventList.prototype.ngOnInit = function () {
                    this.bloodSugar.setChartId(this.chartId);
                };
                EventList.prototype.ngAfterViewInit = function () {
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
                EventList = __decorate([
                    core_1.Component({
                        selector: 'event-list',
                        inputs: ['chartId'],
                        templateUrl: 'templates/event-list.html',
                        providers: [BloodSugarService_1.BloodSugarService, ExerciseService_1.ExerciseService, FoodService_1.FoodService],
                        pipes: [orderBy_1.OrderBy, truncate_1.Truncate]
                    }), 
                    __metadata('design:paramtypes', [BloodSugarService_1.BloodSugarService, ExerciseService_1.ExerciseService, FoodService_1.FoodService])
                ], EventList);
                return EventList;
            }());
            exports_1("EventList", EventList);
        }
    }
});
//# sourceMappingURL=EventList.js.map