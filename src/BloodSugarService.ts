import { Injectable } from 'angular2/core';
import { zingchart } from 'zingchart';

@Injectable()
export class BloodSugarService {

    bsLevel: Number[];

    constructor() {
        this.bsLevel = Array(60 * 24).fill(80);
    }

    eatFood(food: Object, time: Number) {

    }

    doExercise(exercise: Object, time: Number) {

    }

    updateChart(chartId: String, data: any) {
        zingchart.exec(chartId, 'modify', {
            data : {
                series: [{ values: data }]
            }
        });
    }
}
