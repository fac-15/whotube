const helpers = require('../src/views/helpers/index.js');

// tests if handleTweets returns an object
describe('Twitter Api call test', () => {
    test('Twitter Api returns an object', () => {
        expect(typeof helpers.apiTweets('metallica')).toBe('object');
    });
});
