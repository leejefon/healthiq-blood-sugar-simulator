import { Injectable } from 'angular2/core';
import { zingchart } from 'zingchart';
import { Event } from '../models/Event';

@Injectable()
export class BloodSugarService {

    bsLevel: number[];
    bsLevelTopBorder: number[];
    glycationLevel: number[];
    eventsInEveryMinute: any[];
    chartId: String;

    constructor() {
        this.reset();
    }

    reset() {
        this.bsLevel = new Array(60 * 24);
        this.bsLevelTopBorder = new Array(60 * 24).fill(150);
        this.glycationLevel = new Array(60 * 24).fill(0);
        this.eventsInEveryMinute = new Array(60 * 24).fill(new Array());
    }

    setChartId(chartId) {
        this.chartId = chartId;
    }

    update(events: Event[]) {
        this.reset();

        events.forEach(event => {
            var durationInHour = event.type === 'exercise' ? 1 : 2;
            var changeEveryMin = event.bsLevelChange / durationInHour / 60;
            var endTime = durationInHour * 60 + event.time;

            this.eventsInEveryMinute = this.eventsInEveryMinute.map((evts, minute) => {
                if (minute >= event.time && minute < endTime) {
                    return evts.concat(changeEveryMin);
                } else {
                    return evts;
                }
            });
        });

        this.updateBsLevel();
        this.updateGlycationLevel();
        this.updateChart();
    }

    private updateBsLevel() {
        var currentBsLevel = 80;

        this.eventsInEveryMinute.forEach((events, minute) => {
            if (events.length === 0 && Math.abs(80 - currentBsLevel) >= 1) {
                if (currentBsLevel > 80) this.bsLevel[minute] = --currentBsLevel;
                else if (currentBsLevel < 80) this.bsLevel[minute] = ++currentBsLevel;
            } else if (events.length > 0) {
                var totalChange = events.reduce((prev, curr) => prev + curr, 0);
                currentBsLevel += totalChange;
                this.bsLevel[minute] = currentBsLevel;
            } else {
                this.bsLevel[minute] = currentBsLevel; // Should be ~80
            }
        });
    }

    private updateGlycationLevel() {
        var currentGlycationLevel = 0;
        this.bsLevel.forEach((level, minute) => {
            if (level > 150) {
                currentGlycationLevel++;
            }
            this.glycationLevel[minute] = currentGlycationLevel;
        });
    }

    private updateChart() {
        zingchart.exec(this.chartId, 'modify', {
            data : {
                series: [
                    { values: this.bsLevel, scales: "scale-x,scale-y" },
                    { values: this.bsLevelTopBorder, scales: "scale-x,scale-y" },
                    { values: this.glycationLevel, scales: "scale-x,scale-y-2" }
                ]
            }
        });
    }
}
