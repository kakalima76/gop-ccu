var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'GOP Suprema'});
});

router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Página de Escala'});
});

router.get('/ordem', function(req, res, next) {
  res.render('ordem', { title: 'Ordem de Serviço'});
});

router.get('/imprimir', function(req, res, next) {
  res.render('imprimir', { title: 'Página de impressão'});
});

router.get('/chefia', function(req, res, next) {
  res.render('templates/chefia');
});

router.get('/equipes', function(req, res, next) {
  res.render('templates/equipes');
});

router.get('/viaturas', function(req, res, next) {
  res.render('templates/viaturas');
});

router.get('/ordens', function(req, res, next) {
  res.render('templates/ordens');
});

router.get('/cadastrar', function(req, res, next) {
  res.render('cadastrar', { title: 'Página de cadastro'});
});

router.get('/trocar', function(req, res, next) {
  res.render('trocar', { title: 'Trocar agentes'});
});

router.get('/agentes', function(req, res, next) {
  res.render('templates/agentes');
});


router.get('/agentesTrocar', function(req, res, next) {
  res.render('templates/agentesTrocar');
});

router.get('/chefiaTrocar', function(req, res, next) {
  res.render('templates/chefiaTrocar');
});

router.get('/atualizar', function(req, res, next) {
  res.render('atualizar', { title: 'Atualizar O.S'});
});







module.exports = router;
