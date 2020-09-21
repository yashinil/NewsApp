var express = require('express');
var router = express.Router();
const googleTrends = require('google-trends-api');

router.get('/', function(req, res, next) {
    var given_key = req.query.key; 
    var d = new Date();
    d.setFullYear(2019, 06, 01);
    
    console.log("Fetching data for trending page...");
    googleTrends.interestOverTime({keyword: given_key, startTime: new Date(d)}, function(err, results){
        if (err) console.log('Error occured', err);
        else res.json(JSON.parse(results));
    });
});

module.exports = router;