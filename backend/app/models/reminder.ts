import * as relations from '@adonisjs/lucid/types/relations'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import User from '#models/user'
import Tag from '#models/tag'
import { DateTime } from 'luxon'

export default class Reminder extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string | null

  @column()
  declare finish: boolean

  @column()
  declare notified_mail: boolean

  @column()
  declare date_end: DateTime

  @column()
  declare userId: number

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  declare users: relations.BelongsTo<typeof User>

  @manyToMany(() => Tag, {
    pivotTable: 'reminders_tags',
  })
  declare tags: relations.ManyToMany<typeof Tag>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
