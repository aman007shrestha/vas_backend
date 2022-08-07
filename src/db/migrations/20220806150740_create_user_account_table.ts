import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("user_account", (table) => {
    table.increments("id");
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    table.boolean("is_admin").defaultTo(false);
    table.boolean("is_registered").defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("user_account");
}
