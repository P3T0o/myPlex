/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    // Routes USERS
    router
      .group(() => {
        router.post('/register', '#controllers/auth_controller.register')
        router.post('/login', '#controllers/auth_controller.login')
        router.post('/logout', '#controllers/auth_controller.logout')
      })
      .prefix('auth')
    router
      .group(() => {
        router.post('/', '#controllers/users_controller.store') // Admin
        router.get('/', '#controllers/users_controller.index') // Admin
      })
      .prefix('user')
    // Routes REMINDERS
    router
      .group(() => {
        router.post('/', '#controllers/reminders_controller.userCreateReminder')
      })
      .prefix('reminders')
  })
  .prefix('api')
