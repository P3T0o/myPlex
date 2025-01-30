// start/validator.ts
import vine, { SimpleMessagesProvider } from '@vinejs/vine'

console.log('Chargement des messages personnalisés pour la validation') // À vérifier dans les logs

vine.messagesProvider = new SimpleMessagesProvider({
  'required': 'Le champ {{ field }} est requis.',
  'string': 'Le champ {{ field }} doit être une chaîne de caractères.',
  'email': "L'email {{ field }} est invalide.",
  'minLength': 'Le champ {{ field }} doit avoir au moins {{ argument }} caractères.',
  'maxLength': 'Le champ {{ field }} doit avoir au plus {{ argument }} caractères.',

  'database.unique': 'Le champ {{ field }} est déjà utilisé.',
})
