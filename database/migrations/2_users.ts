import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('first_name')
      table.string('last_name')
      table.string('phone_no')
      table.string('email', 255).notNullable()
      table.string('password', 255).notNullable()
      table.string('image').nullable()
      table.string('linkedin_url')
      table.string('github_url')
      table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('CASCADE')

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
