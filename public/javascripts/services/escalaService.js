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
			alert('Problemas na comunicação com o servidor!!!');
		})
	}

	var get = function(){
		return $http.get('http://ccuanexos.herokuapp.com/agentes');
	}

	return{
		atualizar: atualizar,
		get: get
	}
}])