import { Component, AfterViewInit, OnInit } from 'angular2/core';
import { BloodSugarService } from '../services/BloodSugarService';
import { ExerciseService } from '../services/ExerciseService';
import { FoodService } from '../services/FoodService';
import { OrderBy } from '../pipes/orderBy';
import { Truncate } from '../pipes/truncate';
import { Event } from '../models/Event';

declare var jQuery:any;

@Component({
    selector: 'event-list',
    inputs: ['chartId'],
    templateUrl: 'templates/event-list.html',
    providers: [BloodSugarService, ExerciseService, FoodService],
    pipes: [OrderBy, Truncate]
})
export class EventList implements AfterViewInit, OnInit {
    chartId: String;
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
    }

    addExerciseEvent() {
        var newEvent = new Event({
            id: this.events.length + 1,
            type: 'exercise',
            name: this.exercise.getIndexById(this.newExerciseEvent.id).name,
            index: this.exercise.getIndexById(this.newExerciseEvent.id).index,
            time: this.newExerciseEvent.time
        });

        this.events.push(newEvent);
        this.bloodSugar.updateBsLevel(newEvent);
    }

    addFoodEvent() {
        var newEvent = new Event({
            id: this.events.length + 1,
            type: 'food',
            name: this.food.getIndexById(this.newFoodEvent.id).name,
            index: this.food.getIndexById(this.newFoodEvent.id).index,
            time: this.newFoodEvent.time
        });

        this.events.push(newEvent);
        this.bloodSugar.updateBsLevel(newEvent);
    }

    removeEvent(event) {
        this.events = this.events.filter(evt => evt.id !== event.id);
        this.bloodSugar.updateBsLevel(event, 'remove');
    }

    ngOnInit() {
        this.bloodSugar.setChartId(this.chartId);
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
}
