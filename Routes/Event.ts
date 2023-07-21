import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('events/timeline', 'Event/EventsController.timeline')
  Route.resource('events', 'Event/EventsController').middleware({ store: ['auth', 'admin'], update: ['auth', 'admin'], destroy: ['auth', 'admin'] })
  Route.resource('events/images', 'Event/EventImagesController')
  Route.resource('events/sub-events', 'Event/SubEventsController')
  Route.resource('events/organizers', 'OrganizersController')
})

// .middleware({ '*': ['auth', 'admin'] })

// .middleware({ store: ['auth', 'admin'], update: ['auth', 'admin'],destroy: ['auth', 'admin']  })
