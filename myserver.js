var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var less = require('less');
var lessMiddleware = require('less-middleware');

var app = express();
var todo = [];

todo.push({ id:0, title:"hond uitlaten", description:"wel laten poepen"});

app.use(lessMiddleware(__dirname + '/app'));
app.use(express.static(__dirname + "/app"));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


app.get("/todos", function(req, res){
  res.setHeader("content-type", "application/json");
  res.end(JSON.stringify(todo));
});

app.post("/todos", function(req, res){
  var newtodo = {};
  newtodo.title = req.body.title;
  newtodo.description = req.body.description;
  todo.push(newtodo);
  
  res.end("todo added");
  });

app.listen(1337);

console.log('Server running at http://127.0.0.1:1337/');