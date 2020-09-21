var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

var guardianKey='###################################';
var nytimesKey='###################################';
router.get('/', function(req, res, next) {
  if(req.query.api=='true'){
    console.log("Guardian");
    console.log("home");
    const url='https://content.guardianapis.com/search?api-key='+guardianKey+'&section=(sport|business|technology|politics)&show-blocks=all';
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
    const url='https://api.nytimes.com/svc/topstories/v2/home.json?api-key='+nytimesKey;
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
