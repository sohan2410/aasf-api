import Mail from '@ioc:Adonis/Addons/Mail'
import I18n from '@ioc:Adonis/Addons/I18n'
import { mail_data } from 'App/Services/Interface'
class Email {
  private static from = process.env.SMTP_USERNAME || 'test@test.com'
  private static mail_data: mail_data = {
    subject: '',
    body: '',
    greet: '',
    logo: process.env.LOGO || '',
    app_name: process.env.name || 'Application',
    app_background: process.env.background || '',
    app_color: process.env.color || '',
    subBody: '',
  }

  private static async send(email) {
    await Mail.send((message) => {
      message.from(this.from).to(email).subject(this.mail_data.subject).htmlView('emails/common', { data: this.mail_data })
    }).catch(console.log)
  }

  public static async otp({ data, type }) {
    let i18n = I18n.locale(data.locale || 'en')

    this.mail_data.subject = i18n.formatMessage(`email.${type}.subject`, { name: data.fullName })
    this.mail_data.body = i18n.formatMessage(`email.${type}.body`, { url: data.url })
    this.mail_data.greet = i18n.formatMessage(`email.${type}.greet`)
    this.mail_data.button = data.button
    await this.send(data.email)
  }

  public static async registerUser({ data, type }) {
    let i18n = I18n.locale(data.locale || 'en')

    this.mail_data.subject = i18n.formatMessage(`email.${type}.subject`)
    this.mail_data.body = i18n.formatMessage(`email.${type}.body`)
    this.mail_data.greet = i18n.formatMessage(`email.${type}.greet`, { name: data.fullName })
    this.mail_data.button = data.button
    this.mail_data.subBody = i18n.formatMessage(`email.${type}.subBody`)
    await this.send(data.email)
  }
}
export default Email
