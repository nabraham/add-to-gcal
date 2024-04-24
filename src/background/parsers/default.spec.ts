const { parsers } = require('./default');

describe('default parser', () => {
    it('should export 1 parser', () => {
        expect(parsers.length).toBe(1);
    });

    it('should parse a normal date', () => {
        let dateEpoch = parsers[0].group('1970-01-01 00:00:00');
        expect(dateEpoch).toBeInstanceOf(Date);
        expect(parsers[0].format(dateEpoch)).toEqual(dateEpoch);
    });

    it('should handle an invalid date string', () => {
        expect(parsers[0].group('foo bar')).toBeFalsy();
    })
})