// const handleTweets = require('');
const func = require('../src/views/helpers/getData.js');
const sum = require('./test-sum.js');

test('adds 1+2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

// test('multiply 2 * 2 to equal 4', () => {
//     expect(func.by2(2, 2)).toBe(4);
// });
