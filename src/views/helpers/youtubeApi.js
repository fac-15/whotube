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

const getYoutubeChannel = search => {
    console.log('inside getYoutubeChannel:');
    return new Promise((resolve, reject) => {
        fetch(
            `${youtubeBaseUrl}${userNameUrl}${search}&key=${youtubeKey}`
        ).then(response => {
            console.log('inside getYoutubeChannel: Promise');
            resolve(response.json());
        });
        // .catch(reject('Whoops!'));
    });
};

const getYoutubePlaylist = channelData => {
    const channelId = channelData.items[0].id.channelId;
    console.log('inside getYoutubePlaylist:');
    return new Promise((resolve, reject) => {
        fetch(
            `${youtubeBaseUrl}${channelUrl}${channelId}&key=${youtubeKey}`
        ).then(response => resolve(response.json()));
        // .catch(reject('Whoops!'));
    });
};

const getYoutubeVideolist = playlistData => {
    const playListId =
        playlistData.items[0].contentDetails.relatedPlaylists.uploads;
    console.log('inside getYoutubeVideolist:');
    return new Promise((resolve, reject) => {
        fetch(
            `${youtubeBaseUrl}${videoListUrl}${playListId}&key=${youtubeKey}`
        ).then(response => resolve(response.json()));
        // .catch(reject('Whoops!'));
    });
};

const arrayId = videoData => {
    const videoId = []; //array of videoId
    console.log('inside arrayId:');
    return new Promise((resolve, reject) => {
        setTimeout(() => reject('Whoops!'), 1000);
        for (let i = 0; i < 4; i++) {
            videoId.push(videoData.items[i].snippet.resourceId.videoId);
            console.log('YoutubeApi-videoId:', videoId);
        }
        resolve(videoId);
    });
};

// const youtubeApi = search => {

//     // console.log('search in GET', search);

//     const getYoutubePlaylist =
//     return new Promise((resolve, reject) => {

//         .catch(error => {
//             console.log('youtube error ', error);
//         });
// });

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

module.exports = {
    channel: getYoutubeChannel,
    playlist: getYoutubePlaylist,
    videolist: getYoutubeVideolist,
    arrayOfVideos: arrayId
};
