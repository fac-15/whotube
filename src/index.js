const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fetch = require("node-fetch");

require("dotenv").config();

const app = express();

app.use(morgan("tiny"));
app.use(cors());

// let cache;
//Original URL
// const url =
//   "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=UULNgu_OupwoeESgtab33CCw&maxResults=50";
const youtuber = "PewDiePie";
const userNameUrl =
  "https://www.googleapis.com/youtube/v3/channels?part=id%2Csnippet%2Cstatistics%2CcontentDetails%2CtopicDetails&forUsername=";
const channelUrl =
  "https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=";
// const getVideos = pageToken =>
//   fetch(`${url}&key=${process.env.GOOGLE_API_KEY}`).then(response =>
//     response.json()
//   );

// app.get("/videos", async (req, res) => {
//   if (cache) return res.json(cache);
//
//   let page = await getVideos();
//   let videos = page.items;
//
//   while (page.nextPageToken) {
//     page = await getVideos(page.nextPageToken);
//     videos = videos.concat(page.items);
//   }
//
//   cache = videos;
//   res.json(videos);
// });

//**************working first call
// app.get("/videos", (req, res) => {
//   fetch(`${userNameUrl}${youtuber}&key=${process.env.GOOGLE_API_KEY}`)
//     .then(x => x.json())
//     .then(json => {
//       const channelUrl = json.items[0].id;
//       res.json(json.items[0].id);
//     });
// });

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
    });
  // .catch(function(error) {
  //   console.log("request failed", error);
  // });
  result.then(function(data) {
    var playListId = data.items[0].contentDetails.relatedPlaylists.uploads;
    console.log(
      "this is playListId ",
      data.items[0].contentDetails.relatedPlaylists.uploads
    );
  });
});

// *******************promise attempt
// app.get("/videos", (req, res) => {
//   Promise.all([
//     fetch(`${userNameUrl}${youtuber}&key=${process.env.GOOGLE_API_KEY}`).then(
//       x => x.json()
//     ),
//     fetch(`${userNameUrl}${youtuber}&key=${process.env.GOOGLE_API_KEY}`).then(
//       x => x.json()
//     )
//   ])
//     .then(x => {
//       console.log(x);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

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
