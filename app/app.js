var express = require('express')
  , app = express()
  MongoClient = require('mongodb').MongoClient,
  assert = require('assert'),
  ObjectId = require('mongodb').ObjectId;

var port = 3000;
var mongouri = 'mongodb://mongo:27017/notes';
  
MongoClient.connect(mongouri, function(err, db){
  // Add headers
  app.use(function (req, res, next) {
  
      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
  
      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);
  
      // Pass to next layer of middleware
      next();
  });

  app.get('/notes', function (req, res){
    db.collection('notes').find({}).toArray(function(err, docs){
      
      if (err) return next(err); 

      res.send(docs);
    });
  });

  app.post('/delete/:id', function (req, res) {
    var id = req.params.id;
    db.collection('notes').remove({"_id": ObjectId(id)});
  });
});

app.listen(port, function() {
  console.log('Listening on port ' + port)
});
