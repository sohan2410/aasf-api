import Route from '@ioc:Adonis/Core/Route'
import '../Routes/Auth'
import '../Routes/Event'
import '../Routes/Blog'
import '../Routes/Abhishar'
Route.get('/', async ({}) => {
  return { message: 'Server is up and running' }
})
