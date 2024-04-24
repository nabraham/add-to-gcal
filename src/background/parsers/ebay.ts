import { Parser } from "./parser.type.js";

var daysRx = 'SUNDAY|MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY|SATURDAY|TODAY';
var days = daysRx.split('|');

var sanitize = (s: string): string => {
    return s.replace(/[^A-Za-z0-9: ]/g, '').toUpperCase()
}

var makeDateString = (year: number, month: number, date: number, time: string, ampm: string): string => {
    return [ [ year, (month + 1),  date ].join('/'), time, ampm ].join(' ');
}

var parsers: Parser[] = [{
    name: 'ebay_multi_day',
    description: 'Tuesday 8:00 PM -OR- Today 8:00 PM',
    group: (s: string) => {
        let rx = new RegExp('(' + daysRx + ') ([0-9:]+) (AM|PM)','g');
        return rx.exec(sanitize(s));
    },
    format: (groups: any) => {
        let day = groups[1];
        let time = groups[2];
        let ampm = groups[3];
        let targetDay = new Date();
        if (day !== 'TODAY') {
            let today = new Date();
            let dayIndex = days.indexOf(day);
            let currIndex = today.getDay();
            let delta = (dayIndex - currIndex + 7) % 7;
            let targetUnix = Math.floor(today.getTime() / 1000) + delta * 24 * 3600;
            targetDay = new Date(1000 * targetUnix);
        }
        let targetString = makeDateString(targetDay.getFullYear(), targetDay.getMonth(), targetDay.getDate(), time, ampm);
        return new Date(targetString);
    }
}];

export { parsers };