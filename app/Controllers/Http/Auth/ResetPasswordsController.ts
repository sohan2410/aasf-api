// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import ResetPasswordValidator from 'App/Validators/Auth/ResetPasswordValidator'

export default class ResetPasswordsController {
  public async store({ auth, request }) {
    await request.validate(ResetPasswordValidator)
    const { password } = request.all()
    const user = await User.findBy('roll_no', auth.user.email)
    if (!user) return User.getResponse(0, 'auth.accountNotFound')
    user.password = password
    await user.save()
    return User.getResponse(1, 'auth.passwordUpdate')
  }
}
