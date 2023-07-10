import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from 'App/Models/Event'
import User from 'App/Models/User'
import cloudinary from '@ioc:Adonis/Addons/Cloudinary'
import Env from '@ioc:Adonis/Core/Env'
import EventImage from 'App/Models/EventImage'

export default class EventImagesController {
  public async store({ request }) {
    const { id } = request.all()
    const event = await Event.find(id)
    if (!event) return User.getResponse(0, 'events.notFound')
    const images: Array<Object> = []
    const files = request.files('images', {
      extnames: ['jpg', 'jpeg', 'png'],
    })
    if(!files.length) return User.getResponse(0, 'events.provideImage')

    for (var i = 0; i < files.length; i++) {
      const imageUrl = await cloudinary.upload(files[i].tmpPath, Env.get('CLOUDINARY_API_KEY'), { folder: 'events', eager: [{ width: 200, height: 200 }], public_id: `${Date.now()}` })
      images.push({ imageUrl: imageUrl.secure_url, eventId: event.id, publicId: imageUrl.public_id })
    }
    await event.related('event_images').createMany(images)
    return User.getResponse(1, 'events.imageUploaded', images)
  }

  public async destroy({ params }) {
    const { id } = params
    const event = await Event.find(id)
    if (!event) return User.getResponse(0, 'events.notFound')
    const images = await EventImage.query().where('eventId', id)
    for (let i = 0; i < images.length; i++) {
      await cloudinary.destroy(images[i].publicId)
    }
    await EventImage.query().where('eventId', id).delete()
    return User.getResponse(1, 'events.imagesDestroyed')
  }
}