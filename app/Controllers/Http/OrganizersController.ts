import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Organizer from 'App/Models/Organizer'
import User from 'App/Models/User'
import OrganizerValidator from 'App/Validators/Organizers/OrganizerValidator'
import OrganizerUpdateValidator from 'App/Validators/Organizers/OrganizerUpdateValidator'
import Env from '@ioc:Adonis/Core/Env'

export default class OrganizersController {
  public async store({ request }) {
   const data = await request.validate(OrganizerValidator)
   console.log(data);   
   const organizer = await Organizer.create(data)
   return User.getResponse(1, 'Organizer.created', organizer)
  }
  public async update({ params, request, auth }) {
    const { id } = params
    const data = await request.validate(OrganizerUpdateValidator)
    const organizer = await Organizer.find(id)
    if (!organizer) return User.getResponse(0, 'Organizer.notFound')
    await organizer.merge(data).save()
    return User.getResponse(1, 'Organizer.updated', organizer)
  }
  public async destroy({ params }) {
        const { id } = params
        const organizer = await Organizer.find(id)
        if (!organizer) return User.getResponse(0, 'Organizer.notFound')
        await organizer.delete()
        return User.getResponse(1, 'Organizer.destroyed')
  }
}
