const { parsers } = require('../../src/parsers/default');

test('default parser', () => {
    expect(parsers.length).toBe(1);

    let dateEpoch = parsers[0].group('1970-01-01 00:00:00');
    expect(dateEpoch).toBeInstanceOf(Date);
    expect(parsers[0].format(dateEpoch)).toEqual(dateEpoch);

    expect(parsers[0].group('foo bar')).toBeFalsy();
})