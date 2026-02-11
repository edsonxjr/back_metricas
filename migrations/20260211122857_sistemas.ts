import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('sistemas', (table) => {
    table.uuid('id').primary();
    table.string('id_externo').unique();
    table.string('nome').notNullable();
    table.text('descricao');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('sistemas');
}