import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reminders'

  async up(): Promise<void> {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title', 255).notNullable()
      table.text('description').notNullable()
      table.boolean('finish').defaultTo(false)
      table.boolean('notified_mail').defaultTo(false)
      table.timestamp('date_end').notNullable()
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down(): Promise<void> {
    this.schema.dropTable(this.tableName)
  }
}
