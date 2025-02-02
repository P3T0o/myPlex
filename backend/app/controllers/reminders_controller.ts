import type { HttpContext } from '@adonisjs/core/http'
import Reminder from '#models/reminder'
import Tag from '#models/tag'
import User from '#models/user'
import {AccessToken} from "@adonisjs/auth/access_tokens";

export default class RemindersController {
  /**
   * Methode pour qu'un utilisateur puisse créer un reminder avec des tags
   */
  public async userCreateReminder({ request, response, auth }: HttpContext): Promise<void> {
    const user: User = await auth.authenticate()
    if (!user) {
      return response.unauthorized({ message: 'Utilisateur non authentifié.' })
    }

    const { title, description, tags } = request.only(['title', 'description', 'tags'])

    // Création du reminder
    const reminder: Reminder = await Reminder.create({
      title,
      description,
      userId: user.id,
    })

    if (tags && tags.length > 0) {
      const tagInstances: any[] = await Promise.all(
        tags.map(async (tagName: string): Promise<Tag> => {
          const existingTag: Tag | null = await Tag.findBy('title', tagName)
          return existingTag ?? (await Tag.create({ title: tagName }))
        })
      )
      await reminder.related('tags').attach(tagInstances.map((tag) => tag.id))
    }

    return response.created(reminder)
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
