import { DateTime } from 'luxon'

export type PayloadReminderCreate = {
  title?: string
  description?: string
  finish?: boolean
  notified_mail?: boolean
  date_end?: DateTime
}
