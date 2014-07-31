"use strict";

require("dotenv").load()

var flickr = require("flickr-client")({key: process.env.FLICKR_KEY})
flickr.info = require("flickr-photo-info")(flickr)
flickr.urls = require("flickr-generate-urls")

flickr("photosets.getPhotos", {photoset_id: "72157610714160553"}, function (err, response) {
  if (err) throw err;

  response.photoset.photo.slice(0,100000).forEach(function(photo) {
    // photo.format = "jpg"
    // photo.urls = urls(photo)
    flickr.info(photo.id, function(err, i) {
      if (err) throw err;
      console.log(i.urls.original);
    })
    // console.log(photo)
  })

})
