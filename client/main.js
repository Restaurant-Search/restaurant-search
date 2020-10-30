const baseUrl = "http://localhost:3000"

$(document).ready(() => {
  if (localStorage.token) {
    afterLogin()
    weather()
  } else {
    beforeLogin()
  }

  $("#logout").on("click", () => {
    logout()
  })
})

// logout
const logout = () => {
  $("#content").hide()
  $("#login").show()
  $("#navBtn").show()
  localStorage.removeItem('token')
  signOut()
  allContent()
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
    url: baseUrl + '/googlelogin',
    headers: {
      google_access_token
    }
  })
    .done(response => {
      localStorage.setItem('token', response.access_token)
      afterLogin()
    })
    .fail(err => {
      console.log(err)
    })
}

// Google sign out
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  localStorage.clear('token')
  $("#content").hide()
  allContent()
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

const allContent = () => {
  $("#pac-input").hide()
  $("#map").hide()
  $("#cityBtn").hide()
  $("#zomato").hide()
  $("#tabelSearch").hide()
  $("#tabelEstablishment").hide()
}

const afterLogin = () => {
  $("#pac-input").show()
  $("#map").show()
  $("#cityBtn").show()
  $("#zomato").show()
  $("#logout").show()
  $("#content").show()
  $("#navBtn").hide()
  $("#login").hide()
  $("#register").hide()
  $("#tabelSearch").hide()
  $("#tabelEstablishment").hide()
}

const beforeLogin = () => {
  $("#login").show()
  $("#content").hide()
  $("#register").hide()
  $("#pac-input").hide()
  $("#map").hide()
  $("#cityBtn").hide()
  $("#zomato").hide()
  $("#tabelSearch").hide()
  $("#tabelEstablishment").hide()
}

const registerBtn = () => {
  $("#register").show()
  $("#navBtn").hide()
  $("#content").hide()
  $("#login").hide()
}

const loginBtn = () => {
  $("#content").hide()
  $("#login").show()
  $("#register").hide()
}

// Zomato
function city() {
  let q = $('#citySearch').val()
  let token = localStorage.getItem('token')
  $.ajax({
    method: 'GET',
    url: baseUrl + '/restaurant/city',
    headers: {
      token: token
    },
    data: {
      q
    }
  })
    .done(response => {
      console.log(response.id)
      localStorage.setItem('q', response.id)
      localStorage.setItem('city', response.name)
      establishment()
      $("#tabelEstablishment").show()
      weather()
    })
    .fail(err => {
      console.log(err)
    })
}

function establishment() {
  let access = localStorage.getItem('token')
  $.ajax({
    method: 'GET',
    url: baseUrl + '/restaurant/establishment',
    headers: {
      token: access
    },
    data: {
      city_id: localStorage.getItem('q')
    }
  })
    .done(response => {
      localStorage.setItem('establishments', response.establishments)
      response.establishments.forEach((element, index) => {
        $('#tabelEst').append(`
      <tr>
        <th scope="row">${index + 1}</th>
        <td>${element.establishment.name}</td>
        <td><button class="nav-link" id="establishment${element.establishment.id}" onclick="searchZomato(${element.establishment.id})" href="#">Search </button></td>
      </tr>
        `)
        $("#tabelSearch").hide()
      });
    })
    .fail(err => {
      console.log(err)
    })
}

function searchZomato(establishmentId) {
  console.log(establishmentId);
  let access = localStorage.getItem('token')
  $.ajax({
    method: 'GET',
    url: baseUrl + '/restaurant/search',
    headers: {
      token: access
    },
    data: {
      entity_id: localStorage.getItem('q'),
      entity_type: "city",
      establishment_type: establishmentId,
    }
  })
    .done(response => {
      console.log(response);
      $('#tabelEstablishment').hide()
      $("#tabelSearch").show()
      response.restaurants.forEach((element, index) => {
        $('#tabelSrc').append(`
      <tr>
        <th scope="row">${index + 1}</th>
        <td>${element.restaurant.name}</td>
        <td>${element.restaurant.location.address}</td>
      </tr>
        `)
      })
    })
    .fail(err => {
      console.log(err)
    })
}

function weather() {
  $('#weather').empty()
  let access = localStorage.getItem('token')
  $.ajax({
    method: 'GET',
    url: baseUrl + '/weather',
    headers: {
      token: access
    },
    data: {
      q: localStorage.getItem('city')
    }
  })
    .done(response => {
      $('#weather').append(`
    <h4>${response.name}</h4>
    <h4>${response.weather[0].main}</h4>
    <h4>${response.weather[0].description}</h4>
    `)
    })
    .fail(err => {
      console.log(err)
    })
}