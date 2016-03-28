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
                self.indices = results.data.map(item => {
                    return {
                        id: parseInt(item['ID']),
                        name: item['Name'],
                        index: parseInt(item['Glycemic Index'])
                    };
                });
            }
        });
    }

    getIndices() {
        return this.indices;
    }

    getIndexByName(name: String) {
        return this.indices.find(food => food.name.toLowerCase() === name.toLowerCase());
    }

    getIndexById(id: Number) {
        return this.indices.find(food => food.id === id);
    }
}
