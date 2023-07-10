import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { MyReporter } from 'App/Validators/Reporters/MyReporter'

export default class OrganizerValidator {
  constructor(protected ctx: HttpContextContract) {}
  public reporter = MyReporter

  public schema = schema.create({
    eventId: schema.number([rules.exists({ table: 'events', column: 'id' })]),
    name: schema.string.optional(),
    emailId: schema.string.optional([rules.regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)]),
    githubUrl: schema.string.optional(),
    linkedinUrl: schema.string.optional(),
    userId:schema.string.optional()    
  })

  // public messages = {}
  public messages = this.ctx.i18n.validatorMessages('validation.register')
}
