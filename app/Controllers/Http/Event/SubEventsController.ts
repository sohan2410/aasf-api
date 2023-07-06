// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SubEventsController {
  public async store({ request }) {
    // validate the request body
    // create event related sub events
    // return response
  }
  public async update({ params, request, auth }) {
    // validate the request body
    // find the sub event
    // merge sub event with validated body
    // save the sub event
    // return response
  }
  public async destroy({ params }) {
    // check if sub event exists by id
    // delte sub event
    // return response
  }
}
