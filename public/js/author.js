$(document).ready(function() {
  // Getting references to the name input and author container, as well as the table body
  var nameInput = $("#author-name");
  var lastName = $("#author-last");
  var username = $("#author-username");
  var password = $("#author-password");
  var birthday = $("#author-birthday");
  var authorList = $("tbody");
  var authorContainer = $(".author-container");
  // Adding event listeners to the form to create a new object, and the button to delete
  // an Author
  $(document).on("submit", "#author-form", handleAuthorFormSubmit);
  $(document).on("click", ".delete-author", handleDeleteButtonPress);

  // Getting the initial list of Authors
  getAuthors();

  let API = {
    authenticateUser: function(username, password) {
      console.log("Public Author.js 21" + username + " " + password);
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/auth",
        data: JSON.stringify(
          {
            username: username,
            password: password
          })
      });
    }
  };


  // A function to handle what happens when the form is submitted to create a new Author
  function handleAuthorFormSubmit(event) {
    event.preventDefault();

    var nameInput = $("#author-name").val().trim();
    var lastName = $("#author-last").val().trim();
    var username = $("#author-username").val().trim();
    var password = $("#author-password").val().trim();
    var birthday = $("#author-birthday").val().trim();

    // Don't do anything if the name fields hasn't been filled out
    if (!nameInput) {
      return;
    }
    // Calling the upsertAuthor function and passing in the value of the name input
    upsertAuthor({
      nameInput: nameInput,
      lastName: lastName,
      username: username,
      birthday: birthday,
      password: password
    });

    // TODO do we always want to redirect to the /daily page after they have been authenticated
    API.authenticateUser(upsertAuthor.username, upsertAuthor.password).then(function(token) {
      console.log(upsertAuthor.username + " " + upsertAuthor.password);
      document.cookie = "token=" + token.token;
      // window.location.href = '/daily';
    });
  

    // submitAccount({
    //   name: nameInput
    // window.location.href = "localhost:8000/blog?author_id=" + authorData.id;
    //     .val()
    //     .trim(),
    //     });
  }

  // A function for creating an author. Calls getAuthors upon completion
  function upsertAuthor(authorData) {
    $.post("/api/authors", authorData).then(getAuthors);
  }

  // Function for creating a new list row for authors
  function createAuthorRow(authorData) {
    window.location.href = "/daily?author_id=" + authorData.id;

    var newTr = $("<tr>");
    newTr.data("author", authorData);
    newTr.append("<td>" + authorData.name + "</td>");
    if (authorData.Posts) {
      newTr.append("<td> " + authorData.Posts.length + "</td>");
    } else {
      newTr.append("<td>0</td>");
    }
    newTr.append(
      "<td><a href='/blog?author_id=" + authorData.id + "'>Go to Posts</a></td>"
    );
    newTr.append(
      "<td><a href='/cms?author_id=" +
        authorData.id +
        "'>Create a Post</a></td>"
    );
    newTr.append(
      "<td><a style='cursor:pointer;color:red' class='delete-author'>Delete Author</a></td>"
    );
    return newTr;
  }

  // Function for retrieving authors and getting them ready to be rendered to the page
  function getAuthors() {
    $.get("/api/authors", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createAuthorRow(data[i]));
      }
      renderAuthorList(rowsToAdd);
      nameInput.val("");
      lastName.val("");
      birthday.val("");
      username.val("");
      password.val("");
    });
    // window.location.href = "/blog?author_id=" + data.id;
  }

  // A function for rendering the list of authors to the page
  function renderAuthorList(rows) {
    authorList
      .children()
      .not(":last")
      .remove();
    authorContainer.children(".alert").remove();
    if (rows.length) {
      authorList.prepend(rows);
    } else {
      renderEmpty();
    }
  }

  // Function for handling what to render when there are no authors
  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text("You must create an Author before you can create a Post.");
    authorContainer.append(alertDiv);
  }

  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    var listItemData = $(this)
      .parent("td")
      .parent("tr")
      .data("author");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/authors/" + id
    }).then(getAuthors);
  }
});

// function submitAccount(authorData) {
//   $.post("/api/authors", authorData, function () {
//     window.location.href = "/blog?author_id=" + authorData;
//   });
// }
