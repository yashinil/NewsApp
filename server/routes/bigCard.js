var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

var guardianKey='###################################';
var nytimesKey='vaPsrdsEpKCk4Vvo6nwfMVLN6TkGlFZz';
router.get('/', function(req, res, next) {
  if(req.query.api=='true'){
    console.log("Guardian");
    console.log("bigcard data");
    const url='https://content.guardianapis.com/'+req.query.identification+'?api-key='+guardianKey+'&show-blocks=all';
    fetch(url)
    .then(res => res.json())
    .then(data => {
      res.send({data});
    })
    .catch(err => {
      res.redirect('/error'); 
    });
  }
  else{
    console.log("nytimes");
    const url='https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:("'+req.query.identification+'")&api-key='+nytimesKey;
    fetch(url)
    .then(res => res.json())
    .then(data => {
      res.send({data});
    })
    .catch(err => {
      res.redirect('/error');
    });
  }
});

module.exports = router;
