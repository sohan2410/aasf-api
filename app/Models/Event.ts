import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, HasOne, afterFind, belongsTo, column, computed, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import EventImage from './EventImage'
import Category from './Category'
import EventLink from './EventLink'

export default class Event extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public location: string

  @column()
  public type: string

  // @column.dateTime({
  //   autoCreate: true,
  //   serialize: (value: DateTime | null) => {
  //     return value ? value.toFormat('ff') : ''
  //   },
  // })
  @column()
  public startDate: DateTime

  // @column.dateTime({
  //   autoCreate: true,
  //   serialize: (value: DateTime | null) => {
  //     return value ? value.toFormat('ff') : ''
  //   },
  // })
  @column()
  public endDate: DateTime

  @column()
  public duration: string

  @column({ serializeAs: null })
  public categoryId: number

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @hasMany(() => EventImage)
  public event_images: HasMany<typeof EventImage>

  @hasMany(() => EventLink)
  public event_links: HasMany<typeof EventLink>

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>
}
