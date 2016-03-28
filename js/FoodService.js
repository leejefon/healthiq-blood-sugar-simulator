System.register(['angular2/core', 'papaparse'], function(exports_1, context_1) {
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
    var core_1, papaparse_1;
    var FoodService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (papaparse_1_1) {
                papaparse_1 = papaparse_1_1;
            }],
        execute: function() {
            FoodService = (function () {
                function FoodService() {
                    var self = this;
                    papaparse_1.default.parse('/data/food.csv', {
                        download: true,
                        header: true,
                        skipEmptyLines: true,
                        complete: function (results) {
                            self.indices = results.data.map(function (item) {
                                return {
                                    id: parseInt(item['ID']),
                                    name: item['Name'],
                                    index: parseInt(item['Glycemic Index'])
                                };
                            });
                        }
                    });
                }
                FoodService.prototype.getIndices = function () {
                    return this.indices;
                };
                FoodService.prototype.getIndexByName = function (name) {
                    return this.indices.find(function (food) { return food.name.toLowerCase() === name.toLowerCase(); });
                };
                FoodService.prototype.getIndexById = function (id) {
                    return this.indices.find(function (food) { return food.id === id; });
                };
                FoodService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], FoodService);
                return FoodService;
            }());
            exports_1("FoodService", FoodService);
        }
    }
});
//# sourceMappingURL=FoodService.js.map