const createHref = tweet => {
    for (j = 0; j < tweet.length; j++) {
        var splitTweet = tweet[j].split(' ');
        // console.log(splitTweet)

        for (var i = 0; i < splitTweet.length; i++) {
            if (splitTweet[i].includes('http')) {
                var index = i;
                var href =
                    '<a src=' +
                    splitTweet[index] +
                    '>' +
                    splitTweet[index] +
                    '</a> ';
                splitTweet[index] = href;
            }

            tweet[j] = splitTweet;
        }
        console.log(index);

        // console.log(href)

        // console.log(splitTweet)

        tweet[j] = splitTweet;
    }
    // console.log(tweet)

    var joined = tweet.map(e => e.join(' '));

    return joined;
};

module.exports = createHref;
