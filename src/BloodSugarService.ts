import { Injectable } from 'angular2/core';
import { zingchart } from 'zingchart';
import { Event } from './Event';

@Injectable()
export class BloodSugarService {

    bsLevel: Number[];

    constructor() {
        this.bsLevel = Array(60 * 24).fill(80);
    }

    updateBsLevel(event: Event) {

    }

    updateChart(chartId: String, data: any) {
        zingchart.exec(chartId, 'modify', {
            data : {
                series: [{ values: data }]
            }
        });
    }
}
