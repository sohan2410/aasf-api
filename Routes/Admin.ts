import Route from '@ioc:Adonis/Core/Route'

// Reset password of all users (only for admin) 
Route.group(() => {
    Route.patch('/admin/auth/password', 'Auth/ForgetPasswordsController.adminChangePassword').middleware(['auth', 'admin'])
})
