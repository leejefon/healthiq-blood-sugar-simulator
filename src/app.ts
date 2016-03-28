import { Component } from 'angular2/core';
import { ExerciseService } from './ExerciseService';
import { FoodService } from './FoodService';

@Component({
    selector: 'blood-sugar-simulator',
    templateUrl: 'app.html',
    providers: [ExerciseService, FoodService]
})
export class App {

    constructor(
        private exercise: ExerciseService,
        private food: FoodService
    ) {

    }

    test() {
        console.log(this.food.getIndexById(1));
        console.log(this.exercise.getIndexByName('walking'));
    }
}
