const express = require('express');
const server = express();
const topicsModel = require(__dirname + "/app/models/topics");
const topics = new topicsModel();
const PORT = 3001;

server.get('/', function(req, res){
    res.send('Hello World!');
});

server.get('/topics', function(req, res){
    res.send(topics.topicsList)
});
server.get('/addpost', function(req, res){
    console.log("inside addpost");
    let newPost = topics.addPost("Topic");
    res.send(newPost)
})

server.listen(PORT, function(){
    console.log("Reddit App is running on port " + PORT);
})
