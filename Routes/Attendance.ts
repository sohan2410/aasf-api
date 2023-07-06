import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/attendance', 'AttendanceController.store').middleware('auth')
  Route.get('/qr/:id/:day', 'AttendanceController.index').middleware(['auth', 'admin'])
  Route.post('/attendance/upload', 'AttendanceController.upload').middleware(['auth', 'admin'])
  // .middleware(['auth', 'admin'])
})
