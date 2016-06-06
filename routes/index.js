var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var moment = require('moment');


var middlewareAuth = function(request, response, next){
    var token = request.query.token || request.headers['x-acess-token'];
    if(!token){
        var err = new Error('Forbidden');
        err.status = 403;
        return next(err);
    }
    try{
        var decoded = jwt.decode(token, 'segredo');
        var isExpired = moment(decoded.exp).isBefore(new Date());
        if(isExpired){
            var err = new Error('Unauthorized');
            err.status = 401;
            return next(err);
        }else {
            request.user = decoded.user;
            next();
        }
    } catch(err){
        return next(err);
    }
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'GOP Suprema'});
});

router.post('/', function(req, res, next){
  var user = req.body.user;
  var pass = req.body.pass;

  if(user === 'admin' && pass === 'gop2016'){
    var expires = moment().add(1, 'days').valueOf();
    var token = jwt.encode({
      user: user,
      exp: expires
    }, 'controleUrbano');

    res.json({
      token: token
    });

  }else{
    var err = new Error('Unauthorized');
    err.status = 401;
    next(err);
  }

})

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
