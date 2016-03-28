import { Injectable } from 'angular2/core';
import Papa from 'papaparse';

@Injectable()
export class FoodService {
    private indices: any;

    constructor() {
        var self = this;
        Papa.parse('/data/food.csv', {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                self.indices = results.data;
            }
        });
    }

    getIndices() {
        return this.indices;
    }
}
