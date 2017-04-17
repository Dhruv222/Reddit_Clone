const express = require('express');
const server = express();
const timelineClass = require(__dirname + "/app/models/timeline");
const timeline = new timelineClass();
const PORT = 3001;
let lastPostID = 0;

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

server.get('/timeline', function(req, res){
    res.send(timeline.postList);
});

server.get('/timeline/:num', function(req, res) {
    if (isNumeric(req.params.num)){
        let num = req.params.num;
        res.send(timeline.getTopPosts(num));
    }
    else{
        res.status(404).end("Not Acceptable");
    }
});

server.get('/post/:id', function(req, res){
    let id = req.params.id;
    res.send(timeline.getScore(id));
});

server.post('/addpost', function(req, res){
    let newPost = timeline.addPost("Topic", lastPostID);
    lastPostID++;
    res.send(newPost);
})

server.post('/post/:id/:vote', function(req, res){
    let id  = req.params.id;
    let voteType = req.params.vote;

    if (voteType == "upvote") {
        timeline.addUpvote(id);
        res.send(id+":"+voteType);
    }
    else if (voteType == "downvote") {
        timeline.addDownvote(id);
        res.send(id+":"+voteType);
    }
    else {
        res.status(404).send("Not Acceptable");
    }
});

server.listen(PORT, function(){
    console.log("Reddit App is running on port " + PORT);
})
