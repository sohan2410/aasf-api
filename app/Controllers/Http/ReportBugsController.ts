// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios'
import { google } from 'googleapis'
import User from 'App/Models/User'
import Env from '@ioc:Adonis/Core/Env'

export default class ReportBugsController {
    public async store({ request, auth }) {
        try {
          const {message}=request.all()
          
          const {id}=auth.user.$attributes
          const formResponse = {
            UserID: id,
            Message: message,
          };

            //declare OAuth Credentials
            const client_id =Env.get('OAUTH_CLIENT_ID')
            // console.log(client_id);
            
            const client_secret = Env.get('OAUTH_CLIENT_SECRET')
            const redirect_uris = Env.get('OAUTH_REDIRECT_URI')
            const REFRESH_TOKEN =Env.get('OAUTH_REFRESH_TOKEN')
      
            // Set up OAuth2 client
            const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris)
            oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN }) 
      
            const SCOPES = ['https://www.googleapis.com/auth/forms'];
            const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/spreadsheets',
            });
          const values = Object.values(formResponse);

            // Submit the form response
          const sheets = google.sheets({ version: 'v4', auth: oAuth2Client })
          await sheets.spreadsheets.values.append({
              spreadsheetId: '1G86LjeIK_GuucSY5lcbVfNUiTn9Ei4TvmuPj5mfdMTA',//spreadsheetId
              range: 'Form Responses 1!B2:C2', // This might vary depending on form configuration
              valueInputOption: 'RAW',
              requestBody: { values: [values] },
              })
      
            return User.getResponse(1, 'Bug Reported')
          } catch (error) {
            console.error('Error submitting form:', error)
            return User.getResponse(0, 'Bug not reported')
          }
      }
}
