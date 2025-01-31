import type { HttpContext } from '@adonisjs/core/http'
import Reminder from '#models/reminder'
import Tag from '#models/tag'
import User from '#models/user'

export default class RemindersController {
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
}
