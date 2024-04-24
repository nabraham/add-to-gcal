import { Parser } from "./parser.type";
const { parsers } = require('./ebay');

describe('ebay', () => {
    let p: Parser;

    beforeEach(() => {
        const mockedDate = new Date('2024-04-22T12:00:00.000Z');
        jest.useFakeTimers('modern' as any);
        jest.setSystemTime(mockedDate);
        p = parsers[0];
    });

    afterEach(() => {
        jest.useRealTimers();
    })

    it('should import parsers', () => {
        expect(parsers.length).toBe(1);
    });

    it('should use mock date', () => {
        expect((new Date()).toISOString()).toBe('2024-04-22T12:00:00.000Z');
    });

    it('should parse a date that occurs later in the week', () => {
        let friday = p.format(p.group('Friday 7:00 PM')).toISOString();
        expect(friday).toBe('2024-04-26T19:00:00.000Z');
    });

    it('should parse a date in the following week', () => {
        let sunday = p.format(p.group('Sunday 7:00 PM')).toISOString();
        expect(sunday).toBe('2024-04-28T19:00:00.000Z');
    })

    it('should parse today', () => {
        let today = p.format(p.group('Today 7:00 PM')).toISOString();
        expect(today).toBe('2024-04-22T19:00:00.000Z');
    });
});