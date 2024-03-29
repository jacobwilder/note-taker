var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $saveNoteBtn = $(".save-note");
var $newNoteBtn = $(".new-note");
var $noteList = $(".list-container .list-group");

// Get the note data from the inputs, save it to the db and update the view
var handleNoteSave = function() {
  var newNote = {
    title: $noteTitle.val(),
    text: $noteText.val()
  };

  $.ajax({
    url: "/api/notes",
    data: newNote,
    method: "POST"
  }).then(function(data) {
    location.reload();
  });
};

// Delete the clicked note
var handleNoteDelete = function(event) {
  // Prevent the click listener for the list from being called when the button inside of it is clicked
  event.stopPropagation();

  var note = $(this)
    .parents(".list-group-item")
    .data();

  // Delete the note with the id of `note.id`
  // Render the active note
  $.ajax({
    url: "/api/notes/" + note.id,
    method: "DELETE"
  }).then(function() {
    location.reload();
  });
};

var handleNoteUpdate = function(event) {
  event.stopPropagation();
  var note = $(this)
    .parents(".list-group-item")
    .data();

  var updatedNote = {
    title: $(".note-title").val().trim(),
    text: $(".note-textarea").val().trim()
  }

  var id = $(this).data("id");


    $.ajax({
      url: "/api/notes/" + note.id,
      method: "PUT",
      data: updatedNote
    }).then(function() {
      console.log("Note updated!");
      location.assign("/notes")
    });
};


// Renders note titles
var renderNoteList = function(notes) {
  $noteList.empty();

  var noteListItems = [];

  for (var i = 0; i < notes.length; i++) {
    var note = notes[i];

    var $li = $("<li class='list-group-item'>").data(note);
    var $titleDiv = $("<div>");
    var $titleSpan = $("<span class='font-weight-bold'>").text(note.title);
    var $delBtn = $(
      "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
    ).css("margin-left", "5px");
    var $updateBtn = $("<i href='/notes/" + note.id + "'" + "class='fas fa-pencil-alt float-right text-warning update-note'></i>")

    var $noteP = $("<p class='mt-2'>").text(note.text);

    $titleDiv.append($titleSpan, $delBtn, $updateBtn);

    $li.append($titleDiv, $noteP);
    noteListItems.push($li);
  }

  $noteList.prepend(noteListItems);
};

// Pulls Database Notes and displays on sidebar
var getAndRenderNotes = function() {
  $.ajax({
    url: "/api/notes",
    method: "GET"
  }).then(function(data) {
    renderNoteList(data);
  });
};

$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteList.on("click", ".update-note", handleNoteUpdate);

// Pulls initial note table
getAndRenderNotes();
