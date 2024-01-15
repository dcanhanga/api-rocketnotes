import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('password_hash').notNullable();
    table.string('avatar');
    table.string('storage_url');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(null);
  });
}
export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
}
