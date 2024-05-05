import { v4 as uuidv4 } from 'uuid';
import prisma from '../config/db.config.js';

class ProfileController {
    static async index(req, res) {
        const user = req.user; 
        res.json({ status:200, user });
    }

    static async store(req, res) {
    }

    static async show(req, res) {
    }

    static async update(req, res) {
        const {id} = req.params;
        const user = req.user;
         
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: 'No files were uploaded.' });
        } 

        const file = req.files.profile;
        const mimeType = file.mimetype;

        const allowedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
        if (!allowedMimeTypes.includes(mimeType)) {
            return res.status(400).json({ message: 'Invalid file type' });
        }
        const fileSize = file.size / 1024 / 1024;
        if (fileSize > 2) {
            return res.status(400).json({ message: 'File size too large' });
        }

        //generate a new file name using just uuid v4 and same extension
        const imgExt = file.name.split('.').pop();
        const newFileName = `${uuidv4()}.${imgExt}`;

        file.mv(`public/img/${newFileName}`, (err) => {
            if (err) return res.status(500).json({ message: 'File upload failed' });
        });

        await prisma.users.update({
            data: {
                profile: newFileName
            },
            where: { 
                id:Number(id) 
            }  
        });
        res.json({ status:200, newFileName, mimeType, fileSize });
        
    }

    static async destroy(req, res) {
    } 
}

export default ProfileController;