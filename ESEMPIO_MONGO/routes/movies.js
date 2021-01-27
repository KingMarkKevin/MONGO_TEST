var express = require('express');
var router = express.Router();
const MongoClient = require ('mongodb').MongoClient;
const uri = 'mongodb+srv://kevin-king:?.@cluster0.zuvcs.mongodb.net/Cluster0?retryWrites=true&w=majority'

router.get('/list/:num', function(req, res, next) {
    console.log(req.params); 
    num = parseInt(req.params.num);
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(getListNum);

    function callBackQuery(err, result) {
        if (err) console.log(err)
        else res.send(result);
        client.close();
    }

    function getListNum(err) {
        if (err) console.log("Connessione al db non riuscita")
        else {
            const collection = client.db("sample_mflix").collection("movies");
            collection.find().limit(num).toArray(callBackQuery);
        }
    }
});

router.get('/movie_from_title/:title', function(req, res, next) {
    console.log(req.params); 
    title = req.params.title;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(getMovieTitle);

    function callBackQuery (err, result) {
        if (err) console.log(err);
        else res.send(result);
        client.close(); 
    }

    function getMovieTitle (err) {
        if (err) console.log("Connessione al db non riuscita")
        else {
            const collection = client.db("sample_mflix").collection("movies");
            collection.find({'title' : `${title}`}).toArray(callBackArray);
        }
    }
});

router.get('/movie_from_year/:year', function(req, res, next) {
    console.log(req.params); 
    year = parseInt(req.params.year);
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(getMovieYear)

    function callBackArray (err, result) {
        if (err) console.log(err);
        else res.send(result);
        client.close();
    }

    function getMovieYear (err) {
        if (err) console.log(err)
        else{
            const collection = client.db("sample_mflix").collection("movies");
            collection.find({'year' : year}).toArray(callBackArray);
        }
    }
});

router.get('/movie_from_rating/:rating', function(req, res, next) {
    console.log(req.params); 
    rating = parseFloat(req.params.rating);
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err)

    function callBackArray (err, result) {
        if (err) console.log(err);
        else res.send(result);
        client.close();
    }

    function getMovieRating (err) {
        if (err) console.log("Connessione al db non riuscita")
        else {
            const collection = client.db("sample_mflix").collection("movies");
            collection.find({'imdb.rating' : rating}).toArray(callBackArray)  
        }
    }    
});

module.exports = router;
