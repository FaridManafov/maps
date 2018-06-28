exports.up = function(knex, Promise) {
  return knex.schema.alterTable('users', function(t) {
    t.unique('username')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('users', function(t){
    t.dropUnique('username')
  })
};
