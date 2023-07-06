import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('/', 'EventsController').middleware({ store: ['auth', 'admin'], update: ['auth', 'admin'], destroy: ['auth', 'admin'] })
  Route.resource('/image', 'EventImages').middleware({ '*': ['auth', 'admin'] })
}).prefix('events')
