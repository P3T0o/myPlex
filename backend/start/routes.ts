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
        router.get('/me', '#controllers/auth_controller.me').use(middleware.auth())
        router.delete('/me', '#controllers/auth_controller.deleteMe').use(middleware.auth())
        router.post('/logout', '#controllers/auth_controller.logout').use(middleware.auth())
        router.patch('/me', '#controllers/auth_controller.updateMe').use(middleware.auth())
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
        router
          .get('/:id', '#controllers/reminders_controller.showMyReminder')
          .use(middleware.auth())
        router
          .patch('/:id', '#controllers/reminders_controller.updateMyReminder')
          .use(middleware.auth())
        router
          .delete('/:id', '#controllers/reminders_controller.destroyMyReminder')
          .use(middleware.auth())
      })
      .prefix('reminders')
  })
  .prefix('api')
