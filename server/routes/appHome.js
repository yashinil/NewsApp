var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

var guardianKey='####################################';
router.get('/', function(req, res, next) {
    console.log("Fetching data for home page...");
    const url="https://content.guardianapis.com/search?order-by=newest&show-fields=starRating,headline,thumbnail,short-url&api-key="+guardianKey;
    fetch(url)
    .then(res => res.json())
    .then(data => {
      res.send({data});
    })
    .catch(err => {
      res.redirect('/error'); 
    });
});

module.exports = router;
