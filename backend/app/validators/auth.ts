import vine from '@vinejs/vine'

// Création du validateur
export const CreateUserValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(255),
    email: vine.string().email().unique({ table: 'users', column: 'email' }),
    password: vine.string().trim().minLength(6),
  })
)

export const LoginValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().trim().minLength(6),
  })
)

export const UpdateUserValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(255).optional(),
    email: vine.string().email().unique({ table: 'users', column: 'email' }),
    password: vine.string().trim().minLength(6).optional(),
  })
)
