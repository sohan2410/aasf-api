import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { MyReporter } from '../Reporters/MyReporter'

export default class SubEventValidator {
  constructor(protected ctx: HttpContextContract) {}
  public reporter = MyReporter

  public schema = schema.create({
   eventId: schema.number([rules.exists({ table: 'events', column: 'id' })]),
   day: schema.number(),
   date: schema.string([rules.regex(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]),
   start_time: schema.string(),
   end_time: schema.string(),
   url: schema.string(),
   type: schema.string(),
   location: schema.string(),
   docs: schema.string(),
   feedback_link: schema.string()
  })

  // public messages = {}
  public messages = this.ctx.i18n.validatorMessages('validation.register')
}
