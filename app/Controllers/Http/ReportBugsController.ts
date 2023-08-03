// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios'
import User from 'App/Models/User'

export default class ReportBugsController {
    public async store({ request, auth }) {
        const formUrl = 'https://forms.gle/6FtXpPrf2G3m8BDA9'
        const formData = request.all()        
        try {
            await axios.post(formUrl,formData)
            return User.getResponse(1, 'Bug Reported')
          } catch (error) {
            return User.getResponse(0, 'Bug Not Reported')
          }
      }
}
