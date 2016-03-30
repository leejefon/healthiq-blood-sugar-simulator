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
        let initialBsLevel = new Array(60 * 24).fill(80);
        let topBsLevel = new Array(60 * 24).fill(150);
        let iniialGlycationLevel = new Array(60 * 24).fill(0);

        this.chart = new Chart({
            id : this.chartId,
            data : {
                type: 'line',
                series: [
                    { values: initialBsLevel, scales: "scale-x,scale-y" },
                    { values: topBsLevel, scales: "scale-x,scale-y" },
                    { values: iniialGlycationLevel, scales: "scale-x,scale-y-2" }
                ],
                'scale-y': {
                    label: { text: "Blood Sugar Level" },
                    'min-value': 0,
                    'step': 20
                },
                'scale-y-2': {
                    label: { text: "Glycation Level" },
                    'min-value': 0,
                    'max-value': 300
                    // TODO: find a way to auto adjust scale if over max-value,
                    // problem without having max-value is that it always goes to the max
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
            },
            width: 560
        });
    }

    private leftPad(num: number) {
        return ("00" + num).slice(-2);
    }
}
