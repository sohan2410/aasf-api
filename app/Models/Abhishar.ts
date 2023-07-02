import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Abhishar extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public heading: string

  @column()
  public version: string

  @column()
  public text: string

  @column()
  public image: string

  @column()
  public pdfLink: string

  @column()
  public dateOfLaunch: Date

  @column()
  public url: string
  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
