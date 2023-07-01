import Route from '@ioc:Adonis/Core/Route'
import '../Routes/Auth'

Route.get('/', async ({ view }) => {
  return view.render('index')
})
