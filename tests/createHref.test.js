const createHref = require('../src/views/helpers/createHref');

// tests if createHref returns an object

const noHref = [
    'Tweet with link at the end https://t.co/L4XP7cYIqH',
    'Tweet with no no links',
    'https://t.co/L4XP7cYIqH Tweet with link at the beginning',
    'Tweet with https://t.co/L4XP7cYIqH link in the middle'
];

const withHref = [
    'Tweet with link at the end <a src=https://t.co/L4XP7cYIqH>https://t.co/L4XP7cYIqH</a> ',
    'Tweet with no no links',
    '<a src=https://t.co/L4XP7cYIqH>https://t.co/L4XP7cYIqH</a>  Tweet with link at the beginning',
    'Tweet with <a src=https://t.co/L4XP7cYIqH>https://t.co/L4XP7cYIqH</a>  link in the middle'
];

describe('Enabling href links in twitter tweets text', () => {
    test('tweets with http links get a href link', () => {
        expect(createHref(noHref)).toEqual(withHref);
    });
});
