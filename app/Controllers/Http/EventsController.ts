import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from 'App/Models/Event'
import EventImage from 'App/Models/EventImage'
import User from 'App/Models/User'

import EventValidator from 'App/Validators/Events/EventValidator'
import EventUpdateValidator from 'App/Validators/Events/EventUpdateValidator'

export default class EventsController {
  public async index({ request }) {
    const events = await Event.query()
      .preload('sub_events')
      .preload('organizers', (q) => q.preload('user'))
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
    const data = await request.validate(EventUpdateValidator)
    const event = await Event.find(id)
    if(!event) return User.getResponse(0, 'events.notFound')
    await event
    .merge(data)
    .save()
    return User.getResponse(1, 'events.updated', event)
  }
  public async destroy({ params }) {
    const { id } = params
    const event = await Event.findOrFail(id)
    if(!event) return User.getResponse(0,'events.notFound')
    await event.delete()
    return User.getResponse(1,'events.destroyed')
  }
}
