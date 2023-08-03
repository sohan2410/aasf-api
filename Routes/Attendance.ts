import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/attendance', 'AttendanceController.store').middleware('auth')
  Route.get('/qr/:id/:day', 'AttendanceController.index').middleware('auth')
  Route.post('/attendance/upload', 'AttendanceController.upload').middleware(['auth', 'admin'])
})
