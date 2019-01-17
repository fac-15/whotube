const express = require('express');
const router = express.Router();
const helpers = require('../views/helpers/index.js');
// const reset = require('../database/build_test.js');

router.get('/', (req, response) => {
    console.log('inside router.get');
    helpers.getData((error, resultGetData) => {
        if (error) {
            console.log('error in getData: ', error);
        } else {
            // console.log('getData response: ', resultGetData());
            response.render('home', {
                youtubeTwitterArr: resultGetData()
            });
        }
    });
});

module.exports = router;
