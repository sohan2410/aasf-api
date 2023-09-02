import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import EventImage from './EventImage'
import Category from './Category'
import SubEvent from './SubEvent'
import Organizer from './Organizer'

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

  @column()
  public startDate: DateTime

  @column()
  public endDate: DateTime

  @column()
  public expectedDate: Date

  @column()
  public duration: string

  @column({ serializeAs: null })
  public categoryId: number

  @column()
  public registrationLink: string

  @column()
  public resourceLink: string

  @column()
  public feedbackLink: string

  @column()
  public importance: number

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @hasMany(() => SubEvent)
  public sub_events: HasMany<typeof SubEvent>

  @hasMany(() => Organizer)
  public organizers: HasMany<typeof Organizer>

  @hasMany(() => EventImage)
  public event_images: HasMany<typeof EventImage>

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>
}
