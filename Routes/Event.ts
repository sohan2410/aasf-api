import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/', 'EventsController.store').middleware(['auth', 'admin'])
  Route.get('/', 'EventsController.index')
  Route.patch('/:id', 'EventsController.update').middleware(['auth', 'admin'])
  Route.delete('/:id', 'EventsController.destroy').middleware(['auth', 'admin'])
}).prefix('events')
