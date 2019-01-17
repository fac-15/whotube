// eslint is expecting 'import' instead of 'require'
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fetch = require("node-fetch");
const path = require("path");
const bodyParser = require("body-parser");

const Twitter = require("twitter");
const handlebars = require("handlebars");

require("dotenv").config();

const app = express();

// body parse will parse the body
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("tiny"));
app.use(cors());

//***serving css and views folders contained in public***
app.use(
  express.static(path.join(__dirname, "..", "/public"), { maxAge: "30d" })
);
// ***** serving homepage index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/public/", "index.html"));
});

// ** YOUTUBE **

//hardcoded youtube username
const youtubeKey = process.env.GOOGLE_API_KEY;
// youtube base url
const youtubeBaseUrl = "https://www.googleapis.com/youtube/v3/";
// youtube api 1
const userNameUrl = "search?part=snippet&type=channel&maxResults=1&q=";
// youtube api 2
const channelUrl = "channels?part=contentDetails&id=";
// youtube api 3
const videoListUrl = "playlistItems?part=snippet&playlistId=";

let search;

// ** TWITTER **

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const handleTweets = username => {
  // let username = "heyMrBoi";

  let params = { screen_name: username, count: 2 };
  let tweetsArr = [];

  client.get("statuses/user_timeline", params, function(
    error,
    tweets,
    response
  ) {
    if (error) {
      console.log("tweet error", error);
    } else {
      console.log("TWEETS HERE ", tweets[0].text);
      // console.log("TWEETS HERE ", tweets);
    }

    // console.log(tweets); // The favorites.
    // console.log(response.json()); // Raw response object.
    // res.send(response);
  });
};

//this gets the input from the form
app.post("/", (req, res) => {
  // 'search' needs to match the 'name' attribute of the input tag in the form
  search = req.body.search;
  console.log("your search", search);
  res.redirect("/videos");
});

app.get("/videos", () => {
  // console.log(req.body.search);
  console.log("search in GET", search);

  fetch(`${youtubeBaseUrl}${userNameUrl}${search}&key=${youtubeKey}`)
    .then(response => response.json())
    .then(data => {
      const channelId = data.items[0].id.channelId;
      console.log("channel id", channelId);
      return fetch(
        `${youtubeBaseUrl}${channelUrl}${channelId}&key=${youtubeKey}`
      );
    })
    .then(response => response.json())
    .then(data => {
      const playListId = data.items[0].contentDetails.relatedPlaylists.uploads;
      console.log("this is playListId ", playListId);
      return fetch(
        `${youtubeBaseUrl}${videoListUrl}${playListId}&key=${youtubeKey}`
      );
    })
    .then(response => response.json())
    .then(data => {
      const videoId = []; //array of videoId
      for (let i = 0; i < 5; i++) {
        videoId.push(data.items[i].snippet.resourceId.videoId);
      }
      console.log(videoId);
    })
    .catch(error => {
      console.log("youtube error ", error);
    })
    .then(handleTweets(search))
    .catch(error => {
      console.log("twitter error ", error);
    });
});

const notFound = (req, res, next) => {
  res.status(404);
  const error = new Error("Not Found!!!");
  next(error);
};

// // ** TWITTER **

// var client = new Twitter({
//   consumer_key: process.env.TWITTER_CONSUMER_KEY,
//   consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
//   access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
//   access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
// });

// const handleTweets = username => {
//   // let username = "heyMrBoi";

//   let params = { screen_name: username, count: 2 };
//   let tweetsArr = [];

//   client.get("statuses/user_timeline", params, function(
//     error,
//     tweets,
//     response
//   ) {
//     if (error) {
//       console.log("tweet error", error);
//     } else {
//       console.log("TWEETS HERE ", tweets[0].text);
//       // console.log("TWEETS HERE ", tweets);
//     }

//     // console.log(tweets); // The favorites.
//     // console.log(response.json()); // Raw response object.
//     // res.send(response);
//   });
// };

// handleTweets("heyMrBoi");
// var stream = client.stream("statuses/filter", { track: "myfirstTweet" });
// stream.on("data", function(event) {
//   console.log(event && event.text);
// });

// stream.on("error", function(error) {
//   throw error;
// });

// // You can also get the stream in a callback if you prefer.
// client.stream("statuses/filter", { track: "javascript" }, function(stream) {
//   stream.on("data", function(event) {
//     console.log(event && event.text);
//   });

//   stream.on("error", function(error) {
//     throw error;
//   });
// });

// module.exports = router;

// end twitter

const errorHandler = (error, res) => {
  res.status(res.statusCode || 500);
  res.json({
    message: error.message
  });
};

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Listening on port", port);
});
