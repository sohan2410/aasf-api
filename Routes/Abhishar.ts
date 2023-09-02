import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('abhishar', 'AbhisharsController').middleware({ '*': 'auth' })
})
