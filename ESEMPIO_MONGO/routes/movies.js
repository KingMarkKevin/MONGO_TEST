var express = require('express');
var router = express.Router();

const MongoClient = require ('mongodb').MongoClient;

router.get('/list/:num', function(req, res, next) {
    console.log(req.params); 
    num = parseInt(req.params.num);
    const uri = 'mongodb+srv://kevin-king:0117kevin.@cluster0.zuvcs.mongodb.net/Cluster0?retryWrites=true&w=majority'
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        const collection = client.db("sample_mflix").collection("movies");
        collection.find().limit(num).toArray((err, result) => {
            if (err) console.log(err.message);
            else res.send(result);
            client.close();
        })
    })
});

router.get('/movie_from_title/:title', function(req, res, next) {
    console.log(req.params); 
    title = req.params.title;
    const uri = 'mongodb+srv://kevin-king:0117kevin.@cluster0.zuvcs.mongodb.net/Cluster0?retryWrites=true&w=majority'
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        const collection = client.db("sample_mflix").collection("movies");
        collection.find({'title' : `${title}`}).toArray((err, result) => {
            if (err) console.log(err.message);
            else res.send(result);
            client.close();
        })
    })
});

router.get('/movie_from_year/:year', function(req, res, next) {
    console.log(req.params); 
    year = parseInt(req.params.year);
    const uri = 'mongodb+srv://kevin-king:0117kevin.@cluster0.zuvcs.mongodb.net/Cluster0?retryWrites=true&w=majority'
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        const collection = client.db("sample_mflix").collection("movies");
        collection.find({'year' : year}).toArray((err, result) => {
            if (err) console.log(err.message);
            else res.send(result);
            client.close();
        })
    })
});

router.get('/movie_from_rating/:rating', function(req, res, next) {
    console.log(req.params); 
    rating = parseFloat(req.params.rating);
    const uri = 'mongodb+srv://kevin-king:0117kevin.@cluster0.zuvcs.mongodb.net/Cluster0?retryWrites=true&w=majority'
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        const collection = client.db("sample_mflix").collection("movies");
        collection.find({'imdb.rating' : rating}).toArray((err, result) => {
            if (err) console.log(err.message);
            else res.send(result);
            client.close();
        })
    })
});

module.exports = router;