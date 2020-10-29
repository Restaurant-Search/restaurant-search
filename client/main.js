const baseUrl = "http://localhost:3000"

$(document).ready(() => {
  if (localStorage.token) {
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

const logout = () => {
  $("#login").show()
  $("#content").hide()
  $("#navBtn").show()
  localStorage.removeItem('token')
}

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
      console.log(response)
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

const register = (e) => {
  e.preventDefault()
  const name = $("#req-name").val()
  const email = $("#req-email").val()
  const password = $("#req-password").val()
  console.log(name, email, password);

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
    })
    .fail(err => {
      console.log(err);
    })
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


