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
      { mapname: 'Best Places to Eat in Toronto', created_by: 1},
      { mapname: 'Travel Plans 2019', created_by: 2},
      { mapname: 'Favorite Live Music Venues in Vancouver', created_by: 3},
      { mapname: 'Dangerous Places to Walk At Night', created_by: 1},
      { mapname: 'Where I Want To Go', created_by: 3},
      { mapname: 'Favorite Live Music Venues in Toronto', created_by: 3}
    ])
  }

  function createMarkers() {
    return knex('markers').insert([
      { map_id: 1, user_id: 1, latitude: 43.653394, longitude: -79.394642 },
      { map_id: 1, user_id: 1, latitude: 43.650870, longitude: -79.408185 },
      { map_id: 1, user_id: 1, latitude: 43.665472, longitude: -79.335482 },
      { map_id: 2, user_id: 2, latitude: 52.125030, longitude: -106.65898 },
      { map_id: 2, user_id: 2, latitude: 46.220492, longitude: -60.841936 },
      { map_id: 2, user_id: 2, latitude: 19.015928, longitude: -72.952288 },
      { map_id: 2, user_id: 2, latitude: 6.5188249, longitude:   3.371509 },
      { map_id: 2, user_id: 2, latitude: -33.487405, longitude: -70.692822},
      { map_id: 3, user_id: 3, latitude: 49.270745, longitude: -123.058195 },
      { map_id: 3, user_id: 3, latitude: 49.260888, longitude: -123.170805 },
      { map_id: 3, user_id: 3, latitude: 49.217850, longitude: -123.122740 },
      { map_id: 4, user_id: 1, latitude: 43.660944, longitude: -79.362173 },
      { map_id: 4, user_id: 1, latitude: 43.654966, longitude: -79.371067 },
      { map_id: 4, user_id: 1, latitude: 43.670794, longitude: -79.373556 },
      { map_id: 4, user_id: 1, latitude: 43.683104, longitude: -79.400416 },
      { map_id: 5, user_id: 2, latitude: 64.077276, longitude: -21.795992 },
      { map_id: 5, user_id: 2, latitude: -53.810608, longitude: -67.741858 },
      { map_id: 5, user_id: 2, latitude:  1.179233, longitude: 103.792259 },
      { map_id: 6, user_id: 3, latitude: 43.664674, longitude: -79.373946 },
      { map_id: 6, user_id: 3, latitude: 43.654180, longitude: -79.379031 },
      { map_id: 6, user_id: 3, latitude: 43.643873, longitude: -79.439472 },
      { map_id: 6, user_id: 3, latitude: 43.644432, longitude: -79.404947 },
    ])
  }

  function createFavorites() {
    return knex('favorites').insert([
      { map_id: 1, user_id: 2},
      { map_id: 3, user_id: 1},
      { map_id: 4, user_id: 1},
      { map_id: 2, user_id: 3},
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
  .then(deleteAllMaps)
  .then(deleteAllMarkers)
  .then(deleteAllCollaborators)
  .then(deleteAllUsers)
  .then(createUsers)
  .then(createMaps)
  .then(createMarkers)
  .then(createCollaborators)
  .then(createFavorites)

};
