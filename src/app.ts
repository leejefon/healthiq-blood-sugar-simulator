import { Component } from 'angular2/core';
import { BloodSugarService } from './BloodSugarService';
import { ExerciseService } from './ExerciseService';
import { FoodService } from './FoodService';
import { IndexChart } from './IndexChart';
import { Chart } from './Chart';

@Component({
    selector: 'blood-sugar-simulator',
    templateUrl: 'app.html',
    providers: [BloodSugarService, ExerciseService, FoodService],
    directives: [IndexChart]
})
export class App {

    chart: Chart;

    constructor(
        private bloodSugar: BloodSugarService,
        private exercise: ExerciseService,
        private food: FoodService
    ) {
        this.chart = new Chart({
            id : 'index-chart',
            data : {
                type: 'line',
                series: [{
                    values: bloodSugar.bsLevel
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
                        return Array(60 * 24).map((elem, i) => {
                            return this.leftPad(Math.floor(i / 60)) + ":" + this.leftPad((i % 60));
                        });
                    })()
                }
            }
        });
    }

    test() {
        this.bloodSugar.bsLevel = this.bloodSugar.bsLevel.map((bslevel, index) => {
            if (index > 120 && index < 600) return 100;
            else return bslevel;
        });
        this.bloodSugar.updateChart(this.chart.id, this.bloodSugar.bsLevel);
    }

    private leftPad(number: Number) {
        return ("00" + number).slice(-2);
    }
}
