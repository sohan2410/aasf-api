import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, beforeCreate, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Attendance from './Attendance'
import Event from './Event'

export default class SubEvent extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public eventId: number

  @column()
  public day: number

  @column()
  public date: Date

  @column()
  public start_time: Date

  @column()
  public end_time: Date

  @column()
  public url: string

  @column()
  public type: string

  @column()
  public location: string

  @column()
  public docs: string

  @column()
  public feedback_link: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @hasMany(() => Attendance)
  public attendance: HasMany<typeof Attendance>

  @belongsTo(() => Event)
  public event: BelongsTo<typeof Event>
}
