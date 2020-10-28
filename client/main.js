const baseUrl = "http://localhost:3000"

$(document).ready(() => {
  const token = localStorage.getItem('token')
  if (token) {
    $("#content").show()
    $("#landing").hide()
  } else {
    $("#content").hide()
    $("#landing").show()
  }

  $("#logout").on("click", () => {
    logout()
  })
})

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
      $("#landing").hide()
      $("#content").show()
      $("#email").val("")
      $("#password").val("")
    })
    .fail(err => {
      console.log(err);
    })
}

const logout = () => {
  $("#landing").show()
  $("#content").hide()
  localStorage.removeItem('token')
}