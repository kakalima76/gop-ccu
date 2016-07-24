angular.module('app')

.factory('ordemFactory', ['$q', '$http', function($q, $http){

	var ordem = 

	{
        "status": "ativa",
        "numero": 0,
        "data": "",
        "apresentacao": "",
        "termino": "",
        "agentes": "",
        "viatura": "",
        "chefe": "",
        "acao01": "",
        "acao02": "",
        "acao03": "",
        "acao04": "",
        "acao05": "",
        "acao06": "",
        "acao07": "",
        "equipe": ""
    }



    var getNumero = function(){
	
		return $http.get('http://ccuanexos.herokuapp.com/ordem/ultimo');
	}


    var set = function(numero, data, apresentacao, termino, acao01, acao02, acao03, acao04, acao05, acao06, acao07){
    	ordem.numero = numero;
    	ordem.data = data;
    	ordem.apresentacao = apresentacao;
    	ordem.termino = termino;
    	ordem.acao01 = acao01;
        ordem.acao02 = acao02;
        ordem.acao03 = acao03;
        ordem.acao04 = acao04;
        ordem.acao05 = acao05;
        ordem.acao06 = acao06;
        ordem.acao07 = acao07;
    }

    var setViaturas = function(viatura){
    	ordem.viatura = viatura;
    }

    var setEquipe = function(equipe){
    	ordem.equipe = equipe
    }


    var get = function(){
    	return ordem;
    }


    var setEscala = function(chefe, agentes){
    	ordem.chefe = chefe || '';
    	ordem.agentes = agentes || '';
    }

    	return {
    		get: get,
    		set: set,
    		setEscala: setEscala,
    		getNumero: getNumero,
    		setViaturas: setViaturas,
    		setEquipe: setEquipe
    	}


}])

    

