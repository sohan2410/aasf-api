import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.patch('user', 'UsersController.update').middleware('auth')
  Route.get('user', 'UsersController.index').middleware('auth')
  Route.post('user/add-admin', 'Auth/AdminController.store').middleware(['auth', 'admin'])
})
