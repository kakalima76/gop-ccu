angular.module('app')
.service('escalaService', ['$http', '$q', function($http, $q){
	var atualizar = function(nome, ordem, status, data){
		var obj = {}
		obj['nome'] = nome;
		obj['ordem'] = ordem;
		obj['status'] = status;
		obj['data'] = data;

		var promise = $http.put('https://ccuanexos.herokuapp.com/agentes/escala', obj);
		promise.catch(function(){
			alert('Problema: escalaService.atualizar.');
		})
	}

	var atualizarTroca = function(nome, ordem, status, data){
		var obj = {}
		obj['nome'] = nome;
		obj['ordem'] = ordem;
		obj['status'] = status;
		obj['data'] = data;

		return $http.put('https://ccuanexos.herokuapp.com/agentes/escala', obj);
	}

	var get = function(){
		return $http.get('http://ccuanexos.herokuapp.com/agentes');
	}

	return{
		atualizar: atualizar,
		atualizarTroca: atualizarTroca,
		get: get
	}
}])