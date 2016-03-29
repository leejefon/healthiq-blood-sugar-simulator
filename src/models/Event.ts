
export class Event {
    type: String;
    name: String;
    bsLevelChange: Number;
    time: Number;

    constructor(config: any) {
        this.type = config.type;
        this.name = config.name;
        this.bsLevelChange = config.index;
        this.time = config.time;
    }
}
