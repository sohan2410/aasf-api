import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from 'App/Models/Event'
import EventImage from 'App/Models/EventImage'
import User from 'App/Models/User'
import cloudinary from '@ioc:Adonis/Addons/Cloudinary'
import EventValidator from 'App/Validators/Events/EventValidator'
import Env from '@ioc:Adonis/Core/Env'

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
    const images: Array<Object> = []
    const files = request.files('images')
    if (files) {
      for (var i = 0; i < files.length; i++) {
        const imageUrl = await cloudinary.upload(files[i].tmpPath, Env.get('CLOUDINARY_API_KEY'), { folder: 'events', eager: [{ width: 200, height: 200 }], public_id: `${Date.now()}` })
        images.push({ imageUrl: imageUrl.secure_url })
      }
    }
    const event = await Event.create(data)
    await event.related('event_images').createMany(images)
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
