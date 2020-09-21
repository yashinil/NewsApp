var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

var guardianKey='###################################';

router.get('/', function(req, res, next) {
  if(req.query.api=='true'){
    console.log("Guardian");
    console.log("world");
    const url='https://content.guardianapis.com/science?api-key='+guardianKey+'&show-blocks=all';
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
