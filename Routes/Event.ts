import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('events', 'Event/EventsController')
  Route.post('events/image/:id', 'Event/EventImagesController.store')
  Route.delete('events/image/:id', 'Event/EventImagesController.destroy')
  Route.resource('events/sub-events', 'Event/SubEventsController')
})

// .middleware({ store: ['auth', 'admin'], update: ['auth', 'admin'], destroy: ['auth', 'admin'] })

// .middleware({ '*': ['auth', 'admin'] })

// .middleware({ store: ['auth', 'admin'], update: ['auth', 'admin'],destroy: ['auth', 'admin']  })
