angular.module('app')

.factory('ordemFactory', ['$q', '$http', function($q, $http){

	var ordem = 

	{
        "status": "ativa",
        "numero": 1,
        "data": "",
        "apresentacao": "",
        "termino": "",
        "agentes": "",
        "viatura": "",
        "chefe": "",
        "acao": "",
        "equipe": ""
    }



    var getNumero = function(){
	
		return $http.get('http://ccuanexos.herokuapp.com/ordem/ultimo');
	}


    var set = function(numero, data, apresentacao, termino){
    	ordem.numero = numero;
    	ordem.data = data;
    	ordem.apresentacao = apresentacao;
    	ordem.termino = termino;
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
    		getNumero: getNumero
    	}


}])

    

