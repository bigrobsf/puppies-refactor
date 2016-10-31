'use strict';
/* jshint esversion: 6 */
/* jshint devel: true */
/* jshint node: true */

var fs = require('fs');
var path = require('path');
var puppyPath = path.join(__dirname, '../puppies.json');

var puppies = [];
var puppiesJSON;

// check for existence of JSON file and create if none
fs.readFile(puppyPath, 'utf8', function(err, puppiesJSON) {
  if (err) {
    // initial population if no JSON file
    puppies.push({name: 'April', age: 2, id: 1, url: 'https://c1.staticflickr.com/9/8529/8580614921_e0d80a8807.jpg'});
    puppies.push({name: 'Dempsey', age: 1, id: 2, url: 'https://c2.staticflickr.com/4/3717/19491512433_2368107690.jpg'});
    puppies.push({name: 'Peanuts', age: 4, id: 3, url: 'https://c1.staticflickr.com/9/8142/7321196070_1be3eb3e01.jpg'});

    puppiesJSON = JSON.stringify(puppies);

    fs.writeFile(puppyPath, puppiesJSON);
  }
  puppies = JSON.parse(puppiesJSON);
  console.log('puppy.js: puppiesArray:', puppies);

});

// =============================================================================
// Puppy class definition
var Puppy = function(name, age, url, id) {
  this.name = name || 'Spot';
  this.age = age || 1;
  // default image if no image URL is provided
  this.url = url || 'http://www.stuffedwithplushtoys.com/assets/full/tf-bullit.jpg';
  this.id = null;
};

// determines the next ID
Puppy.prototype.createID = function() {
  var largestID = 0;
  for (let i = 0; i < puppies.length; i++) {
    if (puppies[i].id > largestID) {
      largestID = puppies[i].id;
    }
  }

  this.id = largestID + 1;
};

module.exports = {
  puppies: puppies,
  puppyPath: puppyPath,
  puppiesJSON: puppiesJSON,
  Puppy: Puppy
};
