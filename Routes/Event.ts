import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('events/timeline', 'Event/EventsController.timeline').middleware('auth')
  Route.resource('events', 'Event/EventsController').middleware({index:['auth'], store: ['auth', 'admin'], update: ['auth', 'admin'], destroy: ['auth', 'admin'] })
  Route.resource('events/images', 'Event/EventImagesController').middleware({ '*': ['auth', 'admin'] })
  Route.resource('events/sub-events', 'Event/SubEventsController').middleware({ '*': ['auth', 'admin'] })
  Route.resource('events/organizers', 'OrganizersController').middleware({ '*': ['auth', 'admin'] })
})
