const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fetch = require("node-fetch");
const path = require("path");
const bodyParser = require("body-parser");

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
// youtube api 1
const userNameUrl =
  "https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&maxResults=1&q=";
// youtube api 2
const channelUrl =
  "https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=";
// youtube api 3
const videoListUrl =
  "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=";

let search;

//this gets the input from the form
app.post("/", (req, res) => {
  // 'search' needs to match the 'name' attribute of the input tag in the form
  search = req.body.search;
  console.log("your search", search);
  res.redirect("/videos");
});

app.get("/videos", (req, res) => {
  // console.log(req.body.search);
  console.log("search in GET", search);

  var result = fetch(`${userNameUrl}${search}&key=${youtubeKey}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var channelId = data.items[0].id.channelId;
      console.log("channel id", channelId);
      return fetch(`${channelUrl}${channelId}&key=${youtubeKey}`);
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
      return fetch(`${videoListUrl}${playListId}&key=${youtubeKey}`);
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

// ** TWITTER **

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
