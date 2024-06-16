module.exports = (req, res, next) => {
    const jwt = require ('jsonwebtoken');
    const token = req.headers['authorization'];
  
    if (!token) {
        return res.status(403).json({ message: 'Token não fornecido' });
    }
    const SECRET_KEY = "ketchup";
    jwt.verify(token, SECRET_KEY, (err, id) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }
        req.id = id.id;
        next();
    });
}
