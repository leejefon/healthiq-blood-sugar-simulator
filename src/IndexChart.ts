import { Component, NgZone, AfterViewInit, OnDestroy } from 'angular2/core';
import { zingchart } from 'zingchart';
import { Chart } from './Chart';

@Component({
    selector: 'index-chart',
    inputs : ['chart'],
    templateUrl: 'templates/index-chart.html'
})
export class IndexChart implements AfterViewInit, OnDestroy {
    chart: Chart;

    constructor(private zone: NgZone) {

    }

    ngAfterViewInit() {
        this.zone.runOutsideAngular(() => {
            zingchart.render({
                id : this.chart.id,
                data : this.chart.data,
                width : this.chart.width,
                height: this.chart.height
            });
        });
    }

    ngOnDestroy() {
        zingchart.exec(this.chart['id'], 'destroy');
    }
}
