import { type Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', table => {
    table.renameColumn('avatar', 'avatar_url');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', table => {
    table.renameColumn('avatar_url', 'avatar');
  });
}
