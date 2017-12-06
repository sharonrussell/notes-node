var express = require('express')
  , app = express()
  MongoClient = require('mongodb').MongoClient,
  assert = require('assert'),
  ObjectId = require('mongodb').ObjectId;
  var bodyParser = require('body-parser')

var port = 3000;
var mongouri = 'mongodb://mongo:27017/notes';
app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});  

MongoClient.connect(mongouri, function(err, db){

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

  app.post('/add', function(req, res, next) {
    var body = req.body.body;
    if (body.length == 0) {
        res.render('error', {error:'Please give a body'});
    } else {
        db.collection('notes').insertOne({"body" : body});
        res.end();
    }
  });
});

app.listen(port, function() {
  console.log('Listening on port ' + port)
});
