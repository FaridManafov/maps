exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('maps', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('created_by');
      table.integer('favorited_by');
      table.integer('contributors');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('maps')
  ])
};
