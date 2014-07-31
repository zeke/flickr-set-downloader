"use strict";

require("dotenv").load()

var fs = require("fs")
var superagent = require("superagent")
var flickr = require("flickr-client")({key: process.env.FLICKR_KEY})
flickr.info = require("flickr-photo-info")(flickr)
flickr.urls = require("flickr-generate-urls")

flickr("photosets.getPhotos", {photoset_id: "72157610714160553"}, function (err, response) {
  if (err) throw err;
  response.photoset.photo.slice(0,100000).forEach(function(photo) {
    flickr.info(photo.id, function(err, i) {
      if (err) throw err;
      var url = i.urls.original
      console.log(url)
      var filename = url.substring(url.lastIndexOf('/')+1)
      superagent
        .get(url)
        .pipe(fs.createWriteStream(__dirname + "/downloads/" + filename))
    })
  })
})
