// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import Drive from '@ioc:Adonis/Core/Drive'

// import Application from '@ioc:Adonis/Core/Application'
import Abhishar from 'App/Utils/Abhishar'
import User from 'App/Models/User'

export default class AbhisharsController {
  public async index() {
    return User.getResponse(1, 'abhishar.fetched', Abhishar)
  }
}