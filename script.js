const initialLikes = 2400;
const initialDislikes = 120;
let likesCount = initialLikes;
let dislikesCount = initialDislikes;
let comments = [];

const likesBtn = document.getElementById("likeBtn");
const dislikesBtn = document.getElementById("dislikeBtn");
const commentBox = document.getElementById("commentBox");
const submitBtn = document.getElementById("submit");
submitBtn.disabled = true; // Disable submit button initially
const clearBtn = document.getElementById("clear");
const commentsList = document.getElementById("commentsList");

likesBtn.innerText = "👍 " + likesCount;
dislikesBtn.innerText = "👎 " + dislikesCount;

likesBtn.addEventListener("click", () => {
    submitBtn.disabled = false; // Enable submit button when like is clicked
    likesCount++;
    likesBtn.innerText = "👍 " + likesCount;
    setCookie("likes", likesCount);
    disableAllButtons();
});

dislikesBtn.addEventListener("click", () => {
    submitBtn.disabled = false; // Enable submit button when dislike is clicked
    dislikesCount++;
    dislikesBtn.innerText = "👎 " + dislikesCount;
    setCookie("dislikes", dislikesCount);
    disableAllButtons();
});

submitBtn.addEventListener("click", () => {
    if (commentBox.value.trim() !== "") {
            comments.push(commentBox.value);
            setCookie("comments", JSON.stringify(comments));
            displayComments();
            commentBox.value = "";
            alert("Your comment has been submitted!");
        
    }
});

clearBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to reset everything?")) {
        document.cookie = "likes=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "dislikes=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "comments=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        likesCount = initialLikes;
        dislikesCount = initialDislikes;
        comments = [];
        likesBtn.innerText = "👍 " + likesCount;
        dislikesBtn.innerText = "👎 " + dislikesCount;
        commentsList.innerHTML = "";
        enableAllButtons();
        alert("All data has been reset!");
    }
});


function setCookie(name, value) {
    const expireOn = new Date(Date.now() + 2 * 60 * 1000);
    document.cookie = `${name}=${value}; path=/; expires=${expireOn.toUTCString()}`;
}

function disableAllButtons() {
    likesBtn.disabled = true;
    dislikesBtn.disabled = true;
    submitBtn.disabled = true;
}

function enableAllButtons() {
    likesBtn.disabled = false;
    dislikesBtn.disabled = false;
    submitBtn.disabled = false;
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.cookie.indexOf("voted") > -1) {
        disableAllButtons();
    }
    const storedComments = document.cookie.split(";").find(row => row.startsWith("comments="));
    if (storedComments) {
        comments = JSON.parse(storedComments.split("=")[1]);
        displayComments();
    }
});

function displayComments() {
    commentsList.innerHTML = "";
    comments.forEach(comment => {
        const commentItem = document.createElement("div");
        commentItem.className = "comment-item";
        commentItem.innerText = comment;
        commentsList.appendChild(commentItem);
    });
}
