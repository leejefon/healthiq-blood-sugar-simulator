import { Component } from 'angular2/core';
import { ExerciseService } from './ExerciseService';
import { FoodService } from './FoodService';
import { IndexChart } from './IndexChart';
import { Chart } from './Chart';

@Component({
    selector: 'blood-sugar-simulator',
    templateUrl: 'app.html',
    providers: [ExerciseService, FoodService],
    directives: [IndexChart]
})
export class App {
    charts: Chart[];

    constructor(
        private exercise: ExerciseService,
        private food: FoodService
    ) {
        this.charts = [{
            id : 'chart-1',
            data : {
                type : 'line',
                series : [{
                    values :[2,3,4,5,3,3,2]
                }],
            },
            height : 400,
            width : 600
        }];
    }

    test() {
        console.log(this.food.getIndexById(1));
        console.log(this.exercise.getIndexByName('walking'));
    }
}
