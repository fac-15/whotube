const Twitter = require('twitter');
require('dotenv').config();

const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

Array.prototype.insert = function(index, item) {
    this.splice(index, 0, item);
};

const cleanTimeFunc = timeArr => {
    timeArr.map(date => {
        const separateTime = date.split(' ');
        // console.log('this is separate time',  separateTime)
        const cleantime = separateTime.slice(0, 4);
        // console.log('this is new clean time: ', cleantime)

        var finalime = cleantime.insert(3, 'at');
        // console.log(finalTime)
        return 'this is new clean time: ', cleantime.join(' ');
    });
};

const handleTweets = search =>
    new Promise((resolve, reject) => {
        const tweetsText = [];
        const tweetsTime = [];
        const finalTweetsArr = {};

        const params = { screen_name: search, count: 10 };
        client.get('statuses/user_timeline', params, (error, tweets) => {
            if (error) {
                console.log('tweet error', error);
            } else {
                tweets.forEach(item => tweetsText.push(item.text));
                tweets.forEach(item => tweetsTime.push(item.created_at));
                // console.log(tweets);

                const cleanTime = cleanTimeFunc(tweetsTime);
                console.log('THIS IS A CLEAN TIME', cleanTime);

                for (i = 0; i < tweetsTime.length; i++) {
                    finalTweetsArr[tweetsTime[i]] = tweetsText[i];
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
