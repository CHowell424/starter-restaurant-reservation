exports.up = function (knex) {
    return knex.schema.createTable("tables", (table) => {
      table.increments("table_id").primary();
      table.string("table_name");
      table.bool("occupied").defaultTo(false);
      table.integer("capacity");
      table.integer("reservation_id").defaultTo(null);
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("tables");
  };