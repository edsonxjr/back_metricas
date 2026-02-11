import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('eventos', (table) => {
    table.uuid('id').primary();

    table.uuid('usuario_id')
      .notNullable()
      .references('id')
      .inTable('usuarios')
      .onDelete('CASCADE');

    table.string('tipo').notNullable();
    table.json('dados');

    table.timestamp('data_criacao').defaultTo(knex.fn.now());

    table.index(['usuario_id', 'data_criacao']);
    table.index(['data_criacao']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('eventos');
}