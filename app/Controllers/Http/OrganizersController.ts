// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Organizer from 'App/Models/Organizer'
import User from 'App/Models/User'
import OrganizerValidator from 'App/Validators/Organizers/OrganizerValidator'
import OrganizerUpdateValidator from 'App/Validators/Organizers/OrganizerUpdateValidator'

export default class OrganizersController {
  public async store({ request }) {
    const data = await request.validate(OrganizerValidator)
    const organizer = await Organizer.create(data)
    return User.getResponse(1, 'organizer.created', organizer)
  }
  public async update({ params, request }) {
    const { id } = params
    const data = await request.validate(OrganizerUpdateValidator)
    const organizer = await Organizer.find(id)
    if (!organizer) return User.getResponse(0, 'organizer.notFound')
    await organizer.merge(data).save()
    return User.getResponse(1, 'organizer.updated', organizer)
  }
  public async destroy({ params }) {
    const { id } = params
    const organizer = await Organizer.find(id)
    if (!organizer) return User.getResponse(0, 'organizer.notFound')
    await organizer.delete()
    return User.getResponse(1, 'organizer.destroyed')
  }
}
