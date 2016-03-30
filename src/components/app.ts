import { Component } from 'angular2/core';
import { EventList } from './EventList';
import { IndexChart } from './IndexChart';
import { Chart } from '../models/Chart';

@Component({
    selector: 'blood-sugar-simulator',
    templateUrl: 'templates/app.html',
    directives: [EventList, IndexChart]
})
export class App {
    chartId: String = 'index-chart';
    chart: Chart;

    constructor() {
        let initialBsLevel = Array(60 * 24).fill(80);

        this.chart = new Chart({
            id : this.chartId,
            data : {
                type: 'line',
                series: [{
                    values: initialBsLevel
                }],
                'scale-y': {
                    label: { text: "Blood Sugar Level" },
                    'min-value': 0,
                    'max-value': 160
                },
                'scale-x': {
                    label: { text: "Hours of a Day" },
                    'min-value': 0,
                    'max-value': 60 * 24,
                    labels: (() => {
                        return Array(60 * 24 + 1).fill(0).map((elem, i) => {
                            return this.leftPad(Math.floor(i / 60) % 24) + ":" + this.leftPad((i % 60));
                        });
                    })()
                }
            }
        });
    }

    private leftPad(num: number) {
        return ("00" + num).slice(-2);
    }
}
