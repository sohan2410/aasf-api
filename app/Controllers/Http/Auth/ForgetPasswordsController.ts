// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'

import ForgetPasswordValidator from 'App/Validators/Auth/ForgetPasswordValidator'

import Route from '@ioc:Adonis/Core/Route'
import ChangePasswordValidator from 'App/Validators/Auth/ChangePasswordValidator'

import Bull from '@ioc:Rocketseat/Bull'
import EMAIL_JOB from 'App/Jobs/Email'
export default class ForgetPasswordsController {
  public async store({ request }) {
    await request.validate(ForgetPasswordValidator)
    const { username } = request.all()
    const user = await User.findBy('roll_no', username)
    if (!user) return User.getResponse(0, 'auth.accountNotFound')
    const url = process.env.APP_URL + Route.makeSignedUrl('forgotPassword', { params: { username } })

    let email_data = { email: user.email, button: { url, label: 'Link' }, locale: 'en' }

    await Bull.schedule(new EMAIL_JOB().key, { data: email_data, type: 'resetPassword' }, 1 * 1000)

    return User.getResponse(1, 'auth.resetPasswordLink', process.env.NODE_ENV !== 'production' ? { url } : {})
  }
  public async verifySignedUrl({ request, response }) {
    if (request.hasValidSignature()) {
      return response.redirect().toPath(process.env.APP_PATH + request.parsedUrl.path)
    } else return User.getResponse(0, 'auth.urlTampered')
  }
  public async changePassword({ request, params }) {
    await request.validate(ChangePasswordValidator)
    const { password } = request.all()
    if (request.hasValidSignature()) {
      const user = await User.findBy('roll_no', params.username)
      if (!user) return User.getResponse(0, 'auth.accountNotFound')
      user.password = password
      await user.save()
      return User.getResponse(1, 'auth.passwordUpdate')
    } else {
      return User.getResponse(0, 'auth.urlTampered')
    }
  }
}
