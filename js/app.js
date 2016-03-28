System.register(['angular2/core', './ExerciseService', './FoodService', './IndexChart'], function(exports_1, context_1) {
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
    var core_1, ExerciseService_1, FoodService_1, IndexChart_1;
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
            }],
        execute: function() {
            App = (function () {
                function App(exercise, food) {
                    this.exercise = exercise;
                    this.food = food;
                    this.charts = [{
                            id: 'chart-1',
                            data: {
                                type: 'line',
                                series: [{
                                        values: [2, 3, 4, 5, 3, 3, 2]
                                    }],
                            },
                            height: 400,
                            width: 600
                        }];
                }
                App.prototype.test = function () {
                    console.log(this.food.getIndexById(1));
                    console.log(this.exercise.getIndexByName('walking'));
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