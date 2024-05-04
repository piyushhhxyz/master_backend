import vine from '@vinejs/vine'
import { CustomErrorReporter } from './CustomError.reporter.js'

export const registerSchema = vine.object({
    name: vine.string(),
    email: vine.string().email(),
    password: vine.string().minLength(6).maxLength(32).confirmed()
})