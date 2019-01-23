const express = require('express');
const router = express.Router();
const helpers = require('../views/helpers/index.js');
// const reset = require('../database/build_test.js');

router.get('/', (req, response) => {
    // console.log('inside router.get');
    // console.log("routesfile: ",req.body);
    response.render('home');
});

router.post('/', (req, res) => {
    //'search' needs to match the 'name' attribute of the input tag in the form
    const search = req.body.search;
    // console.log('your search', search);
    res.redirect(`/results/${search}`);
});

router.get('/results/:search', (req, response) => {
    let search = req.url.split('/');
    search = search[search.length - 1];
    console.log('THIS IS THE SEARCH: ', search);
    console.log('inside router.get');

    const resultY = helpers.apiYoutube
        .channel(search)
        .then(data => helpers.apiYoutube.playlist(data))
        .then(data => helpers.apiYoutube.videolist(data))
        .then(data => helpers.apiYoutube.arrayOfVideos(data));
    console.log('youtube array: ', resultY);

    const resultT = helpers.apiTweets(search);
    console.log('THIS IS resultT: ', resultT);

    // make call to get array with 0 being videIDs and 1 being tweets
    Promise.all([resultY, resultT])
        .then(values => {
            console.log(values);
            response.render('results', {
                youtubeArr: values[0],
                twitterArr: values[1]
            });
        })
        .catch(() => {
            response.redirect(302, '/re-search');
        });
});

router.get('/re-search', (req, response) => {
    response.render('re-search');
});

router.post('/re-search', (req, res) => {
    //'search' needs to match the 'name' attribute of the input tag in the form
    const searchYoutube = req.body.searchYoutube;
    const searchTwitter = req.body.searchTwitter;
    res.redirect(`/results/${searchYoutube}/${searchTwitter}`);
});

router.get('/results/:searchYoutube/:searchTwitter', (req, response) => {
    let searchYoutube = req.url.split('/');
    searchYoutube = searchYoutube[searchYoutube.length - 2];
    searchYoutube = searchYoutube.replace('&', '+and+');

    console.log('get seperate result YT: ', searchYoutube);

    let searchTwitter = req.url.split('/');
    searchTwitter = searchTwitter[searchTwitter.length - 1];
    console.log('get seperate result TW: ', searchTwitter);

    const resultY = helpers.apiYoutube
        .channel(searchYoutube)
        .then(data => helpers.apiYoutube.playlist(data))
        .then(data => helpers.apiYoutube.videolist(data))
        .then(data => helpers.apiYoutube.arrayOfVideos(data));
    console.log('youtube array: ', resultY);

    const resultT = helpers.apiTweets(searchTwitter);

    // make call to get array with 0 being videIDs and 1 being tweets
    Promise.all([resultY, resultT])
        .then(values => {
            console.log(values);
            response.render('results', {
                youtubeArr: values[0],
                twitterArr: values[1]
            });
        })
        .catch(() => {
            response.redirect(302, '/');
        });
});

module.exports = router;
