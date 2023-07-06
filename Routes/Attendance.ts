import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/attendance', 'AttendanceController.store').middleware('auth')
  Route.get('/qr/:id/:day', 'AttendanceController.index').middleware('admin')
  Route.post('/attendance/upload', 'AttendanceController.upload').middleware('admin')
  // .middleware(['auth', 'admin'])
})
