module.exports = {
    logar: (req, res) => {
        const md5 = require('md5');
        const bdService = require("../services/bdService");
        bdService.Usuario
            .findOne({
                attributes: ['id'],
                where: {
                    email: req.body.email,
                    senha: md5(req.body.senha)
                }
            })
            .then((usuario) => {
                if(!usuario)
                {
                    return res.status(401).json({ message: 'Credenciais inválidas' });
                }
                else 
                {
                    const jwt = require ('jsonwebtoken');
                    const SECRET_KEY = "ketchup";
                    var id = usuario.id;
                    const token = jwt.sign({ id }, SECRET_KEY, { expiresIn: '1h'});
                    return res.json({token});
                }
            })
            .catch((err) => res.status(401).json({ message: 'Credenciais inválidas' }));
    },
    cadastrar_usuario: (req, res) => {
        const bdService = require("../services/bdService");
        const md5 = require('md5');
        bdService.Usuario
            .create({
                nome: req.body.nome,
                email: req.body.email,
                senha: md5(req.body.senha)
            })
            .then(res.status(201).json({ message: "usuário criado"}))
            .catch((err) => res.status(500));
    },
    consultar_email: async (req, res) => {
        const bdService = require("../services/bdService");
        try
        {
            
            let email = await bdService.Usuario
            .findOne({
                attributes: ['email'],
                where: {
                    email: req.body.email
                }
            });
        }
        catch(err)
        {
            res.status(500).end();
        }
    }
};