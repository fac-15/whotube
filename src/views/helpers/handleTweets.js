const Twitter = require('twitter');
require('dotenv').config();

const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

// ***TO BE PROPERLY REFERENCED AND USED - SO FAR USELESS HERE***
const cleanTimeFunc = timeArr => {
    var arr = [];
    timeArr.map(date => {
        const separateTime = date.split(' ');
        // console.log('this is separate time', separateTime);
        const cleantime = separateTime.slice(0, 4);
        // console.log('this is new clean time: ', cleantime);
        cleantime.splice(3, 0, 'at');

        var finalTime = cleantime.join(' '); //.insert(3, 'at');
        // console.log('this is final time: ', finalTime);
        // return 'this is final time: ', finalTime;
        arr.push(finalTime);
    });
    return arr;
};

const handleTweets = search => {
    return new Promise((resolve, reject) => {
        const tweetsText = [];
        const tweetsTime = [];
        const finalTweetsArr = {};
        let cleanedTime = [];

        const params = { screen_name: search, count: 10 };
        client.get('statuses/user_timeline', params, (error, tweets) => {
            if (error) {
                console.log('tweet error', error);
                reject(error);
            } else {
                tweets.forEach(item => tweetsText.push(item.text));
                tweets.forEach(item => tweetsTime.push(item.created_at));
                console.log('THIS IS CLEANED TWEET ARR: ', tweetsTime);

                cleanedTime = [...cleanTimeFunc(tweetsTime)];
                console.log('THIS IS CLEANED TWEET ARR: ', cleanedTime);

                for (i = 0; i < tweetsTime.length; i++) {
                    finalTweetsArr[cleanedTime[i]] = tweetsText[i];
                }

                // (finalTweetsArr = {}),
                //     (keys = ['one', 'two', 'three']),
                //     (values = ['a', 'b', 'c']);

                // for (i = 0; i < keys.length; i++) {
                //     r[keys[i]] = values[i];
                // }
                console.log(
                    'THIS IS THE OBJECT: ',
                    'tweetsArr:',
                    finalTweetsArr
                );
                // return tweetsArr;
                resolve(finalTweetsArr);
            }
        });
    });
};

module.exports = handleTweets;
