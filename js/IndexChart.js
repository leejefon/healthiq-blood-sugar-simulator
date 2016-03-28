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
    var IndexChart;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (zingchart_1_1) {
                zingchart_1 = zingchart_1_1;
            }],
        execute: function() {
            IndexChart = (function () {
                function IndexChart(zone) {
                    this.zone = zone;
                }
                IndexChart.prototype.ngAfterViewInit = function () {
                    var _this = this;
                    this.zone.runOutsideAngular(function () {
                        zingchart_1.zingchart.render({
                            id: _this.chart.id,
                            data: _this.chart.data,
                            width: _this.chart.width,
                            height: _this.chart.height
                        });
                    });
                };
                IndexChart.prototype.ngOnDestroy = function () {
                    zingchart_1.zingchart.exec(this.chart['id'], 'destroy');
                };
                IndexChart = __decorate([
                    core_1.Component({
                        selector: 'index-chart',
                        inputs: ['chart'],
                        templateUrl: 'templates/index-chart.html'
                    }), 
                    __metadata('design:paramtypes', [core_1.NgZone])
                ], IndexChart);
                return IndexChart;
            }());
            exports_1("IndexChart", IndexChart);
        }
    }
});
//# sourceMappingURL=IndexChart.js.map