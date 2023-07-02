// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { parse } from 'rss-to-json'
import Env from '@ioc:Adonis/Core/Env'

export default class BlogsController {
  public async index() {
    const blogs = await parse('https://medium.com/feed/tech-iiitg', { headers: { Authorization: `Bearer ${Env.get('MEDIUM_TOKEN')}` } })
    return User.getResponse(1, 'blog.fetched', blogs)
  }
}
