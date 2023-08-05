// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Event from 'App/Models/Event'
import SubEvent from 'App/Models/SubEvent'
import User from 'App/Models/User'
import Encryption from '@ioc:Adonis/Core/Encryption'
import QRCode from 'qrcode'
import csv from 'csvtojson'
import Attendance from 'App/Models/Attendance'
export default class AttendancesController {
  public async index({ params }) {
    const { id, day } = params
    const subEvent = await SubEvent.query().where('eventId', id).andWhere('day', day).first()
    if (!subEvent) return User.getResponse(0, 'event.subEventNotFound')
    const encrypted = Encryption.encrypt({ eventId: id, day: day })
    const qrCode = await QRCode.toDataURL(encrypted)
    return User.getResponse(1, 'event.qrCodeCreated', { qrCode })
  }
  public async store({ request, auth }) {
    const { hash } = request.all()
    const { user } = auth
    const decrypted: any = Encryption.decrypt(hash)
    if (!decrypted) return User.getResponse(0, 'event.invalidQRCode')
    const subEvent = await SubEvent.query().where('eventId', decrypted.eventId).andWhere('day', decrypted.day).first()
    if (!subEvent) return User.getResponse(0, 'event.subEventNotFound')
    // mark attendace if current date === event start date
    const now = Date.now()
    //in days
    const diff = Math.floor((now - new Date(subEvent.date).getTime()) / 1000 / 60 / 60 / 24)
    if (diff === 0) {
      subEvent.related('attendance').firstOrCreate({ subEventId: subEvent.id, userId: user.id })
      return User.getResponse(1, 'event.attendanceMarked')
    } else {
      return User.getResponse(0, 'event.invalidQRCode')
    }
  }
  public async upload({ request }) {
    try {
      const file = await request.file('attendance')
      const attendance = await csv().fromFile(file.tmpPath)

      for (let item in attendance) {
        try {
          const { subEventId, userId }: any = item
          if (subEventId && userId) await Attendance.create({ subEventId: subEventId, userId: userId })
        } catch (error) {}
      }
      return User.getResponse(1, 'event.attendanceUploaded')
    } catch (error) {
      return User.getResponse(0, 'event.invalidCSVFormat', error)
    }
  }
}
