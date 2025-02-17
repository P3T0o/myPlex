import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { CreateUserValidator } from '#validators/auth'
import { PayloadUserRegister } from '../type/users_type.js'

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
  public async index({ response }: HttpContext): Promise<void> {
    const users: User[] = await User.all()
    return response.ok(users)
  }
}
