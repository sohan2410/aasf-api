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
    await Abhishar.updateOrCreate(
      { id: 3 },
      {
        id: 3,
        heading: 'Volume Three',
        version: 'v3.0',
        text: 'In honor of our loved ones, AASF continued the tradition by making the 3rd volume of Abhishar which symbolised their enduring presence in our hearts and respect for an important initiative they wanted us to carry on.',
        image: 'https://res.cloudinary.com/dzerj4bzd/image/upload/v1660381585/AASF%20Website/Screenshot_20220813_143617_znsqfd.png',
        pdfLink: 'https://drive.google.com/file/d/1LCiNuGF1Eisa85M8DlIN7XbgKFVwJ4cV/view?usp=drive_link',
        dateOfLaunch: '2013-11-20',
      }
    )
    await Abhishar.updateOrCreate(
      { id: 4 },
      {
        id: 4,
        heading: 'Volume Four',
        version: 'v4.0',
        text: 'The 4th Volume was the final of the traditional Abhishar. From the next volume, new elements such as themes and new ideas would be incorporated and 4th Volume was the evolutionary point of this transition.',
        image: 'https://res.cloudinary.com/dzerj4bzd/image/upload/v1660380394/AASF%20Website/Screenshot_20220813_141621_nxycai.png',
        pdfLink: 'https://drive.google.com/file/d/1pCe2Zk0xXe1GsLDVE6gbyjJQADWyHRJk/view?usp=drive_link',
        dateOfLaunch: '2014-11-20',
      }
    )
    await Abhishar.updateOrCreate(
      { id: 5 },
      {
        id: 5,
        heading: 'Dive into Smart Technology',
        version: 'v5.0',
        text: 'Bringing many new additions to the Abhishar annual magazine, this Abhishar marked a hallmark in the long running series. The elements introduced in this Abhishar would be later carried on to the new versions we can see even today.',
        image: 'https://res.cloudinary.com/dzerj4bzd/image/upload/v1660379913/AASF%20Website/Screenshot_20220813_140822_drakn3.png',
        pdfLink: 'https://drive.google.com/file/d/12MScMs2Feb3EIYLj3foLpE-uPMiMnXzA/view?usp=drive_link',
        dateOfLaunch: '2015-11-20',
      }
    )
    await Abhishar.updateOrCreate(
      { id: 6 },
      {
        id: 6,
        heading: 'Future Tech',
        version: 'v6.0',
        text: 'Embodying the potential of future technology, this year\'s version aimed at highlighting the advancements in science and technology. The Abhishar aims at bringing to light some of the most recent discoveries and inventions and the future their advancements may bring to us.',
        image: 'https://res.cloudinary.com/dzerj4bzd/image/upload/v1660314296/AASF%20Website/Screenshot_20220812_195447_dveesh.png',
        pdfLink: 'https://drive.google.com/file/d/1G4bnm2-yui1pvKlXnQnLRnuv3YtDrDht/view?usp=drive_link',
        dateOfLaunch: '2016-11-20',
      }
    )
    await Abhishar.updateOrCreate(
      { id: 7 },
      {
        id: 7,
        heading: 'The Evolution of the Video Games',
        version: 'v7.0',
        text: 'Video games have been an integral part of many children\'s life and this Abhishar aspires to be the same. Filled with articles that will make your heart resonate, this Abhishar has a lot in store.',
        image: 'https://res.cloudinary.com/dzerj4bzd/image/upload/v1659962357/AASF%20Website/Screenshot_20220808_180906_po6vyq.png',
        pdfLink: 'https://drive.google.com/file/d/1nMwj3NTkaha6S4lH4TWtfQZrINl5PVk4/view?usp=drive_link',
        dateOfLaunch: '2017-11-20',
      }
    )
    await Abhishar.updateOrCreate(
      { id: 8 },
      {
        id: 8,
        heading: 'Into the Cosmos',
        version: 'v8.0',
        text: 'Filled with wonders and marvels just like the cosmos, Abhishar v8.0 brings you an etheral otherwordly experience. Join the star authors whose articles are bound to give you a supernova.',
        image: 'https://res.cloudinary.com/dzerj4bzd/image/upload/v1659960888/AASF%20Website/Screenshot_20220808_174437_nd8rkj.png',
        pdfLink: 'https://drive.google.com/file/d/1iIRmQJSpzF6Q1xdkb14gfIqVPJU35v8J/view?usp=drive_link',
        dateOfLaunch: '2018-11-20',
      }
    )
    await Abhishar.updateOrCreate(
      { id: 9 },
      {
        id: 9,
        heading: 'Era of the 90\'s Kids',
        version: 'v9.0',
        text: 'Filled with nostalgia, this version is packed with the memories of the pop culture of 90\'s kids in India. Pokemon, Mister Bean and Scooby Doo, it has something for everyone to enjoy.',
        image: 'https://res.cloudinary.com/dzerj4bzd/image/upload/v1659621749/AASF%20Website/Screenshot_20220804_193132_i0ffsg.png',
        pdfLink: 'https://drive.google.com/file/d/1QmODSqn8cQ58bXnIz0UbLaUbLw0_ypWF/view?usp=drive_link',
        dateOfLaunch: '2019-11-20',
      }
    )
    await Abhishar.updateOrCreate(
      { id: 10 },
      {
        id: 10,
        heading: 'Unfolding the Sci-Fi Chronicles',
        version: 'v10.0',
        text: 'The theme embodied the power of science and technology. This version also proved that even amid the pandemic, Team AASF worked religiously to carry on the spirit of Abhishar by doing a virtual launch.',
        image: 'https://res.cloudinary.com/dzerj4bzd/image/upload/v1659612502/AASF%20Website/Screenshot_20220804_165800_suomfe.png',
        pdfLink: 'https://drive.google.com/file/d/1EHiBIR_3snaavOmkw1DGipKeJCtPIMax/view?usp=drive_link',
        dateOfLaunch: '2020-11-20',
      }
    )
    await Abhishar.updateOrCreate(
      { id: 11 },
      {
        id: 11,
        heading: 'A Jog Down the Sports Lane',
        version: 'v11.0',
        text: 'The theme of Abhishar this year was representative of the sportsmanship and spirit of physical activities. It also marked the second online Abhishar launch.',
        image: 'https://res.cloudinary.com/dzerj4bzd/image/upload/v1655749782/AASF%20Website/abihsharcard-image_reivd1.png',
        pdfLink: 'https://drive.google.com/file/d/1VuSPwrcyE63xmcgAc2sklnkxhsLYvw4O/view?usp=drive_link',
        dateOfLaunch: '2021-11-20',
      }
    )
    await Abhishar.updateOrCreate(
      { id: 12 },
      {
        id: 12,
        heading: 'Reminiscing the Republic of India',
        version: 'v12.0',
        text: 'The focus this year was to celebrate 75 years of Indian Independence through Abhishar. This was also the first offline launch of Abhishar after two years of virtual launches. It was certainly a spectacle to behold.',
        image: 'https://res.cloudinary.com/dzerj4bzd/image/upload/v1673347708/AASF%20Website/Screenshot_from_2023-01-10_16-17-44_p1gdml.png',
        pdfLink: 'https://drive.google.com/file/d/1L2LjO5KXmUnZMLSllQHT_u5DpakOb58S/view?usp=drive_link',
        dateOfLaunch: '2022-11-20',
      }
    )
  }
}
