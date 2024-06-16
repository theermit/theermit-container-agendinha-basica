module.exports = (req, res, next) => {
    if(req.body.nome.length == 0 || req.body.telefone.length == 0)
        return res.status(400).json({message: 'bad request'});
    else 
        next();
};