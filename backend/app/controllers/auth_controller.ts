import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import { CreateUserValidator, LoginValidator } from '#validators/auth'
import { PayloadUserLogin, PayloadUserRegister } from '../type/users_type.js'
import { AccessToken } from '@adonisjs/auth/access_tokens'

export default class AuthController {
  /**
   * Inscription (Register)
   */
  public async register({ request, response }: HttpContext): Promise<any> {
    const payload: PayloadUserRegister = await request.validateUsing(CreateUserValidator)

    // Création de l'utilisateur
    const user: User = await User.create(payload)

    const token: AccessToken = await User.accessTokens.create(user)

    return response.created({ message: 'Utilisateur créé avec succès', user: user, token: token })
  }

  /**
   * Connexion (Login)
   */
  public async login({ request, response }: HttpContext): Promise<any> {
    const payload: PayloadUserLogin = await request.validateUsing(LoginValidator)

    // Vérification de l'utilisateur
    const user: User | null = await User.findBy('email', payload.email)
    if (!user) {
      return response.unauthorized({ message: 'Email ou mot de passe incorrect' })
    }
    // Vérification du mot de passe
    const passwordValid: boolean = await hash.verify(user.password, payload.password)
    if (!passwordValid) {
      return response.unauthorized({ message: 'Email ou mot de passe incorrect' })
    }

    // Génération du token
    const token = await User.accessTokens.create(user)

    return response.ok({ message: 'Connexion réussie', token })
  }

  /**
   * Déconnexion (Logout)
   */
  public async logout({ auth, response }: HttpContext): Promise<any> {
    const user: User & { currentAccessToken: AccessToken } = await auth.authenticate()
    const token: string | number | BigInt = user.currentAccessToken.identifier

    if (!token) {
      return response.unauthorized('Token invalide')
    }

    await User.accessTokens.delete(user, token)

    return response.ok({ message: 'Déconnexion réussie' })
  }
}
