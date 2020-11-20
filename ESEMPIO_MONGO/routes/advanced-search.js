var express = require('express');
var router = express.Router();
const path = require('path');

const MongoClient = require ('mongodb').MongoClient;

router.get('/actors/:actor',function(req, res, next) {
    console.log(req.params);
    actor = req.params.actor;
    const uri = 'mongodb+srv://kevin-king:0117kevin.@cluster0.zuvcs.mongodb.net/Cluster0?retryWrites=true&w=majority'
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect( err =>{
        const collection = client.db("sample_mflix").collection("movies");
        collection.find({'cast' :  `${actor}`}).toArray((err, result) => {
            if (err) 
            {
                console.log(err);
            }
            else
            {
                if (!(actor in collection)) res.sendFile(path.join(__dirname, 'errore.html')); 
                else 
                {               
                    res.send(result);
                }
                client.close();
            }
            
        })
    })
})

router.get('/length_year/:length/:year',function(req, res, next){
    console.log(req.params);
    length = parseInt(req.params.length);
    year = parseInt(req.params.year);
    const uri = 'mongodb+srv://kevin-king:0117kevin.@cluster0.zuvcs.mongodb.net/Cluster0?retryWrites=true&w=majority'
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        const collection = client.db("sample_mflix").collection("movies");
        collection.find({'length' : length}, {'year' : year}).toArray((err, result) => {
            if (err) console.log(err.message);
            else res.send(result);
            client.close();
        })
    })
})

module.exports = router;