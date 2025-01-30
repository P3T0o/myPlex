import vine from '@vinejs/vine'

// Création du validateur
export const CreateUserValidator = vine.compile(
  vine.object({
    full_name: vine.string().trim().minLength(3).maxLength(255),
    email: vine.string().email().unique({ table: 'users', column: 'email' }),
    password: vine.string().trim().minLength(6),
  })
)
