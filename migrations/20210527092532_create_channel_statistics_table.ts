import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('channels_statistics', (table) => {
    table.uuid('uuid').primary().defaultTo(knex.raw('(gen_random_uuid())'));
    table.string('view_count').notNullable();
    table.string('subscriber_count').notNullable();
    table.boolean('hidden_subscriber_count').defaultTo(false).notNullable();
    table.string('video_count').notNullable();
    table.timestamp('date')
      .notNullable()
      .defaultTo(knex.raw('NOW()'));
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('channels_statistics');
}
