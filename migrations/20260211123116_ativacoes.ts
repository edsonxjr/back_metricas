import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('ativacoes', (table) => {
    table.uuid('id').primary();
    table.string('id_externo').unique();
    table.string('plano'); 
    table.date('data_ativacao').notNullable();
    table.date('data_expiracao');
    table.enum('status', ['ativo', 'expirado', 'cancelado']).defaultTo('ativo');

    table.uuid('cliente_id')
      .notNullable()
      .references('id')
      .inTable('clientes')
      .onDelete('CASCADE');

    table.uuid('sistema_id')
      .notNullable()
      .references('id')
      .inTable('sistemas')
      .onDelete('CASCADE');

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('ativacoes');
}