import { Injectable } from 'angular2/core';
import { zingchart } from 'zingchart';
import { Event } from '../models/Event';

@Injectable()
export class BloodSugarService {

    bsLevel: Number[];
    chartId: String;

    constructor() {
        this.bsLevel = Array(60 * 24).fill(80);
    }

    setChartId(chartId) {
        this.chartId = chartId;
    }

    updateBsLevel(event: Event, action: String = 'add') {
        this.bsLevel = this.bsLevel.map((bslevel, index) => {
            if (index > 120 && index < 600) return 100;
            else return bslevel;
        });
        this.updateChart();
    }

    private updateChart() {
        zingchart.exec(this.chartId, 'modify', {
            data : {
                series: [{ values: this.bsLevel }]
            }
        });
    }
}
