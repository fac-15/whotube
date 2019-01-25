const helpers = require('../src/views/helpers/index.js');
const nock = require('nock');
require('dotenv').config();
const youtubeKey = process.env.GOOGLE_API_KEY;

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

//************************/nock test

const nockYoutube1 = nock('https://www.googleapis.com/youtube/v3/')
    .persist()
    .log(console.log)
    .get(
        `/search?part=snippet&type=channel&maxResults=1&q=metallica&key=${youtubeKey}`
    )
    .reply(200, {
        kind: 'youtube#searchListResponse',
        etag: '"XpPGQXPnxQJhLgs6enD_n8JR4Qk/pnmZdS-hLx2ulZ_zwIJwJ7DM36Q"',
        nextPageToken: 'CAEQAA',
        regionCode: 'GB',
        pageInfo: {
            totalResults: 237048,
            resultsPerPage: 1
        },
        items: [
            {
                kind: 'youtube#searchResult',
                etag:
                    '"XpPGQXPnxQJhLgs6enD_n8JR4Qk/eyZK4a5WTz-7THawxHpCp1O2d2Q"',
                id: {
                    kind: 'youtube#channel',
                    channelId: 'UCGexNm_Kw4rdQjLxmpb2EKw'
                },
                snippet: {
                    publishedAt: '2013-05-16T20:05:50.000Z',
                    channelId: 'UCGexNm_Kw4rdQjLxmpb2EKw',
                    title: 'Metallica - Topic',
                    description:
                        'Metallica formed in 1981 by drummer Lars Ulrich and guitarist and vocalist James Hetfield and has become one of the most influential and commercially ...',
                    thumbnails: {
                        default: {
                            url:
                                'https://yt3.ggpht.com/-WnEdMI7UuT4/AAAAAAAAAAI/AAAAAAAAAAA/gJE1T1ch9KM/s88-c-k-no-mo-rj-c0xffffff/photo.jpg'
                        },
                        medium: {
                            url:
                                'https://yt3.ggpht.com/-WnEdMI7UuT4/AAAAAAAAAAI/AAAAAAAAAAA/gJE1T1ch9KM/s240-c-k-no-mo-rj-c0xffffff/photo.jpg'
                        },
                        high: {
                            url:
                                'https://yt3.ggpht.com/-WnEdMI7UuT4/AAAAAAAAAAI/AAAAAAAAAAA/gJE1T1ch9KM/s800-c-k-no-mo-rj-c0xffffff/photo.jpg'
                        }
                    },
                    channelTitle: 'Metallica - Topic',
                    liveBroadcastContent: 'upcoming'
                }
            }
        ]
    });

const youTubeBody = JSON.parse(nockYoutube1.interceptors[0].body);
test('check if youtube video Api result is the same as Nock result', () => {
    expect(youTubeBody.items[0].id.channelId).toEqual(
        'UCGexNm_Kw4rdQjLxmpb2EKw'
    );
});
