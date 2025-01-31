import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reminders_tags'

  async up(): Promise<void> {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('reminder_id').unsigned().references('reminders.id').onDelete('CASCADE')
      table.integer('tag_id').unsigned().references('tags.id').onDelete('CASCADE')
      table.primary(['reminder_id', 'tag_id'])

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down(): Promise<void> {
    this.schema.dropTable(this.tableName)
  }
}
