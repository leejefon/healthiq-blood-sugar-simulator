
declare var moment:any;

export class Event {
    id: Number;
    type: String;
    name: String;
    bsLevelChange: Number;
    time: Number;
    timeReadable: String;

    constructor(event: any) {
        this.id = event.id;
        this.type = event.type;
        this.name = event.name;
        this.bsLevelChange = event.index;
        this.time = this.getMinuteOfDay(event.time);
        this.timeReadable = event.time;
    }

    private getMinuteOfDay(time: String) {
        var randomDate = '2000/01/01 ';
        var timeObj = moment(randomDate + time);

        return timeObj.hours() * 60 + timeObj.minutes();
    }
}
