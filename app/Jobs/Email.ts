import { JobContract } from '@ioc:Rocketseat/Bull'

import EmailService from 'App/Services/Email'
export default class Email implements JobContract {
  public key = 'Email'

  public async handle(job) {
    const { data } = job

    switch (data.type) {
      case 'resetPassword':
        await EmailService.otp(data)
        break
      case 'registerUser':
        await EmailService.registerUser(data)
        break
    }
  }
}
