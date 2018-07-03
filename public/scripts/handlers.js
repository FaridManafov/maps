$(document).ready(function() {

  $('#registration-form').on('submit', function(e) {
    let errors = [];
    let notAllowed = "~!@#$%^&*()_+=-;''|{}[]?><.,"

    let username = $('#username').val().split('');
    let password = $('#userpassword').val().split('');

    let userNotAllowed = false;
    let pwNotAllowed = false;

    username.forEach((letter) => {
      if (notAllowed.includes(letter)) {
        userNotAllowed = true;
      }
    });

    password.forEach((letter) => {
      if (notAllowed.includes(letter)) {
        pwNotAllowed = true;
      }
    });

    if (userNotAllowed) {
      errors.push('Username must not contain any special characters');
    } else if (pwNotAllowed) {
      errors.push('Password must not contain any special characters');
    }

    if (username.length < 2) {
      errors.push('Username must be at least 5 characters');
    } else if (username.length > 10) {
      errors.push('Username must not be longer than 10 characters');
    } else if (password.length < 5) {
      errors.push('Password must be at least 5 characters')
    } else if (password.length > 10) {
      errors.push('Password must not be longer than 10 characters')
    }

    if (errors.length !== 0) {
      $('#error-field').empty();
      e.preventDefault();

      errors.forEach((err) => {
        let $errorMsg = $(`<div class="alert alert-danger" role="alert"> ${err} </div>`);
        $('#error-field').append($errorMsg);
      })

      errors = [];
    } else {
      username.join('');
      password.join('');
    }

  });
});
