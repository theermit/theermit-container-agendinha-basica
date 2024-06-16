module.exports = (req, res, next) => {
    if(!req.body.email || !req.body.senha)
    {
        return res.status(400).end();
    }
    else 
        next();
};