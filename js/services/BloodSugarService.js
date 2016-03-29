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
                    this.timeAffected = Array(60 * 24).fill(false);
                }
                BloodSugarService.prototype.setChartId = function (chartId) {
                    this.chartId = chartId;
                };
                BloodSugarService.prototype.updateBsLevel = function (event, eventAction) {
                    if (eventAction === void 0) { eventAction = 'add'; }
                    if (event.type === 'exercise' && eventAction === 'add') {
                        this.decrease(event.time, event.bsLevelChange, 1);
                    }
                    else if (event.type === 'exercise' && eventAction === 'remove') {
                        this.increase(event.time, event.bsLevelChange, 1);
                    }
                    else if (event.type === 'food' && eventAction === 'add') {
                        this.increase(event.time, event.bsLevelChange, 2);
                    }
                    else if (event.type === 'food' && eventAction === 'remove') {
                        this.decrease(event.time, event.bsLevelChange, 2);
                    }
                    this.normalize();
                    this.glycation();
                    this.updateChart();
                };
                BloodSugarService.prototype.increase = function (time, total, durationInHour) {
                    var changeEveryMin = total / durationInHour / 60;
                    var endTime = durationInHour * 60 + time;
                    this.bsLevel = this.bsLevel.map(function (level, minute) {
                        if (minute >= time && minute < endTime) {
                            return level + changeEveryMin * (minute - time);
                        }
                        else {
                            return level;
                        }
                    });
                    this.timeAffected = this.timeAffected.map(function (affected, minute) {
                        return minute >= time && minute < endTime ? true : affected;
                    });
                };
                BloodSugarService.prototype.decrease = function (time, total, durationInHour) {
                    var changeEveryMin = total / durationInHour / 60;
                    var endTime = durationInHour * 60 + time;
                    this.bsLevel = this.bsLevel.map(function (level, minute) {
                        if (minute >= time && minute < endTime) {
                            return level - changeEveryMin * (minute - time);
                        }
                        else {
                            return level;
                        }
                    });
                    this.timeAffected = this.timeAffected.map(function (affected, minute) {
                        return minute >= time && minute < endTime ? true : affected;
                    });
                };
                BloodSugarService.prototype.normalize = function () {
                    for (var minute = 0; minute < 60 * 24; minute++) {
                        var prev = this.bsLevel[minute - 1];
                        if (!this.timeAffected[minute] && Math.abs(80 - prev) > 0.01) {
                            if (prev > 80)
                                this.bsLevel[minute] = prev - 1;
                            else if (prev < 80)
                                this.bsLevel[minute] = prev + 1;
                        }
                    }
                };
                BloodSugarService.prototype.glycation = function () {
                };
                BloodSugarService.prototype.updateChart = function () {
                    zingchart_1.zingchart.exec(this.chartId, 'modify', {
                        data: {
                            series: [{ values: this.bsLevel }]
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