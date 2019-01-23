const cleanTimeFunc = require('../src/views/helpers/cleanTimeFunc.js');

let timeNotClean = [
    'Tue Jan 22 17:14:17 +0000 2019',
    'Tue Jan 22 03:47:34 +0000 2019',
    'Sun Jan 20 20:56:22 +0000 2019',
    'Sat Jan 19 18:08:22 +0000 2019',
    'Fri Jan 18 19:00:55 +0000 2019',
    'Wed Jan 16 16:00:29 +0000 2019',
    'Tue Jan 15 22:00:19 +0000 2019',
    'Mon Jan 14 19:01:31 +0000 2019',
    'Sun Jan 13 17:00:35 +0000 2019',
    'Sat Jan 12 18:53:35 +0000 2019'
];

let timeClean = [
    'Tue Jan 22 at 17:14:17',
    'Tue Jan 22 at 03:47:34',
    'Sun Jan 20 at 20:56:22',
    'Sat Jan 19 at 18:08:22',
    'Fri Jan 18 at 19:00:55',
    'Wed Jan 16 at 16:00:29',
    'Tue Jan 15 at 22:00:19',
    'Mon Jan 14 at 19:01:31',
    'Sun Jan 13 at 17:00:35',
    'Sat Jan 12 at 18:53:35'
];

describe('Test cleantime function works for tweets time and date', () => {
    test('timeNotClean to be processed and become timeClean', () => {
        expect(cleanTimeFunc(timeNotClean)).toEqual(timeClean);
    });
});
