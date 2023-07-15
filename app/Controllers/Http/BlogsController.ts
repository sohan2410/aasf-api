// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { parse } from 'rss-to-json'
import Env from '@ioc:Adonis/Core/Env'
import { createClient } from 'redis'
const redisClient=createClient();
(async ()=>{
  redisClient.on('error', err => console.log('Redis Client Error', err));
  await redisClient.connect();
})();
const DEFAULT_EXPIRATION=3600;

export default class BlogsController {
  public async index() {
    const cachedData=await redisClient.get('blogs')
    if(cachedData){
      return User.getResponse(1, 'blog.fetched',JSON.parse(cachedData));
    }
    const blogs = await parse('https://medium.com/feed/tech-iiitg', { headers: { Authorization: `Bearer ${Env.get('MEDIUM_TOKEN')}` } })
    await redisClient.setEx('blogs',DEFAULT_EXPIRATION,JSON.stringify(blogs));
    return User.getResponse(1, 'blog.fetched', blogs)
  }
}
