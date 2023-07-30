import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Event from './Event'
import SubEvent from './SubEvent'

export default class Attendance extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public subEventId: number

  @column()
  public userId: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @belongsTo(() => SubEvent)
  public sub_event: BelongsTo<typeof SubEvent>
}
