const bcrypt = require('bcrypt-nodejs');

exports.seed = function(knex, Promise) {
  function deleteAllUsers() {
    return knex('users').del();
  }

  function createUsers() {

  const salt = bcrypt.genSaltSync(10);
  const password1 = bcrypt.hashSync("abc123", salt) // -> "asdfasdf"
  const password2 = bcrypt.hashSync("abc456", salt) // -> "asdfasdf"

  return knex('users').insert([
    {username: 'john', password: password1},
    {username: 'sara', password: password2}
  ])
  }

  return deleteAllUsers()
    .then(createUsers)
    .then(data => console.log('seeded!'));
};
