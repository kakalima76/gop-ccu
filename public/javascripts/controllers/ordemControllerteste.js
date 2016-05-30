angular.module('app')
.controller('ordemController', ['$scope', '$cookies', 'escalaService', function($scope, $cookies, escalaService){
	$scope.chefeTemplate = '/chefia';
	

	function isEmpty(val){
    	return (val === undefined || val == null || val.length <= 0) ? true : false;
	}

	var horas = ['00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'];
	$scope.horas = [];

	horas.forEach(function(value){
		$scope.horas.push({hora: value})
	})

	function resetaCookies(){
		$cookies.remove('chefes');
		$cookies.remove('data');
		$cookies.remove('agentes')
	}

	

	function criaChefes(){
		$scope.chefes = [];
		var array = $cookies.get('chefes').split(',');

		array.forEach(function(value){
			$scope.chefes.push({nome: value});
		})

		console.log($scope.chefes)
	}

	function criaAgentes(){
		$scope.agentes = [];
		var array = $cookies.get('agentes').split(',');

		array.forEach(function(value){
			$scope.agentes.push({nome: value});
		})

		console.log($scope.agentes)
	}

	
	$scope.buscar = function(valorData){
		var date = valorData.replace(/(\/)+/g, '');
		$cookies.put('data', valorData);

		var filtrarAgentes = function (value) {
			if(value.data === date && value.status === 'plantão' && value.chefe === false){
				return true;
			}
		}

		var filtrarChefes = function (value) {
			if(value.data === date && value.status === 'plantão' && value.chefe === true){
				return true;
			}
		}


		var promise = escalaService.get();
		promise.then(function(data){
			var arrayAgentes = data.data.filter(filtrarAgentes);
			var arrayChefes  = data.data.filter(filtrarChefes);
			var newAgentes = []
			var newChefes = []
			
			arrayAgentes.forEach(function(value){
				newAgentes.push(value.nome);
			})

			arrayChefes.forEach(function(value){
				newChefes.push(value.nome);
			})

			$cookies.put('agentes', newAgentes);
			$cookies.put('chefes', newChefes);

			
		}).then(function(){
			criaChefes();
			criaAgentes();
		})
	}
}])