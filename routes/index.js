'use strict';
/* jshint esversion: 6 */
/* jshint devel: true */
/* jshint node: true */

var fs = require('fs');
var puppies = require('../models/puppy.js');
var puppyPath = require('../models/puppy.js');
var puppiesJSON = require('../models/puppy.js');

var express = require('express');
var app = require('../app.js');


// =============================================================================
// routes

// show all puppies
app.get('/', function(req, res) {
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
app.get('/site/index', function(req, res) {
  res.render('index');
});

// show about page
app.get('/site/about', function(req, res) {
  res.render('about');
});

// show contact page
app.get('/site/contact', function(req, res) {
  res.render('contact');
});
