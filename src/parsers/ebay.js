var daysRx = 'SUNDAY|MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY|SATURDAY';
var days = daysRx.split('|');

function sanitize(str) {
    return str.replaceAll(/[^A-Za-z0-9: ]/g, '').toUpperCase()
}

var ebay = {
    name: 'ebay',
    group: (s) => {
        let rx = new RegExp('(' + daysRx + ') ([0-9:]+) (AM|PM)','g');
        return rx.exec(sanitize(s));
    },
    format: (groups) => {
        let day = groups[1];
        let time = groups[2];
        let ampm = groups[3];
        let dayIndex = days.indexOf(day);
        let currIndex = new Date().getDay();
        let delta = (dayIndex - currIndex + 7) % 7;
        let targetDay = new Date();
        targetDay.setDate(targetDay.getDate() + delta);
        let targetString = [
            [ targetDay.getFullYear(), (targetDay.getMonth() + 1),  targetDay.getDate() ].join('/'),
            time,
            ampm
        ].join(' ');
        return new Date(targetString);
    }
}

var parsers = [ ebay ];

export { parsers };