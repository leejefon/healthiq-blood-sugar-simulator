System.register(['angular2/core', 'zingchart'], function(exports_1, context_1) {
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
    var core_1, zingchart_1;
    var BloodSugarService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (zingchart_1_1) {
                zingchart_1 = zingchart_1_1;
            }],
        execute: function() {
            BloodSugarService = (function () {
                function BloodSugarService() {
                    this.bsLevel = Array(60 * 24).fill(80);
                }
                BloodSugarService.prototype.eatFood = function (food, time) {
                };
                BloodSugarService.prototype.doExercise = function (exercise, time) {
                };
                BloodSugarService.prototype.updateChart = function (chartId, data) {
                    zingchart_1.zingchart.exec(chartId, 'modify', {
                        data: {
                            series: [{ values: data }]
                        }
                    });
                };
                BloodSugarService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], BloodSugarService);
                return BloodSugarService;
            }());
            exports_1("BloodSugarService", BloodSugarService);
        }
    }
});
//# sourceMappingURL=BloodSugarService.js.map