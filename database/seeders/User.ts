import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    await User.updateOrCreate({ email: 'img_2020016@iiitm.ac.in' }, { id: '2020IMG-016', firstName: 'Sohan', lastName: 'Bandary', roleId: 1, password: 'aasf', linkedinUrl: 'https://www.linkedin.com/in/sohan-bandary', githubUrl: 'https://github.com/sohan2410' })
    await User.updateOrCreate({ email: 'imt_2020058@iiitm.ac.in' }, { id: '2020IMT-058', firstName: 'Chirag', lastName: 'Modh', roleId: 1, password: 'aasf', linkedinUrl: 'https://www.linkedin.com/in/chirag-modh-738b3a220/', githubUrl: 'https://github.com/22chiragmodh' })
  }
}
