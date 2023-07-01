import { NormalizeConstructor } from '@ioc:Adonis/Core/Helpers'
import { BaseModel } from '@ioc:Adonis/Lucid/Orm'
import I18n from '@ioc:Adonis/Addons/I18n'
import HttpContext from '@ioc:Adonis/Core/HttpContext'
const Functions = <T extends NormalizeConstructor<typeof BaseModel>>(superclass: T) => {
  return class extends superclass {
    public static locale = 'en'
    public static getSlug = function (string, id?) {
      return (string = string.toLowerCase().replace(/[^A-Za-z0-9.]+/gi, '-') + (id ? '-' + id : '')).replace(/-+/g, '-')
    }
    public static getMessage = function (msg, data = {}) {
      let { i18n } = HttpContext.get()!
      try {
        return I18n.locale(i18n?.locale || this.locale).formatMessage(msg, data || {})
      } catch (err) {
        console.log(err)
        return msg
      }
    }
    public static getString = function (length, type = 'otp') {
      let chars = type == 'otp' ? '0123456789' : '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
      var result = ''
      for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
      return result
    }
    public static getResponse = function (err, msg, data: any = {}, ...option) {
      let response = {
        success: err,
        message: this.getMessage(msg, data),
        data: data,
      }
      option.map((n) => Object.keys(n).map((m) => (response[m] = n[m])))
      return response
    }
  }
}
export default Functions
