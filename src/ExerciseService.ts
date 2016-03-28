import { Injectable } from 'angular2/core';
import Papa from 'papaparse';

@Injectable()
export class ExerciseService {
    private indices: any;

    constructor() {
        var self = this;
        Papa.parse('/data/exercise.csv', {
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
