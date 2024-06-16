const bdService = require("../services/bdService");
module.exports = async (req, res, next) => {
    const email = req.body.email;
    var email_ja_esta_cadastrado = false;
    var senhas_nao_conferem = false;
    var bad_request = false;
    try
    {
        usuario = await bdService.Usuario
        .findOne({
            where: {
                email: email
            }
        });

        if(usuario != null)
        {
            return res.status(400).json({ message: 'Email já cadastrado' });
        }

        if(!req.body.nome || !req.body.senha || !req.body.confirmacao_senha)
        {
            return res.status(400).json({ message: 'Requisição inválida' });
        } 

        if(req.body.senha != req.body.confirmacao_senha)
        {
            return res.status(400).json({ message: 'Senhas não conferem' });
        }

        next();
    }
    catch(err)
    {
        return res.status(500).json({ message: "Falha na consulta ao banco de dados!" });
    }
};