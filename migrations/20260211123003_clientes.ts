import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('clientes', (table) => {
    table.uuid('id').primary();
    table.string('nome').notNullable();
    table.string('email');
    table.string('telefone');
    table.string('empresa');
    table.string('id_externo').unique();

    table.uuid('vendedor_id')
      .references('id')
      .inTable('usuarios')
      .onDelete('SET NULL');

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('clientes');
}