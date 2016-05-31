angular.module('app')
.service('escalaService', ['$http', '$q', function($http, $q){
	
	var get = function(){
		return $http.get('http://ccuanexos.herokuapp.com/agentes')
	}

	return {
		get: get
	}


}])

