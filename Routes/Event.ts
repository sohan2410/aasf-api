import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('events', 'Event/EventsController')
  Route.resource('events/images', 'Event/EventImagesController')
  Route.resource('events/sub-events', 'Event/SubEventsController')
})

// .middleware({ store: ['auth', 'admin'], update: ['auth', 'admin'], destroy: ['auth', 'admin'] })

// .middleware({ '*': ['auth', 'admin'] })

// .middleware({ store: ['auth', 'admin'], update: ['auth', 'admin'],destroy: ['auth', 'admin']  })
