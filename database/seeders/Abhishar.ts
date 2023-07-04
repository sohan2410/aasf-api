import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Abhishar from 'App/Models/Abhishar'

export default class extends BaseSeeder {
  public async run() {
    await Abhishar.updateOrCreate(
      { id: 1 },
      {
        id: 1,
        heading: 'The First Abhishar',
        version: 'v1.0',
        text: 'The first ever Abhishar, published in the memory of late AASF members - Abhinav and Tushar. This would mark the beginning of the Abhishar series of annual magazine, a tradition carried forward till this day.',
        image: 'https://res.cloudinary.com/dzerj4bzd/image/upload/v1659613271/AASF%20Website/Screenshot_20220804_171059_dlrfpy.png',
        pdfLink: 'https://drive.google.com/file/d/1xjrFPkEr8RKxmrG3S7orEjwx8nIiV2t7/view?usp=drive_link',
        dateOfLaunch: '2011-11-20',
      }
    )
    await Abhishar.updateOrCreate(
      { id: 2 },
      {
        id: 2,
        heading: 'Volume Two',
        version: 'v2.0',
        text: 'Abhishar was carried forward by the next AASF Batch and all the students of the college. This volume embodied the undying will to keep the spirit of Abhishar alive and along with it the memory of Late Abhinav and Tushar.',
        image: 'https://res.cloudinary.com/dzerj4bzd/image/upload/v1660384254/AASF%20Website/Screenshot_20220813_152039_gfrele.png',
        pdfLink: 'https://drive.google.com/file/d/1InTZy0vfcdm8r8mXNjfPj2jxWgnrl-XW/view?usp=drive_link',
        dateOfLaunch: '2012-11-20',
      }
    )
  }
}
