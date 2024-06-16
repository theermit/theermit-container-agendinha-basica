const express = require('express');
const router = express.Router();

const contatoController = require("../controllers/contatoController");

const userController = require("../controllers/userController");

const contato_inc_edit_middleware = require("../middlewares/contatoMiddleware");

const logar_middleware = require("../middlewares/logarMiddleware");

const cadastrar_middleware = require("../middlewares/cadastrarMiddleware");

const verificarTokenMiddleware = require("../middlewares/verificarTokenMiddleware");

//rotas
//index -> lista de contatos
router.get("/lista", verificarTokenMiddleware, contatoController.exibir_lista);

router.get("/selecionar_contato/:contato_id", verificarTokenMiddleware,  contatoController.selecionar_contato);
// processar_incluir_novo_contato
router.post("/incluir_contato",  verificarTokenMiddleware, contato_inc_edit_middleware, contatoController.incluir_novo_contato);

// processar_editar_contato
router.put("/editar_contato/:contato_id", verificarTokenMiddleware, contato_inc_edit_middleware, contatoController.editar_contato);

router.delete("/apagar_contato/:contato_id", verificarTokenMiddleware, contatoController.apagar_contato);

//usuario

router.post("/consultar_email", userController.consultar_email);

router.post("/login", logar_middleware,  userController.logar);

router.post("/cadastrarusuario", cadastrar_middleware, userController.cadastrar_usuario);

module.exports = router;

