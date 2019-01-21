const fetch = require('node-fetch');

require('dotenv').config();

// const Twitter = require('twitter');
// const handleTweets = require('./handleTweets');

// ** YOUTUBE **
//hardcoded youtube username
const youtubeKey = process.env.GOOGLE_API_KEY;
// youtube base url
const youtubeBaseUrl = 'https://www.googleapis.com/youtube/v3/';
// youtube api 1
const userNameUrl = 'search?part=snippet&type=channel&maxResults=1&q=';
// youtube api 2
const channelUrl = 'channels?part=contentDetails&id=';
// youtube api 3
const videoListUrl = 'playlistItems?part=snippet&playlistId=';

// const arr = [];

const youtubeApi = search => {
    // console.log('search in GET', search);

    return new Promise((resolve, reject) => {
        fetch(`${youtubeBaseUrl}${userNameUrl}${search}&key=${youtubeKey}`)
            .then(response => response.json())
            .then(data => {
                const channelId = data.items[0].id.channelId;
                // console.log('channel id', channelId);
                return fetch(
                    `${youtubeBaseUrl}${channelUrl}${channelId}&key=${youtubeKey}`
                );
            })
            .then(response => response.json())
            .then(data => {
                const playListId =
                    data.items[0].contentDetails.relatedPlaylists.uploads;
                // console.log('this is playListId ', playListId);
                return fetch(
                    `${youtubeBaseUrl}${videoListUrl}${playListId}&key=${youtubeKey}`
                );
            })
            .then(response => response.json())
            .then(data => {
                const videoId = []; //array of videoId
                for (let i = 0; i < 4; i++) {
                    videoId.push(data.items[i].snippet.resourceId.videoId);
                }
                // console.log(videoId);
                resolve(videoId);
            })
            .catch(error => {
                console.log('youtube error ', error);
            });
    });

    // .then(videoId => {
    //     console.log('inside final then');
    //     arr.push(videoId);
    //     console.log(arr);
    //     return arr;
    // })
    //
    // twitter
    // .then(() => arr.push(handleTweets(search)))

    // .catch(error => {
    //     console.log('twitter error ', error);
    // });
};

module.exports = youtubeApi;
