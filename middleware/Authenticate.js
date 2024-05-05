import jsonwebtoken from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log(authHeader)
        const token = authHeader && authHeader.split(' ')[1];
        console.log(token)
        if (!token) return res.status(401).json({ message: 'Access Denied' });
        const verified = jsonwebtoken.verify(token, process.env.jwt_TOKEN_SECRET);
        req.user = verified;
        next();
    } 
    catch (error) {
        return res.status(401).json({ e:error ,message: 'Unauthorized' });
    }
}

export default authMiddleware;