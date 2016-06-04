angular.module('app')
.service('ordemService', ['$http', '$q', function($http, $q){
	var get = function(){
		return  $http.get('http://ccuanexos.herokuapp.com/ordem');
	}

	var set = function(dados){
		var promise = $http.post('http://ccuanexos.herokuapp.com/ordem', dados);
		promise.catch(function(err){
			console.log(err.error);
		});
	}

	var getOrdem = function(numero){
			return $q(function(resolve, reject){
				var resp = null;
				var promise = $http.get('http://ccuanexos.herokuapp.com/ordem/' + numero);
				promise.then(function(dados){
				var resp = dados.data[0].agentes;
				resolve(resp);
				});
				promise.catch(function(){
					reject('Impossível localizar a O.S');
				});
		})//fim do método $q	
	}//fim do método getOrdem

	var getOrdemChefes = function(numero){
			return $q(function(resolve, reject){
				var resp = null;
				var promise = $http.get('http://ccuanexos.herokuapp.com/ordem/' + numero);
				promise.then(function(dados){
				var resp = dados.data[0].chefe;
				resolve(resp);
				});
				promise.catch(function(){
					reject('Impossível localizar a O.S');
				});
		})//fim do método $q	
	}//fim do método getOrdem


	var atualAgente = function(agente, ordem){
		var body = {}
		body['numero'] = ordem;
		body['agentes'] = agente;

			return $http.put('http://ccuanexos.herokuapp.com/ordem/atualAgente', body);

	}

	var atualChefe = function(chefe, ordem){
		var body = {}
		body['numero'] = ordem;
		body['chefe'] = chefe;

			return $http.put('http://ccuanexos.herokuapp.com/ordem/atualChefe', body);

	}

	return {
		get: get,
		set: set,
		getOrdem: getOrdem,
		atualAgente: atualAgente,
		atualChefe: atualChefe,
		getOrdemChefes: getOrdemChefes
	}
}])