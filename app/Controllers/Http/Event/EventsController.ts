import Event from 'App/Models/Event'
import User from 'App/Models/User'
import EventUpdateValidator from 'App/Validators/Events/EventUpdateValidator'
import cloudinary from '@ioc:Adonis/Addons/Cloudinary'
import EventValidator from 'App/Validators/Events/EventValidator'
import Env from '@ioc:Adonis/Core/Env'
// import * as Moment from 'moment'
import moment from 'moment'
import { extendMoment } from 'moment-range'
import EventImage from 'App/Models/EventImage'
export default class EventsController {
  public async index() {
    const events = await Event.query()
      .preload('sub_events')
      .preload('organizers', (q) => q.preload('user'))
      .preload('event_images', (q) => q.select('image_url'))
      .preload('category')
    return User.getResponse(1, 'events.fetched', events)
  }
  public async timeline() {
    const events = await Event.query().orderBy('expectedDate', 'desc').select(['id', 'name', 'expectedDate'])
    const startDate = moment(events[events.length - 1].expectedDate)
    const endDate = moment(events[0].expectedDate)
    // @ts-ignore
    const rangeMoment = extendMoment(moment)
    const range = rangeMoment.range(startDate, endDate)
    const timeline: Record<string, any[]> = {}
    for (const month of range.by('months')) {
      const eventsInMonth = events.filter((event) => {
        const eventDate = moment(event.expectedDate)
        return eventDate.isSame(month, 'month')
      })
      timeline[month.format('MMM YY')] = eventsInMonth
    }
    return User.getResponse(1, 'timeline.fetched', { range: Object.keys(timeline), timeline })
  }
  //   public async show({ request, params }) {}
  public async store({ request }) {
    const data = await request.validate(EventValidator)
    const images: Array<Object> = []
    const files = request.files('images', {
      extnames: ['jpg', 'jpeg', 'png'],
    })
    const validExt = ['jpg', 'jpeg', 'png']

    if (!files.length) return User.getResponse(0, 'events.provideImage')
    const event = await Event.create(data)

    for (var i = 0; i < files.length; i++) {
      if (validExt.includes(files[i].extname)) {
        const imageUrl = await cloudinary.upload(files[i].tmpPath, Env.get('CLOUDINARY_API_KEY'), { folder: 'events', eager: [{ width: 200, height: 200 }], public_id: `${Date.now()}` })
        images.push({ imageUrl: imageUrl.secure_url, eventId: event.id, publicId: imageUrl.public_id })
      }
    }

    await event.related('event_images').createMany(images)
    return User.getResponse(1, 'events.created', event)
  }
  public async update({ params, request }) {
    const { id } = params
    const data = await request.validate(EventUpdateValidator)
    const event = await Event.find(id)
    if (!event) return User.getResponse(0, 'events.notFound')
    await event.merge(data).save()
    return User.getResponse(1, 'events.updated', event)
  }
  public async destroy({ params }) {
    const { id } = params
    const event = await Event.find(id)
    if (!event) return User.getResponse(0, 'events.notFound')
    const images = await EventImage.query().where('eventId', id)
    if (images) {
      for (let i = 0; i < images.length; i++) {
        await cloudinary.destroy(images[i].publicId)
      }
    }
    await event.delete()
    return User.getResponse(1, 'events.destroyed')
  }
}
