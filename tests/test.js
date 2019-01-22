// const handleTweets = require('');
// const func = require('../src/views/helpers/getData.js');
const sum = require('./test-sum.js');
const helpers = require('../src/views/helpers/index.js');
const request = require('supertest');
const router = require('../src/routes/index.js');

// JEST test on basic fucntion is working
test('adds 1+2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

// test YoutubeApi call is working ( 1 of 4)
test('check if youtube channel Api result is object', () => {
    expect(typeof helpers.apiYoutube.channel('metallica')).toBe('object');
});

// test YoutubeApi call is working ( 2 of 4)
const channelCall = helpers.apiYoutube.channel('metallica');

// channelCall.then(x => console.log(x));
// console.log(channelCall);
test('check if youtube playlist Api result is object', () => {
    expect(typeof channelCall.then(x => x)).toBe('object');
});

describe('Test the root path', () => {
    test('It should response the GET method', () => {
        request(router)
            .get('/')
            .expect(200);
    });
});

// test YoutubeApi call is working ( 3 of 4)
const playlistCall = helpers.apiYoutube
    .channel('metallica')
    .then(data => helpers.apiYoutube.playlist(data));

// playlistCall.then(x => console.log(x));
// console.log(channelCall);
test('check if youtube video Api result is object', () => {
    expect(typeof playlistCall.then(x => x)).toBe('object');
});

// test YoutubeApi call is working ( 4 of 4)
const videolistCall = helpers.apiYoutube
    .channel('metallica')
    .then(data => helpers.apiYoutube.playlist(data))
    .then(data => helpers.apiYoutube.videolist(data));

// videolistCall.then(x => console.log(x));
test('check if youtube list of video Api result is object', () => {
    expect(typeof videolistCall.then(x => x)).toBe('object');
});

// test YoutubeApi call for array of videos gets objects
const getListOfVideos = helpers.apiYoutube
    .channel('metallica')
    .then(data => helpers.apiYoutube.playlist(data))
    .then(data => helpers.apiYoutube.videolist(data))
    .then(data => helpers.apiYoutube.arrayOfVideos(data));

getListOfVideos.then(x => console.log(typeof x));
test('check if youtube list of videos type is object', () => {
    expect(typeof getListOfVideos.then(x => x)).toBe('object');
});
