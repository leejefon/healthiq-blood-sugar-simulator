import { BloodSugarService } from './BloodSugarService';
import { Event } from '../models/Event';

declare var describe: any, it: any, expect: any, spyOn: any;

describe('Blood Sugar Test', () => {
    it('Test data reset', () => {
        var bloodSugar = new BloodSugarService();
        var minutesInADay = 60 * 24;

        expect(bloodSugar.bsLevel.length).toEqual(minutesInADay);
        expect(bloodSugar.bsLevelTopBorder.length).toEqual(minutesInADay);
        expect(bloodSugar.glycationLevel.length).toEqual(minutesInADay);
        expect(bloodSugar.eventsInEveryMinute.length).toEqual(minutesInADay);
    });

    it('Test updating events every minute', () => {
        var bloodSugar = new BloodSugarService();
        var events = [
            new Event({ id: 1, type: 'exercise', name: 'Running', index: -60, time: '8:00 AM' }),
            new Event({ id: 2, type: 'food', name: 'Cake', index: 60, time: '8:30 AM' })
        ];

        var minutesAt8AM = 60 * 8;
        var thirtyMin = 30;

        spyOn(bloodSugar, "updateBsLevel").and.returnValue(null);
        spyOn(bloodSugar, "updateGlycationLevel").and.returnValue(null);
        spyOn(bloodSugar, "updateChart").and.returnValue(null);

        bloodSugar.update(events);

        expect(bloodSugar.eventsInEveryMinute[minutesAt8AM]).toEqual([-1]);
        expect(bloodSugar.eventsInEveryMinute[minutesAt8AM + thirtyMin]).toEqual([-1, 0.5]);
        expect(bloodSugar.eventsInEveryMinute[minutesAt8AM + thirtyMin * 2]).toEqual([0.5]);
    });

    it('Test updating Blood Sugar Level', () => {
        var bloodSugar = new BloodSugarService();
        var events = [
            new Event({ id: 1, type: 'exercise', name: 'Running', index: -60, time: '8:00 AM' }),
            new Event({ id: 2, type: 'food', name: 'Cake', index: 60, time: '8:30 AM' })
        ];

        var minutesAt8AM = 60 * 8;
        var thirtyMin = 30;

        spyOn(bloodSugar, "updateGlycationLevel").and.returnValue(null);
        spyOn(bloodSugar, "updateChart").and.returnValue(null);

        bloodSugar.update(events);

        expect(bloodSugar.bsLevel[minutesAt8AM]).toEqual(80 - 1);
        expect(bloodSugar.bsLevel[minutesAt8AM + 1]).toEqual(80 - 2);
        expect(bloodSugar.bsLevel[minutesAt8AM + thirtyMin]).toEqual(80 - 31 + 0.5);
        expect(bloodSugar.bsLevel[minutesAt8AM + thirtyMin * 2]).toEqual(80 - 60 + 15.5);
    });

    it('Test updating Glycation level', () => {
        var bloodSugar = new BloodSugarService();
        var events = [
            new Event({ id: 1, type: 'food', name: 'Cake', index: 120, time: '8:00 AM' }),
            new Event({ id: 2, type: 'food', name: 'Cake', index: 120, time: '8:00 AM' })
        ];

        var minutesAt8AM = 60 * 8;
        var thirtyFiveMin = 35;

        spyOn(bloodSugar, "updateChart").and.returnValue(null);

        bloodSugar.update(events);

        expect(bloodSugar.bsLevel[minutesAt8AM + thirtyFiveMin]).toEqual(152);
        expect(bloodSugar.glycationLevel[minutesAt8AM + thirtyFiveMin]).toEqual(1);
        expect(bloodSugar.glycationLevel[minutesAt8AM + thirtyFiveMin + 1]).toEqual(2);
    });
});
