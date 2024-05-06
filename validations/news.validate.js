import vine from '@vinejs/vine'
import { CustomErrorReporter } from './CustomError.reporter.js';


//custom Error reportter
vine.errorReporter = () => new CustomErrorReporter(); 


export const newsSchema = vine.object({
    title: vine.string(),
    content: vine.string(),
    image: vine.string()
})
