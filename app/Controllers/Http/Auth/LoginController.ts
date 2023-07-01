// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import LoginValidator from 'App/Validators/Auth/LoginValidator'

export default class LoginController {
  public async store({ auth, request }) {
    await request.validate(LoginValidator)

    let res = await User.doLogin(auth, request.all())

    return res
  }
}
