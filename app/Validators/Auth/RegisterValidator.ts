import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { MyReporter } from 'App/Validators/Reporters/MyReporter'

export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) {}
  public reporter = MyReporter

  public schema = schema.create({
    firstName: schema.string(),
    lastName: schema.string(),
    email: schema.string([rules.email(), rules.unique({ table: 'users', column: 'email' })]),
    password: schema.string([rules.minLength(8), rules.confirmed()]),
    country: schema.number([rules.range(1, 999)]),
    phone: schema.number([rules.unique({ table: 'users', column: 'phone' })]),
    countryName: schema.string(),
  })

  public messages = this.ctx.i18n.validatorMessages('validation.register')
}
