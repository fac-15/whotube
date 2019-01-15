const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fetch = require("node-fetch");

require("dotenv").config();

const app = express();

app.use(morgan("tiny"));
app.use(cors());

//hardcoded youtube username
const youtuber = "PewDiePie";
//API 1
const userNameUrl =
  "https://www.googleapis.com/youtube/v3/channels?part=id%2Csnippet%2Cstatistics%2CcontentDetails%2CtopicDetails&forUsername=";
//API 2
const channelUrl =
  "https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=";
//API 3
const videoListUrl =
  "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=";

app.get("/videos", (req, res) => {
  var result = fetch(
    `${userNameUrl}${youtuber}&key=${process.env.GOOGLE_API_KEY}`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var channelId = data.items[0].id;
      console.log("channel id", channelId);
      return fetch(
        `${channelUrl}${channelId}&key=${process.env.GOOGLE_API_KEY}`
      );
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var playListId = data.items[0].contentDetails.relatedPlaylists.uploads;
      console.log(
        "this is playListId ",
        data.items[0].contentDetails.relatedPlaylists.uploads
      );
      return fetch(
        `${videoListUrl}${playListId}&key=${process.env.GOOGLE_API_KEY}`
      );
    })
    .then(function(response) {
      // console.log(response.json());
      return response.json();
    })
    .then(function(data) {
      var videoId = []; //array of videoId
      for (var i = 0; i < 5; i++) {
        videoId.push(data.items[i].snippet.resourceId.videoId);
      }
      console.log(videoId);
    })
    .catch(function(error) {
      console.log("request failed", error);
    });
});

function notFound(req, res, next) {
  res.status(404);
  const error = new Error("Not Found");
  next(error);
}

function errorHandler(error, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: error.message
  });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Listening on port", port);
});
