import vine from '@vinejs/vine'

export const UpdateReminderValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3).maxLength(255).optional(),
    description: vine.string().trim().optional(),
    finish: vine.boolean().optional(),
    notifiedMail: vine.boolean().optional(),
    dateEnd: vine.date().optional(),
  })
)
