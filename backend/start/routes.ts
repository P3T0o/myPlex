/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    // Routes AUTH
    router
      .group(() => {
        router.post('/register', '#controllers/auth_controller.register')
        router.post('/login', '#controllers/auth_controller.login')
        router.post('/logout', '#controllers/auth_controller.logout').use(middleware.auth())
      })
      .prefix('auth')
    // Routes USERS
    router
      .group(() => {
        router.post('/', '#controllers/users_controller.store') // Admin
        router.get('/', '#controllers/users_controller.index') // Admin
      })
      .prefix('users')
    // Routes REMINDERS
    router
      .group(() => {
        router
          .post('/', '#controllers/reminders_controller.userCreateReminder')
          .use(middleware.auth())
        router.get('/me', '#controllers/reminders_controller.myReminders').use(middleware.auth())
      })
      .prefix('reminders')
  })
  .prefix('api')
