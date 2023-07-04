// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import cloudinary from '@ioc:Adonis/Addons/Cloudinary'
import User from 'App/Models/User'
import Env from '@ioc:Adonis/Core/Env'

export default class UsersController {
  public async index({ auth }) {
    const user = await User.find(auth.user.id)
    if (!user) return User.getResponse(0, 'user.notFound')
    return User.getResponse(1, 'user.fetched', auth.user)
  }
  public async update({ params, request, auth }) {
    const file = await request.file('image')
    const user = await User.find(auth.user.id)
    if (!user) return User.getResponse(0, 'user.notFound')
    if (file) {
      const imageUrl = await cloudinary.upload(file.tmpPath, Env.get('CLOUDINARY_API_KEY'), { folder: 'users', public_id: user.id })
      user.image = imageUrl.secure_url
      await user?.save()
      return User.getResponse(1, 'user.imageUploaded')
    }
    return User.getResponse(0, 'user.fileNotFound')
  }
}
