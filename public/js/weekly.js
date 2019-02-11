$(document).ready(function() {
  // Getting jQuery references to the post body, title, form, and author select

  var $best = $("#best");
  var $worst = $("#worst");
  var $next = $("#next_week");

  // var $submitBtn = $("#submit");
  // Adding an event listener for when the form is submitted
  $("#weekSubmit").on("click", handleWeeklyFormSubmit);
  // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
  // Adding an event listener for when the form is submitted
  // Gets the part of the url that comes after the "?" (which we have if we're updating a post)

  function handleWeeklyFormSubmit(event) {
    event.preventDefault();

    $.get("/api/posts", function(data) {
      console.log(data);
    });
    // Don't do anything if the name fields hasn't been filled out
    if (
      !$best
        .val()
        .trim()
        .trim()
    ) {
      return;
    }
    // Calling the upsertAuthor function and passing in the value of the name input
    upsertWeek({
      best: $best.val().trim(),
      worst: $worst.val().trim(),
      next: $next.val().trim()
    });
  }

  // A function for creating an author. Calls getAuthors upon completion
  function upsertWeek(weekData) {
    $.post("/api/weekly", weekData).then(console.log(weekData));
  }
});
