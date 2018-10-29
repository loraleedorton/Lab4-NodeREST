var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');

router.get('/', function(req, res, next) {
  res.sendFile('weather.html', { root: 'public' });
});

router.get('/getcity', function(req, res, next) {
  console.log("Get city: ");
  fs.readFile(__dirname + '/cities.dat.txt', function(err, data) {
    if (err) throw err;
    var cities = data.toString().split("\n");
    var jsonresult = [];
    for (var i = 0; i < cities.length; i++) {
      var myRe = new RegExp("^" + req.query.q);
      var result = cities[i].search(myRe);
      if (result != -1) {
        jsonresult.push({ city: cities[i] });
      }
    }
    res.status(200).json(jsonresult);
  });
});

router.get('/owl', function(req, res, next) {
  var url = "https://owlbot.info/api/v1/dictionary/";
  console.log("query ", req.query);
  url += req.query['q'];
  url += "?format=json";
  request(url).pipe(res);
});

module.exports = router;
