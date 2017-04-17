const post = require(__dirname + "/post.js");

class topics {
    constructor(){
        console.log("Inside topics");
        this.topicsList = [];
    }
    getTopPosts(numberOfPosts){
        //TODO:
    }
    addPost(postName){
        let newPost = new post(postName);
        this.topicsList.push(newPost);
        return newPost;
    }
    addUpvote(index){
        return topicsList[index].addUpvote();
    }
    addDownvote(index){
        return topicsList[index].addDownvote();
    }
}

module.exports = topics;