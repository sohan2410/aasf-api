import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

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
  public time: DateTime

  @column()
  public start_time: DateTime

  @column()
  public end_time: DateTime

  @column()
  public url: string

  @column()
  public location: string

  @column()
  public docs: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
