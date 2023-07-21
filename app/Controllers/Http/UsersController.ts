// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import cloudinary from '@ioc:Adonis/Addons/Cloudinary'
import User from 'App/Models/User'
import Env from '@ioc:Adonis/Core/Env'
import Attendance from 'App/Models/Attendance'
import Database from '@ioc:Adonis/Lucid/Database'

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
    if (!file) return User.getResponse(0, 'user.fileNotFound')
    if (file) {
      const imageUrl = await cloudinary.upload(file.tmpPath, Env.get('CLOUDINARY_API_KEY'), { folder: 'users', public_id: user.id })
      user.image = imageUrl.secure_url
      await user?.save()
      return User.getResponse(1, 'user.imageUploaded', { image: imageUrl.secure_url })
    }
    return User.getResponse(0, 'user.fileNotFound')
  }
  public async leaderboard({ auth }) {
    // const attendance = await Attendance.query().where('userId', 'LIKE', `2020%`)
    const year = auth.user.id.slice(0, 4)
    const result = await Database.rawQuery(`
    SELECT id, first_name, last_name, image,
        SUM(technical_points) AS technical_score, 
        SUM(oratory_points) AS oratory_score, 
        SUM(managerial_points) AS managerial_score, 
        SUM(winner_points) as winner_score,
        SUM(final_score) AS final_score FROM(
            select id, first_name, last_name, image,
              SUM(CASE WHEN type = 'technical' THEN points ELSE 0 END) AS technical_points,
              SUM(CASE WHEN type = 'oratory' THEN points ELSE 0 END) AS oratory_points,
              SUM(CASE WHEN type = 'managerial' THEN points ELSE 0 END) AS managerial_points,
              SUM(CASE WHEN winner > 0 THEN winner ELSE 0 END) as winner_points,
              SUM(points) AS final_score FROM(
                  select  id, type, points, winner, first_name, last_name,image from (
                  select  users.id as id, categories.name as type, first_name, last_name, image,0 as points, importance*5+10 as winner  from achievements
                  left join users on users.id = achievements.user_id 
                  left join events on achievements.event_id  = events.id
                  left join categories on events.category_id = categories.id 
                )  as abc 
            UNION  ALL
            select  id, type, points, winner, first_name, last_name,image from(
              select users.id as id, categories.name as type, first_name, last_name,image, 0 as winner, importance*5+5 as points from users left join attendances on users.id = attendances.user_id 
                left join sub_events on attendances.sub_event_id = sub_events.id 
                left join events on events.id = sub_events.event_id 
                left join categories on events.category_id = categories.id 
            ) as xyz order by id
            ) as results group by id, type
            ) as leaderboard WHERE id LIKE '${year}%' GROUP BY id ORDER BY final_score DESC;
    `)
    return User.getResponse(1, 'user.leaderboardFetched', result[0])
  }
}
