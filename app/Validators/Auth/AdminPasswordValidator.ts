import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { MyReporter } from 'App/Validators/Reporters/MyReporter'

export default class AdminPasswordValidator {
  constructor(protected ctx: HttpContextContract) {}
  public reporter = MyReporter

  public schema = schema.create({
    email: schema.string([rules.email(), rules.exists({ column: 'email', table: 'users' })]),
    password: schema.string([rules.minLength(4)]),
  })

  public messages = this.ctx.i18n.validatorMessages('validation.register')
}
