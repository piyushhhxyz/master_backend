// VineJS is an ESM only package and will not work with the CommonJS module system

import prisma from '../config/db.config.js';
import vine, { errors } from '@vinejs/vine';
import { registerSchema,loginSchema } from '../validations/auth.validate.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



class AuthControllers {
    static async register(req, res) {
        try {
            const body = req.body;
            const validator = vine.compile(registerSchema)
            const payload = await validator.validate(body)
    
            // check if email already exists
            const emailExists = await prisma.users.findUnique({ 
                where: { 
                    email: payload.email
                }
            });
            if (emailExists) return res.status(400).json({ message: 'Email already exists' });
    
    
            const salt = await bcrypt.genSalt(10);
            payload.password = await bcrypt.hash(payload.password, salt);
            const user = await prisma.users.create({ data: payload });
            res.json({ status:200, message:"User creation success", user });
        } 
        catch(error) {
            if (error instanceof errors.E_VALIDATION_ERROR) res.status(400).json({ errors: error.messages });
            else res.status(500).json({ message: 'something went wrong chacha' });
        }
    }

    static async login(req, res) {
        try{
            const body = req.body;
            const validator = vine.compile(loginSchema)
            const payload = await validator.validate(body)

            const findUser = await prisma.users.findUnique({ 
                where: { 
                    email: payload.email
                }
            });
            if (!findUser) return res.status(400).json({ message: 'No suc User' });

            const validPassword = await bcrypt.compare(payload.password, findUser.password);
            if (!validPassword) return res.status(400).json({ message: 'Invalid Password' });

            // issue token to user
            const payloadData = { 
                id: findUser.id, 
                name: findUser.name,
                email: findUser.email,
                profile: findUser.profile,
            };
            const token = await jwt.sign(payloadData, process.env.jwt_TOKEN_SECRET, 
                { expiresIn: '365d' }
            );
            findUser.jwt_token = token;

            res.json({ status:200, access_token:`Bearer ${token}` });
        }
        catch(error) {
            if (error instanceof errors.E_VALIDATION_ERROR) res.status(400).json({ errors: error.messages });
            else res.status(500).json({ message: 'something went wrong chacha' });
        }
    }
}
    

export default AuthControllers;
