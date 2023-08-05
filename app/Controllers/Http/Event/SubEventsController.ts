// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SubEvent from 'App/Models/SubEvent'
import SubEventValidator from 'App/Validators/Events/SubEventValidator'
import SubEventUpdateValidator from 'App/Validators/Events/SubEventUpdateValidator'
import User from 'App/Models/User'

export default class SubEventsController {
  public async store({ request }) {
    // validate the request body
    const data = await request.validate(SubEventValidator)
    // create event related sub events
    const subevent = await SubEvent.create(data)
    // return response
    return User.getResponse(1, 'SubEvent.created', subevent)
  }
  public async update({ params, request, auth }) {
    const { id } = params
    // validate the request body
    const data = await request.validate(SubEventUpdateValidator)
    // find the sub event
    const subevent = await SubEvent.find(id)
    if (!subevent) return User.getResponse(0, 'SubEvent.notFound')
    // merge sub event with validated body
    // save the sub event
    await subevent.merge(data).save()
    // return response
    return User.getResponse(1, 'SubEvent.updated', subevent)
  }
  public async destroy({ params }) {
    // check if sub event exists by id
    const { id } = params
    const subevent = await SubEvent.find(id)
    // delete sub event
    if (!subevent) return User.getResponse(0, 'SubEvent.notFound')
    await subevent.delete()
    // return response
    return User.getResponse(1, 'SubEvent.destroyed')
  }
}
