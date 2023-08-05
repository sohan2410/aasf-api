/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }
  public async handle(error: any, { response, i18n, logger }: HttpContextContract) {
    logger.info(error)

    if (error.code === 'E_VALIDATION_FAILURE') {
      error.messages.message = error.messages.data[0].message
      return response.status(200).json(error.messages)
    }
    if (error.code === 'E_UNAUTHORIZED_EXCEPTION') {
      return response.status(200).json({ success: 0, message: i18n.formatMessage('auth.unauthorized') })
    }
    if (error.code === 'MISSING_INVOICE_ID') {
      return response.status(200).json({ success: 0, message: i18n.formatMessage(error.messages) })
    }
    if (error.code === 'E_ROUTE_NOT_FOUND') {
      // return view.render('notfound')
      return response.status(200).json({ success: 0, message: i18n.formatMessage('error.notFound') })
    }
    if (error.code === 'E_UNAUTHORIZED_ACCESS') {
      return response.status(401).json({ success: 0, message: i18n.formatMessage('error.unauthorized') })
    }
    if (error.code === 'E_MALFORMED_JSON') {
      return response.status(200).json({ success: 0, message: i18n.formatMessage('error.invalidJSON') })
    }
    if (error.code === 'ER_WRONG_VALUE') {
      return response.status(200).json({ success: 0, message: i18n.formatMessage('error.incorrectValue') })
    }
    if (error.code === 'E_CANNOT_MAKE_ROUTE_URL') {
      return response.status(200).json({ success: 0, message: i18n.formatMessage('error.notFound') })
    }
    // return view.render('internalservererror')
    return response.status(200).send({ success: 0, message: error.message })
  }
}
