const sum = require('./test-sum.js');
describe('Test Jest is working', () => {
    test('1 + 1 to equal 2', () => {
        expect(1 + 1).toBe(2);
    });
    test('adds 1+2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3);
    });
});
