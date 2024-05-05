import express from 'express';
import fileUpload from 'express-fileupload';
import ApiRoutes from './routes/api.js';


const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.get('/', (_, res) => res.json({ message: 'Hello World!' }));
app.use('/api', ApiRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}`));
