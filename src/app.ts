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
    hourlyBS: Number[];

    constructor(
        private exercise: ExerciseService,
        private food: FoodService
    ) {
        this.hourlyBS = Array(24).fill(80);

        this.chart = new Chart({
            id : 'index-chart',
            data : {
                type: 'line',
                series: [{
                    values: this.hourlyBS
                }],
                'scale-y': {
                    'max-value': 160,
                    'label': { text: "Blood Sugar Level" }
                },
                'scale-x': {
                    label: { text: "Hours of a Day" }
                }
            }
        });
    }

    test() {
        this.hourlyBS[3] = 100;
        this.updateData(this.hourlyBS);
    }

    private updateData(data: any) {
        zingchart.exec(this.chart.id, 'modify', {
            data : {
                series: [{ values: data }]
            }
        });
    }
}
