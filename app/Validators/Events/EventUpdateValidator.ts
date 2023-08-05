import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { MyReporter } from 'App/Validators/Reporters/MyReporter'

export default class EventUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}
  public reporter = MyReporter

  public schema = schema.create({
    name: schema.string.optional(),
    description: schema.string.optional(),
    startDate: schema.string.optional([rules.regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)]),
    endDate: schema.string.optional([rules.regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)]),
    expectedDate: schema.string.optional([rules.regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)]),
    categoryId: schema.number.optional(),
    registrationLink: schema.string.optional(),
    location: schema.string.optional(),
    type: schema.enum.optional(['offline', 'online']),
    feedbackLink: schema.string.optional(),
    resourceLink: schema.string.optional(),
    importance: schema.number.optional(),
  })

  // public messages = {}
  public messages = this.ctx.i18n.validatorMessages('validation.register')
}
