import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('events/timeline', 'Event/EventsController.timeline')
  Route.resource('events', 'Event/EventsController')
  Route.resource('events/images', 'Event/EventImagesController')
  Route.resource('events/sub-events', 'Event/SubEventsController')
  Route.resource('/events/organizers','OrganizersController')
})

// .middleware({ store: ['auth', 'admin'], update: ['auth', 'admin'], destroy: ['auth', 'admin'] })

// .middleware({ '*': ['auth', 'admin'] })

// .middleware({ store: ['auth', 'admin'], update: ['auth', 'admin'],destroy: ['auth', 'admin']  })
