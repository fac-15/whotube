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
    // console.log('indexjs-search',search);
    // console.log('inside router.get');
    // console.log("routesfile: ",req.body);
    helpers.apicall(search, (error, resultGetData) => {
        if (error) {
            console.log('error in getData: ', error);
        } else {
            console.log('ROUTES => apicall response: ', resultGetData());
            response.render('results', {
                youtubeTwitterArr: resultGetData()
            });
        }
    });
});
module.exports = router;
