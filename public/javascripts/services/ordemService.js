angular.module('app')
.service('ordemService', ['$http', function($http){
	var get = function(){
		var promise = $http.get('http://ccuanexos.herokuapp.com/ordem');
		promise.then(function(dados){
			console.log(dados.data);
		})
	}

	return {
		get: get
	}
}])