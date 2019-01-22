const Twitter = require('twitter');
require('dotenv').config();

const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const handleTweets = search =>
    new Promise((resolve, reject) => {
        const tweetsArr = [];
        const tweetsTime = [];
        const finalTweetsArr = {};

        const params = { screen_name: search, count: 10 };
        client.get('statuses/user_timeline', params, (error, tweets) => {
            if (error) {
                console.log('tweet error', error);
            } else {
                tweets.forEach(item => tweetsArr.push(item.text));
                tweets.forEach(item => tweetsTime.push(item.created_at));
                // console.log(tweets);

                for (i = 0; i < tweetsTime.length; i++) {
                    finalTweetsArr[tweetsTime[i]] = tweetsArr[i];
                }

                // (finalTweetsArr = {}),
                //     (keys = ['one', 'two', 'three']),
                //     (values = ['a', 'b', 'c']);

                // for (i = 0; i < keys.length; i++) {
                //     r[keys[i]] = values[i];
                // }
                // console.log('tweetsArr:', tweetsArr);
                // return tweetsArr;
                console.log('THIS IS THE FINAL OBJ', finalTweetsArr);
                resolve(finalTweetsArr);
            }
        });
    });

module.exports = handleTweets;
