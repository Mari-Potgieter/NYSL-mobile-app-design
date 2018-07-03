document.getElementById("login").addEventListener("click", login);
document.getElementById("create-post").addEventListener("click", writeNewPost);
var audio = new Audio('stop1.mp3');
$(".advice").hide();
$("#posts").hide();


getPosts();

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    $(".advice").hide();
    $("#posts").show();

  } else {
    $(".advice").show();
    $("#posts").hide();
    // No user is signed in.
  }
});

// Extra:
// Check if the user is logged in at the beginning of the script
// Delete the input once the post message is sent
// If the input is empty don't let it send a post message

function login() {
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider)
    .then(function () {
      getPosts();
    })
    .catch(function () {
      alert("Something went wrong");
    });
}


function writeNewPost() {

  if (!$("#textInput").val()) {
    return
  }

  var text = document.getElementById("textInput").value;
  var userName = firebase.auth().currentUser.displayName;

  // A post entry.
  var postData = {
    name: userName,
    body: text
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('myChat').push().key;
  
  var updates = {};
  updates[newPostKey] = postData;

  $("#textInput").val("");

  audio.play();

  return firebase.database().ref().child('myChat').update(updates);
}


function getPosts() {

  firebase.database().ref('myChat').on('value', function (data) {

    var logs = document.getElementById("posts");
    logs.innerHTML = "";

    var posts = data.val();

    var template = "";

    for (var key in posts) {
      if (posts[key].name == firebase.auth().currentUser.displayName) {
        template += `
          <div class="notification is-info">
            <p class="name">${posts[key].name} says:</p>
            <p>${posts[key].body}</p>
          </div>
        `;
      } else {
        template += `
          <div class="notification is-primary">
            <p class="name">${posts[key].name} says:</p>
            <p>${posts[key].body}</p>
          </div>
        `;
      }
    }

    logs.innerHTML = template;

    $(".box").animate({ scrollTop: $(".box").prop("scrollHeight") }, 500);
  });
}