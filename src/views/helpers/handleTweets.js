const Twitter = require('twitter');
require('dotenv').config();

const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

let search = 'metallica';
let tweetsArr = [];
let arr = [];

const handleTweets = search => {
    // username = 'heyMrBoi';
    const params = { screen_name: search, count: 2 };
    // const tweetsArr = [];

    client.get('statuses/user_timeline', params, (error, tweets) => {
        if (error) {
            console.log('tweet error', error);
        } else {
            tweets.forEach(item => tweetsArr.push(item.text));
            // console.log(tweetsArr);
            arr.push(tweetsArr);
            console.log('tweetsarr, in handlketweets ', tweetsArr);
            return arr;
        }
        // console.log(response.json()); // Raw response object.
        // res.send(response);
    });
};

module.exports = handleTweets;
