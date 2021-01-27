var express = require('express');
var router = express.Router();
const MongoClient = require ('mongodb').MongoClient;
const uri = 'mongodb+srv://kevin-king:?.@cluster0.zuvcs.mongodb.net/Cluster0?retryWrites=true&w=majority'

router.get('/actors/:actor',function(req, res, next) {
    console.log(req.params);
    actor = req.params.actor;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(getMovieActor) 

    function callBackQuery(err, result) {
        if (err) console.log(err)
        else res.send(result);
        client.close();
    }

    function getMovieActor(err) {
        const collection = client.db("sample_mflix").collection("movies");
        collection.find({'cast' :  {$in: [`${actor}`]}}).toArray(callBackArray)
    }    
})

router.get('/length_year/:length/:year',function(req, res, next) {
    console.log(req.params);
    length = parseInt(req.params.length);
    year = parseInt(req.params.year);
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(getMovieLengthYear);

    function callBackArray (err, result) {
        if (err) console.log(err)
        else res.send(result)
        client.close()
    }

    function getMovieLengthYear (err) {
        const collection = client.db("sample_mflix").collection("movies")
        collection.find({'runtime' : length},{'year' : year}).toArray(callBackArray);
    }
})

module.exports = router;
