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
  res.render('templates/chefia', { title: 'Página de impressão'});
});

module.exports = router;
