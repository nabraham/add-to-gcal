import { Parser } from './parser.type.js';

const daysRx = 'SUNDAY|MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY|SATURDAY|TODAY';
const days = daysRx.split('|');

const sanitize = (s: string): string => {
    return s.replace(/[^A-Za-z0-9: ]/g, '').toUpperCase();
};

const makeDateString = (
    year: number,
    month: number,
    date: number,
    time: string,
    ampm: string,
): string => {
    return [[year, month + 1, date].join('/'), time, ampm].join(' ');
};

const parsers: Parser[] = [
    {
        name: 'ebay_multi_day',
        description: 'Tuesday 8:00 PM -OR- Today 8:00 PM',
        group: (s: string) => {
            const rx = new RegExp('(' + daysRx + ') ([0-9:]+) (AM|PM)', 'g');
            return rx.exec(sanitize(s));
        },
        format: (groups: any) => {
            const day = groups[1];
            const time = groups[2];
            const ampm = groups[3];
            let targetDay = new Date();
            if (day !== 'TODAY') {
                const today = new Date();
                const dayIndex = days.indexOf(day);
                const currIndex = today.getDay();
                const delta = (dayIndex - currIndex + 7) % 7;
                const targetUnix =
                    Math.floor(today.getTime() / 1000) + delta * 24 * 3600;
                targetDay = new Date(1000 * targetUnix);
            }
            const targetString = makeDateString(
                targetDay.getFullYear(),
                targetDay.getMonth(),
                targetDay.getDate(),
                time,
                ampm,
            );
            return new Date(targetString);
        },
    },
];

export { parsers };
