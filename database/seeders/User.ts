import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    await User.updateOrCreate({ email: 'img_2020016@iiitm.ac.in' }, { firstName: 'Sohan', lastName: 'Bandary', roleId: 3, password: 'aasf' })
  }
}
