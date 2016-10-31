'use strict';
/* jshint esversion: 6 */
/* jshint devel: true */
/* jshint node: true */

var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var ejs = require('ejs');
const PORT = 3001;

const puppiesRoute = require('./routes/puppies');
const indexRoute = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', [path.join(__dirname, 'views/puppies/'),
                  path.join(__dirname, 'views/site/')]);

app.use(express.static(__dirname + '/public'));
app.use('/puppies', puppiesRoute.router);
app.use('/', indexRoute.router);

// =============================================================================
// fire up the server
app.listen(PORT, function() {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = {
  app: app
};
