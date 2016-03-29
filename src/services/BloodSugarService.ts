import { Injectable } from 'angular2/core';
import { zingchart } from 'zingchart';
import { Event } from '../models/Event';

@Injectable()
export class BloodSugarService {

    bsLevel: number[];
    timeAffected: Boolean[];
    chartId: String;

    constructor() {
        this.bsLevel = Array(60 * 24).fill(80);
        this.timeAffected = Array(60*24).fill(false);
    }

    setChartId(chartId) {
        this.chartId = chartId;
    }

    updateBsLevel(event: Event, eventAction: String = 'add') {
        if (event.type === 'exercise' && eventAction === 'add') {
            this.decrease(event.time, event.bsLevelChange, 1);
        } else if (event.type === 'exercise' && eventAction === 'remove') {
            this.increase(event.time, event.bsLevelChange, 1);
        } else if (event.type === 'food' && eventAction === 'add') {
            this.increase(event.time, event.bsLevelChange, 2);
        } else if (event.type === 'food' && eventAction === 'remove') {
            this.decrease(event.time, event.bsLevelChange, 2);
        }

        this.normalize();
        this.glycation();
        this.updateChart();
    }

    private increase(time: number, total: number, durationInHour: number) {
        var changeEveryMin = total / durationInHour / 60;
        var endTime = durationInHour * 60 + time;

        this.bsLevel = this.bsLevel.map((level, minute) => {
            if (minute >= time && minute < endTime) {
                return level + changeEveryMin * (minute - time);
            } else {
                return level;
            }
        });

        this.timeAffected = this.timeAffected.map((affected, minute) => {
            return minute >= time && minute < endTime ? true : affected;
        });
    }

    private decrease(time: number, total: number, durationInHour: number) {
        var changeEveryMin = total / durationInHour / 60;
        var endTime = durationInHour * 60 + time;

        this.bsLevel = this.bsLevel.map((level, minute) => {
            if (minute >= time && minute < endTime) {
                return level - changeEveryMin * (minute - time);
            } else {
                return level;
            }
        });

        this.timeAffected = this.timeAffected.map((affected, minute) => {
            return minute >= time && minute < endTime ? true : affected;
        });
    }

    private normalize() {
        for (var minute = 0; minute < 60 * 24; minute++) {
            var prev = this.bsLevel[minute - 1];
            if (!this.timeAffected[minute] && Math.abs(80 - prev) > 0.01) {
                if (prev > 80) this.bsLevel[minute] = prev - 1;
                else if (prev < 80) this.bsLevel[minute] = prev + 1;
            }
        }
    }

    private glycation() {

    }

    private updateChart() {
        zingchart.exec(this.chartId, 'modify', {
            data : {
                series: [{ values: this.bsLevel }]
            }
        });
    }
}
