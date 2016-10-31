'use strict';
/* jshint esversion: 6 */
/* jshint devel: true */
/* jshint node: true */

var fs = require('fs');
var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

var puppies = require('../models/puppy.js').puppies;
var puppyPath = require('../models/puppy.js').puppyPath;
var puppiesJSON = require('../models/puppy.js').puppiesJSON;
var Puppy = require('../models/puppy.js').Puppy;

// show input form for all puppies
router.get('/new', function(req, res) {
  res.render('new');
});

// save new puppy to array / JSON file and display confirmation page
router.post('/', function(req, res) {
  var name = req.body.name;
  var age = Number(req.body.age);
  var url = req.body.imageurl;
  var newPuppy = new Puppy(name, age, url);

  newPuppy.createID();
  var id = newPuppy.id;

  puppies.push(newPuppy);
  puppiesJSON = JSON.stringify(puppies);

  fs.writeFile(puppyPath, puppiesJSON, function(writeErr) {
    if (writeErr) {
      console.error(writeErr.stack);
      return res.sendStatus(500);
    }

  res.render('added', {id: id, name: name, age: age, url: newPuppy.url});
  });
});

// show instructions for what to type into URL bar to show a single puppy :-(
router.get('/show-one', function(req, res) {
  res.render('show-one');
});

// show single puppy by id
router.get('/:id', function(req, res) {
  var id = Number(req.params.id);
  var pup;

  fs.readFile(puppyPath, 'utf8', function(err, puppiesJSON) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    puppies = JSON.parse(puppiesJSON);

    for (var i = 0; i < puppies.length; i++) {
      if (puppies[i].id === id) {
        pup = puppies[i];
      }
    }

    if (pup) {
      res.render('show', {puppy: pup});
    } else {
      res.render('_error');
    }
  });
});

module.exports = {
  router: router
};
