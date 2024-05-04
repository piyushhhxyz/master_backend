import vine from '@vinejs/vine'
import { CustomErrorReporter } from './CustomError.reporter.js'

//custom Error reportter
vine.errorReporter = () => new CustomErrorReporter(); 

export const registerSchema = vine.object({
    name: vine.string(),
    email: vine.string().email(),
    password: vine.string().minLength(6).maxLength(32).confirmed()
})

