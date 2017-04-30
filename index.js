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


//Sends all the posts in the chronological order

server.get('/timeline', function(req, res){
    res.send(timeline.postList);
});


//sends the top posts besed on the number being sent
// Currently that number is 20

server.get('/timeline/:num', function(req, res) {
    if (isNumeric(req.params.num) && req.params.num < timeline.postList.length){
        let num = req.params.num;
        res.send(timeline.getTopPosts(num));
    }
    else{
        res.status(404).end("Not Acceptable");
    }
});


// Gets the score for the id

server.get('/post/:id', function(req, res){
    let id = req.params.id;
    if (isNumeric(id) && id < timeline.postList.length){
        res.status(200).send(timeline.getScore(id));
    }
    else {
        res.status(406).send("id parameter is either not a number or there exists no post of that id.")
    }
    
});


// Creates the new post with sent data

server.post('/addpost/:postData', function(req, res){
    let newPostData = req.params.postData;
    if ( 0 < newPostData.length < 256){    
        let newPost = timeline.addPost(newPostData, lastPostID);
        lastPostID++;
        res.status(200).send(newPost);
    }
    else{
        res.status(406).send("The post length should be less than 256 characters.");
    }
})



// Posts the upvotes and downvotes for a particular post id

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
        res.status(406).send("Not Acceptable");
    }
});


// Creates test data for visualisation for the website
// By generating random values for upvotes and downvotes

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
