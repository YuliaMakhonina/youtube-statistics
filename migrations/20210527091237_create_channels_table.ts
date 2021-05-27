import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('channels', (table) => {
    table.uuid('uuid').primary().defaultTo(knex.raw('(gen_random_uuid())'));
    table.string('channel_id').notNullable();
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('channels');
}

