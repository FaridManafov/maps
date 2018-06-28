exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('collaborators', function(table) {
      table.integer('map_id').references('maps.id');
      table.integer('user_id').references('users.id');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('collaborators')
  ])
};
