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
  //   public async update({ params, request, auth }) {}
  public async destroy({ params }) {}
}
