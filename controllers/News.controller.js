import vine, { errors } from "@vinejs/vine";
import prisma from "../config/db.config.js";
import { newsSchema } from "../validations/news.validate.js";

class NewsController {
    static async index(req, res) {
        try {
            const news = await prisma.news.findMany();
            res.json({ status: 200, news });
        } catch (error) {
            res.status(500).json({ message: 'something went wrong chacha' });
        }
    }

    static async store(req, res) {
        try {
            const user = req.user;
            const body = req.body;

            if(!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).json({ message: 'No files were uploaded.' });
            }

            const image = req.files.image;
            const mimeType = file.mimetype;
            const allowedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
            if (!allowedMimeTypes.includes(mimeType)) {
                return res.status(400).json({ message: 'Invalid file type' });
            }
            const fileSize = image.size / 1024 / 1024;
            if (fileSize > 2) {
                return res.status(400).json({ message: 'File size too large' });
            }

            //generate a new file name using just uuid v4 and same extension
            const imgExt = image.name.split('.').pop();
            const newImgName = `${uuidv4()}.${imgExt}`;

            image.mv(`public/img/${newImgName}`, (err) => {
                if (err) return res.status(500).json({ message: 'IMG upload failed' });
            });
            
            body.image = newImgName;
            const validator = vine.compile(newsSchema)
            const payload = await validator.validate(body)
            const news = await prisma.news.create({
                data: {
                    title: payload.title,
                    content: payload.content,
                    image: payload.image,
                    user_id: user.id
                } 
            });
            res.json({ status: 200, news });
        }
        catch (error) {
            if (error instanceof errors.E_VALIDATION_ERROR) res.status(400).json({ errors: error.messages });
            else res.status(500).json({ message: 'something went wrong chacha' });
        }
    }

    static async show(req, res) {
        const id = req.params.id;
        const news = await prisma.news.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        res.json({ status: 200, news });
    }

    static async update(req, res) {
    }

    static async destroy(req, res) {
    }
}

export default NewsController;