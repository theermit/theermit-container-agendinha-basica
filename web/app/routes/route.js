const express = require('express');
const router = express.Router();

const contatoController = require("../controllers/contatoController");

const userController = require("../controllers/userController");

const contato_inc_edit_middleware = require("../middlewares/contatoMiddleware");

const logado_middleware = require("../middlewares/logadoMiddleware");

const logar_middleware = require("../middlewares/logarMiddleware");

const cadastrar_middleware = require("../middlewares/cadastrarMiddleware");

//rotas
//index -> lista de contatos
router.get("/lista", logado_middleware, contatoController.exibir_lista);

//novo -> novo contato
router.get("/novo", logado_middleware, contatoController.exibir_form_novo);

// processar_incluir_novo_contato
router.post("/incluir_contato", logado_middleware, contato_inc_edit_middleware, contatoController.processar_incluir_novo_contato);

//editar -> edita contato
router.get("/editar/:contato_id", logado_middleware, contatoController.exibir_form_editar);

// processar_editar_contato
router.post("/editar_contato", logado_middleware, contato_inc_edit_middleware, contatoController.processar_editar_contato);

//apagar -> apaga contato
router.get("/apagar/:contato_id", logado_middleware, contatoController.exibir_form_apagar_contato);

router.post("/apagar_contato", logado_middleware, contatoController.processar_apagar_contato);

//usuario

router.get("/logar", userController.logar);

router.get("/cadastrar", userController.cadastrar);

router.post("/efetuar_login", logar_middleware, userController.processar_logar);

router.post("/efetuar_cadastro", cadastrar_middleware, userController.processar_cadastro);

module.exports = router;