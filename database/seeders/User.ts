import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    await User.updateOrCreate({ email: 'img_2020016@iiitm.ac.in' }, { id: '2020IMG-016', firstName: 'Sohan', lastName: 'Bandary', roleId: 1, password: 'aasf', linkedinUrl: 'https://www.linkedin.com/in/sohan-bandary', githubUrl: 'https://github.com/sohan2410' })
  }
}
