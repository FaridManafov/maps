exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('markers', function(table) {
      table.increments('id').primary();
      table.integer('map_id').references('maps.id');
      table.integer('user_id').references('users.id');
      table.float('latitude');
      table.float('longitude');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('markers')
  ])
};
