import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from 'App/Models/Event'
import EventImage from 'App/Models/EventImage'
import User from 'App/Models/User'

import EventValidator from 'App/Validators/Events/EventValidator'

export default class EventsController {
  public async index({ request }) {
    const events = await Event.query()
      .preload('event_links')
      .preload('event_images', (q) => q.select('image_url'))
      .preload('category')
    return User.getResponse(1, 'events.fetched', events)
  }
  //   public async show({ request, params }) {}
  public async store({ request }) {
    const data = await request.validate(EventValidator)
    const event = await Event.create(data)
    return User.getResponse(1, 'events.created', event)
  }
  public async update({ params, request, auth }) {
    const { id } = params
    // 1. validate the request body
    // 2. find the event by id... const event = await Event.find(id)
    // 3. merge event with the reqeust body
    // 4. save the event
    // 5. return the response
  }
  public async destroy({ params }) {
    const { id } = params
    // 1. find the event by id... const event = await Event.find(id)
    // 2. delete the event
    // 3. return the response
  }
}
