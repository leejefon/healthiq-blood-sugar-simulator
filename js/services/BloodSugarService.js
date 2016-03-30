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
                    this.reset();
                }
                BloodSugarService.prototype.reset = function () {
                    this.bsLevel = new Array(60 * 24);
                    this.bsLevelTopBorder = new Array(60 * 24).fill(150);
                    this.glycationLevel = new Array(60 * 24).fill(0);
                    this.eventsInEveryMinute = new Array(60 * 24).fill(new Array());
                };
                BloodSugarService.prototype.setChartId = function (chartId) {
                    this.chartId = chartId;
                };
                BloodSugarService.prototype.update = function (events) {
                    var _this = this;
                    this.reset();
                    events.forEach(function (event) {
                        var durationInHour = event.type === 'exercise' ? 1 : 2;
                        var changeEveryMin = event.bsLevelChange / durationInHour / 60;
                        var endTime = durationInHour * 60 + event.time;
                        _this.eventsInEveryMinute = _this.eventsInEveryMinute.map(function (evts, minute) {
                            if (minute >= event.time && minute < endTime) {
                                return evts.concat(changeEveryMin);
                            }
                            else {
                                return evts;
                            }
                        });
                    });
                    this.updateBsLevel();
                    this.updateGlycationLevel();
                    this.updateChart();
                };
                BloodSugarService.prototype.updateBsLevel = function () {
                    var _this = this;
                    var currentBsLevel = 80;
                    this.eventsInEveryMinute.forEach(function (events, minute) {
                        if (events.length === 0 && Math.abs(80 - currentBsLevel) >= 1) {
                            if (currentBsLevel > 80)
                                _this.bsLevel[minute] = --currentBsLevel;
                            else if (currentBsLevel < 80)
                                _this.bsLevel[minute] = ++currentBsLevel;
                        }
                        else if (events.length > 0) {
                            var totalChange = events.reduce(function (prev, curr) { return prev + curr; }, 0);
                            currentBsLevel += totalChange;
                            _this.bsLevel[minute] = currentBsLevel;
                        }
                        else {
                            _this.bsLevel[minute] = currentBsLevel;
                        }
                    });
                };
                BloodSugarService.prototype.updateGlycationLevel = function () {
                    var _this = this;
                    var currentGlycationLevel = 0;
                    this.bsLevel.forEach(function (level, minute) {
                        if (level > 150) {
                            currentGlycationLevel++;
                        }
                        _this.glycationLevel[minute] = currentGlycationLevel;
                    });
                };
                BloodSugarService.prototype.updateChart = function () {
                    zingchart_1.zingchart.exec(this.chartId, 'modify', {
                        data: {
                            series: [
                                { values: this.bsLevel, scales: "scale-x,scale-y" },
                                { values: this.bsLevelTopBorder, scales: "scale-x,scale-y" },
                                { values: this.glycationLevel, scales: "scale-x,scale-y-2" }
                            ]
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