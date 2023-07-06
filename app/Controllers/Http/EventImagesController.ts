// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EventImagesController {
  public async store({ request }) {
    // 0. validate the request file and check formats of the file using validation rules
    // 1. Find event by event id, if not found return false
    // 2. store image url uploaded in cloudinary in event related event images
    // 3. return response
  }

  public async destroy({ params }) {
    // 1. find the event images by id
    // 2. delete the image from cloudinary
    // 3. delete the event image row
    // 4. return the response
  }
}
