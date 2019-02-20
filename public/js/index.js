$(document).ready(function() {
  // Adding event listeners to the form to create a new object, and the button to delete
  // an Author
  $(document).on("submit", "#author-form", handleAuthorFormSubmit);

  let API = {
    authenticateUser: function(username, password) {
      console.log("Public index.js 21" + username + " " + password);
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
    // API.authenticateUser(username, password).then(function(token) {
    //   // console.log(token);
    //   document.cookie = "token=" + token.token;
    //   window.location.href = '/daily';
    // });
  }

  // A function for creating an author. Calls getAuthors upon completion
  function upsertAuthor(authorData) {
    $.post("/api/authors", authorData)
      .done(function(res) {
        // TODO do something after person is successfully created
        console.log('CREATED');
        console.log(res);

        API.authenticateUser(authorData.username, authorData.password).then(function(token) {
          console.log(token);
          document.cookie = "token=" + token.token;
          window.location = token.redirectUrl;
					console.log('TCL: upsertAuthor -> token.redirectUrl', token.redirectUrl)
        });
      
      })
      .fail(function(err) {
        // TODO What happens if there's a failure to create the person? Error handling
        console.error(err);
      });
  }

});

