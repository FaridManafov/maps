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
    const password1 = bcrypt.hashSync("theresa", salt)
    const password2 = bcrypt.hashSync("farid", salt)
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
      { mapname: 'Favorite Live Music Venues in Saskatoon', created_by: 3},
      { mapname: 'Dangerous Places to Walk At Night', created_by: 1},
      { mapname: 'Where I Want To Go', created_by: 3},
      { mapname: 'Favorite Live Music Venues in Toronto', created_by: 3}
    ])
  }

  function createMarkers() {
    return knex('markers').insert([
      { map_id: 1, user_id: 1, latitude: 43.659752, longitude: -79.380580 },
      { map_id: 1, user_id: 1, latitude: 43.662485, longitude: -79.443151 },
      { map_id: 1, user_id: 1, latitude: 43.648078, longitude: -79.390965 },
      { map_id: 2, user_id: 2, latitude: 41.634363, longitude: -71.248032 },
      { map_id: 2, user_id: 2, latitude: 41.678226, longitude: -71.243912 },
      { map_id: 2, user_id: 2, latitude: 41.690277, longitude: -71.367508 },
      { map_id: 2, user_id: 2, latitude: 41.624611, longitude: -71.312920},
      { map_id: 3, user_id: 3, latitude: 52.117521, longitude: -106.654329 },
      { map_id: 3, user_id: 3, latitude: 52.131472, longitude: -106.664081 },
      { map_id: 3, user_id: 3, latitude: 52.126295, longitude: -106.676119 },
      { map_id: 3, user_id: 3, latitude: 52.118392, longitude: -106.656279 },
      { map_id: 3, user_id: 3, latitude: 52.110032, longitude: -106.668359 },
      { map_id: 4, user_id: 1, latitude: 43.670794, longitude: -79.373556 },
      { map_id: 4, user_id: 1, latitude: 43.683104, longitude: -79.400416 },
      { map_id: 5, user_id: 2, latitude: -33.448090, longitude: -70.671289 },
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
