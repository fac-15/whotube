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
    console.log('inside router.get');

    const resultY = helpers.apicall(search);
    const resultT = helpers.apitweets(search);
    // make call to get array with 0 being videIDs and 1 being tweets
    Promise.all([resultY, resultT])
    .then(values => 
        response.render('results', 
            {
                youtubeArr: values[0],
                twitterArr: values[1]
            }
        )
    )
});

module.exports = router;
