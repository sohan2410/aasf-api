import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, belongsTo, BelongsTo, computed, afterFind, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { compose } from '@ioc:Adonis/Core/Helpers'

import File from 'App/Services/File'
import Functions from 'App/Services/Functions'

import Role from 'App/Models/Role'
import ApiToken from './ApiToken'
import Attendance from './Attendance'

export default class User extends compose(BaseModel, File, Functions) {
  public static EMAIL_REGEX = new RegExp(process.env.EMAIL_REGEX || '')
  public serializeExtras = true
  @column({ isPrimary: true })
  public id: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public firstName: string

  @column()
  public lastName: string

  @column()
  public phoneNo: string

  @column()
  public image: string

  @column()
  public linkedinUrl: string

  @column()
  public githubUrl: string

  @column()
  public roleId: number

  @computed()
  public role: string

  @computed()
  public fullName: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @hasMany(() => ApiToken)
  public apiToken: HasMany<typeof ApiToken>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @afterFind()
  public static async findRole(user: User) {
    await user.load('roles')
  }

  @belongsTo(() => Role)
  public roles: BelongsTo<typeof Role>

  @belongsTo(() => Attendance)
  public attendance: BelongsTo<typeof Attendance>

  static async doLogin(auth, UserData) {
    try {
      let { username, password } = UserData
      let userData = await User.query().where('id', 'LIKE', `${username}%`).orWhere('email', 'LIKE', `${username}%`).first()
      if (!userData) return User.getResponse(0, 'auth.accountNotFound')
      let token = await auth.attempt(userData.email, password, { expiresIn: '7days' })
      userData.load('roles')
      userData.serialize()
      let user = userData.serialize()
      user.token = token
      return User.getResponse(1, 'auth.loginSuccessful', { user })
    } catch (err) {
      console.log(err, UserData)
      return User.getResponse(0, `auth.${!err.uidField ? 'incorrectPassword' : 'accountNotFound'}`)
    }
  }
}
