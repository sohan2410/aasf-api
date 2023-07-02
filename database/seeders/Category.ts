import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Category from 'App/Models/Category'

export default class extends BaseSeeder {
  public async run() {
    await Category.updateOrCreate({ name: 'technical' }, { id: 1, name: 'technical' })
    await Category.updateOrCreate({ name: 'oratory' }, { id: 2, name: 'oratory' })
    await Category.updateOrCreate({ name: 'managerial' }, { id: 3, name: 'managerial' })
  }
}
