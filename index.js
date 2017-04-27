const express = require('express');
const server = express();
const timelineClass = require(__dirname + "/app/models/timeline");
const timeline = new timelineClass();
const PORT = process.env.PORT || 3001;
let lastPostID = 0;

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

server.use(express.static('public'))

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

server.post('/addpost/:postData', function(req, res){
    let newPostData = req.params.postData;
    if ( 0 < newPostData.length < 256){    
        let newPost = timeline.addPost(newPostData, lastPostID);
        lastPostID++;
        res.send(newPost);
    }
    else{
        res.send(404);
    }
})

server.post('/post/:id/:vote', function(req, res){
    let id  = req.params.id;
    let voteType = req.params.vote;

    if (voteType == "upvote") {
        timeline.addUpvote(id);
        res.send(timeline.getScore(id).toString());
    }
    else if (voteType == "downvote") {
        timeline.addDownvote(id);
        res.send(timeline.getScore(id).toString());
    }
    else {
        res.status(404).send("Not Acceptable");
    }
});

server.get('/test-data', function(req, res){
    let numberOfPosts = Math.floor(50 * Math.random());
    console.log(numberOfPosts,'to be Generated')
    let totalPosts = numberOfPosts+lastPostID;
    for (var num = lastPostID; num < totalPosts; num++, lastPostID++) {
        
        let numberOfUpvotes = Math.floor(50 * Math.random());
        console.log("\n Post", num, "has", numberOfUpvotes, "upvotes.")
        let numberOfDownvotes = Math.floor(50 * Math.random());
        console.log("Post", num, "has", numberOfDownvotes, "downvotes.")

        timeline.addPost("Topic"+num, num);
        
        for (var index = 0; index < numberOfUpvotes; index++) {
            timeline.addUpvote(num);
        }
        
        for (var index = 0; index < numberOfDownvotes; index++) {
            timeline.addDownvote(num);
        }
                
    }
    res.send("Testing Data Created with " + num + " entries.");
})

server.listen(PORT, function(){
    console.log("Reddit App is running on port " + PORT);
})
