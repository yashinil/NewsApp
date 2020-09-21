var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

var guardianKey='1d34bae1-e778-41ee-8ca1-6dc3c5a0772c';
var nytimesKey='vaPsrdsEpKCk4Vvo6nwfMVLN6TkGlFZz';
router.get('/', function(req, res, next) {
  if(req.query.api=='true'){
    console.log("Guardian");
    console.log("sports");
    const url='https://content.guardianapis.com/sport?api-key='+guardianKey+'&show-blocks=all';
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
    const url='https://api.nytimes.com/svc/topstories/v2/sports.json?api-key='+nytimesKey;
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