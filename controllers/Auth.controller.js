// VineJS is an ESM only package and will not work with the CommonJS module system



import prisma from '../config/db.config.js';
import vine, { errors } from '@vinejs/vine';
import { registerSchema } from '../validations/auth.validate.js';

async function register(req, res) {
    const data = {
        username: 'virk',
        email: 'virk@example.com',
        password: 'secreteeeee',
        password_confirmation: 'secreteeeee',
    }
    try {
        const body = req.body;
        const validator = vine.compile(registerSchema)
        const paylod = await validator.validate(body)
        res.json({ paylod });
    } catch(error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            res.status(400).json({ errors: error.messages });
        }
    }
}

export default { register };
