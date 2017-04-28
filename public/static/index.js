const topPostsDOM = $("#top-posts");
const timelineDOM = $("#timeline");

function ajaxVoting(postID, type) {
    $.ajax({type:"POST",
            url: `post/${postID}/${type}`,
            success: function(results){          
                let scoreElement = $("a[postID='"+postID+"']");
                scoreElement.html(results);
            }
    });
}

function addPost() {
    let postData = $("[name=newPostData]").val();
    console.log($("[name=newPostData"));
    console.log(postData);
    $.ajax({
        type: "POST",
        url: `addpost/${postData}`,
        success: function(result) {
            return true;
        }
    });
}

function postHtml(post, listDOM) {
    let postString = `
    <li class="row">
        <div class="col-md-6 post">
            ${post.topic}
        </div>
        <div class="col-md-6 pull-right scoring">
           <button type="button" postID=${post.id} class="btn btn-primary pull-right" onClick="onDownvote(this);"><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></button>
           <a href="" postID=${post.id} class= "pull-right">${post.upvotes - post.downvotes}</a>
           <button type="button" postID=${post.id} class="btn btn-primary pull-right" onClick="onUpvote(this);"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
       </div>
    </li>
    `;
    if (listDOM.append(postString)) {
        return true;
    }
    else {
        console.log("getting post failed!")
        return false;
    }
    
}

function onUpvote(element) {
    let id = $(element).attr("postID");
    ajaxVoting(id, "upvote");
    return;
}

function onDownvote(element) {
    id = $(element).attr("postID");
    ajaxVoting(id, "downvote");
    return;
}

$(document).ready(function() {

    let timeline;
    $.ajax({
        url: 'timeline/20',
        success: function(results){
            timeline = results;
            for (var index = 0; index < timeline.length; index++) {
                var element = timeline[index];
                postHtml(element, topPostsDOM);            
            }
        }
    });

    $.ajax({
        url: 'timeline',
        success: function(results){
            timeline = results;
            for (var index = timeline.length - 1; index > -1; index--) {
                var element = timeline[index];
                postHtml(element, timelineDOM);            
            }
        }
    });


})