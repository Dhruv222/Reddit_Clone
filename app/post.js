class post {
    constructor(topic) {
        this.topic = topic;
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