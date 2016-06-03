angular.module('app')
.service('ordemService', ['$http', function($http){
	var get = function(){
		return  $http.get('http://ccuanexos.herokuapp.com/ordem');
	}

	var set = function(dados){
		var promise = $http.post('http://ccuanexos.herokuapp.com/ordem', dados);
		promise.catch(function(err){
			console.log(err.error);
		});
	}

	return {
		get: get,
		set: set
	}
}])