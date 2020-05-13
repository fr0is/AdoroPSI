var express = require('express');
var router = express.Router();

//Controllers
var quarto_controller = require('../controllers/quartoController');
var hotel_controller = require('../controllers/hotelController');
var utilizador_controller = require('../controllers/utilizadorController');
var cartaoMB_controller = require('../controllers/cartaoMBController');
var morada_controller = require('../controllers/moradaController');

router.get('/hoteis', hotel_controller.hotel_list); // lista de hoteis
router.get('/hoteis/:hotelId', hotel_controller.hotel_detail); // hotel
router.get('/hoteis/:hotelId/quartos', quarto_controller.room_list); // lista de quartos de um hotel
router.get('/hoteis/:hotelId/quartos/:quartoId', quarto_controller.quarto_detail); // quarto
router.get('/users/:email', utilizador_controller.utilizador_get); // user get
router.post('/users/create', utilizador_controller.utilizador_create); //user create
router.post('/users/update', utilizador_controller.utilizador_update); //user update
router.get('/users/:userEmail/cartoes', cartaoMB_controller.cartaoMb_get_cartao_email); //cartao get email
router.get('/users/reserva/:cartaoId', cartaoMB_controller.cartaoMb_get); //cartao get id
router.post('/users/cartao/create', cartaoMB_controller.cartaoMb_create); //cartao create
router.post('/users/cartao/delete', cartaoMB_controller.cartaoMb_delete); //cartao delete
router.get('/users/:userEmail/moradas', morada_controller.morada_get_email); //cartao get email
router.get('/users/reserva/:moradaId', morada_controller.morada_get); //cartao get id
router.post('/users/morada/create', morada_controller.morada_create); //cartao create
router.post('/users/morada/delete', morada_controller.morada_delete); //cartao delete

module.exports = router;