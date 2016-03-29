import { Injectable } from 'angular2/core';
import Papa from 'papaparse';

@Injectable()
export class ExerciseService {
    indices: any;

    constructor() {
        var self = this;
        Papa.parse('/data/exercise.csv', {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                self.indices = results.data.map(item => {
                    return {
                        id: parseInt(item['ID']),
                        name: item['Exercise'],
                        index: parseInt(item['Exercise Index'])
                    };
                });
            }
        });
    }

    getIndexByName(name: String) {
        return this.indices.find(exercise => exercise.name.toLowerCase() === name.toLowerCase());
    }

    getIndexById(id: Number) {
        return this.indices.find(exercise => exercise.id == id);
    }
}
