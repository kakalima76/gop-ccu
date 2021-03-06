angular.module('app')
.service('escalaService', ['$http', '$q', function($http, $q){
	var atualizar = function(nome, ordem, status, data){
		var obj = {}
		obj['nome'] = nome;
		obj['ordem'] = ordem;
		obj['status'] = status;
		obj['data'] = data;
		obj['ordemEspecial'] = 0;
		obj['especial'] = '';

		var promise = $http.put('http://ccuanexos.herokuapp.com/agentes/escala', obj);
		promise.then(function(dados){
		});
		promise.catch(function(err){
			alert('Problema: escalaService.atualizar.');
			console.log(err.message)
		});
	}

	var atualizarTroca = function(nome, ordem, status, data){
		var obj = {}
		obj['nome'] = nome;
		obj['ordem'] = ordem;
		obj['status'] = status;
		obj['data'] = data;
		obj['ordemEspecial'] = 0;
		obj['especial'] = '';

		return $http.put('http://ccuanexos.herokuapp.com/agentes/escala', obj);
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