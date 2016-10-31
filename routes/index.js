'use strict';
/* jshint esversion: 6 */
/* jshint devel: true */
/* jshint node: true */

var fs = require('fs');
var puppies = require('../models/puppy.js').puppies;
var puppyPath = require('../models/puppy.js').puppyPath;
var puppiesJSON = require('../models/puppy.js').puppiesJSON;

var express = require('express');
var router = express.Router();

// =============================================================================
// routes

// show all puppies
router.get('/', function(req, res) {
  fs.readFile(puppyPath, 'utf8', function(err, puppiesJSON) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    puppies = JSON.parse(puppiesJSON);
    res.render('show-all', {dogs: puppies});
  });
});

// show home page
router.get('/site/index', function(req, res) {
  res.render('index');
});

// show about page
router.get('/site/about', function(req, res) {
  res.render('about');
});

// show contact page
router.get('/site/contact', function(req, res) {
  res.render('contact');
});

module.exports = {
  router: router
};
