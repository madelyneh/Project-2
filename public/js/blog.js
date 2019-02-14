// var db = require("../../models")

$(document).ready(function() {
  /* global moment */
  var authID = [];

  // blogContainer holds all of our posts
  var blogContainer = $(".blog-container");
  var postCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handlePostDelete);
  $(document).on("click", "button.edit", handlePostEdit);
  $("#add").on("click", reroute);
  // Variable to hold our posts
  var posts;

  // The code below handles the case where we want to get blog posts for a specific author
  // Looks for a query param in the url for author_id
  var url = window.location.search;
  var authorId;
  if (url.indexOf("?author_id=") !== -1) {
    authorId = url.split("=")[1];
    getPosts(authorId);
  }
  // If there's no authorId we just get all posts as usual
  else {
    getPosts();
  }

  function reroute() {
    var url = window.location.search;
    var authorId;
    if (url.indexOf("?author_id=") !== -1) {
      authorId = url.split("=")[1];
    }
    // console.log("!!!!!!!! " + authorId);
    window.location.href = "/post?author_id=" + authorId;
  }
  // grabs the author's information from data base.
   let getAuthor = function() {
    let token = document.cookie.split(";")
    .filter(
      function(element) {
        return element.indexOf('token=') === 0
      }
    )[0].split("=")[1];
    return $.ajax({
      url: "api/author",
      type: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      }
    });
  };


  // This function grabs posts from the database and updates the view
  function getPosts(author) {
    authorId = author || "";
    if (authorId) {
      authorId = "/?author_id=" + authorId;
    }
    $.get("/api/posts" + authorId, function(data) {
      // console.log("Posts", data);
      posts = data;
      if (!posts || !posts.length) {
        displayEmpty(author);
        // alert(author)
      } else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete posts
  function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/posts/" + id
    }).then(function() {
        getPosts(postCategorySelect.val());
      });
  }

  // InitializeRows handles appending all of our constructed post HTML inside blogContainer
  function initializeRows() {
    blogContainer.empty();
    var postsToAdd = [];
    for (var i = 0; i < posts.length; i++) {
      postsToAdd.push(createNewRow(posts[i]));
    }
    blogContainer.append(postsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(post) {
    var formattedDate = new Date(post.createdAt);
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    var today = days[formattedDate.getDay()];
    formattedDate = moment(formattedDate).format("MMMM Do YYYY");
    var newPostCard = $("<div>");
    newPostCard.addClass("card");
    var newPostCardHeading = $("<div>");
    newPostCardHeading.addClass("card-header");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-info");
    var newPostTitle = $("<h2>");
    var newPostDate = $("<small>");
    var newPostAuthor = $("<h5>");
    // console.log("*************************" + post.Author.name);
    authID.push(post.Author.id);
    // console.log("+++++++++++++" + authID);
    newPostAuthor.text(
      "Written by: " + post.Author.name /**here was post.Author.name */
    );
    newPostAuthor.css({
      float: "right",
      color: "blue",
      "margin-top": "-10px"
    });
    // console.log(post[0].Author.name)
    var newPostCardBody = $("<div>");
    newPostCardBody.addClass("card-body");

    // new Andrew work
    var highlight = $("<p>");
    var positive = $("<p>");
    var negative = $("<p>");
    var option1 = $("<p>");
    var option2 = $("<p>");
    var option3 = $("<p>");
    var music = $("<p>");
    var video = $("<p>");
    newPostTitle.text();

    // new Andrew work
    highlight.text("Highlight: " + post.highlight + ".");
    positive.text("Positive: " + post.positive + ".");
    negative.text("Negative: " + post.negative + ".");
    option1.text("Option 1: " + post.option1 + ".");
    option2.text("Option 2: " + post.option2 + ".");
    option3.text("Option 3: " + post.option3 + ".");
    music.text("Music: " + post.music + ".");
    video.text("Video: " + post.video + ".");

    newPostDate.text(today + " " + formattedDate);
    newPostTitle.append(newPostDate);
    newPostCardHeading.append(deleteBtn);
    newPostCardHeading.append(editBtn);
    newPostCardHeading.append(newPostTitle);
    newPostCardHeading.append(newPostAuthor);

    // new Andrew work
    newPostCardBody.append(highlight);
    newPostCardBody.append(positive);
    newPostCardBody.append(negative);
    newPostCardBody.append(option1);
    newPostCardBody.append(option2);
    newPostCardBody.append(option3);
    newPostCardBody.append(music);
    newPostCardBody.append(video);
    // console.log(post.AuthorId);
    newPostCard.append(newPostCardHeading);
    newPostCard.append(newPostCardBody);
    newPostCard.data("post", post);
    return newPostCard;
  }

  // This function figures out which post we want to delete and then calls deletePost
  function handlePostDelete() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    deletePost(currentPost.id);
  }

  // This function figures out which post we want to edit and takes it to the appropriate url
  function handlePostEdit() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    window.location.href = "/cms?post_id=" + currentPost.id;
  }

  // This function displays a message when there are no posts
  function displayEmpty(id) {
    var query = window.location.search;
    // console.log("==============this is query: " + query);
    var partial = "";
    // id = id

    if (id) {
      partial = " for Author " + id;
    }
    blogContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({
      "text-align": "center",
      "margin-top": "50px"
    });
    messageH2.html(
      "No posts yet" +
        partial +
        ", navigate <a href='/cms" +
        query +
        "'>here</a> in order to get started."
    );
    blogContainer.append(messageH2);
  }
});
