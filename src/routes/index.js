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

    // const obj = {
    //     xx: helpers.apicall(search),
    //     yy: helpers.apitweets(search)
    // };

    // console.log('THIS IS OBJ.XX ', obj.xx);

    const resultY = helpers.apicall(search);
    const resultT = helpers.apitweets(search);

    // xx.then(yarray, tarray => {
    // console.log('THIS IS RESULT ', result);
    response.render('results', {
        youtubeArr: resultY.then(data => data)
        // twitterArr: resultT.then(data => data)
    });
});

// const yy = helpers.apitweets(search);
// yy.then(array => {
//     console.log(array);
//     response.render('results', {
//         twitterArr: array
//     });
// });

// if (error) {
//     console.log('error in getData: ', error);
// } else {
//     console.log('ROUTES => apicall response: ', response);

module.exports = router;
