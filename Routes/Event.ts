import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('/', 'Event/EventsController')
  Route.resource('/image', 'Event/EventImagesController')
  Route.resource('/sub-events', 'Event/SubEventsController')
}).prefix('events')


// .middleware({ store: ['auth', 'admin'], update: ['auth', 'admin'], destroy: ['auth', 'admin'] })

// .middleware({ '*': ['auth', 'admin'] })

// .middleware({ store: ['auth', 'admin'], update: ['auth', 'admin'],destroy: ['auth', 'admin']  })