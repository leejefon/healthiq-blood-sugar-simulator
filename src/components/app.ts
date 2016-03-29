import { Component, AfterViewInit } from 'angular2/core';
import { BloodSugarService } from '../services/BloodSugarService';
import { ExerciseService } from '../services/ExerciseService';
import { FoodService } from '../services/FoodService';
import { IndexChart } from './IndexChart';
import { Chart } from '../models/Chart';
import { Event } from '../models/Event';

declare var jQuery:any;
declare var moment:any;

@Component({
    selector: 'blood-sugar-simulator',
    templateUrl: 'templates/app.html',
    providers: [BloodSugarService, ExerciseService, FoodService],
    directives: [IndexChart]
})
export class App implements AfterViewInit {

    chart: Chart;
    events: Event[];

    newExerciseEvent: any;
    newFoodEvent: any;

    constructor(
        private bloodSugar: BloodSugarService,
        private exercise: ExerciseService,
        private food: FoodService
    ) {
        this.events = [];
        this.newFoodEvent = { id: 0, time: '12:00 AM' };
        this.newExerciseEvent = { id: 0, time: '12:00 AM' };

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

    addExerciseEvent() {
        var newEvent = new Event({
            type: 'exercise',
            name: this.exercise.getIndexById(this.newExerciseEvent.id).name,
            index: this.exercise.getIndexById(this.newExerciseEvent.id).index,
            time: this.getMinuteOfDay(this.newExerciseEvent.time)
        });

        this.events.push(newEvent);
    }

    addFoodEvent() {
        var newEvent = new Event({
            type: 'food',
            name: this.food.getIndexById(this.newFoodEvent.id).name,
            index: this.food.getIndexById(this.newFoodEvent.id).index,
            time: this.getMinuteOfDay(this.newFoodEvent.time)
        });

        this.events.push(newEvent);
    }

    removeEvent() {

    }

    ngAfterViewInit() {
        var self = this;
        jQuery('.timepicker').datetimepicker({ format: 'LT', allowInputToggle: true });

        // HACK: for some reason datetime doesn't update ngModel
        jQuery('.timepicker').on('dp.change', function (e) {
            var id = jQuery(this).find('input').attr('id');
            if (id === 'exerciseTime') {
                self.newExerciseEvent.time = jQuery('#exerciseTime').val();
            } else {
                self.newFoodEvent.time = jQuery('#foodTime').val();
            }
        });
    }

    private leftPad(number: Number) {
        return ("00" + number).slice(-2);
    }

    private getMinuteOfDay(time: String) {
        var randomDate = '2000/01/01 ';
        var timeObj = moment(randomDate + time);

        return timeObj.hours() * 60 + timeObj.minutes();
    }
}
