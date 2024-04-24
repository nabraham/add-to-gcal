import { Parser } from './parser.type';
import { parsers } from './ebay';

const getISO = (p: Parser, s: string): string => {
    return p.format(p.group(s))?.toISOString();
};

describe('ebay', () => {
    let p: Parser;

    beforeEach(() => {
        const monday = new Date('2024-04-22T12:00:00.000Z');
        jest.useFakeTimers({
            now: monday,
            advanceTimers: false,
        });
        p = parsers[0];
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should import parsers', () => {
        expect(parsers.length).toBe(1);
    });

    it('should use mock date', () => {
        expect(new Date().toISOString()).toBe('2024-04-22T12:00:00.000Z');
    });

    it('should parse a date that occurs later in the week', () => {
        expect(getISO(p, 'Friday 7:00 PM')).toBe('2024-04-26T19:00:00.000Z');
    });

    it('should parse a date in the following week', () => {
        expect(getISO(p, 'Sunday 7:00 PM')).toBe('2024-04-28T19:00:00.000Z');
    });

    it('should parse today', () => {
        expect(getISO(p, 'Today 7:00 PM')).toBe('2024-04-22T19:00:00.000Z');
    });
});
