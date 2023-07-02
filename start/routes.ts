import Route from '@ioc:Adonis/Core/Route'
import '../Routes/Auth'
import '../Routes/Event'
import '../Routes/Blog'
Route.get('/', async ({ view }) => {
  return view.render('index')
})
