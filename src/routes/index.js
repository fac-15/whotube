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
    //     // 'search' needs to match the 'name' attribute of the input tag in the form
    const search = req.body.search;
    // console.log('your search', search);
    res.redirect(`/results/${search}`);
});

router.get('/results/:search', (req, response) => {
    let search = req.url.split('/');
    search = search[search.length - 1];
    console.log('inside router.get');

    const result = helpers.apicall.channel(search);
    result.then(data =>
        helpers.apicall.playlist(data)
    )
        .then(data =>
            helpers.apicall.videolist(data)
        )
        .then(data =>
            helpers.apicall.arrayOfVideos(data)
        )
        .then(data => {
            response.render('results', {
                youtubeArr: data
            })
        })
    // result.then(array => {
    //     response.render('results', {
    //         youtubeTwitterArr: array
    //     });
    // });

    // if (error) {
    //     console.log('error in getData: ', error);
    // } else {
    //     console.log('ROUTES => apicall response: ', response);
});
module.exports = router;
