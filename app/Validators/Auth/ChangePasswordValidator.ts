import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { MyReporter } from 'App/Validators/Reporters/MyReporter'

export default class ChangePasswordValidator {
  constructor(protected ctx: HttpContextContract) {}
  public reporter = MyReporter

  public schema = schema.create({
    password: schema.string([rules.confirmed(), rules.regex(/^\d{4}$/)]),
  })

  public messages = this.ctx.i18n.validatorMessages('validation.register')
}
