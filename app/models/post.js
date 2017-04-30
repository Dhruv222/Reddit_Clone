//Class for an individual post

class post {
    constructor(name, id) {
        this.id = id;
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