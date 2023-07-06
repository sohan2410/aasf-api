import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { MyReporter } from 'App/Validators/Reporters/MyReporter'

export default class EventValidator {
  constructor(protected ctx: HttpContextContract) {}
  public reporter = MyReporter

  public schema = schema.create({
    name: schema.string(),
    description: schema.string(),
    location: schema.string(),
    type: schema.enum(['online', 'offline']),
    // startDate: schema.date(),
    // endDate: schema.date(),

    startDate: schema.string([rules.regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)]),
    endDate: schema.string([rules.regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)]),
    categoryId: schema.number([rules.exists({ table: 'categories', column: 'id' })]),
    registrationLink: schema.string.optional(),
    preResourceLink: schema.string.optional(),
    postResourceLink: schema.string.optional(),
    feedbackLink: schema.string.optional(),
  })

  // public messages = {}
  public messages = this.ctx.i18n.validatorMessages('validation.register')
}
