// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import Env from '@ioc:Adonis/Core/Env'
import AdminValidator from 'App/Validators/Auth/AdminValidator'

export default class AdminController {
  public async store({ request }) {
    const data = await request.validate(AdminValidator)
    const user = await User.findBy('email', data.email)
    
    if(user){
        user.roleId = 1
        await user.save()
        return User.getResponse(1, 'user.adminCreated', user)
    }
    const obj = {...data, roleId: 1, password: Env.get('DEFAULT_PASSWORD')}
    const new_user = await User.create(obj)
    return User.getResponse(1, 'user.adminCreated', new_user)
  }
}