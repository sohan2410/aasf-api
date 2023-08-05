import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { MyReporter } from '../Reporters/MyReporter'

export default class SubEventUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}
  public reporter = MyReporter

  public schema = schema.create({
   day: schema.number.optional(),
   date: schema.string.optional([rules.regex(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]),
   start_time: schema.string.optional([rules.regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)]),
   end_time: schema.string.optional([rules.regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)]),
   url: schema.string.optional(),
   type: schema.string.optional(),
   location: schema.string.optional(),
   docs: schema.string.optional(),
   feedback_link: schema.string.optional()
  })

  // public messages = {}
  public messages = this.ctx.i18n.validatorMessages('validation.register')
}
