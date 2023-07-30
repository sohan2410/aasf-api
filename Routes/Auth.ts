import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/register', 'Auth/RegistersController.store')
  Route.post('/login', 'Auth/LoginController.store')
  Route.post('/reset-password', 'Auth/ResetPasswordsController.store').middleware('auth')
  Route.post('/forgot-password', 'Auth/ForgetPasswordsController.store')
  Route.get('/forgot-password/:email', 'Auth/ForgetPasswordsController.verifySignedUrl').as('forgotPassword')
  Route.patch('/forgot-password/:email', 'Auth/ForgetPasswordsController.changePassword')
  Route.delete('/logout', 'Auth/LoginController.destroy').middleware('auth')
  Route.get('/user', 'Auth/LoginController.index').middleware('auth')
}).prefix('auth')
