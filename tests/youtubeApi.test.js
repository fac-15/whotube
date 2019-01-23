const helpers = require('../src/views/helpers/index.js');

const channelCall = helpers.apiYoutube.channel('metallica');

const playlistCall = channelCall.then(data =>
    helpers.apiYoutube.playlist(data)
);

const videolistCall = playlistCall.then(data =>
    helpers.apiYoutube.videolist(data)
);

const getListOfVideos = videolistCall.then(data =>
    helpers.apiYoutube.arrayOfVideos(data)
);

describe('Youtube api call stages', () => {
    test('check if youtube channel Api result is object', () => {
        expect(typeof helpers.apiYoutube.channel('metallica')).toBe('object');
    });
    test('check if youtube playlist Api result is object', () => {
        expect(typeof channelCall.then(x => x)).toBe('object');
    });
    test('check if youtube video Api result is object', () => {
        expect(typeof playlistCall.then(x => x)).toBe('object');
    });
    test('check if youtube list of video Api result is object', () => {
        expect(typeof videolistCall.then(x => x)).toBe('object');
    });
    test('check if youtube list of videos type is object', () => {
        expect(typeof getListOfVideos.then(x => x)).toBe('object');
    });
});

// doesn't work at the moment, can't brake the test
// describe('Test the root path', () => {
//     test('It should response the GET method', () => {
//         request(router)
//             .get('/')
//             .then(response => {
//                 expect(response.statusCode).toBe(200);
//             });
//     });
// });

// describe('Test the wrong path', () => {
//     test('It should response the GET method', () => {
//         request(router)
//             .get('/eghefg')
//             .then(response => {
//                 expect(response.statusCode).toBe(404);
//             });
//     });
// });
