const post = require(__dirname + "/post.js");

function compare(postA, postB){
    if (postA.score() < postB.score())
        return 1;
    else if (postA.score() > postB.score())
        return -1;
    else
        return 0;
}

class timeline {
    constructor(){
        this.postList = [];
    }
    getTopPosts(numberOfPosts){
        let tempArray = this.postList.slice();
        tempArray.sort(compare);
        return tempArray.slice(0,numberOfPosts);
    }
    addPost(postName, id){
        let newPost = new post(postName, id);
        this.postList.push(newPost);
        return newPost;
    }
    addUpvote(index){
        return this.postList[index].addUpvote();
    }
    addDownvote(index){
        return this.postList[index].addDownvote();
    }
    getScore(index){
        return this.postList[index].score();
    }
}

module.exports = timeline;