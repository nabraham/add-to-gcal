/**
 * Ensure that jest has set timezone to UTC
 * See tests/global-setup.js
 */

describe('Timezones', () => {
    it('should always be UTC', () => {
        expect(new Date().getTimezoneOffset()).toBe(0);
    });
});