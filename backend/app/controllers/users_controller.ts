import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { CreateUserValidator } from '#validators/create_user'

export default class UsersController {
  public async store({ request, response }: HttpContext) {
    try {
      // Validation des données envoyées dans la requête
      const payload = await request.validateUsing(CreateUserValidator)

      // Création de l'utilisateur
      const user = await User.create(payload)
      return response.created(user)
    } catch (error) {
      // Renvoi des messages d'erreur personnalisés
      return response.badRequest({
        message: 'Erreur de validation',
        errors: error.messages, // Les erreurs doivent inclure les messages personnalisés
      })
    }
  }

  public async index({ response }: HttpContext) {
    const users = await User.all()
    return response.ok(users)
  }
}
