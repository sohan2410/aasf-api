import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('user', 'UsersController.uploadUsers').middleware(['auth', 'admin']
  Route.patch('user', 'UsersController.update').middleware('auth')
  Route.get('user', 'UsersController.index').middleware('auth')
  Route.post('user/add-admin', 'Auth/AdminController.store').middleware(['auth', 'admin'])
  Route.get('user/leaderboard', 'UsersController.leaderboard').middleware('auth')
  Route.get('user/statistics', 'UsersController.statistics').middleware('auth')
  Route.get('user/achievements', 'UsersController.achievements').middleware('auth')
})
