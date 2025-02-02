import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { CreateUserValidator } from '#validators/auth'
import { PayloadUserRegister } from '../type/users_type.js'
import Reminder from '#models/reminder'
import { AccessToken } from '@adonisjs/auth/access_tokens'

export default class UsersController {
  /**
   * Création d'un user (store)
   */
  public async store({ request, response }: HttpContext): Promise<void> {
    try {
      // Validation des données envoyées dans la requête
      const payload: PayloadUserRegister = await request.validateUsing(CreateUserValidator)

      // Création de l'utilisateur
      const user: User = await User.create(payload)
      return response.created(user)
    } catch (error) {
      // Renvoi des messages d'erreur personnalisés
      return response.badRequest({
        message: 'Erreur de validation',
        errors: error.messages, // Les erreurs doivent inclure les messages personnalisés
      })
    }
  }

  /**
   * Get all user (index)
   */
  public async index({ response }: HttpContext) {
    const users: User[] = await User.all()
    return response.ok(users)
  }

  /**
   * Methode pour que l'utilisateur connecté puisse récupérer ses reminders
   */
  public async myReminders({ auth, response }: HttpContext) {
    try {
      // Récupérer l'utilisateur authentifié
      const user: User & { currentAccessToken: AccessToken } = await auth.authenticate()

      if (!user) {
        return response.unauthorized({ message: 'Utilisateur non authentifié' })
      }

      // Récupérer les reminders du user connecté
      const reminders: Reminder[] = await Reminder.query().where('user_id', user.id)

      return response.ok(reminders)
    } catch (error) {
      return response.internalServerError({
        message: 'Erreur lors de la récupération des rappels',
        error: error.message,
      })
    }
  }
}
