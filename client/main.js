const baseUrl = "http://localhost:3000"

$(document).ready(() => {
  const token = localStorage.getItem('token')
  if (token) {
    $("#content").show()
    $("#navBtn").hide()
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
      const token = response.token
      localStorage.setItem('token', token)
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
  const password = $("req-password").val()

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
      const token = response.token
      localStorage.setItem('token', token)
      $("#content").hide()
      $("#login").hide()
      $("#register").hide()
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
