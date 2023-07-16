import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { MyReporter } from 'App/Validators/Reporters/MyReporter'

export default class AdminValidator {
  constructor(protected ctx: HttpContextContract) {}
  public reporter = MyReporter

  public schema = schema.create({
    id: schema.string(),
    firstName: schema.string(),
    lastName: schema.string(),
    email: schema.string([rules.email(), rules.unique({ table: 'users', column: 'email' })]),
    phoneNo: schema.number(),
    // phoneNo: schema.number([rules.unique({ table: 'users', column: 'phone_no' })]),
  })

  public messages = this.ctx.i18n.validatorMessages('validation.register')
}
