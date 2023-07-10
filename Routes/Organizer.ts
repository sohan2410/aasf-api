import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/organizers', 'OrganizersController.store')
  Route.patch('/organizers/:id', 'OrganizersController.update')
  Route.delete('/organizers/:id', 'OrganizersController.destroy') 
})