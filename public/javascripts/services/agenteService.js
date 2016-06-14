angular.module('app')
.service('agenteService', ['$http', function($http){
	var get = function(matricula){

		return $http.get('http://ccuanexos.herokuapp.com/agentes/escala/' + matricula);
	}

	var set = function(matricula, contato){
		var body = {matricula: matricula, contato: contato}
		var promise = $http.put('http://ccuanexos.herokuapp.com/agentes/contato', body);
		promise.then(function(data){
			alert('Registro atualizado');
		}).catch(function(){
			alert('Problema no agenteService!!!');
		})
	}

	return {
		get: get,
		set: set
	}
}])