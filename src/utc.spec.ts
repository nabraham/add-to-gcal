/**
 * Ensure that jest has set timezone to UTC
 * See global-test-setup.ts
 */

describe('Timezones', () => {
    it('should always be UTC', () => {
        expect(new Date().getTimezoneOffset()).toBe(0);
    });
});