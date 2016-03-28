import { Component } from 'angular2/core';
import { ExerciseService } from './ExerciseService';
import { FoodService } from './FoodService';
import { IndexChart } from './IndexChart';
import { Chart } from './Chart';
import { zingchart } from 'zingchart';

@Component({
    selector: 'blood-sugar-simulator',
    templateUrl: 'app.html',
    providers: [ExerciseService, FoodService],
    directives: [IndexChart]
})
export class App {
    chart: Chart;
    bsLevel: Number[];

    constructor(
        private exercise: ExerciseService,
        private food: FoodService
    ) {
        this.bsLevel = Array(60 * 24).fill(80);

        this.chart = new Chart({
            id : 'index-chart',
            data : {
                type: 'line',
                series: [{
                    values: this.bsLevel
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
                    // step: 120,
                    labels: (() => {
                        var result = [];
                        for (var i = 0; i <= 60 * 24; i++) {
                            result[i] = this.leftPad(Math.floor(i / 60)) + ":" + this.leftPad((i % 60));
                        }
                        return result;
                    })()
                }
            }
        });
    }

    test() {
        this.bsLevel = this.bsLevel.map((bslevel, index) => {
            if (index > 120 && index < 600) return 100;
            else return bslevel;
        });
        this.updateData(this.bsLevel);
    }

    private updateData(data: any) {
        zingchart.exec(this.chart.id, 'modify', {
            data : {
                series: [{ values: data }]
            }
        });
    }

    private leftPad(number: Number) {
        return ("00" + number).slice(-2);
    }
}
