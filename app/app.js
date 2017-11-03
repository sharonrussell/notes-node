var express = require('express')
  , app = express()
  MongoClient = require('mongodb').MongoClient,
  assert = require('assert'),
  ObjectId = require('mongodb').ObjectId;

var port = 3000;
var mongouri = 'mongodb://mongo:27017/notes';
  
MongoClient.connect(mongouri, function(err, db){
  app.get('/notes', function (req, res){
    db.collection('notes').find({}).toArray(function(err, docs){
      
      if (err) return next(err); 

      res.header("Access-Control-Allow-Origin", "*");
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
