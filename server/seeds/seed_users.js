const bcrypt = require('bcrypt-nodejs');

exports.seed = function(knex, Promise) {

  function deleteAllUsers() {
    return knex('users').del();
  }

  function deleteAllMaps() {
    return knex('maps').del();
  }

  function deleteAllFavorites() {
    return knex('favorites').del();
  }

  function deleteAllCollaborators() {
    return knex('favorites').del();
  }

  function deleteAllMarkers() {
    return knex('favorites').del();
  }

  function createUsers() {
    const salt = bcrypt.genSaltSync(10);
    const password1 = bcrypt.hashSync("theresa", salt) // -> "asdfasdf"
    const password2 = bcrypt.hashSync("farid", salt) // -> "asdfasdf"
    const password3 = bcrypt.hashSync("jonathan", salt)

    return knex('users').insert([
      { username: 'theresa', password: password1 },
      { username: 'farid', password: password2 },
      { username: 'jonathan', password: password3 }
    ])
  }

  function createMaps() {
    return knex('maps').insert([
      { mapname: 'Best places to eat in Toronto', created_by: 1},
      { mapname: 'Travel plans 2019', created_by: 2},
      { mapname: 'Favorite live music venues in Vancouver', created_by: 3}
    ])
  }

  function createMarkers() {
    return knex('markers').insert([
      { map_id: 1, user_id: 1, latitude: 43.653394, longitude: -79.394642 },
      { map_id: 1, user_id: 1, latitude: 43.650870, longitude: -79.408185 },
      { map_id: 1, user_id: 1, latitude: 43.665472, longitude: -79.335482 }
    ])
  }

  function createFavorites() {
    return knex('favorites').insert([
      { map_id: 1, user_id: 1},
      { map_id: 1, user_id: 2},
      { map_id: 1, user_id: 3}
    ])
  }

  function createCollaborators() {
    return knex('collaborators').insert([
      { map_id: 1, user_id: 1},
      { map_id: 1, user_id: 2},
      { map_id: 1, user_id: 3}
    ])
  }

  return deleteAllFavorites()
  .then(deleteAllCollaborators)
  .then(deleteAllMarkers)
  .then(deleteAllMaps)
  .then(deleteAllUsers)
  .then(createUsers)
  .then(createMaps)
  .then(createMarkers)
  .then(createCollaborators)
  .then(createFavorites)

};
