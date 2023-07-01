import Application from '@ioc:Adonis/Core/Application'
import Drive from '@ioc:Adonis/Core/Drive'
import { NormalizeConstructor } from '@ioc:Adonis/Core/Helpers'
import { BaseModel } from '@ioc:Adonis/Lucid/Orm'
import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'
const File = <T extends NormalizeConstructor<typeof BaseModel>>(superclass: T) => {
  return class extends superclass {
    public static publicPath = Application.publicPath()
    public static async fileUpload(request, field, optional, ext?) {
      let file = request.file(field, {
        extnames: ext,
        size: '10mb',
      })

      if (!file) {
        return optional ? { error: 1 } : { error: 0 }
      }

      if (!file.isValid) {
        return { error: 0, msg: file.errors }
      }
      return { error: 1, data: Attachment.fromFile(file) }
    }
    public static async fileUploadDrive(request, folder: string | null = '/', field: string, defaultValue: string = '', optional: boolean, type: Array<string> = ['image']) {
      let file = request.file(field, {
        types: type,
        size: '10mb',
      })

      if (!file) {
        return optional ? { error: 1, data: defaultValue } : false
      }

      if (!file.isValid) {
        return { error: 0, msg: file.errors }
      }
      let name = `${Date.now()}-${file.clientName}`
      await file.move(`${Application.publicPath()}${folder}`, {
        name,
        overwrite: true,
      })
      defaultValue && (await this.remove(defaultValue))
      return { error: 1, data: `${folder}${name}` }
    }
    public static async filesUpload(request, field) {
      let files = request.files(field, {
        size: '5mb',
        extnames: ['jpg', 'jpeg', 'gif', 'png', 'svg', 'pdf', 'jfif'],
      })

      let result = new Array()
      if (files.find((n) => !n.isValid)) return { error: 0, msg: files.find((n) => !n.isValid)?.errors }

      for (let file of files) result.push(Attachment.fromFile(file))

      return { error: 1, data: result }
    }
    public static async get(path) {
      return path && Drive.exists(Application.publicPath(path)) && (await Drive.get(Application.publicPath(path)))
    }

    public static async remove(file) {
      file && Drive.exists(Application.publicPath(file)) && (await Drive.delete(Application.publicPath(file)))
    }
  }
}
export default File
