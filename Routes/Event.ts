import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/', 'EventsController.store').middleware(['auth', 'admin'])
  Route.get('/', 'EventsController.index')
}).prefix('events')
