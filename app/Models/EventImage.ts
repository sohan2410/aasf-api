import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class EventImage extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column({ serializeAs: null })
  public eventId: number

  @column()
  public imageUrl: string

  @column()
  public publicId: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
