var express = require('express');
var request = require('request');
var qs = require('querystring');
var router = express.Router();

var url = 'https://yboss.yahooapis.com/ysearch/web';

var oauth = {
  consumer_key: 'dj0yJmk9cWo5UlppYkFJTUxFJmQ9WVdrOVQzTkZWbVozTjJjbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0wMQ--',
  consumer_secret: 'e331e39b2ab0af1a0b709ab5cb98d97b6c0a652f'
};

/* GET home page. */
router.get('/', function(req, res) {
  var query = req.param('search', '');
  var page = parseInt(req.param('page', 1));
  var per_page = 10;
  console.log(query);
  var params = qs.stringify({
    q: query,
    format: 'json',
    count: '' + per_page,
    start: (page * per_page) 
  });
  var results = [];
    request.get({ url: url + '?' + params, oauth: oauth, json: true }, function(e, r, body) {
      if (body.bossresponse.web) {
        results = body.bossresponse.web.results;
      }
      // console.log(results);
      res.render('index', { title: 'Search', page: page ,search: query, results: results});
    });
});

module.exports = router;
