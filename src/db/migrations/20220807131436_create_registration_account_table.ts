import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("registration_table", (table) => {
    table.increments("patient_id");
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.date("birthdate").notNullable();
    table.string("ethnicity").notNullable();
    table.string("gender").notNullable();
    table.string("email").notNullable();
    table.json("address").notNullable();
    table.json("payment_info").notNullable();
    table.integer("user_id").unsigned().notNullable();
    table
      .foreign("user_id")
      .references("id")
      .inTable("user_account")
      .onDelete("SET NULL");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("registration_table");
}
