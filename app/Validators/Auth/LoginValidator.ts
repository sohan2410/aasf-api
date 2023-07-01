import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { MyReporter } from 'App/Validators/Reporters/MyReporter'

export default class LoginValidator {
  constructor(protected ctx: HttpContextContract) {}
  public reporter = MyReporter

  public schema = schema.create({
    username: schema.string(),
    password: schema.string([rules.minLength(4)]),
  })

  // public messages = {}
  public messages = this.ctx.i18n.validatorMessages('validation.register')
}
