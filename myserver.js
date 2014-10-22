var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var less = require('less');
var lessMiddleware = require('less-middleware');
var mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost/todos');

var todoSchema = mongoose.Schema({
    title:String,
    description:String
})
var todoClass = mongoose.model('Todo', todoSchema);

var app = express();
app.use(lessMiddleware(__dirname + '/app'));
app.use(express.static(__dirname + "/app"));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.delete("/todos", function(req, res){
  todoClass.findOneAndRemove({ title:req.query.title}, function (){
    res.end("todo deleted");
    });
});

app.get("/todos", function(req, res){
  res.setHeader("content-type", "application/json");
  todoClass.find({}, function(err, data){
      res.end(JSON.stringify(data));
    });
});

app.post("/todos", function(req, res){
  var newtodo = new todoClass({ title:req.body.title, description:req.body.description});
  newtodo.save(function(){
  res.end("todo added");
  });
});

app.listen(1337);

console.log('Server running at http://127.0.0.1:1337/');