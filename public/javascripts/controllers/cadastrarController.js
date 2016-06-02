angular.module('app')
.controller('cadastrarController', ['$scope', '$http', function($scope, $http){
	console.log('cadastrarController');

	$scope.opcoes = 
	[
	{status: 'agente'},
	{status: 'chefe'}
	];

	var dia = '08062016'

	var filtro = function(value){
		if(value[dia].status === 'plantão'){
			return true;
		}
	}

	var promise = $http.get('http://ccuanexos.herokuapp.com/agentes');
	promise.then(function(data){
		data.data.forEach(function(value){
			if(value[dia]){
				console.log(value['nome']);
			}
			
		})
	})


}])