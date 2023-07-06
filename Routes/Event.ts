import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('/', 'Event/EventsController').middleware({ store: ['auth', 'admin'], update: ['auth', 'admin'], destroy: ['auth', 'admin'] })
  Route.resource('/image', 'Event/EventImagesController').middleware({ '*': ['auth', 'admin'] })
  Route.resource('/sub-events', 'Event/SubEventsController').middleware({ store: ['auth', 'admin'], update: ['auth', 'admin'], destroy: ['auth', 'admin'] })
}).prefix('events')
