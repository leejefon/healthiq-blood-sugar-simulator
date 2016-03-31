System.register(['./BloodSugarService', '../models/Event'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var BloodSugarService_1, Event_1;
    return {
        setters:[
            function (BloodSugarService_1_1) {
                BloodSugarService_1 = BloodSugarService_1_1;
            },
            function (Event_1_1) {
                Event_1 = Event_1_1;
            }],
        execute: function() {
            describe('Blood Sugar Test', function () {
                it('Test data reset', function () {
                    var bloodSugar = new BloodSugarService_1.BloodSugarService();
                    var minutesInADay = 60 * 24;
                    expect(bloodSugar.bsLevel.length).toEqual(minutesInADay);
                    expect(bloodSugar.bsLevelTopBorder.length).toEqual(minutesInADay);
                    expect(bloodSugar.glycationLevel.length).toEqual(minutesInADay);
                    expect(bloodSugar.eventsInEveryMinute.length).toEqual(minutesInADay);
                });
                it('Test updating events every minute', function () {
                    var bloodSugar = new BloodSugarService_1.BloodSugarService();
                    var events = [
                        new Event_1.Event({ id: 1, type: 'exercise', name: 'Running', index: -60, time: '8:00 AM' }),
                        new Event_1.Event({ id: 2, type: 'food', name: 'Cake', index: 60, time: '8:30 AM' })
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
                it('Test updating Blood Sugar Level', function () {
                    var bloodSugar = new BloodSugarService_1.BloodSugarService();
                    var events = [
                        new Event_1.Event({ id: 1, type: 'exercise', name: 'Running', index: -60, time: '8:00 AM' }),
                        new Event_1.Event({ id: 2, type: 'food', name: 'Cake', index: 60, time: '8:30 AM' })
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
                it('Test updating Glycation level', function () {
                    var bloodSugar = new BloodSugarService_1.BloodSugarService();
                    var events = [
                        new Event_1.Event({ id: 1, type: 'food', name: 'Cake', index: 120, time: '8:00 AM' }),
                        new Event_1.Event({ id: 2, type: 'food', name: 'Cake', index: 120, time: '8:00 AM' })
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
        }
    }
});
//# sourceMappingURL=BloodSugarServiceSpec.js.map