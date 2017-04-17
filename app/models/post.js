class post {
    constructor(name) {
        console.log("New Post:", name);
        this.topic = name;
        this.upvotes = 0;
        this.downvotes = 0;
    }

    addUpvote(){
        this.upvotes += 1;
        return this.upvotes;
    }
    addDownvote(){
        this.downvotes += 1;
        return this.downvotes;
    }
    score(){
        return this.upvotes - this.downvotes;
    }
}

module.exports = post;