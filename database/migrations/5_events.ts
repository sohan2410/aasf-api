import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'events'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.text('description')
      table.string('location')
      table.string('type').defaultTo('offline')
      table.integer('category_id').unsigned().references('id').inTable('categories')
      table.integer('importance').unsigned().defaultTo(1).notNullable()
      table.timestamp('start_date')
      table.timestamp('end_date')
      table.date('expected_date')
      table.string('registration_link')
      table.string('resource_link')
      table.string('feedback_link')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
