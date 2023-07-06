import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class Admin {
  public async handle({ response, auth }: HttpContextContract, next: () => Promise<void>) {
    if (auth.user?.roles.slug === 'admin' || auth.user?.roles.slug === 'sub-admin') {
      await next()
    } else {
      response.status(403).send(User.getResponse(1, 'auth.onlyAdmin'))
    }
  }
}
