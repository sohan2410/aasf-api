// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios'
import { google } from 'googleapis'
import User from 'App/Models/User'

const GOOGLE_FORM_URL = 'https://forms.gle/k6ZpicUF7TLiZoG9A'

export default class ReportBugsController {
    public async store({ request, auth }) {
        try {
            const { formResponse } = request.all()
          console.log(formResponse);
          
            const client_id ='795549443504-05mg37epsqfo48n9aspmt134khnupb1h.apps.googleusercontent.com'
            const client_secret = 'V4shc2BBXbnPQrT-1_3hI5JC'
            const redirect_uris = 'https://developers.google.com/oauthplayground'
            const REFRESH_TOKEN ='1//04NO-41FG_e2xCgYIARAAGAQSNwF-L9Ir91qLzkQVNety2Jom02CUllNzoJP7ORXRPT0MT1lk42mVSpsAivjRDA3qJ3V-wC7Ta8Q'
      
            // Set up OAuth2 client
            const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris)
            oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN }) // Replace with your refresh token
      
            // Submit the form response
            const sheets = google.sheets({ version: 'v4', auth: oAuth2Client })
            await sheets.spreadsheets.values.append({
                spreadsheetId: 'https://docs.google.com/spreadsheets/d/1G86LjeIK_GuucSY5lcbVfNUiTn9Ei4TvmuPj5mfdMTA/edit?usp=sharing', // Replace with your spreadsheet ID
                range: 'Form Responses 1', // This might vary depending on your form configuration
                valueInputOption: 'RAW',
                requestBody: { values: [formResponse] },
              })
      
            return User.getResponse(1, 'Bug Reported')
          } catch (error) {
            console.error('Error submitting form:', error)
            return User.getResponse(0, 'Bug not reported')
          }
      }
}
