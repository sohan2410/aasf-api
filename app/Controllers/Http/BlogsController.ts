// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { parse } from 'rss-to-json'
import Env from '@ioc:Adonis/Core/Env'
import Redis from '@ioc:Adonis/Addons/Redis'

const DEFAULT_EXPIRATION=3600*12;

export default class BlogsController {
  public async index() {
    const blogsCache=await Redis.get('blogs')
    if(blogsCache){
      return User.getResponse(1, 'blog.fetched',JSON.parse(blogsCache));
    }
    const blogs = await parse('https://medium.com/feed/tech-iiitg', { headers: { Authorization: `Bearer ${Env.get('MEDIUM_TOKEN')}` } })
    await Redis.set('blogs',JSON.stringify(blogs),"EX",DEFAULT_EXPIRATION);
    return User.getResponse(1, 'blog.fetched', blogs)
  }
}
