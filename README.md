[![Build Status](https://travis-ci.org/susanx/whotube.svg?branch=master)](https://travis-ci.org/susanx/whotube)
[![Build Status](https://travis-ci.org/susanx/whotube.svg?branch=master)](https://travis-ci.org/susanx/whotube)
[![Coverage Status](https://coveralls.io/repos/github/susanx/whotube/badge.svg?branch=master)](https://coveralls.io/github/susanx/whotube?branch=master)
[![Code Climate](https://codeclimate.com/github/codeclimate/codeclimate/badges/gpa.svg)](https://codeclimate.com/github/susanx/whotube)

![](https://i.imgur.com/ryta2Ep.png)
# WhoTube? 

A web app for those who want to keep their favourite youtubers latest videos and tweets in one page, always under control!

## User instructions :books:

Geeky version:

* ```clone``` the repo
* ```npm i``` 
* ask us for the keys!:key:
* ```npm run dev```
* go to your on ```http://localhost:5000/```

or more simply, &nbsp;
- navigate to https://whotube.herokuapp.com


## Logo ideas:
Whooootube! The owl idea came out quite randomly, but we liked how it sounds.
![](https://cdn.dribbble.com/users/20931/screenshots/2518827/trivify_g1_dribbble.gif)

## User stories :eyeglasses:

1. As a user, I want to be able to enter a youtuber's username and see their most recent videos.
2. As a user, I want to be able to see their twitter too.
3. As a user, I want to see the text and the video large enough to be read and watched.
4. As a user, I want to create a list of my favourite youtubers and sort them as I want.
5. As a user, I want to be able to remove a single video or tweet if I want to.
6. As a user, I want to show only certain types of social media, either videos or tweets.
7. As a user, I want to see the date and time of the video and the tweet.
8. As a user, I want to see some separation between one video/tweet and the next.
9. As a authenticated user, I want to see my saved profiles when I log into the app.

## YouTube API

* We overcame quite complicated documentation to successfully retrieve the data we wanted.
* Through a nested list of 3 API calls we can:
    1) retrive the Channel ID for a selected youtuber,
    2) then look for the playlist,
    3) finally the latest videos.
* We worked in order to make sure the search function would be able to interpret the user input in most cases. 
Should the word that the user input lead to partial or any result at all (e.g. youtube and twitter accounts have different names), the user will have che chance to manually add youtube and twitter user names in two dedicated searchboxes.

## Twitter API

* Starting from the same inpout search, unless the youtuber had a different name for their twitter account (see above), the latest 10 tweets will be displayed alongside the latest videos.
* We added date and time to the tweets oin order to

## Stretch Goals
We had many stretch goals, we wish we had more time to dedicate to each one of them. We had to scale down our scope to be able to guarantee a good Minimum Viable Product, but we plan on going back to the stretch goals to improve WhoTube.
The most exciting ones are the following (ticked ones are already in place):

- [ ] Login feature to let authenticated users save their favourite searches and retrieve their data whenever they log in.
- [ ] Autocomplete function to populate suggested matches during typing in the searchbox.
- [ ] Store user's favourites in database (for authenticated users)
- [ ] Delete specific entry (video or tweet) from user's personal flowchart 
- [ ] Make the tweets section more interactive, so the user could reply to tweets or open up a specific discussion to read other users' replies to it.
- [ ] Button to refresh the page.
- [ ] Button to add to add page favourites.
- [x] Button to redirect back HOME.
- [ ] Button to toggle light/dark theme.
- [ ] Button to sort saved youtubers alphabetically (for authenticated users)
- [x] Allow fullscreen for youtube videos on WhoTube.
- [ ] Use the animated owl gif above while the page is loading up the results of the search.
