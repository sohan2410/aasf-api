import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import Route from '@ioc:Adonis/Core/Route'
import '../Routes/Auth'
import '../Routes/Event'
import '../Routes/Blog'
import '../Routes/Abhishar'
import '../Routes/User'
import '../Routes/Attendance'
import '../Routes/ReportBug'
Route.get('/', async ({}) => {
  return { message: 'Server is up and running' }
})
Route.get('/favicon.ico', ({ response }) => response.status(204))

Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy ? response.ok(report) : response.badRequest(report)
})
