const baseUrl = "http://localhost:3000"

$(document).ready(() => {
  if (localStorage.token) {
    $("#logout").show()
    $("#navBtn").hide()
    $("#content").show()
    $("#login").hide()
    $("#register").hide()
  } else {
    $("#content").hide()
    $("#login").show()
    $("#register").hide()
  }

  $("#logout").on("click", () => {
    logout()
  })
})

// logout
const logout = () => {
  $("#login").show()
  $("#content").hide()
  $("#navBtn").show()
  localStorage.removeItem('token')
  signOut()
}

// login
const login = (e) => {
  e.preventDefault()
  const email = $("#email").val()
  const password = $("#password").val()

  $.ajax({
    method: 'POST',
    url: baseUrl + '/login',
    data: {
      email,
      password
    }
  })
    .done(response => {
      const token = response.access_token
      localStorage.setItem('token', token)
      $("#navBtn").hide()
      $("#login").hide()
      $("#content").show()
      $("#email").val("")
      $("#password").val("")
    })
    .fail(err => {
      console.log(err);
    })
}

// register
const register = (e) => {
  e.preventDefault()
  const name = $("#req-name").val()
  const email = $("#req-email").val()
  const password = $("#req-password").val()

  $.ajax({
    method: 'POST',
    url: baseUrl + '/register',
    data: {
      name,
      email,
      password
    }
  })
    .done(response => {
      const token = response.access_token
      localStorage.setItem('token', token)
      $("#content").show()
      $("#login").hide()
      $("#register").hide()
      $("#navBtn").hide()
    })
    .fail(err => {
      console.log(err);
    })
}

// Google sign in
function onSignIn(googleUser) {
  // var profile = googleUser.getBasicProfile();
  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  var google_access_token = googleUser.getAuthResponse().id_token;
  console.log(google_access_token);

  $.ajax({
    method: 'POST',
    url: baseUrl + '/googleLogin', 
    data: {
      google_access_token
    }
  })
    .done(response => {
      localStorage.setItem('access_token', response.access_token)
      $("#logout").show()
      $("#content").show()
      $("#login").hide()
      $("#register").hide()
    })
    .fail(err => {
      console.log(err)
    })
}

// Google sign out
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

const registerBtn = () => {
  $("#navBtn").hide() 
  $("#content").hide()
  $("#login").hide()
  $("#register").show()
}

const loginBtn = () => {
  $("#content").hide()
  $("#login").show()
  $("#register").hide()
}
