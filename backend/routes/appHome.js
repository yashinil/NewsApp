var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

var guardianKey='1d34bae1-e778-41ee-8ca1-6dc3c5a0772c';
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